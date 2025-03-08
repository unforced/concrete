# Authentication Generation Guide

This guide provides instructions for implementing authentication in applications based on the Base Template. Following these guidelines will ensure that authentication is secure, maintainable, and adheres to best practices.

## Core Principles

When implementing authentication, adhere to these core principles:

1. **Security First**: Prioritize security in all authentication decisions
2. **Defense in Depth**: Implement multiple layers of security
3. **Least Privilege**: Grant only the permissions necessary for each user
4. **User Experience**: Balance security with usability
5. **Standards Compliance**: Follow established authentication standards and best practices

## Authentication Flow

Implement these standard authentication flows:

### Registration Flow

1. User submits registration form with email, password, and other required information
2. Server validates the input data
3. Server checks if the email is already registered
4. Server hashes the password using a secure algorithm (e.g., bcrypt)
5. Server creates a new user record in the database
6. Server sends a verification email (optional)
7. Server returns a success response

### Login Flow

1. User submits login form with email and password
2. Server validates the input data
3. Server retrieves the user record by email
4. Server compares the submitted password with the stored hash
5. If authentication succeeds, server generates a JWT or session token
6. Server returns the token to the client
7. Client stores the token for subsequent requests

### Password Reset Flow

1. User requests a password reset by providing their email
2. Server generates a secure, time-limited reset token
3. Server sends a password reset email with a link containing the token
4. User clicks the link and submits a new password
5. Server verifies the token and updates the password
6. Server invalidates all existing sessions (optional)
7. Server returns a success response

## Implementation

### User Model

Create a user model with authentication-related fields:

```javascript
// src/models/user.model.js (Mongoose example)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { toJSON } = require('../utils/mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      private: true // This field will be excluded from toJSON
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      private: true
    },
    passwordResetToken: {
      type: String,
      private: true
    },
    passwordResetExpires: {
      type: Date,
      private: true
    }
  },
  {
    timestamps: true
  }
);

// Add plugin to convert mongoose to json
userSchema.plugin(toJSON);

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Check if password matches
userSchema.methods.isPasswordMatch = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
```

### Authentication Service

Create an authentication service to handle authentication logic:

```javascript
// src/services/auth.service.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user.model');
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../utils/errors');
const config = require('../config');
const emailService = require('./email.service');

/**
 * Register a new user
 * @param {Object} userData
 * @returns {Promise<User>}
 */
const register = async (userData) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new BadRequestError('Email already registered');
  }

  // Create verification token if email verification is enabled
  let verificationToken = null;
  if (config.email.verification.enabled) {
    verificationToken = crypto.randomBytes(32).toString('hex');
  }

  // Create user
  const user = await User.create({
    ...userData,
    verificationToken,
    isEmailVerified: !config.email.verification.enabled
  });

  // Send verification email if enabled
  if (config.email.verification.enabled) {
    const verificationUrl = `${config.frontend.url}/verify-email?token=${verificationToken}`;
    await emailService.sendVerificationEmail(user.email, verificationUrl);
  }

  return user;
};

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: User, token: string}>}
 */
const login = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Check if password matches
  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
    throw new UnauthorizedError('Invalid email or password');
  }

  // Check if email is verified (if verification is enabled)
  if (config.email.verification.enabled && !user.isEmailVerified) {
    throw new UnauthorizedError('Please verify your email before logging in');
  }

  // Generate token
  const token = generateToken(user);

  return { user, token };
};

/**
 * Verify email with token
 * @param {string} token
 * @returns {Promise<User>}
 */
const verifyEmail = async (token) => {
  // Find user by verification token
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    throw new BadRequestError('Invalid or expired verification token');
  }

  // Update user
  user.isEmailVerified = true;
  user.verificationToken = undefined;
  await user.save();

  return user;
};

/**
 * Request password reset
 * @param {string} email
 * @returns {Promise<void>}
 */
const requestPasswordReset = async (email) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set reset token and expiration
  user.passwordResetToken = passwordResetToken;
  user.passwordResetExpires = Date.now() + config.auth.passwordReset.expiryMinutes * 60 * 1000;
  await user.save();

  // Send password reset email
  const resetUrl = `${config.frontend.url}/reset-password?token=${resetToken}`;
  await emailService.sendPasswordResetEmail(user.email, resetUrl);
};

/**
 * Reset password
 * @param {string} token
 * @param {string} newPassword
 * @returns {Promise<User>}
 */
const resetPassword = async (token, newPassword) => {
  // Hash token
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Find user by reset token and check expiration
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new BadRequestError('Invalid or expired reset token');
  }

  // Update password and clear reset fields
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return user;
};

/**
 * Change password
 * @param {string} userId
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Promise<User>}
 */
const changePassword = async (userId, currentPassword, newPassword) => {
  // Find user by ID
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Check if current password matches
  const isPasswordMatch = await user.isPasswordMatch(currentPassword);
  if (!isPasswordMatch) {
    throw new UnauthorizedError('Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  return user;
};

/**
 * Generate JWT token
 * @param {User} user
 * @returns {string}
 */
const generateToken = (user) => {
  const payload = {
    sub: user._id,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + config.auth.jwt.expiryMinutes * 60
  };

  return jwt.sign(payload, config.auth.jwt.secret);
};

/**
 * Verify JWT token
 * @param {string} token
 * @returns {Promise<User>}
 */
const verifyToken = async (token) => {
  try {
    // Verify token
    const payload = jwt.verify(token, config.auth.jwt.secret);
    
    // Find user by ID
    const user = await User.findById(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired token');
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  changePassword,
  generateToken,
  verifyToken
};
```

### Authentication Controller

Create an authentication controller to handle HTTP requests:

```javascript
// src/api/auth/auth.controller.js
const authService = require('../../services/auth.service');
const { logger } = require('../../utils/logger');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    logger.error('Error in register controller', { error });
    next(error);
  }
};

/**
 * Login user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    logger.error('Error in login controller', { error });
    next(error);
  }
};

/**
 * Verify email
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    await authService.verifyEmail(token);
    
    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    logger.error('Error in verifyEmail controller', { error });
    next(error);
  }
};

/**
 * Request password reset
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.requestPasswordReset(email);
    
    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    logger.error('Error in requestPasswordReset controller', { error });
    next(error);
  }
};

/**
 * Reset password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    await authService.resetPassword(token, password);
    
    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    logger.error('Error in resetPassword controller', { error });
    next(error);
  }
};

/**
 * Change password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user.id, currentPassword, newPassword);
    
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    logger.error('Error in changePassword controller', { error });
    next(error);
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  changePassword
};
```

### Authentication Routes

Create authentication routes:

```javascript
// src/api/auth/auth.routes.js
const express = require('express');
const { validate } = require('../../middleware/validation');
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const { authenticate } = require('../../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);

router.post(
  '/login',
  validate(authValidation.login),
  authController.login
);

router.get(
  '/verify-email',
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);

router.post(
  '/request-password-reset',
  validate(authValidation.requestPasswordReset),
  authController.requestPasswordReset
);

router.post(
  '/reset-password',
  validate(authValidation.resetPassword),
  authController.resetPassword
);

router.post(
  '/change-password',
  authenticate,
  validate(authValidation.changePassword),
  authController.changePassword
);

module.exports = router;
```

### Authentication Validation

Create validation schemas for authentication routes:

```javascript
// src/api/auth/auth.validation.js
const Joi = require('joi');

const register = {
  body: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(100),
    role: Joi.string().valid('user', 'admin').default('user')
  })
};

const login = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
};

const verifyEmail = {
  query: Joi.object({
    token: Joi.string().required()
  })
};

const requestPasswordReset = {
  body: Joi.object({
    email: Joi.string().required().email()
  })
};

const resetPassword = {
  query: Joi.object({
    token: Joi.string().required()
  }),
  body: Joi.object({
    password: Joi.string().required().min(8).max(100)
  })
};

const changePassword = {
  body: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required().min(8).max(100).disallow(Joi.ref('currentPassword'))
  })
};

module.exports = {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  changePassword
};
```

### Authentication Middleware

Create middleware for authentication and authorization:

```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../utils/errors');
const config = require('../config');
const User = require('../models/user.model');
const { logger } = require('../utils/logger');

/**
 * Authentication middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication token is required');
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const payload = jwt.verify(token, config.auth.jwt.secret);
    
    // Find user
    const user = await User.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    
    // Attach user to request
    req.user = user;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      logger.warn('Invalid or expired token', { error: error.message });
      return next(new UnauthorizedError('Invalid or expired token'));
    }
    
    logger.error('Authentication error', { error });
    next(error);
  }
};

/**
 * Authorization middleware
 * @param {string[]} roles - Allowed roles
 * @returns {Function} - Express middleware function
 */
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('User not authenticated'));
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      logger.warn('Unauthorized access attempt', {
        userId: req.user._id,
        userRole: req.user.role,
        requiredRoles: roles
      });
      return next(new ForbiddenError('You do not have permission to access this resource'));
    }
    
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};
```

## Security Considerations

### Password Security

- Use bcrypt for password hashing with a minimum cost factor of 10
- Enforce strong password policies (minimum length, complexity)
- Implement rate limiting for login attempts
- Consider implementing multi-factor authentication for sensitive operations

### Token Security

- Use short-lived JWTs (15-60 minutes)
- Implement token refresh mechanism for longer sessions
- Store tokens securely (HttpOnly cookies, secure storage)
- Include token expiration, issuer, and audience claims
- Sign tokens with a strong secret or private key

### Session Management

- Implement session invalidation on password change
- Allow users to view and terminate active sessions
- Set appropriate cookie security flags (Secure, HttpOnly, SameSite)
- Implement CSRF protection for cookie-based authentication

### API Security

- Use HTTPS for all authentication endpoints
- Implement rate limiting to prevent brute force attacks
- Return consistent responses for authentication failures
- Avoid leaking sensitive information in error messages
- Implement proper CORS configuration

## Testing Authentication

Write tests for authentication flows:

```javascript
// tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/user.model');
const { setupTestDB } = require('../utils/setupTestDB');

setupTestDB();

describe('Authentication API', () => {
  let newUser;
  
  beforeEach(() => {
    newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
  });
  
  describe('POST /api/auth/register', () => {
    test('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser);
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.email).toBe(newUser.email);
      expect(res.body.data).not.toHaveProperty('password');
    });
    
    test('should return 400 if email is already registered', async () => {
      await User.create(newUser);
      
      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser);
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        ...newUser,
        isEmailVerified: true
      });
    });
    
    test('should login user and return token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: newUser.email,
          password: newUser.password
        });
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data.user.email).toBe(newUser.email);
    });
    
    test('should return 401 if email is incorrect', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: newUser.password
        });
      
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
    
    test('should return 401 if password is incorrect', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: newUser.email,
          password: 'wrongpassword'
        });
      
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
  
  // Additional test suites for other authentication endpoints...
});
```

## Frontend Integration

### Login Form Example

```javascript
// React example
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      
      // Store token in localStorage or secure storage
      localStorage.setItem('token', response.data.data.token);
      
      // Store user in state management (Redux, Context, etc.)
      // Redirect to dashboard or home page
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.response?.data?.error?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div>
        <a href="/forgot-password">Forgot password?</a>
      </div>
      <div>
        Don't have an account? <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default Login;
```

### Authentication Context Example

```javascript
// React example
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in on page load
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Set default Authorization header for all requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Get current user
        const response = await axios.get('/api/users/me');
        setUser(response.data.data);
      } catch (error) {
        // Clear token if invalid
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', {
      email,
      password
    });
    
    const { token, user } = response.data.data;
    
    // Store token
    localStorage.setItem('token', token);
    
    // Set default Authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Set user
    setUser(user);
    
    return user;
  };
  
  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data.data;
  };
  
  const logout = () => {
    // Clear token
    localStorage.removeItem('token');
    
    // Remove Authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

## Best Practices

1. **Use HTTPS**: Always use HTTPS for authentication endpoints
2. **Hash Passwords**: Never store plain text passwords
3. **Validate Inputs**: Validate all user inputs on both client and server
4. **Rate Limiting**: Implement rate limiting for authentication endpoints
5. **Secure Tokens**: Store tokens securely and use short expiration times
6. **Error Messages**: Use generic error messages that don't leak information
7. **Audit Logging**: Log authentication events for security auditing
8. **Password Policies**: Enforce strong password policies
9. **MFA**: Consider implementing multi-factor authentication
10. **Session Management**: Implement proper session management

## Conclusion

Following these guidelines will help you implement secure, maintainable authentication in your application. Adjust these guidelines based on specific project requirements and team preferences.

Remember that these are instructions for AI assistants like Cursor to generate code, not code that should be directly copied and pasted. The actual implementation may vary based on the specific requirements of your project. 
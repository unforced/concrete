# Configuration Management Generation Guide

This guide provides instructions for implementing a robust configuration management system in applications based on the Base Template. Following these guidelines will ensure that configuration is flexible, secure, and maintainable.

## Core Principles

When implementing configuration management, adhere to these core principles:

1. **Environment-Based**: Configuration should adapt to different environments (development, testing, production)
2. **Security**: Sensitive configuration values should be protected
3. **Defaults**: Provide sensible defaults for all configuration values
4. **Validation**: Validate configuration values to catch errors early
5. **Documentation**: Document all configuration options
6. **Separation**: Separate configuration from code

## Implementation

### Configuration Module

Create a centralized configuration module:

```javascript
// src/config/index.js
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Define validation schema
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
    PORT: Joi.number().default(3000),
    
    // Database
    DB_URI: Joi.string().required().description('Database connection string'),
    
    // JWT
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('Minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('Days after which refresh tokens expire'),
    
    // Email
    SMTP_HOST: Joi.string().description('SMTP host'),
    SMTP_PORT: Joi.number().description('SMTP port'),
    SMTP_USERNAME: Joi.string().description('SMTP username'),
    SMTP_PASSWORD: Joi.string().description('SMTP password'),
    EMAIL_FROM: Joi.string().description('Email sender address'),
    
    // Logging
    LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
    LOG_TO_FILE: Joi.boolean().default(false),
    LOG_ERROR_PATH: Joi.string().default('logs/error.log'),
    LOG_COMBINED_PATH: Joi.string().default('logs/combined.log')
  })
  .unknown();

// Validate environment variables
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Create config object
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  
  database: {
    uri: envVars.DB_URI
  },
  
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS
  },
  
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM,
    verification: {
      enabled: true
    }
  },
  
  logging: {
    level: envVars.LOG_LEVEL,
    file: {
      enabled: envVars.LOG_TO_FILE,
      errorPath: envVars.LOG_ERROR_PATH,
      combinedPath: envVars.LOG_COMBINED_PATH
    }
  }
};

module.exports = config;
```

### Environment Variables

Create a `.env.example` file to document required environment variables:

```
# Application
NODE_ENV=development
PORT=3000

# Database
DB_URI=mongodb://localhost:27017/app

# JWT
JWT_SECRET=your-secret-key
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USERNAME=user
SMTP_PASSWORD=password
EMAIL_FROM=noreply@example.com

# Logging
LOG_LEVEL=info
LOG_TO_FILE=false
LOG_ERROR_PATH=logs/error.log
LOG_COMBINED_PATH=logs/combined.log
```

### Environment-Specific Configuration

Create environment-specific configuration files:

```javascript
// src/config/development.js
module.exports = {
  database: {
    uri: 'mongodb://localhost:27017/app_dev'
  },
  logging: {
    level: 'debug'
  }
};

// src/config/test.js
module.exports = {
  database: {
    uri: 'mongodb://localhost:27017/app_test'
  },
  logging: {
    level: 'error'
  }
};

// src/config/production.js
module.exports = {
  logging: {
    level: 'info',
    file: {
      enabled: true
    }
  }
};
```

Then update the main configuration module to load environment-specific configuration:

```javascript
// src/config/index.js
// ... existing code ...

// Load environment-specific config
let envConfig = {};
try {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  envConfig = require(`./${config.env}`);
} catch (error) {
  // No environment-specific config found
}

// Merge with base config
const mergedConfig = {
  ...config,
  ...envConfig,
  database: {
    ...config.database,
    ...(envConfig.database || {})
  },
  jwt: {
    ...config.jwt,
    ...(envConfig.jwt || {})
  },
  email: {
    ...config.email,
    ...(envConfig.email || {})
  },
  logging: {
    ...config.logging,
    ...(envConfig.logging || {})
  }
};

module.exports = mergedConfig;
```

## Feature Flags

Implement feature flags for toggling features:

```javascript
// src/config/features.js
module.exports = {
  enableNewUI: process.env.ENABLE_NEW_UI === 'true',
  enableBetaFeatures: process.env.ENABLE_BETA_FEATURES === 'true',
  enableEmailVerification: process.env.ENABLE_EMAIL_VERIFICATION !== 'false',
  maxUploadSize: parseInt(process.env.MAX_UPLOAD_SIZE || '5', 10) * 1024 * 1024 // Default 5MB
};

// Update main config
// src/config/index.js
const features = require('./features');

const mergedConfig = {
  // ... existing config ...
  features
};
```

## Secrets Management

For sensitive configuration values, consider using a secrets management solution:

```javascript
// src/config/secrets.js
const AWS = require('aws-sdk');
const { promisify } = require('util');

// Initialize AWS Secrets Manager
const secretsManager = new AWS.SecretsManager({
  region: process.env.AWS_REGION || 'us-east-1'
});

const getSecretAsync = promisify(secretsManager.getSecretValue).bind(secretsManager);

/**
 * Get secret from AWS Secrets Manager
 * @param {string} secretName - Secret name
 * @returns {Promise<Object>} - Secret value
 */
const getSecret = async (secretName) => {
  try {
    const data = await getSecretAsync({ SecretId: secretName });
    if ('SecretString' in data) {
      return JSON.parse(data.SecretString);
    }
    throw new Error('Secret not found');
  } catch (error) {
    console.error(`Error retrieving secret ${secretName}:`, error);
    throw error;
  }
};

module.exports = {
  getSecret
};

// Usage in config
// src/config/index.js
const { getSecret } = require('./secrets');

// Load secrets in production
if (config.env === 'production') {
  try {
    const dbSecrets = await getSecret('app/database');
    config.database.uri = dbSecrets.uri;
    
    const jwtSecrets = await getSecret('app/jwt');
    config.jwt.secret = jwtSecrets.secret;
    
    const emailSecrets = await getSecret('app/email');
    config.email.smtp.auth.user = emailSecrets.username;
    config.email.smtp.auth.pass = emailSecrets.password;
  } catch (error) {
    console.error('Failed to load secrets:', error);
    // Fall back to environment variables
  }
}
```

## Configuration Validation

Implement validation for configuration values:

```javascript
// src/utils/configValidator.js
const Joi = require('joi');

/**
 * Validate configuration object against schema
 * @param {Object} config - Configuration object
 * @param {Object} schema - Joi schema
 * @returns {Object} - Validated configuration
 */
const validateConfig = (config, schema) => {
  const { error, value } = schema.validate(config, { abortEarly: false });
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    throw new Error(`Configuration validation error: ${errorMessage}`);
  }
  
  return value;
};

module.exports = {
  validateConfig
};

// Usage
// src/config/index.js
const { validateConfig } = require('../utils/configValidator');

// Define database config schema
const databaseConfigSchema = Joi.object({
  uri: Joi.string().required(),
  options: Joi.object().default({})
});

// Validate database config
config.database = validateConfig(config.database, databaseConfigSchema);
```

## Configuration Access

Create a simple interface for accessing configuration:

```javascript
// src/config/index.js
// ... existing code ...

/**
 * Get configuration value
 * @param {string} path - Dot-notation path to configuration value
 * @param {*} defaultValue - Default value if path not found
 * @returns {*} - Configuration value
 */
const get = (path, defaultValue) => {
  const parts = path.split('.');
  let current = mergedConfig;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return defaultValue;
    }
  }
  
  return current;
};

module.exports = {
  ...mergedConfig,
  get
};

// Usage
const config = require('./config');

const port = config.get('port', 3000);
const dbUri = config.get('database.uri');
```

## Configuration Reloading

Implement configuration reloading for long-running applications:

```javascript
// src/config/index.js
// ... existing code ...

let configCache = { ...mergedConfig };

/**
 * Reload configuration
 * @returns {Object} - Updated configuration
 */
const reload = async () => {
  // Reload environment variables
  dotenv.config({ path: path.join(__dirname, '../../.env') });
  
  // Validate and process configuration
  // ... (same logic as initial loading)
  
  // Update cache
  configCache = { ...mergedConfig };
  
  return configCache;
};

module.exports = {
  ...configCache,
  get,
  reload
};

// Usage
const config = require('./config');

// Reload configuration on SIGHUP
process.on('SIGHUP', async () => {
  try {
    await config.reload();
    console.log('Configuration reloaded successfully');
  } catch (error) {
    console.error('Failed to reload configuration:', error);
  }
});
```

## Configuration Documentation

Document configuration options in a separate file:

```markdown
# Configuration Options

This document describes all configuration options for the application.

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| NODE_ENV | Environment (development, test, production) | - | Yes |
| PORT | HTTP server port | 3000 | No |
| DB_URI | Database connection string | - | Yes |
| JWT_SECRET | Secret key for JWT signing | - | Yes |
| JWT_ACCESS_EXPIRATION_MINUTES | Minutes after which access tokens expire | 30 | No |
| JWT_REFRESH_EXPIRATION_DAYS | Days after which refresh tokens expire | 30 | No |
| SMTP_HOST | SMTP server host | - | No |
| SMTP_PORT | SMTP server port | - | No |
| SMTP_USERNAME | SMTP server username | - | No |
| SMTP_PASSWORD | SMTP server password | - | No |
| EMAIL_FROM | Email sender address | - | No |
| LOG_LEVEL | Logging level (error, warn, info, debug) | info | No |
| LOG_TO_FILE | Whether to log to files | false | No |
| LOG_ERROR_PATH | Path to error log file | logs/error.log | No |
| LOG_COMBINED_PATH | Path to combined log file | logs/combined.log | No |

## Feature Flags

| Flag | Description | Default |
|------|-------------|---------|
| ENABLE_NEW_UI | Enable new UI | false |
| ENABLE_BETA_FEATURES | Enable beta features | false |
| ENABLE_EMAIL_VERIFICATION | Enable email verification | true |
| MAX_UPLOAD_SIZE | Maximum upload size in MB | 5 |
```

## Testing

Write tests for the configuration module:

```javascript
// tests/unit/config/index.test.js
const path = require('path');
const { expect } = require('chai');

describe('Configuration', () => {
  let originalEnv;
  
  beforeEach(() => {
    // Save original environment
    originalEnv = { ...process.env };
    
    // Clear module cache
    jest.resetModules();
  });
  
  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });
  
  test('should load default configuration', () => {
    // Set required environment variables
    process.env.NODE_ENV = 'development';
    process.env.DB_URI = 'mongodb://localhost:27017/app_test';
    process.env.JWT_SECRET = 'test-secret';
    
    // Load configuration
    const config = require('../../../src/config');
    
    // Verify configuration
    expect(config.env).to.equal('development');
    expect(config.port).to.equal(3000);
    expect(config.database.uri).to.equal('mongodb://localhost:27017/app_test');
    expect(config.jwt.secret).to.equal('test-secret');
    expect(config.jwt.accessExpirationMinutes).to.equal(30);
    expect(config.logging.level).to.equal('info');
  });
  
  test('should override defaults with environment variables', () => {
    // Set environment variables
    process.env.NODE_ENV = 'production';
    process.env.PORT = '4000';
    process.env.DB_URI = 'mongodb://localhost:27017/app_prod';
    process.env.JWT_SECRET = 'prod-secret';
    process.env.JWT_ACCESS_EXPIRATION_MINUTES = '60';
    process.env.LOG_LEVEL = 'error';
    
    // Load configuration
    const config = require('../../../src/config');
    
    // Verify configuration
    expect(config.env).to.equal('production');
    expect(config.port).to.equal(4000);
    expect(config.database.uri).to.equal('mongodb://localhost:27017/app_prod');
    expect(config.jwt.secret).to.equal('prod-secret');
    expect(config.jwt.accessExpirationMinutes).to.equal(60);
    expect(config.logging.level).to.equal('error');
  });
  
  test('should throw error for missing required variables', () => {
    // Set incomplete environment
    process.env.NODE_ENV = 'development';
    // Missing DB_URI and JWT_SECRET
    
    // Attempt to load configuration
    expect(() => {
      require('../../../src/config');
    }).to.throw(/Config validation error/);
  });
  
  test('should get configuration value using path', () => {
    // Set environment variables
    process.env.NODE_ENV = 'development';
    process.env.DB_URI = 'mongodb://localhost:27017/app_test';
    process.env.JWT_SECRET = 'test-secret';
    
    // Load configuration
    const config = require('../../../src/config');
    
    // Get values using path
    expect(config.get('port')).to.equal(3000);
    expect(config.get('database.uri')).to.equal('mongodb://localhost:27017/app_test');
    expect(config.get('logging.file.enabled')).to.equal(false);
    expect(config.get('nonexistent.path', 'default')).to.equal('default');
  });
});
```

## Best Practices

1. **Use Environment Variables**: Store configuration in environment variables
2. **Validate Configuration**: Validate all configuration values at startup
3. **Provide Defaults**: Always provide sensible defaults for optional values
4. **Separate Environments**: Use different configurations for different environments
5. **Protect Secrets**: Never commit sensitive configuration to version control
6. **Document Options**: Document all configuration options
7. **Use Feature Flags**: Use feature flags for toggling features
8. **Centralize Access**: Access configuration through a centralized module
9. **Type Safety**: Use strong typing for configuration values
10. **Test Configuration**: Write tests for configuration loading and validation

## Example Usage

Here are examples of how to use the configuration module in different scenarios:

### Basic Usage

```javascript
const config = require('./config');

const app = express();
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
```

### Database Connection

```javascript
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.database.uri, config.database.options)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });
```

### Feature Flags

```javascript
const config = require('./config');

// Conditionally enable features
if (config.features.enableNewUI) {
  app.use('/new', newUIRouter);
}

// Set limits based on configuration
app.use(express.json({ limit: config.features.maxUploadSize }));
```

## Conclusion

Following these guidelines will help you implement a robust configuration management system that is flexible, secure, and maintainable. Adjust these guidelines based on specific project requirements and team preferences.

Remember that these are instructions for AI assistants like Cursor to generate code, not code that should be directly copied and pasted. The actual implementation may vary based on the specific requirements of your project. 
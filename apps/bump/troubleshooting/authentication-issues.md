# Authentication Issues Troubleshooting

**Last Updated**: March 4, 2025  
**Related Guides**: [Authentication Flow](../concepts/authentication-flow.md), [Supabase Integration](../implementations/02-supabase-integration.md)  
**Prerequisite Knowledge**: Supabase Auth, React, TypeScript

## Overview

This guide addresses common authentication issues in the Bump application and provides solutions for troubleshooting them. It covers email OTP verification problems, session management issues, and other authentication-related challenges.

## Common Authentication Issues

### 1. OTP Email Not Received

**Symptoms**:
- User completes email input but doesn't receive OTP email
- No error messages in the UI
- Console may show successful OTP generation

**Possible Causes**:
- Email delivery issues
- Incorrect email format validation
- Rate limiting triggered
- Environment configuration issues

**Solutions**:

1. **Check Email Format**:
   ```typescript
   // Ensure proper email validation
   const isValidEmail = (email: string) => {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   };
   ```

2. **Verify Environment Variables**:
   - Ensure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correctly set
   - Check that email service is configured in Supabase dashboard

3. **Check Rate Limiting**:
   - Verify if user has exceeded OTP request limits
   - Implement proper error handling for rate limit responses

4. **Test Email Delivery**:
   - Use test email addresses that you control
   - Check spam folders
   - Verify email templates in Supabase dashboard

### 2. OTP Verification Fails

**Symptoms**:
- User enters OTP code but verification fails
- Error message indicates invalid code
- Multiple attempts fail with same code

**Possible Causes**:
- OTP expiration
- Incorrect OTP format
- Case sensitivity issues
- Multiple devices/sessions

**Solutions**:

1. **Check OTP Expiration**:
   ```typescript
   // Implement clear expiration messaging
   const handleVerify = async (otp: string) => {
     try {
       const { error } = await supabase.auth.verifyOtp({
         email,
         token: otp,
         type: 'email'
       });
       
       if (error) {
         if (error.message.includes('expired')) {
           setError('OTP has expired. Please request a new code.');
         } else {
           setError('Invalid OTP. Please try again.');
         }
       }
     } catch (err) {
       setError('Verification failed. Please try again.');
     }
   };
   ```

2. **Implement OTP Format Validation**:
   - Ensure OTP is properly formatted before submission
   - Provide clear guidance on expected format

3. **Add Resend Functionality**:
   - Allow users to request a new OTP if verification fails
   - Implement proper rate limiting for resend requests

### 3. Session Not Persisting

**Symptoms**:
- User is logged out unexpectedly
- Session disappears after page refresh
- Frequent re-authentication required

**Possible Causes**:
- Incorrect session storage configuration
- Token expiration
- Cross-domain issues
- Browser privacy settings

**Solutions**:

1. **Check Session Storage Configuration**:
   ```typescript
   // Configure proper session storage
   const supabase = createClient(
     process.env.SUPABASE_URL!,
     process.env.SUPABASE_ANON_KEY!,
     {
       auth: {
         storageKey: 'bump_auth',
         autoRefreshToken: true,
         persistSession: true,
       }
     }
   );
   ```

2. **Implement Token Refresh**:
   - Ensure token refresh is properly configured
   - Handle refresh failures gracefully

3. **Check for Cross-Domain Issues**:
   - Ensure consistent domain usage
   - Configure CORS properly if using multiple domains

4. **Handle Browser Privacy Settings**:
   - Detect and handle private browsing modes
   - Provide guidance for users with strict privacy settings

### 4. Authentication State Inconsistency

**Symptoms**:
- UI shows logged-in state but API calls fail with auth errors
- Inconsistent auth state across different parts of the application
- Auth state doesn't update properly after login/logout

**Possible Causes**:
- Race conditions in auth state updates
- Multiple auth state sources
- Improper context propagation
- Stale state in components

**Solutions**:

1. **Centralize Auth State Management**:
   ```typescript
   // Create a centralized auth provider
   export const AuthProvider = ({ children }) => {
     const [session, setSession] = useState<Session | null>(null);
     const [loading, setLoading] = useState(true);
     
     useEffect(() => {
       // Get initial session
       supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session);
         setLoading(false);
       });
       
       // Listen for auth changes
       const { data: { subscription } } = supabase.auth.onAuthStateChange(
         (_event, session) => {
           setSession(session);
         }
       );
       
       return () => subscription.unsubscribe();
     }, []);
     
     return (
       <AuthContext.Provider value={{ session, loading }}>
         {children}
       </AuthContext.Provider>
     );
   };
   ```

2. **Implement Auth State Synchronization**:
   - Ensure all components access auth state from the same source
   - Use React Context or state management library for consistency

3. **Add Auth State Debugging**:
   - Implement logging for auth state changes
   - Create debug tools for auth state inspection

## Environment-Specific Issues

### Development Environment

1. **Local Environment Variables**:
   - Ensure `.env.development` contains correct Supabase credentials
   - Restart development server after changing environment variables

2. **CORS Configuration**:
   - Configure CORS in Supabase dashboard for local development URLs
   - Use consistent URL format (with or without trailing slash)

### Production Environment

1. **Environment Variable Configuration**:
   - Verify production environment variables are correctly set
   - Use separate Supabase project for production

2. **Error Logging**:
   - Implement comprehensive error logging for authentication issues
   - Set up alerts for authentication failure patterns

## Testing Authentication

1. **Mock Authentication for Tests**:
   ```typescript
   // Example of mocking auth in tests
   vi.mock('@supabase/supabase-js', () => ({
     createClient: () => ({
       auth: {
         signInWithOtp: vi.fn().mockResolvedValue({
           data: { session: null },
           error: null
         }),
         verifyOtp: vi.fn().mockResolvedValue({
           data: { session: { user: { id: 'test-user-id' } } },
           error: null
         }),
         getSession: vi.fn().mockResolvedValue({
           data: { session: { user: { id: 'test-user-id' } } },
           error: null
         }),
         onAuthStateChange: vi.fn().mockImplementation((callback) => {
           callback('SIGNED_IN', { user: { id: 'test-user-id' } });
           return { data: { subscription: { unsubscribe: vi.fn() } } };
         })
       }
     })
   }));
   ```

2. **Test Authentication Flows**:
   - Test happy path (successful authentication)
   - Test error paths (invalid email, expired OTP, etc.)
   - Test edge cases (rate limiting, network issues)

## Best Practices

1. **Clear Error Messages**:
   - Provide specific, actionable error messages
   - Avoid technical jargon in user-facing errors

2. **Progressive Enhancement**:
   - Implement fallbacks for environments with limited capabilities
   - Ensure core functionality works across all supported platforms

3. **Security Considerations**:
   - Implement proper rate limiting for authentication attempts
   - Use secure storage for authentication tokens
   - Follow security best practices for OTP handling

---

*Note: This is a placeholder file. Expand with actual implementation details and specific issues encountered during development.* 
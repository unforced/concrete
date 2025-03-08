# Milestone 2: Supabase Integration

## Overview
This milestone focuses on integrating Supabase as the backend for the Bump application. You'll be setting up the database schema, implementing authentication flows with OTP, creating client utilities, and building the foundation for real-time data features.

## Related Resources

### Essential References
These resources are critical for implementing this milestone:

**Concepts:**
- [Authentication Flow](../concepts/authentication-flow.md) - Understanding the OTP authentication process
- [Realtime Patterns](../concepts/realtime-patterns.md) - Patterns for implementing realtime features
- [Testing Strategy](../concepts/testing-strategy.md) - Framework for testing Supabase integration

**Templates:**
- [Supabase Integration Template](../templates/supabase-integration-template.md) - Patterns for Supabase client setup and usage
- [Test Template](../templates/test-template.md) - Patterns for writing comprehensive tests
- [Utility Functions Template](../templates/utility-functions-template.md) - Patterns for creating database utility functions

**Troubleshooting:**
- [Supabase Testing](../troubleshooting/supabase-testing.md) - Solutions for common Supabase testing challenges
- [Authentication Issues](../troubleshooting/authentication-issues.md) - Solutions for authentication problems

### Tool-Specific Patterns
- **Supabase Client**: 
  - Use a singleton pattern for the client instance
  - Implement strong TypeScript types for database tables
  - Handle JWT token refresh automatically
  - Set up error handling wrappers for all Supabase calls
  
- **Supabase Auth**: 
  - Implement proper session persistence
  - Handle auth state changes with event listeners
  - Use try/catch blocks for all auth operations
  - Implement proper loading states during auth operations

- **Supabase Realtime**:
  - Set up channel-based subscriptions
  - Implement proper cleanup of subscriptions
  - Use optimistic updates for better UX
  - Handle connection state changes

## Test-First Approach

Before implementing each feature in this milestone, create tests that define the expected behavior:

1. **Define Test Cases**: Outline the test cases for each Supabase integration feature
2. **Create Mock Implementations**: Set up mock Supabase clients for testing
3. **Write Test Files**: Create test files with failing tests
4. **Implement Features**: Develop the features until tests pass
5. **Refactor**: Clean up the code while ensuring tests continue to pass

> 📌 **Critical Context:** Follow the [Supabase Testing](../troubleshooting/supabase-testing.md) guide for setting up proper test environments and mocks.

## Requirements

### 1. Supabase Project Setup

> 📌 **Reference:** Review the [Supabase Integration Template](../templates/supabase-integration-template.md) for project setup patterns.

**Objective**: Create and configure a Supabase project for the Bump application.

**Requirements**:
- Create a new Supabase project in the dashboard
- Configure local development environment with Supabase CLI
- Set up environment variables for local and production environments
- Test connection to both local and production Supabase instances

**Configuration Needs**:
- Environment variables for URLs and API keys
- Separate configurations for development and testing
- Connection fallback strategies

**Test Approach**:
- Create tests that verify connection to Supabase
- Test environment variable loading
- Verify that the client can be initialized correctly

**Example Environment Structure**:
```
# .env.development
VITE_SUPABASE_URL=<local_or_prod_url>
VITE_SUPABASE_ANON_KEY=<anon_key>
```

### 2. Database Schema Implementation

> 📌 **Reference:** Consult the [Supabase Integration Template](../templates/supabase-integration-template.md) for schema design patterns.

**Objective**: Create the database tables and relationships according to the schema specifications.

**Requirements**:
- Implement all tables specified in the DB Schema section
- Set up proper foreign key relationships with CASCADE rules
- Configure RLS (Row Level Security) policies for data access control
- Create necessary indexes for performance optimization
- Implement enum types for status fields like `hope_to_bump` and `notify_for`

**Tables to Implement**:
- `profiles` - User profile information (extends auth.users)
- `auth_otp` - OTP codes for email verification
- `places` - Gathering locations information
- `user_places` - Links users to their preferred places
- `statuses` - User check-ins with activity information
- `meetups` - Logged encounters between users
- `friends` - Friend connections with intent data
- `settings` - User preferences and configurations
- `notifications` - In-app notification storage

**Test Approach**:
- Create tests that verify table creation
- Test foreign key constraints
- Verify that RLS policies work as expected
- Test enum type validation

**Example RLS Policy Pattern**:
```sql
-- Example pattern for RLS policy (implement for each table)
CREATE POLICY "Users can view their own profiles"
ON profiles FOR SELECT
USING (auth.uid() = id);
```

### 3. Supabase Client Setup

> 📌 **Reference:** Follow the [Supabase Integration Template](../templates/supabase-integration-template.md) for client setup patterns.

**Objective**: Create a client utility for interacting with Supabase throughout the application.

**Requirements**:
- Create a singleton Supabase client instance
- Implement strong TypeScript types for database tables
- Set up error handling and connection resilience
- Configure client with environment variables
- Handle JWT token refresh

**Client Features**:
- TypeScript-based client with strong typing
- Error handling wrappers
- Connection state monitoring
- Support for both REST and Realtime subscriptions

**Test Approach**:
- Test client initialization
- Verify error handling works correctly
- Test connection state monitoring
- Verify that types are correctly applied

**Example Client Pattern**:
```typescript
// Example type definition pattern (not complete)
export type Tables = {
  profiles: {
    Row: {
      id: string;
      email: string;
      phone: string | null;
      username: string;
      created_at: string;
    };
    Insert: {
      // Define insert type
    };
    Update: {
      // Define update type
    };
  };
  // Define other tables...
};
```

### 4. Authentication Implementation

> 📌 **Reference:** Review the [Authentication Flow](../concepts/authentication-flow.md) and [Authentication Issues](../troubleshooting/authentication-issues.md) guides.

**Objective**: Implement the OTP-based email authentication flow.

**Requirements**:
- Create email-based OTP authentication flow
- Implement OTP generation and verification
- Build rate limiting to prevent abuse
- Connect authentication to the AuthContext
- Handle session persistence and restoration
- Implement logout functionality

**Auth Flow Components**:
- Email submission form
- OTP verification screen
- Profile creation/update process
- Session management
- Error handling and retry mechanisms

**Test Approach**:
- Test the complete authentication flow
- Verify OTP generation and verification
- Test rate limiting functionality
- Verify session persistence and restoration
- Test error handling and retry mechanisms

**Security Considerations**:
- OTP expiration after 5 minutes
- Maximum of 3 verification attempts
- Rate limiting on email submissions
- Secure storage of authentication tokens

### 5. Polling Fallback for Realtime

> 📌 **Reference:** Consult the [Realtime Patterns](../concepts/realtime-patterns.md) guide for implementation strategies.

**Objective**: Implement a fallback mechanism for environments where WebSockets aren't available.

**Requirements**:
- Create a polling mechanism for local development
- Design a toggle between WebSockets and polling
- Ensure consistent data interface regardless of fetch method
- Optimize polling frequency to balance UX and performance
- Handle connection state and recovery

**Implementation Strategies**:
- Environment-based connection selection
- Configurable polling intervals
- Connection health monitoring
- Transparent API for components (same interface for both methods)

**Test Approach**:
- Test WebSocket connection
- Verify polling fallback works correctly
- Test switching between methods
- Verify data consistency between methods
- Test connection recovery

### 6. CRUD Operations

> 📌 **Reference:** Use the [Utility Functions Template](../templates/utility-functions-template.md) for creating database utilities.

**Objective**: Create utility functions for common database operations.

**Requirements**:
- Implement typed CRUD functions for all tables
- Create helper functions for common query patterns
- Build data transformation utilities
- Implement proper error handling
- Ensure all database operations respect RLS policies

**Operation Categories**:
- User profile management
- Places creation and discovery
- Status updates and retrieval
- Friend connections and intent management
- Settings persistence
- Notification handling

**Test Approach**:
- Test each CRUD operation
- Verify error handling works correctly
- Test data transformation utilities
- Verify that RLS policies are respected

**Example Operation Pattern**:
```typescript
// Example operation pattern (not complete)
async function getProfileById(id: string) {
  // Implementation should handle:
  // 1. Type safety
  // 2. Error handling
  // 3. Null checking
  // 4. Return appropriate result
}
```

### 7. Testing Infrastructure

> 📌 **Reference:** Follow the [Supabase Testing](../troubleshooting/supabase-testing.md) guide for testing strategies.

**Objective**: Set up testing utilities for Supabase integration.

**Requirements**:
- Create mock implementations of Supabase client
- Build test helpers for common Supabase operations
- Implement isolated test environments
- Configure test data fixtures
- Set up strategies for testing real-time features

**Testing Approaches**:
- Unit testing of client utilities
- Integration testing of authentication flows
- Mock-based testing of Supabase method chains
- Test environment with isolated database

**Test Approach**:
- Verify that mock implementations work correctly
- Test helpers for common operations
- Verify that test environments are isolated
- Test data fixtures for consistency

## Cross-Cutting Concerns

These patterns should be applied consistently across all Supabase integration features:

1. **Error Handling**: 
   - Implement try/catch blocks for all Supabase operations
   - Create custom error types for different failure scenarios
   - Log errors with contextual information
   - Present user-friendly error messages
   - Implement retry mechanisms for transient failures

2. **Security**:
   - Apply RLS policies to all tables
   - Validate all user inputs before database operations
   - Use parameterized queries to prevent SQL injection
   - Implement proper authentication checks
   - Follow least privilege principle for database access

3. **Performance**:
   - Optimize query patterns to minimize database load
   - Implement proper indexes for frequently queried columns
   - Use connection pooling for efficient resource usage
   - Implement caching strategies for frequently accessed data
   - Monitor and optimize query performance

4. **Data Integrity**:
   - Implement proper foreign key constraints
   - Use transactions for operations that modify multiple tables
   - Validate data before insertion or update
   - Implement proper cascade rules for deletions
   - Handle edge cases like duplicate entries

## Verification Checklist

Before considering this milestone complete, ensure:

- [ ] All tests for Supabase integration are written and passing
- [ ] All database tables are created and properly related
- [ ] RLS policies are applied to all tables
- [ ] Authentication flow works end-to-end
- [ ] Supabase client is properly configured with types
- [ ] Polling fallback works in local development
- [ ] CRUD operations for all tables are implemented and tested
- [ ] All tests related to Supabase integration pass
- [ ] The application can properly connect to both local and production Supabase
- [ ] Error handling is implemented for all Supabase operations
- [ ] Documentation is updated with Supabase integration details
- [ ] Cross-cutting concerns are addressed consistently

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Supabase connection fails | Check environment variables and network connectivity |
| RLS policies blocking access | Verify that policies are correctly implemented and user is authenticated |
| TypeScript errors with Supabase types | Ensure database types are correctly defined and imported |
| Authentication flow not working | Check OTP generation and verification logic, verify email service is configured |
| Realtime subscriptions not receiving updates | Check channel configuration and ensure tables have realtime enabled |
| Tests failing with database errors | Use isolated test environment and proper mocks for Supabase client |

## Next Steps

After completing this milestone, proceed to [Milestone 3: Home & Check-In](./03-home-checkin.md) to implement the home page features and check-in functionality. 
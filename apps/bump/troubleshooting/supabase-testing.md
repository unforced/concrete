# Supabase Testing Guide

## Overview

This guide focuses on testing Supabase integrations in the Bump application. Testing Supabase interactions requires specialized mocking approaches due to its method chaining pattern, complex return types, and realtime subscription features. This guide provides patterns and solutions for effectively testing Supabase functionality in both unit and component tests.

## Challenges When Testing Supabase

When testing code that uses Supabase, several unique challenges arise:

1. **Method Chaining Pattern**: Supabase uses a fluent API with extensive method chaining (e.g., `supabase.from('table').select('*').eq('field', value)`), which can be difficult to mock.

2. **Complex Return Types**: Supabase operations return objects containing both `data` and `error` properties, requiring mocks to simulate this structure.

3. **Asynchronous Operations**: All Supabase database operations are asynchronous, requiring proper testing of Promise handling.

4. **Realtime Subscriptions**: Testing code that uses Supabase's realtime features requires special consideration for event-based patterns.

5. **Multiple Operations on Same Table**: Mocks need to be able to handle different operations (select, insert, update, delete) on the same table reference.

6. **Row-Level Security (RLS)**: Testing RLS policies requires simulating different user contexts to verify access control.

## Effective Mocking Strategies

### Basic Mocking Approach

The key to effectively testing Supabase is creating flexible mock implementations that support method chaining while providing controllable results. Consider these approaches:

**1. Chain-Returning Mock Functions**

Create mock functions that return objects with the same methods as the Supabase client:

```typescript
// Pattern for creating mock functions that support chaining
const mockFrom = vi.fn().mockReturnValue({
  select: vi.fn().mockReturnValue({
    eq: vi.fn().mockResolvedValue({ data: mockData, error: null }),
    // Add other query methods as needed
  }),
  // Add other operations as needed
});

// Using the mock
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: mockFrom,
    // Add other client methods as needed
  }),
}));
```

**2. Reusable Mock Chain Generator**

For more complex tests, create a reusable function that generates mock chains with configurable endpoints:

```typescript
// Pattern for creating a reusable mock chain
function createMockChain(finalResult: { data: any; error: any }) {
  // Return an object with methods that continue the chain
  // Each method returns either another chain segment or the final result
  // Implementation details will depend on test needs
}
```

### Advanced Mocking Techniques

For more complex Supabase interactions, consider these advanced approaches:

**1. Mock Implementation Factory**

Create a factory function that produces different mock behaviors based on parameters:

```typescript
// Pattern for a mock factory function
function createSupabaseMock(behavior: 'success' | 'error' | 'empty', customData?: any) {
  // Return a configured mock based on the requested behavior
}
```

**2. Structured Mock Factories**

Use a more structured factory pattern to create consistent mock objects:

```typescript
// Type-safe mock factory pattern
interface MockFactoryOptions<T> {
  data?: T;
  error?: { message: string; code: string };
  delay?: number;
}

function createProfileMock<T = any>(options: MockFactoryOptions<T> = {}) {
  const { data = null, error = null, delay = 0 } = options;
  
  // Create a mock that returns the specified data/error after the specified delay
  return {
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockImplementation(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({ data, error }), delay)
        )
      ),
      // Other query methods...
    }),
    // Other operations...
  };
}

// Usage
const profileMock = createProfileMock({
  data: { id: '123', name: 'Test User' },
  delay: 100 // Simulate network delay
});
```

**3. Table-Specific Mocks**

For applications with multiple tables, create specialized mocks for each table's operations:

```typescript
// Pattern for table-specific mocks
const profilesMock = {
  select: vi.fn().mockImplementation(() => /* ... */),
  insert: vi.fn().mockImplementation(() => /* ... */),
  // Other operations...
};

const placesMock = {
  // Similar implementation for places table
};

// Configure the mock to return the appropriate table mock
mockFrom.mockImplementation((table) => {
  if (table === 'profiles') return profilesMock;
  if (table === 'places') return placesMock;
  // Default or error case
});
```

**4. Mock Service Worker (MSW) Integration**

For more realistic API testing, integrate MSW to intercept and mock HTTP requests:

```typescript
// Setup MSW for Supabase API mocking
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Define handlers for Supabase endpoints
const handlers = [
  rest.get('https://your-project.supabase.co/rest/v1/profiles', (req, res, ctx) => {
    // Extract query parameters
    const userId = req.url.searchParams.get('user_id');
    
    // Return mocked response based on parameters
    if (userId === '123') {
      return res(
        ctx.status(200),
        ctx.json([{ id: '123', name: 'Test User' }])
      );
    }
    
    return res(ctx.status(404));
  }),
  // Add handlers for other endpoints
];

// Create and start the server
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Testing Authentication Functions

Authentication testing requires special consideration:

**1. Session and User Mocking**

```typescript
// Pattern for mocking auth methods
const mockAuth = {
  getSession: vi.fn().mockResolvedValue({ 
    data: { session: { /* mock session data */ } }, 
    error: null 
  }),
  getUser: vi.fn().mockResolvedValue({ 
    data: { user: { /* mock user data */ } }, 
    error: null 
  }),
  // Other auth methods...
};
```

**2. Sign-In Process Testing**

When testing authentication flows, test both successful and failed attempts:

```typescript
// Pattern for testing auth functions
test('handles successful login', async () => {
  // Setup mocks for successful auth
  // Call the function that uses Supabase auth
  // Assert expected behavior occurred
});

test('handles failed login', async () => {
  // Setup mocks for auth failure
  // Call the function that uses Supabase auth
  // Assert error handling behaves as expected
});
```

**3. Mock Session Provider**

Create a mock session provider for component testing:

```typescript
// Mock session provider for component testing
function renderWithSession(ui: React.ReactElement, sessionData = null) {
  // Create a mock session context
  const mockSessionContext = {
    session: sessionData,
    isLoading: false,
    error: null,
  };
  
  // Render with the mock provider
  return render(
    <SessionContext.Provider value={mockSessionContext}>
      {ui}
    </SessionContext.Provider>
  );
}
```

## Testing Data Operations

For testing functions that perform database operations:

**1. CRUD Operation Testing**

Test each type of database operation with both success and error cases:

```typescript
// Pattern for testing data operations
test('successfully fetches profile data', async () => {
  // Setup mock for successful data fetch
  // Call the function that uses Supabase
  // Assert data was processed correctly
});

test('handles database errors properly', async () => {
  // Setup mock for database error
  // Call the function that uses Supabase
  // Assert error handling works as expected
});
```

**2. Testing Complex Queries**

For complex queries with multiple chained methods, ensure your mocks support the full chain:

```typescript
// Pattern for testing complex queries
test('fetches filtered and ordered data', async () => {
  // Setup mock that supports the full query chain
  // Call the function that performs the complex query
  // Assert results are handled correctly
});
```

**3. Database Sandboxing for E2E Tests**

For integration tests against a real Supabase instance, use transaction rollbacks to isolate tests:

```typescript
// Pattern for database sandboxing in E2E tests
describe('Profile integration tests', () => {
  let transaction: any;
  
  beforeEach(async () => {
    // Start a transaction
    const { data } = await supabase.rpc('begin_transaction');
    transaction = data;
  });
  
  afterEach(async () => {
    // Roll back the transaction
    await supabase.rpc('rollback_transaction', { transaction_id: transaction });
  });
  
  test('creates and retrieves a profile', async () => {
    // Test against real database within transaction
    // Changes will be rolled back after the test
  });
});
```

**4. Testing RLS Policies**

Test row-level security by simulating different user contexts:

```typescript
// Pattern for testing RLS policies
describe('RLS policy tests', () => {
  test('user can only access their own profile', async () => {
    // Setup mock with user A's session
    const userAClient = createClientWithSession('user-a-id');
    
    // Setup mock with user B's session
    const userBClient = createClientWithSession('user-b-id');
    
    // User A should be able to access their profile
    const userAResult = await userAClient
      .from('profiles')
      .select('*')
      .eq('id', 'user-a-id')
      .single();
    
    expect(userAResult.data).not.toBeNull();
    
    // User A should NOT be able to access user B's profile
    const userBProfileResult = await userAClient
      .from('profiles')
      .select('*')
      .eq('id', 'user-b-id')
      .single();
    
    expect(userBProfileResult.error).not.toBeNull();
  });
});
```

## Testing Realtime Subscriptions

Testing realtime features requires special techniques:

**1. Subscription Setup Testing**

```typescript
// Pattern for testing subscription setup
test('sets up realtime subscription correctly', () => {
  // Mock the channel and subscription methods
  // Call the function that creates the subscription
  // Assert the subscription was configured correctly
});
```

**2. Event Handling Testing**

Test that event handlers process subscription events correctly:

```typescript
// Pattern for testing event handling
test('processes subscription events correctly', () => {
  // Capture the event callback during mock setup
  // Call the captured callback with test data
  // Assert the event was processed correctly
});
```

**3. Channel Simulation**

Create a more realistic simulation of Supabase channels:

```typescript
// Pattern for simulating Supabase channels
function createMockChannel() {
  let subscribers = {};
  
  return {
    on: vi.fn().mockImplementation((event, callback) => {
      subscribers[event] = callback;
      return this;
    }),
    subscribe: vi.fn().mockImplementation(() => {
      return Promise.resolve('SUBSCRIBED');
    }),
    unsubscribe: vi.fn().mockImplementation(() => {
      return Promise.resolve('UNSUBSCRIBED');
    }),
    // Method to trigger events in tests
    simulateEvent: (event, payload) => {
      if (subscribers[event]) {
        subscribers[event](payload);
      }
    }
  };
}

// Usage in tests
test('handles INSERT events correctly', async () => {
  const mockChannel = createMockChannel();
  vi.spyOn(supabase, 'channel').mockReturnValue(mockChannel);
  
  // Setup subscription in component/hook
  render(<RealtimeComponent />);
  
  // Simulate an INSERT event
  mockChannel.simulateEvent('INSERT', { 
    new: { id: '123', name: 'New Item' } 
  });
  
  // Assert the component updated correctly
  expect(screen.getByText('New Item')).toBeInTheDocument();
});
```

**4. Lifecycle Management Testing**

Verify that subscriptions are properly cleaned up:

```typescript
// Pattern for testing subscription lifecycle
test('cleans up subscription on unmount', () => {
  // Mock the channel and subscription methods
  const mockUnsubscribe = vi.fn();
  vi.spyOn(supabase, 'channel').mockReturnValue({
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn().mockResolvedValue('SUBSCRIBED'),
    unsubscribe: mockUnsubscribe,
  });
  
  // Render and unmount component
  const { unmount } = render(<RealtimeComponent />);
  unmount();
  
  // Assert unsubscribe was called
  expect(mockUnsubscribe).toHaveBeenCalled();
});
```

## Test Helpers and Utilities

Create reusable utilities to simplify Supabase testing:

**1. Custom Render Function for Tests**

```typescript
// Pattern for custom render function
function renderWithSupabase(ui: React.ReactElement, mockOptions = {}) {
  // Configure Supabase mocks based on options
  // Render the component with necessary providers
  // Return render result plus any helpful utilities
}
```

**2. Result Generators**

Create functions that generate realistic Supabase response objects:

```typescript
// Pattern for result generators
function createSuccessResult<T>(data: T) {
  return { data, error: null };
}

function createErrorResult(message: string, code = 'unknown_error') {
  return { data: null, error: { message, code } };
}
```

**3. Type-Safe Mock Utilities**

Use TypeScript utility types to create type-safe mocks:

```typescript
// Type-safe mock utilities
type SupabaseResponse<T> = {
  data: T | null;
  error: { message: string; code: string } | null;
};

// Generic mock creator with proper typing
function createTypedMock<T>(data: T | null, error: any = null): SupabaseResponse<T> {
  return { data, error };
}

// Usage
const profileMock = createTypedMock<Profile>({ id: '123', name: 'Test User' });
```

## Troubleshooting Common Testing Issues

### 1. "Method ... is not a function" Errors

This typically means your mock chain doesn't implement all the methods being called.

**Solution**: Ensure your mock implements all methods in the chain being tested.

### 2. Promise-Related Errors

If you see errors about "cannot read property 'then' of undefined," your mock isn't returning a Promise where one is expected.

**Solution**: Use `mockResolvedValue` or `mockImplementation(() => Promise.resolve(...))` for methods that should return Promises.

### 3. TypeScript Errors with Mocks

TypeScript may report errors when your mocks don't match the expected types.

**Solution**: Create interfaces that match the Supabase return types and use them to type your mocks.

### 4. Subscription Testing Issues

Testing realtime subscriptions can be particularly challenging due to their event-based nature.

**Solution**: Focus on testing that subscriptions are set up correctly and that event handlers process events as expected, rather than testing the subscription mechanism itself.

### 5. Memory Leaks in Subscription Tests

Failing to clean up subscriptions in tests can lead to memory leaks and test interference.

**Solution**: Ensure all tests that create subscriptions also clean them up, either in component unmount handlers or in test cleanup functions.

## Best Practices

1. **Create reusable mock functions** that can be configured for different test scenarios
2. **Test both success and error cases** for all Supabase operations
3. **Isolate tests** from real Supabase instances by properly mocking all interactions
4. **Use descriptive test names** that clearly indicate what aspect of Supabase interaction is being tested
5. **Verify that error handling** works correctly for all Supabase operations
6. **Test realtime features** by mocking the subscription mechanism and directly triggering events
7. **Verify subscription cleanup** to prevent memory leaks and test interference
8. **Test RLS policies** by simulating different user contexts
9. **Use MSW for integration tests** to create more realistic API simulations
10. **Implement database sandboxing** for E2E tests to ensure proper isolation

## Example Test Patterns

### Component Test Pattern

```typescript
// Pattern for component tests that use Supabase
describe('ProfileComponent', () => {
  beforeEach(() => {
    // Setup Supabase mocks
  });
  
  test('displays profile data when loaded', async () => {
    // Configure mock to return profile data
    // Render component
    // Wait for async operations
    // Assert component displays data correctly
  });
  
  test('shows error message when profile fetch fails', async () => {
    // Configure mock to return an error
    // Render component
    // Wait for async operations
    // Assert component shows error state
  });
});
```

### Utility Function Test Pattern

```typescript
// Pattern for testing utility functions
describe('profileUtils', () => {
  beforeEach(() => {
    // Setup Supabase mocks
  });
  
  test('getProfile returns profile when found', async () => {
    // Configure mock to return profile data
    // Call getProfile function
    // Assert correct data is returned
  });
  
  test('getProfile throws error when not found', async () => {
    // Configure mock to return null data with no error
    // Call getProfile function
    // Assert function throws the expected error
  });
});
```

### MSW Integration Test Pattern

```typescript
// Pattern for MSW integration tests
describe('Profile API integration', () => {
  // Setup MSW server before tests
  
  test('fetches profile data from API', async () => {
    // Configure MSW to return profile data
    // Call the function that makes the API request
    // Assert data is processed correctly
  });
  
  test('handles API errors gracefully', async () => {
    // Configure MSW to return an error response
    // Call the function that makes the API request
    // Assert error handling works as expected
  });
});
```

### RLS Policy Test Pattern

```typescript
// Pattern for testing RLS policies
describe('RLS policy tests', () => {
  // Setup different user contexts
  
  test('user can only access their own data', async () => {
    // Test access to own data (should succeed)
    // Test access to another user's data (should fail)
    // Assert proper access control
  });
  
  test('admin can access all data', async () => {
    // Test admin access to various data
    // Assert proper access control
  });
});
```

## Conclusion

Effective testing of Supabase integrations requires understanding its unique challenges and implementing appropriate mocking strategies. By using the patterns described in this guide, you can create robust tests that verify your application's interaction with Supabase while maintaining isolation from actual database operations.

For comprehensive test coverage, combine:
1. **Unit tests** with mocked Supabase client for individual functions
2. **Component tests** with MSW for realistic API simulation
3. **Integration tests** against a local Supabase instance with transaction rollbacks

This multi-layered approach ensures your Supabase integration is thoroughly tested while maintaining test isolation and performance. 
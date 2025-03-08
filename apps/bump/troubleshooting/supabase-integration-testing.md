# Integration Testing with Supabase

This guide explains how to set up and run integration tests for Supabase in the Bump application. Integration tests make actual API calls to a test database, which helps catch issues that unit tests with mocks might miss.

## Why Integration Tests?

While unit tests with mocks are fast and isolated, they have limitations:

1. **They don't validate query syntax**: Mocks don't check if your query syntax is correct for Supabase.
2. **They don't match real-world responses**: Mock data might not match the actual structure of Supabase responses.
3. **They don't test the full stack**: Unit tests don't verify that your code works with the actual database schema.

Integration tests address these limitations by making real API calls to a test database.

## Setup

### 1. Test Database

For integration tests, you should use:

- **Local Development**: Your local Supabase instance for development
- **CI/CD**: A dedicated test project in Supabase

### 2. Test Data

The integration tests create and clean up their own test data:

- Test profiles
- Test places
- Test check-ins

This ensures tests are isolated and don't interfere with each other.

### 3. Environment Variables

Integration tests use the same environment variables as your development environment:

```
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

## Running Integration Tests

To run integration tests:

```bash
npm run test:integration
```

This sets the `RUN_INTEGRATION_TESTS=true` environment variable and runs only the integration test files.

## Test Structure

### 1. Setup

The `beforeAll` hook creates necessary test data:

```typescript
beforeAll(async () => {
  // Create test profile
  const { data: profileData } = await supabase
    .from('profiles')
    .insert({
      id: uuidv4(),
      email: `test-${Date.now()}@example.com`,
      username: `testuser-${Date.now()}`
    })
    .select()
    .single();

  // Create test place
  // ...
});
```

### 2. Tests

Each test verifies a specific functionality:

```typescript
it('should create a new check-in', async () => {
  const checkInData = {
    user_id: testIds.userId,
    place_id: testIds.placeId,
    activity: 'Integration Testing',
    privacy_level: 'public'
  };

  const { data, error } = await createCheckIn(checkInData);

  expect(error).toBeNull();
  expect(data).not.toBeNull();
  // More assertions...
});
```

### 3. Cleanup

The `afterAll` hook cleans up test data:

```typescript
afterAll(async () => {
  // Delete test check-in
  await supabase
    .from('check_ins')
    .delete()
    .eq('id', testIds.checkInId);

  // Delete test place
  // ...

  // Delete test profile
  // ...
});
```

## Best Practices

1. **Use unique identifiers**: Add timestamps or UUIDs to test data to avoid conflicts.
2. **Clean up after tests**: Always delete test data after tests complete.
3. **Handle dependencies**: Create tests in the right order (e.g., create a profile before creating a check-in).
4. **Skip conditionally**: Skip tests if prerequisites aren't met (e.g., if a test check-in wasn't created).
5. **Test error cases**: Test both success and error scenarios.
6. **Isolate tests**: Don't rely on existing data in the database.

## Common Issues

### 1. Authentication

If your tests require authentication, you'll need to handle this in your tests:

```typescript
beforeAll(async () => {
  // Sign in with test credentials
  const { error } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'testpassword'
  });

  if (error) throw error;
});
```

### 2. RLS Policies

Row Level Security (RLS) policies might prevent test operations. Options:

- Use a service role key for tests (more permissive)
- Ensure test users have necessary permissions
- Temporarily disable RLS for tests (not recommended for production)

### 3. Foreign Key Constraints

When testing with tables that have foreign key constraints (like profiles referencing auth.users), you need to:

1. Create the referenced record first (e.g., create a user in auth.users before creating a profile)
2. Use the service role key to bypass RLS policies:

```typescript
// Create a test client with service role for admin operations
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = 'your-service-role-key';
const adminClient = createClient(supabaseUrl, supabaseServiceKey);

// Create a test user in auth.users
async function createTestAuthUser() {
  const { data, error } = await adminClient.auth.admin.createUser({
    email: `test-${Date.now()}@example.com`,
    password: 'password123',
    email_confirm: true
  });
  
  if (error) throw error;
  return data.user.id;
}
```

### 4. Consistent Data State

Ensure your tests create a consistent data state:

- For active check-ins, set `expires_at` to null
- For expired check-ins, set `expires_at` to a past date
- Make sure your queries match the data state you've created

### 5. Rate Limiting

If you run many tests, you might hit rate limits. Solutions:

- Add delays between tests
- Use a local Supabase instance for testing
- Increase rate limits on your test project

## When to Use Integration Tests

Integration tests are valuable for:

1. **Critical functionality**: Core features that must work correctly.
2. **Complex queries**: Queries with joins, filters, or complex logic.
3. **Database-specific features**: Features that rely on Supabase-specific functionality.
4. **Schema validation**: Ensuring your code works with the actual database schema.

However, they're slower than unit tests, so use them strategically alongside unit tests.

## Conclusion

Integration tests provide an additional layer of confidence that your Supabase integration works correctly. By testing against a real database, you can catch issues that unit tests might miss, such as incorrect query syntax or mismatched data structures. 
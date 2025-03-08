# Milestone 3: Home & Check-In

## Overview
This milestone focuses on implementing the Home page and Check-In functionality for the Bump application. The Home page displays active check-ins grouped by place, and the Check-In form allows users to check in at a place with an activity and privacy level.

## Related Resources

### Essential References
These resources are critical for implementing this milestone:

**Concepts:**
- [Realtime Patterns](../concepts/realtime-patterns.md) - Patterns for implementing realtime features
- [Styled Components Best Practices](../concepts/styled-components-best-practices.md) - Best practices for using styled-components

**Templates:**
- [Component Template](../templates/component-template.md) - Patterns for React components
- [Test Template](../templates/test-template.md) - Patterns for writing comprehensive tests
- [Utility Functions Template](../templates/utility-functions-template.md) - Patterns for creating utility functions

**Troubleshooting:**
- [Supabase Testing](../troubleshooting/supabase-testing.md) - Solutions for common Supabase testing challenges

### Tool-Specific Patterns
- **Status Service**: 
  - Use a service pattern for database operations
  - Implement strong TypeScript types for all operations
  - Handle errors consistently with the error handling utility
  - Return data in a format that's easy to use in components
  
- **CheckInForm**: 
  - Implement client-side validation
  - Use separate state variables for different types of errors
  - Provide immediate feedback to users
  - Handle loading states appropriately

- **Home Page**:
  - Use the data subscription hook for realtime updates
  - Group check-ins by place for better organization
  - Handle loading and error states
  - Implement a modal for the check-in form

## Test-First Approach

Before implementing each feature in this milestone, create tests that define the expected behavior:

1. **Define Test Cases**: Outline the test cases for each component and service
2. **Create Mock Implementations**: Set up mock services and data for testing
3. **Write Test Files**: Create test files with failing tests
4. **Implement Features**: Develop the features until tests pass
5. **Refactor**: Clean up the code while ensuring tests continue to pass

> 📌 **Critical Context:** Follow the [Test Template](../templates/test-template.md) guide for setting up proper test environments and mocks.

## Requirements

### 1. Status Service

> 📌 **Reference:** Review the [Utility Functions Template](../templates/utility-functions-template.md) for service patterns.

**Objective**: Create a service for managing check-ins in the database.

**Requirements**:
- Implement functions for fetching, creating, updating, and deleting check-ins
- Use TypeScript types for all operations
- Handle errors consistently with the error handling utility
- Return data in a format that's easy to use in components

**Service Functions**:
- `getActiveCheckIns`: Fetch active check-ins with place and user details
- `getCheckInsByPlace`: Fetch active check-ins grouped by place
- `createCheckIn`: Create a new check-in
- `updateCheckIn`: Update an existing check-in
- `deleteCheckIn`: Delete a check-in (or mark it as expired)

**Test Approach**:
- Create tests for each service function
- Test both success and error cases
- Mock the Supabase client to avoid making actual API calls

**Example Service Pattern**:
```typescript
export async function getActiveCheckIns() {
  return withErrorHandling(async () => {
    const { data, error } = await supabase
      .from('check_ins')
      .select(`
        *,
        place:place_id(id, name, address, lat, lng),
        profile:user_id(id, username, avatar_url)
      `)
      .is('expires_at', null)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data as CheckInWithDetails[];
  });
}
```

### 2. CheckInForm Component

> 📌 **Reference:** Follow the [Component Template](../templates/component-template.md) for component patterns.

**Objective**: Create a form component for users to check in at a place.

**Requirements**:
- Allow users to select a place from a dropdown
- Allow users to enter an activity (optional)
- Allow users to select a privacy level
- Implement client-side validation
- Handle loading and error states
- Provide feedback to users on success or failure

**Component Features**:
- Place selection dropdown
- Activity input field
- Privacy level selection
- Submit button with loading state
- Error and success messages

**Test Approach**:
- Test rendering of the form
- Test form submission with valid data
- Test validation errors
- Test loading and error states

**Example Component Pattern**:
```tsx
const CheckInForm: React.FC<CheckInFormProps> = ({ 
  onClose, 
  onSuccess,
  places = [] 
}) => {
  const { user } = useAuth();
  const [placeId, setPlaceId] = useState<string>('');
  const [activity, setActivity] = useState<string>('');
  const [privacyLevel, setPrivacyLevel] = useState<'public' | 'friends' | 'private'>('friends');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to check in');
      return;
    }
    
    if (!placeId) {
      setError('Please select a place');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await createCheckIn({
        user_id: user.id,
        place_id: placeId,
        activity: activity || null,
        privacy_level: privacyLevel,
      });
      
      if (error) {
        setError(error);
      } else {
        setSuccess(true);
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError('Failed to check in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <FormContainer>
      <FormTitle>Check In</FormTitle>
      
      {success ? (
        <SuccessMessage>Check-in successful!</SuccessMessage>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
        </form>
      )}
    </FormContainer>
  );
};
```

### 3. Home Page Update

> 📌 **Reference:** Consult the [Component Template](../templates/component-template.md) for page component patterns.

**Objective**: Update the Home page to display check-ins grouped by place.

**Requirements**:
- Fetch check-ins grouped by place
- Display check-ins in a list
- Group check-ins by place
- Handle loading and error states
- Implement a modal for the check-in form
- Use the data subscription hook for realtime updates

**Page Features**:
- Check-in list grouped by place
- Check-in button
- Modal for the check-in form
- Loading and error states

**Test Approach**:
- Test rendering of the page
- Test loading and error states
- Test opening the check-in modal
- Test realtime updates

**Example Page Pattern**:
```tsx
const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [checkInsData, setCheckInsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use the data subscription hook to get check-ins with polling
  const { data: checkInsSubscription } = useDataSubscription({
    table: 'check_ins',
    pollingInterval: 10000, // Poll every 10 seconds
  });

  // Fetch check-ins grouped by place
  const fetchCheckIns = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await getCheckInsByPlace();
      
      if (error) {
        setError(error);
      } else if (data) {
        setCheckInsData(data);
        
        // Extract unique places for the check-in form
        const uniquePlaces = data.map(item => item.place);
        setPlaces(uniquePlaces);
      }
    } catch (err) {
      setError('Failed to fetch check-ins. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCheckIns();
  }, []);

  // Refresh when subscription data changes
  useEffect(() => {
    if (checkInsSubscription) {
      fetchCheckIns();
    }
  }, [checkInsSubscription]);

  return (
    <PageContainer>
      <Title>Home</Title>
      
      {/* Render check-ins */}
      
      <CheckInButton onClick={handleOpenModal}>+</CheckInButton>
      
      {isModalOpen && (
        <Modal>
          <CheckInForm 
            onClose={handleCloseModal} 
            onSuccess={handleCheckInSuccess}
            places={places}
          />
        </Modal>
      )}
    </PageContainer>
  );
};
```

## Testing Strategy

### 1. Service Tests
- Test each service function in isolation
- Mock the Supabase client to avoid making actual API calls
- Test both success and error cases
- Verify that the data is transformed correctly

### 2. Component Tests
- Test rendering of the component
- Test user interactions (form submission, button clicks)
- Test validation errors
- Test loading and error states
- Mock dependencies (services, context)

### 3. Page Tests
- Test rendering of the page
- Test loading and error states
- Test user interactions (opening the modal)
- Test realtime updates
- Mock dependencies (services, hooks)

## Common Issues and Solutions

### 1. Testing Realtime Updates
- Use the `useDataSubscription` hook for polling in development
- Mock the subscription hook in tests
- Test that the page refreshes when the subscription data changes

### 2. Form Validation
- Implement client-side validation for immediate feedback
- Use separate state variables for different types of errors
- Provide clear error messages to users

### 3. Modal Management
- Use a consistent pattern for modals throughout the application
- Handle opening/closing, backdrop clicks, and ensuring proper accessibility
- Test modal interactions

## Verification Checklist

Before considering this milestone complete, verify the following:

- [x] Status service functions are implemented and tested
- [x] CheckInForm component is implemented and tested
- [x] Home page is updated to display check-ins grouped by place
- [x] Realtime updates are working (or polling fallback in development)
- [x] All tests are passing
- [x] The UI is responsive and follows the design guidelines
- [x] Error handling is implemented consistently
- [x] Form validation is working correctly
- [x] Modal interactions are working correctly

## Next Steps

After completing this milestone, the next steps are:

1. Implement the Places page with list/map toggle
2. Create the PlaceForm component with Google Maps integration
3. Implement the Friends page with friend list and intent toggles 
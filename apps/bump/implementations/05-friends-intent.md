# Milestone 5: Friends & Intent

## Overview
This milestone focuses on implementing the Friends page with friend list functionality and the "Hope to Bump" toggles. Users will be able to view their friends, add new friends, and indicate their intent to meet up with specific friends through the "Hope to Bump" feature.

## Related Resources

### Essential References
These resources are critical for implementing this milestone:

**Concepts:**
- [Styled Components Best Practices](../concepts/styled-components-best-practices.md) - For consistent styling of the Friends page and components
- [Testing Strategy](../concepts/testing-strategy.md) - For comprehensive test coverage of the new components
- [Realtime Patterns](../concepts/realtime-patterns.md) - For implementing real-time updates to friend statuses

**Templates:**
- [Component Template](../templates/component-template.md) - For structuring the Friends page and components
- [Test Template](../templates/test-template.md) - For writing tests for the new components
- [Supabase Integration Template](../templates/supabase-integration-template.md) - For implementing friend-related database operations

**Troubleshooting:**
- [Supabase Testing](../troubleshooting/supabase-testing.md) - For testing Supabase interactions
- [Supabase Integration Testing](../troubleshooting/supabase-integration-testing.md) - For integration testing with Supabase

### Tool-Specific Patterns
- **Supabase**: Patterns for fetching and storing friend data, implementing real-time subscriptions
- **Styled Components**: Patterns for creating interactive toggles and friend cards

## Prerequisites
- Milestone 1: Initialize Project - Completed
- Milestone 2: Supabase Integration - Completed
- Milestone 3: Home & Check-In - Completed
- Milestone 4: Gathering Places - Completed

## Test-First Approach

Before implementing each component or feature in this milestone, create tests that define the expected behavior:

1. **Define Test Cases**: Outline the test cases for the Friends page and components
2. **Write Test Files**: Create test files with failing tests
3. **Implement Features**: Develop the features until tests pass
4. **Refactor**: Clean up the code while ensuring tests continue to pass

> 📌 **Critical Context:** Follow the [Testing Strategy](../concepts/testing-strategy.md) and use the [Test Template](../templates/test-template.md) to ensure comprehensive test coverage.

## Implementation Steps

### 1. Create Friend Service

> 📌 **Reference:** Before implementing, review [Supabase Integration Template](../templates/supabase-integration-template.md) for structure.

**Objective**: Create a service for managing friends in the Supabase database.

**Requirements**:
- Create functions for fetching, adding, updating, and removing friends
- Implement proper error handling
- Ensure type safety with TypeScript interfaces
- Implement real-time subscriptions for friend status updates

**Implementation Details**:
1. Create a new file `src/utils/friendService.ts`
2. Define TypeScript interfaces for Friend data
3. Implement the following functions:
   - `getFriends`: Fetch all friends for the current user
   - `addFriend`: Send a friend request to another user
   - `acceptFriend`: Accept a friend request
   - `removeFriend`: Remove a friend or reject a friend request
   - `updateHopeToBump`: Update the "Hope to Bump" status for a friend
   - `subscribeFriends`: Subscribe to real-time updates for friends

**Test Approach**:
- Create unit tests for each function in `src/utils/__tests__/friendService.test.ts`
- Create integration tests in `src/utils/__tests__/friendService.integration.test.ts`
- Test both success and error cases
- Test real-time subscription functionality

### 2. Implement Friends Page with Friend List

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create the Friends page with a list of friends and their statuses.

**Requirements**:
- Display a list of friends with their profile information
- Show friend request status (pending, accepted)
- Implement "Hope to Bump" toggles for each friend
- Add a button to open the UserSelector for adding new friends
- Implement responsive design for mobile and desktop

**Implementation Details**:
1. Create a new file `src/pages/Friends.tsx`
2. Implement a friend list component that displays friends as cards
3. Add status indicators for pending and accepted friend requests
4. Implement "Hope to Bump" toggles for each friend
5. Add a floating action button to open the UserSelector
6. Style the components using styled-components

**Test Approach**:
- Create unit tests in `src/pages/__tests__/Friends.test.tsx`
- Test the rendering of friends in the list
- Test the "Hope to Bump" toggle functionality
- Test the button to open the UserSelector

### 3. Implement UserSelector Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a component for searching and selecting users to add as friends.

**Requirements**:
- Implement a search input for finding users by username or email
- Display search results as a list of user cards
- Allow selecting a user to send a friend request
- Show appropriate feedback when a friend request is sent
- Handle error cases (user not found, already friends, etc.)

**Implementation Details**:
1. Create a new file `src/components/UserSelector.tsx`
2. Implement a search input with debounced search functionality
3. Create a user list component that displays search results
4. Add a button to send a friend request to a selected user
5. Implement feedback messages for different states (success, error)
6. Style the component using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/UserSelector.test.tsx`
- Test the search functionality
- Test the user selection process
- Test the friend request sending process
- Test error handling

### 4. Implement Friend Profile View

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a component for viewing a friend's profile with their places and statuses.

**Requirements**:
- Display a friend's profile information
- Show the friend's places (if they are mutual friends)
- Show the friend's current status (if they are mutual friends)
- Allow updating the "Hope to Bump" status
- Implement responsive design for mobile and desktop

**Implementation Details**:
1. Create a new file `src/components/FriendProfile.tsx`
2. Implement a profile view component that displays a friend's information
3. Add sections for places and status (visible only for mutual friends)
4. Implement the "Hope to Bump" toggle with different visibility options
5. Style the component using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/FriendProfile.test.tsx`
- Test the rendering of profile information
- Test the visibility of places and status based on friendship status
- Test the "Hope to Bump" toggle functionality

## Cross-Cutting Concerns

These patterns should be applied consistently across all components and features in this milestone:

1. **Error Handling**: 
   - Implement consistent error handling using the `withErrorHandling` utility
   - Display appropriate error messages to the user
   - Handle network errors and Supabase errors gracefully

2. **Performance Optimization**:
   - Use memoization for expensive computations
   - Implement virtualization for long lists of friends
   - Optimize real-time subscriptions to minimize unnecessary updates

3. **Accessibility**:
   - Ensure all components are keyboard navigable
   - Add appropriate ARIA attributes
   - Test with screen readers
   - Ensure sufficient color contrast for toggles and status indicators

4. **Responsive Design**:
   - Follow mobile-first approach
   - Test on multiple device sizes
   - Ensure the friend list and profile view are usable on mobile devices

## Verification Checklist

Before considering this milestone complete, ensure:

- [ ] All tests are written and passing
- [ ] The Friends page displays friends with their statuses
- [ ] The "Hope to Bump" toggles work correctly
- [ ] The UserSelector allows adding new friends
- [ ] Friend requests can be sent, accepted, and rejected
- [ ] Real-time updates work for friend statuses
- [ ] The application builds without errors
- [ ] Manual testing confirms expected behavior
- [ ] Documentation is updated

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Friend requests not appearing in real-time | Ensure the real-time subscription is properly set up and the RLS policies allow the necessary operations. |
| "Hope to Bump" toggle not updating | Check that the update function is correctly calling the Supabase API and that the RLS policies allow updates. |
| User search not finding users | Verify that the search query is correctly formatted and that the RLS policies allow searching for users. |
| Friend profile not showing places or status | Ensure that the friendship status is correctly checked and that the RLS policies allow viewing this information for mutual friends. |
| Performance issues with large friend lists | Implement virtualization for the friend list and optimize the real-time subscription to minimize unnecessary updates. |

## Next Steps

After completing this milestone, proceed to [Meetups](./06-meetups.md) to implement the Meetups page with log form and history list. 
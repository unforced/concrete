# Milestone 6: Meetups

## Overview
This milestone focuses on implementing the Meetups page with a log form for recording meetups and a history list for viewing past meetups. Users will be able to log encounters with friends, specify whether the meetup was intentional, and view their meetup history.

## Related Resources

### Essential References
These resources are critical for implementing this milestone:

**Concepts:**
- [Styled Components Best Practices](../concepts/styled-components-best-practices.md) - For consistent styling of the Meetups page and components
- [Testing Strategy](../concepts/testing-strategy.md) - For comprehensive test coverage of the new components

**Templates:**
- [Component Template](../templates/component-template.md) - For structuring the Meetups page and components
- [Test Template](../templates/test-template.md) - For writing tests for the new components
- [Supabase Integration Template](../templates/supabase-integration-template.md) - For implementing meetup-related database operations

**Troubleshooting:**
- [Supabase Testing](../troubleshooting/supabase-testing.md) - For testing Supabase interactions
- [Supabase Integration Testing](../troubleshooting/supabase-integration-testing.md) - For integration testing with Supabase

### Tool-Specific Patterns
- **Supabase**: Patterns for fetching and storing meetup data
- **Styled Components**: Patterns for creating forms and history lists

## Prerequisites
- Milestone 1: Initialize Project - Completed
- Milestone 2: Supabase Integration - Completed
- Milestone 3: Home & Check-In - Completed
- Milestone 4: Gathering Places - Completed
- Milestone 5: Friends & Intent - Completed

## Test-First Approach

Before implementing each component or feature in this milestone, create tests that define the expected behavior:

1. **Define Test Cases**: Outline the test cases for the Meetups page and components
2. **Write Test Files**: Create test files with failing tests
3. **Implement Features**: Develop the features until tests pass
4. **Refactor**: Clean up the code while ensuring tests continue to pass

> 📌 **Critical Context:** Follow the [Testing Strategy](../concepts/testing-strategy.md) and use the [Test Template](../templates/test-template.md) to ensure comprehensive test coverage.

## Implementation Steps

### 1. Create Meetup Service

> 📌 **Reference:** Before implementing, review [Supabase Integration Template](../templates/supabase-integration-template.md) for structure.

**Objective**: Create a service for managing meetups in the Supabase database.

**Requirements**:
- Create functions for fetching, creating, updating, and deleting meetups
- Implement proper error handling
- Ensure type safety with TypeScript interfaces

**Implementation Details**:
1. Create a new file `src/utils/meetupService.ts`
2. Define TypeScript interfaces for Meetup data
3. Implement the following functions:
   - `getMeetups`: Fetch all meetups for the current user
   - `createMeetup`: Create a new meetup record
   - `updateMeetup`: Update an existing meetup
   - `deleteMeetup`: Delete a meetup record

**Test Approach**:
- Create unit tests for each function in `src/utils/__tests__/meetupService.test.ts`
- Create integration tests in `src/utils/__tests__/meetupService.integration.test.ts`
- Test both success and error cases

### 2. Implement Meetups Page with History List

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create the Meetups page with a history list of past meetups.

**Requirements**:
- Display a list of past meetups with relevant information
- Implement filtering and sorting options for the history list
- Add a button to open the MeetupForm for logging new meetups
- Implement responsive design for mobile and desktop

**Implementation Details**:
1. Create a new file `src/pages/Meetups.tsx`
2. Implement a history list component that displays past meetups
3. Add filtering options (by friend, place, date range)
4. Add sorting options (by date, friend, place)
5. Add a floating action button to open the MeetupForm
6. Style the components using styled-components

**Test Approach**:
- Create unit tests in `src/pages/__tests__/Meetups.test.tsx`
- Test the rendering of meetups in the history list
- Test the filtering and sorting functionality
- Test the button to open the MeetupForm

### 3. Implement MeetupForm Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a form for logging meetups with friends.

**Requirements**:
- Implement a form for logging meetups
- Allow selecting a friend from the user's friend list or entering a custom name
- Allow selecting a place from the user's places or entering a custom location
- Include a toggle for whether the meetup was intentional
- Add a notes field for additional information
- Validate form inputs
- Submit the form to create a new meetup record

**Implementation Details**:
1. Create a new file `src/components/MeetupForm.tsx`
2. Implement a form with the following fields:
   - Friend selector (autocomplete from friend list or custom input)
   - Place selector (autocomplete from places or custom input)
   - Date picker for the meetup date
   - Toggle for whether the meetup was intentional
   - Notes textarea
3. Implement form validation
4. Connect the form to the meetup service for creating meetups
5. Style the form using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/MeetupForm.test.tsx`
- Test form validation
- Test form submission
- Test the friend and place selection process

### 4. Implement MeetupDetail Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a component for viewing detailed information about a meetup.

**Requirements**:
- Display detailed information about a meetup
- Show the friend's name and profile information if available
- Show the place information if available
- Display the meetup date and whether it was intentional
- Show the notes for the meetup
- Allow editing or deleting the meetup
- Implement responsive design for mobile and desktop

**Implementation Details**:
1. Create a new file `src/components/MeetupDetail.tsx`
2. Implement a detail view component that displays meetup information
3. Add sections for friend, place, date, and notes
4. Add buttons for editing or deleting the meetup
5. Style the component using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/MeetupDetail.test.tsx`
- Test the rendering of meetup information
- Test the edit and delete functionality

## Cross-Cutting Concerns

These patterns should be applied consistently across all components and features in this milestone:

1. **Error Handling**: 
   - Implement consistent error handling using the `withErrorHandling` utility
   - Display appropriate error messages to the user
   - Handle network errors and Supabase errors gracefully

2. **Performance Optimization**:
   - Use memoization for expensive computations
   - Implement virtualization for long lists of meetups
   - Optimize data fetching to minimize unnecessary requests

3. **Accessibility**:
   - Ensure all components are keyboard navigable
   - Add appropriate ARIA attributes
   - Test with screen readers
   - Ensure sufficient color contrast for form elements and buttons

4. **Responsive Design**:
   - Follow mobile-first approach
   - Test on multiple device sizes
   - Ensure the meetup form and history list are usable on mobile devices

## Verification Checklist

Before considering this milestone complete, ensure:

- [ ] All tests are written and passing
- [ ] The Meetups page displays the history list of past meetups
- [ ] The MeetupForm allows logging new meetups
- [ ] The filtering and sorting options work correctly
- [ ] The MeetupDetail component displays detailed information about a meetup
- [ ] The application builds without errors
- [ ] Manual testing confirms expected behavior
- [ ] Documentation is updated

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Friend selector not showing friends | Ensure the friend service is correctly fetching friends and that the component is properly connected to the service. |
| Place selector not showing places | Verify that the place service is correctly fetching places and that the component is properly connected to the service. |
| Form validation errors | Implement proper validation for all form fields and display clear error messages to the user. |
| Date picker issues | Ensure the date picker is properly configured and that the selected date is correctly formatted for storage in the database. |
| History list not updating after adding a meetup | Verify that the meetup service is correctly fetching meetups and that the component is properly refreshing after a new meetup is added. |

## Next Steps

After completing this milestone, proceed to [Settings](./07-settings.md) to implement the Settings page with availability settings, notification preferences, and "Do Not Disturb" functionality. 
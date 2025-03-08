# Milestone 7: Settings

## Overview
This milestone focuses on implementing the Settings page with availability settings, notification preferences, and "Do Not Disturb" functionality. Users will be able to configure their availability times, set notification preferences, and enable a "Do Not Disturb" mode to temporarily pause notifications.

## Related Resources

### Essential References
These resources are critical for implementing this milestone:

**Concepts:**
- [Styled Components Best Practices](../concepts/styled-components-best-practices.md) - For consistent styling of the Settings page and components
- [Testing Strategy](../concepts/testing-strategy.md) - For comprehensive test coverage of the new components

**Templates:**
- [Component Template](../templates/component-template.md) - For structuring the Settings page and components
- [Test Template](../templates/test-template.md) - For writing tests for the new components
- [Supabase Integration Template](../templates/supabase-integration-template.md) - For implementing settings-related database operations

**Troubleshooting:**
- [Supabase Testing](../troubleshooting/supabase-testing.md) - For testing Supabase interactions
- [Supabase Integration Testing](../troubleshooting/supabase-integration-testing.md) - For integration testing with Supabase

### Tool-Specific Patterns
- **Supabase**: Patterns for fetching and storing user settings
- **Styled Components**: Patterns for creating form controls and toggles

## Prerequisites
- Milestone 1: Initialize Project - Completed
- Milestone 2: Supabase Integration - Completed
- Milestone 3: Home & Check-In - Completed
- Milestone 4: Gathering Places - Completed
- Milestone 5: Friends & Intent - Completed
- Milestone 6: Meetups - Completed

## Test-First Approach

Before implementing each component or feature in this milestone, create tests that define the expected behavior:

1. **Define Test Cases**: Outline the test cases for the Settings page and components
2. **Write Test Files**: Create test files with failing tests
3. **Implement Features**: Develop the features until tests pass
4. **Refactor**: Clean up the code while ensuring tests continue to pass

> 📌 **Critical Context:** Follow the [Testing Strategy](../concepts/testing-strategy.md) and use the [Test Template](../templates/test-template.md) to ensure comprehensive test coverage.

## Implementation Steps

### 1. Create Settings Service

> 📌 **Reference:** Before implementing, review [Supabase Integration Template](../templates/supabase-integration-template.md) for structure.

**Objective**: Create a service for managing user settings in the Supabase database.

**Requirements**:
- Create functions for fetching and updating user settings
- Implement proper error handling
- Ensure type safety with TypeScript interfaces

**Implementation Details**:
1. Create a new file `src/utils/settingsService.ts`
2. Define TypeScript interfaces for Settings data
3. Implement the following functions:
   - `getSettings`: Fetch settings for the current user
   - `updateSettings`: Update settings for the current user
   - `updateAvailability`: Update availability times
   - `updateNotificationPreferences`: Update notification preferences
   - `toggleDoNotDisturb`: Toggle the "Do Not Disturb" mode
   - `setDoNotDisturbUntil`: Set an expiration time for "Do Not Disturb" mode

**Test Approach**:
- Create unit tests for each function in `src/utils/__tests__/settingsService.test.ts`
- Create integration tests in `src/utils/__tests__/settingsService.integration.test.ts`
- Test both success and error cases

### 2. Implement Settings Page

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create the Settings page with sections for different settings categories.

**Requirements**:
- Implement a page with sections for different settings categories
- Include sections for profile settings, availability, notifications, and "Do Not Disturb"
- Implement responsive design for mobile and desktop
- Add a logout button

**Implementation Details**:
1. Create a new file `src/pages/Settings.tsx`
2. Implement a page with sections for different settings categories
3. Add a profile settings section (link to existing ProfileForm)
4. Add an availability settings section
5. Add a notification preferences section
6. Add a "Do Not Disturb" section
7. Add a logout button
8. Style the components using styled-components

**Test Approach**:
- Create unit tests in `src/pages/__tests__/Settings.test.tsx`
- Test the rendering of settings sections
- Test the logout functionality

### 3. Implement AvailabilitySettings Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a component for configuring availability times.

**Requirements**:
- Implement a form for setting availability times
- Allow selecting start and end times for availability
- Validate time inputs
- Save settings to the database
- Show appropriate feedback when settings are saved

**Implementation Details**:
1. Create a new file `src/components/AvailabilitySettings.tsx`
2. Implement a form with time pickers for start and end times
3. Add validation to ensure start time is before end time
4. Connect the form to the settings service for saving settings
5. Add feedback messages for different states (saving, success, error)
6. Style the component using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/AvailabilitySettings.test.tsx`
- Test form validation
- Test form submission
- Test error handling

### 4. Implement NotificationSettings Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a component for configuring notification preferences.

**Requirements**:
- Implement a form for setting notification preferences
- Include options for different notification types (all, hope to bump, none)
- Save settings to the database
- Show appropriate feedback when settings are saved

**Implementation Details**:
1. Create a new file `src/components/NotificationSettings.tsx`
2. Implement a form with radio buttons or a dropdown for notification preferences
3. Connect the form to the settings service for saving settings
4. Add feedback messages for different states (saving, success, error)
5. Style the component using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/NotificationSettings.test.tsx`
- Test form submission
- Test error handling

### 5. Implement DoNotDisturbSettings Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a component for configuring "Do Not Disturb" mode.

**Requirements**:
- Implement a toggle for enabling/disabling "Do Not Disturb" mode
- Allow setting an expiration time for "Do Not Disturb" mode
- Save settings to the database
- Show appropriate feedback when settings are saved

**Implementation Details**:
1. Create a new file `src/components/DoNotDisturbSettings.tsx`
2. Implement a toggle for enabling/disabling "Do Not Disturb" mode
3. Add a time picker for setting an expiration time (visible only when enabled)
4. Connect the component to the settings service for saving settings
5. Add feedback messages for different states (saving, success, error)
6. Style the component using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/DoNotDisturbSettings.test.tsx`
- Test the toggle functionality
- Test the expiration time picker
- Test form submission
- Test error handling

## Cross-Cutting Concerns

These patterns should be applied consistently across all components and features in this milestone:

1. **Error Handling**: 
   - Implement consistent error handling using the `withErrorHandling` utility
   - Display appropriate error messages to the user
   - Handle network errors and Supabase errors gracefully

2. **Performance Optimization**:
   - Use memoization for expensive computations
   - Optimize data fetching to minimize unnecessary requests
   - Implement debouncing for form inputs that trigger API calls

3. **Accessibility**:
   - Ensure all components are keyboard navigable
   - Add appropriate ARIA attributes
   - Test with screen readers
   - Ensure sufficient color contrast for form elements and toggles

4. **Responsive Design**:
   - Follow mobile-first approach
   - Test on multiple device sizes
   - Ensure the settings forms are usable on mobile devices

## Verification Checklist

Before considering this milestone complete, ensure:

- [ ] All tests are written and passing
- [ ] The Settings page displays all settings sections
- [ ] The AvailabilitySettings component allows setting availability times
- [ ] The NotificationSettings component allows setting notification preferences
- [ ] The DoNotDisturbSettings component allows enabling/disabling "Do Not Disturb" mode
- [ ] Settings are saved to the database and persisted between sessions
- [ ] The application builds without errors
- [ ] Manual testing confirms expected behavior
- [ ] Documentation is updated

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Settings not saving | Ensure the settings service is correctly calling the Supabase API and that the RLS policies allow updates. |
| Time picker issues | Verify that the time picker is properly configured and that the selected times are correctly formatted for storage in the database. |
| "Do Not Disturb" expiration not working | Check that the expiration time is correctly calculated and stored in the database, and that the application correctly checks for expired "Do Not Disturb" settings. |
| Form validation errors | Implement proper validation for all form fields and display clear error messages to the user. |
| Logout not working | Ensure the authentication service is correctly called and that the user is redirected to the login page after logout. |

## Next Steps

After completing this milestone, proceed to [Notifications](./08-notifications.md) to implement the notification bell with history functionality. 
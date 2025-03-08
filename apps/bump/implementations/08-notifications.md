# Milestone 8: Notifications

## Overview
This milestone focuses on implementing the notification system with a notification bell and history. Users will be able to view their notification history, mark notifications as read, and receive real-time notifications for relevant events in the application.

## Related Resources

### Essential References
These resources are critical for implementing this milestone:

**Concepts:**
- [Styled Components Best Practices](../concepts/styled-components-best-practices.md) - For consistent styling of the notification components
- [Testing Strategy](../concepts/testing-strategy.md) - For comprehensive test coverage of the new components
- [Realtime Patterns](../concepts/realtime-patterns.md) - For implementing real-time notifications

**Templates:**
- [Component Template](../templates/component-template.md) - For structuring the notification components
- [Test Template](../templates/test-template.md) - For writing tests for the new components
- [Supabase Integration Template](../templates/supabase-integration-template.md) - For implementing notification-related database operations

**Troubleshooting:**
- [Supabase Testing](../troubleshooting/supabase-testing.md) - For testing Supabase interactions
- [Supabase Integration Testing](../troubleshooting/supabase-integration-testing.md) - For integration testing with Supabase

### Tool-Specific Patterns
- **Supabase**: Patterns for fetching and storing notifications, implementing real-time subscriptions
- **Styled Components**: Patterns for creating notification components with animations

## Prerequisites
- Milestone 1: Initialize Project - Completed
- Milestone 2: Supabase Integration - Completed
- Milestone 3: Home & Check-In - Completed
- Milestone 4: Gathering Places - Completed
- Milestone 5: Friends & Intent - Completed
- Milestone 6: Meetups - Completed
- Milestone 7: Settings - Completed

## Test-First Approach

Before implementing each component or feature in this milestone, create tests that define the expected behavior:

1. **Define Test Cases**: Outline the test cases for the notification components
2. **Write Test Files**: Create test files with failing tests
3. **Implement Features**: Develop the features until tests pass
4. **Refactor**: Clean up the code while ensuring tests continue to pass

> 📌 **Critical Context:** Follow the [Testing Strategy](../concepts/testing-strategy.md) and use the [Test Template](../templates/test-template.md) to ensure comprehensive test coverage.

## Implementation Steps

### 1. Create Notification Service

> 📌 **Reference:** Before implementing, review [Supabase Integration Template](../templates/supabase-integration-template.md) for structure.

**Objective**: Create a service for managing notifications in the Supabase database.

**Requirements**:
- Create functions for fetching, creating, and updating notifications
- Implement proper error handling
- Ensure type safety with TypeScript interfaces
- Implement real-time subscriptions for notifications

**Implementation Details**:
1. Create a new file `src/utils/notificationService.ts`
2. Define TypeScript interfaces for Notification data
3. Implement the following functions:
   - `getNotifications`: Fetch notifications for the current user
   - `markAsRead`: Mark a notification as read
   - `markAllAsRead`: Mark all notifications as read
   - `createNotification`: Create a new notification (for testing)
   - `subscribeNotifications`: Subscribe to real-time updates for notifications

**Test Approach**:
- Create unit tests for each function in `src/utils/__tests__/notificationService.test.ts`
- Create integration tests in `src/utils/__tests__/notificationService.integration.test.ts`
- Test both success and error cases
- Test real-time subscription functionality

### 2. Implement NotificationBell Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a notification bell component that displays the number of unread notifications and opens the notification panel.

**Requirements**:
- Implement a bell icon with a badge showing the number of unread notifications
- Make the bell clickable to open the notification panel
- Update the badge count in real-time when new notifications arrive
- Respect the user's "Do Not Disturb" settings

**Implementation Details**:
1. Create a new file `src/components/NotificationBell.tsx`
2. Implement a bell icon with a badge
3. Add a click handler to open the notification panel
4. Connect the component to the notification service to get the unread count
5. Implement real-time updates for the badge count
6. Check the user's "Do Not Disturb" settings before showing new notifications
7. Style the component using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/NotificationBell.test.tsx`
- Test the rendering of the bell and badge
- Test the click handler
- Test the real-time updates

### 3. Implement NotificationPanel Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a panel for displaying notifications and their details.

**Requirements**:
- Implement a panel that displays a list of notifications
- Show notification content, timestamp, and read status
- Allow marking individual notifications as read
- Add a button to mark all notifications as read
- Update the panel in real-time when new notifications arrive
- Implement responsive design for mobile and desktop

**Implementation Details**:
1. Create a new file `src/components/NotificationPanel.tsx`
2. Implement a panel with a list of notifications
3. Add a header with a "Mark All as Read" button
4. Create a notification item component for each notification
5. Add click handlers for marking notifications as read
6. Connect the component to the notification service
7. Implement real-time updates for the notification list
8. Style the component using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/NotificationPanel.test.tsx`
- Test the rendering of the panel and notification items
- Test the "Mark as Read" functionality
- Test the "Mark All as Read" functionality
- Test the real-time updates

### 4. Implement NotificationItem Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a component for displaying individual notification items.

**Requirements**:
- Implement a component that displays a notification's content and metadata
- Show the notification timestamp in a user-friendly format
- Indicate whether the notification has been read
- Allow marking the notification as read
- Handle different types of notifications with appropriate styling

**Implementation Details**:
1. Create a new file `src/components/NotificationItem.tsx`
2. Implement a component that displays notification content
3. Add a timestamp with a user-friendly format
4. Add a visual indicator for unread notifications
5. Add a click handler for marking the notification as read
6. Implement different styles for different notification types
7. Style the component using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/NotificationItem.test.tsx`
- Test the rendering of notification content and metadata
- Test the "Mark as Read" functionality
- Test the different notification types

### 5. Integrate Notifications with Application Events

> 📌 **Reference:** Review the application's event-generating components.

**Objective**: Create notifications for relevant events in the application.

**Requirements**:
- Identify events that should generate notifications
- Implement notification creation for these events
- Ensure notifications respect user preferences
- Test notification generation for each event type

**Implementation Details**:
1. Identify events that should generate notifications:
   - Friend requests (received, accepted)
   - Check-ins by friends (based on privacy settings)
   - "Hope to Bump" status changes
   - Meetup logs that include the user
2. Modify the relevant services to create notifications for these events
3. Ensure notifications respect the user's notification preferences
4. Implement notification content generation for each event type

**Test Approach**:
- Create unit tests for each notification-generating event
- Test that notifications are created with the correct content
- Test that notifications respect user preferences
- Test real-time delivery of notifications

## Cross-Cutting Concerns

These patterns should be applied consistently across all components and features in this milestone:

1. **Error Handling**: 
   - Implement consistent error handling using the `withErrorHandling` utility
   - Display appropriate error messages to the user
   - Handle network errors and Supabase errors gracefully

2. **Performance Optimization**:
   - Use memoization for expensive computations
   - Optimize real-time subscriptions to minimize unnecessary updates
   - Implement virtualization for long lists of notifications

3. **Accessibility**:
   - Ensure all components are keyboard navigable
   - Add appropriate ARIA attributes
   - Test with screen readers
   - Ensure sufficient color contrast for notification elements

4. **Responsive Design**:
   - Follow mobile-first approach
   - Test on multiple device sizes
   - Ensure the notification panel is usable on mobile devices

## Verification Checklist

Before considering this milestone complete, ensure:

- [ ] All tests are written and passing
- [ ] The NotificationBell component displays the number of unread notifications
- [ ] The NotificationPanel displays notifications with their content and metadata
- [ ] Notifications can be marked as read individually and all at once
- [ ] Real-time updates work for new notifications
- [ ] Notifications are generated for relevant application events
- [ ] Notifications respect user preferences and "Do Not Disturb" settings
- [ ] The application builds without errors
- [ ] Manual testing confirms expected behavior
- [ ] Documentation is updated

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Notifications not appearing in real-time | Ensure the real-time subscription is properly set up and the RLS policies allow the necessary operations. |
| Badge count not updating | Verify that the unread count is correctly calculated and that the component is properly refreshing when notifications change. |
| "Mark as Read" not working | Check that the update function is correctly calling the Supabase API and that the RLS policies allow updates. |
| Notification content not displaying correctly | Ensure that the notification content is properly formatted and that the component handles different content types correctly. |
| "Do Not Disturb" settings not being respected | Verify that the notification service checks the user's "Do Not Disturb" settings before showing notifications. |

## Next Steps

After completing this milestone, proceed to [Polish & Deploy](./09-polish-and-deploy.md) to add animations, ensure responsive UI, set up PWA, and deploy the application to Vercel. 
# Realtime Patterns

**Last Updated**: March 4, 2025  
**Related Guides**: [Supabase Integration](../implementations/02-supabase-integration.md)  
**Prerequisite Knowledge**: Supabase Realtime, React Hooks, TypeScript

## Overview

This guide explains the realtime data patterns used in the Bump application. It covers the conceptual model, implementation approaches, and best practices for working with realtime data using Supabase.

## Realtime Data Approach

Bump uses Supabase's realtime features to provide users with up-to-date information about friend statuses, check-ins, and other time-sensitive data. The application implements several patterns to ensure efficient and reliable realtime updates.

## Key Realtime Patterns

### 1. Subscription with Polling Fallback

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Initialize │────▶│  Attempt    │────▶│  Success?   │
│  Component  │     │  Subscription│     │             │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                          ┌──────────────────┬┴──────────────────┐
                          │                  │                   │
                          ▼                  │                   ▼
                    ┌─────────────┐          │             ┌─────────────┐
                    │             │          │             │             │
                    │  Setup      │          │             │  Setup      │
                    │  Polling    │          │             │  Realtime   │
                    │             │          │             │             │
                    └─────────────┘          │             └─────────────┘
                          │                  │                   │
                          ▼                  ▼                   ▼
                    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
                    │             │     │             │     │             │
                    │  Poll at    │     │  Update UI  │     │  Process    │
                    │  Interval   │     │  with Data  │     │  Events     │
                    │             │     │             │     │             │
                    └─────────────┘     └─────────────┘     └─────────────┘
```

This pattern ensures data updates even in environments where WebSocket connections are not supported or are blocked.

### 2. Optimistic UI Updates

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │     │             │
│  User       │────▶│  Update UI  │────▶│  Send       │────▶│  Success?   │
│  Action     │     │  Immediately│     │  to Server  │     │             │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                  │
                                      ┌──────────────────────────┬┴──────────┐
                                      │                          │           │
                                      ▼                          │           ▼
                                ┌─────────────┐                  │     ┌─────────────┐
                                │             │                  │     │             │
                                │  Revert UI  │                  │     │  Confirm    │
                                │  Change     │                  │     │  UI Change  │
                                │             │                  │     │             │
                                └─────────────┘                  │     └─────────────┘
                                      │                          │           │
                                      ▼                          ▼           ▼
                                ┌─────────────┐             ┌─────────────┐
                                │             │             │             │
                                │  Show       │             │  Process    │
                                │  Error      │             │  Success    │
                                │             │             │             │
                                └─────────────┘             └─────────────┘
```

This pattern provides immediate feedback to users while the actual data operation completes in the background.

### 3. Grouped Realtime Updates

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Receive    │────▶│  Buffer     │────▶│  Process    │
│  Events     │     │  Updates    │     │  in Batch   │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                          │                    │
                          │                    ▼
                          │              ┌─────────────┐
                          │              │             │
                          └─────────────▶│  Update UI  │
                                         │  Once       │
                                         │             │
                                         └─────────────┘
```

This pattern reduces UI thrashing when multiple updates arrive in quick succession.

## Implementation Components

1. **Realtime Subscription Hook**: Custom hook for managing subscriptions
2. **Polling Fallback**: Mechanism for environments without WebSocket support
3. **Optimistic UI Manager**: Handles immediate UI updates with rollback capability
4. **Event Batching**: Groups multiple events for efficient UI updates

## Performance Considerations

1. **Subscription Scope**: Limit subscriptions to necessary tables and operations
2. **Cleanup**: Properly unsubscribe when components unmount
3. **Debouncing**: Implement debouncing for frequent updates
4. **Selective Updates**: Only update affected UI components

## Error Handling

1. **Connection Loss**: Detect and handle WebSocket disconnections
2. **Retry Strategy**: Implement exponential backoff for reconnection attempts
3. **Fallback Mechanism**: Switch to polling when realtime is unavailable
4. **Data Reconciliation**: Handle conflicts between optimistic updates and server state

## Best Practices

1. **Targeted Subscriptions**: Subscribe only to relevant tables and columns
2. **Lifecycle Management**: Properly handle component mounting/unmounting
3. **State Synchronization**: Keep local state in sync with server state
4. **Error Boundaries**: Implement React error boundaries for realtime components
5. **Testing**: Test both realtime and polling scenarios

## Implementation Notes

This is a conceptual guide. For implementation details, refer to the [Supabase Integration](../implementations/02-supabase-integration.md) guide, which includes code examples and specific implementation steps.

---

*Note: This is a placeholder file. Expand with actual implementation details as the project progresses.* 
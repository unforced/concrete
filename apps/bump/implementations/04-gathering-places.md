# Milestone 4: Gathering Places

## Overview
This milestone focuses on implementing the Places page with list/map toggle functionality and the PlaceForm component with Google Maps integration. Users will be able to view their gathering places in both list and map views, and add or edit places using Google Maps autocomplete or by dropping a pin on the map.

## Related Resources

### Essential References
These resources are critical for implementing this milestone:

**Concepts:**
- [Styled Components Best Practices](../concepts/styled-components-best-practices.md) - For consistent styling of the Places page and PlaceForm
- [Testing Strategy](../concepts/testing-strategy.md) - For comprehensive test coverage of the new components

**Templates:**
- [Component Template](../templates/component-template.md) - For structuring the Places page and PlaceForm components
- [Test Template](../templates/test-template.md) - For writing tests for the new components

**Troubleshooting:**
- [Supabase Testing](../troubleshooting/supabase-testing.md) - For testing Supabase interactions
- [Supabase Integration Testing](../troubleshooting/supabase-integration-testing.md) - For integration testing with Supabase

### Tool-Specific Patterns
- **@react-google-maps/api**: Key patterns for integrating Google Maps, including autocomplete and map markers
- **Supabase**: Patterns for fetching and storing place data

## Prerequisites
- Milestone 1: Initialize Project - Completed
- Milestone 2: Supabase Integration - Completed
- Milestone 3: Home & Check-In - Completed
- Google Maps API key configured in environment variables

## Test-First Approach

Before implementing each component or feature in this milestone, create tests that define the expected behavior:

1. **Define Test Cases**: Outline the test cases for the Places page and PlaceForm components
2. **Write Test Files**: Create test files with failing tests
3. **Implement Features**: Develop the features until tests pass
4. **Refactor**: Clean up the code while ensuring tests continue to pass

> 📌 **Critical Context:** Follow the [Testing Strategy](../concepts/testing-strategy.md) and use the [Test Template](../templates/test-template.md) to ensure comprehensive test coverage.

## Implementation Steps

### 1. Create Place Service

> 📌 **Reference:** Before implementing, review [Supabase Integration Template](../templates/supabase-integration-template.md) for structure.

**Objective**: Create a service for managing places in the Supabase database.

**Requirements**:
- Create functions for fetching, creating, updating, and deleting places
- Implement proper error handling
- Ensure type safety with TypeScript interfaces

**Implementation Details**:
1. Create a new file `src/utils/placeService.ts`
2. Define TypeScript interfaces for Place data
3. Implement the following functions:
   - `getPlaces`: Fetch all places for the current user
   - `createPlace`: Create a new place
   - `updatePlace`: Update an existing place
   - `deletePlace`: Delete a place

**Test Approach**:
- Create unit tests for each function in `src/utils/__tests__/placeService.test.ts`
- Create integration tests in `src/utils/__tests__/placeService.integration.test.ts`
- Test both success and error cases

### 2. Implement Places Page with List/Map Toggle

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create the Places page with a toggle between list and map views.

**Requirements**:
- Implement a toggle between list and map views
- Display places in a card list view
- Display places on a Google Map
- Add a button to open the PlaceForm
- Implement responsive design for mobile and desktop

**Implementation Details**:
1. Create a new file `src/pages/Places.tsx`
2. Implement a toggle component for switching between list and map views
3. Create a list view component that displays places as cards
4. Create a map view component using `@react-google-maps/api`
5. Add a floating action button to open the PlaceForm
6. Style the components using styled-components

**Test Approach**:
- Create unit tests in `src/pages/__tests__/Places.test.tsx`
- Test the toggle functionality
- Test the rendering of places in both list and map views
- Test the button to open the PlaceForm

### 3. Implement PlaceForm Component

> 📌 **Reference:** Review [Component Template](../templates/component-template.md) for structure.

**Objective**: Create a form for adding and editing places with Google Maps integration.

**Requirements**:
- Implement a form for adding and editing places
- Integrate Google Maps autocomplete for searching places
- Allow users to drop a pin on the map to select a location
- Validate form inputs
- Submit the form to create or update a place

**Implementation Details**:
1. Create a new file `src/components/PlaceForm.tsx`
2. Implement a form with the following fields:
   - Place name
   - Address (with Google Maps autocomplete)
   - Map for selecting a location
   - Visibility (public, friends, private)
3. Implement form validation
4. Connect the form to the place service for creating and updating places
5. Style the form using styled-components

**Test Approach**:
- Create unit tests in `src/components/__tests__/PlaceForm.test.tsx`
- Test form validation
- Test form submission
- Mock Google Maps API for testing

### 4. Integrate Google Maps

> 📌 **Reference:** Review the documentation for `@react-google-maps/api`.

**Objective**: Integrate Google Maps for displaying places and selecting locations.

**Requirements**:
- Set up Google Maps API key in environment variables
- Implement a map component for displaying places
- Implement autocomplete for searching places
- Allow users to drop a pin on the map to select a location

**Implementation Details**:
1. Add Google Maps API key to `.env.development` and `.env.test`
2. Create a new file `src/components/Map.tsx` for the map component
3. Implement the map component using `@react-google-maps/api`
4. Add markers for places on the map
5. Implement autocomplete for searching places
6. Allow users to drop a pin on the map to select a location

**Test Approach**:
- Create unit tests in `src/components/__tests__/Map.test.tsx`
- Mock Google Maps API for testing
- Test the rendering of markers
- Test the autocomplete functionality
- Test the pin dropping functionality

## Cross-Cutting Concerns

These patterns should be applied consistently across all components and features in this milestone:

1. **Error Handling**: 
   - Implement consistent error handling using the `withErrorHandling` utility
   - Display appropriate error messages to the user

2. **Performance Optimization**:
   - Lazy load the Google Maps API to improve initial page load time
   - Use memoization for expensive computations
   - Implement virtualization for long lists of places

3. **Accessibility**:
   - Ensure all components are keyboard navigable
   - Add appropriate ARIA attributes
   - Test with screen readers

4. **Responsive Design**:
   - Follow mobile-first approach
   - Test on multiple device sizes
   - Ensure the map is usable on mobile devices

## Verification Checklist

Before considering this milestone complete, ensure:

- [ ] All tests are written and passing
- [ ] The Places page displays places in both list and map views
- [ ] The toggle between list and map views works correctly
- [ ] The PlaceForm allows adding and editing places
- [ ] Google Maps integration works correctly
- [ ] The application builds without errors
- [ ] Manual testing confirms expected behavior
- [ ] Documentation is updated

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Google Maps API key not working | Ensure the API key is correctly set in the environment variables and has the necessary permissions enabled in the Google Cloud Console. |
| Map not displaying | Check that the container element has a defined height and width. The map will not display if its container has no dimensions. |
| Autocomplete not working | Ensure the Google Maps Places API is enabled in the Google Cloud Console. |
| Form validation errors | Implement proper validation for all form fields and display clear error messages to the user. |
| Supabase errors | Check the Supabase console for any errors and ensure the database schema is correctly set up. |

## Next Steps

After completing this milestone, proceed to [Friends & Intent](./05-friends-intent.md) to implement the Friends page with friend list and "Hope to Bump" toggles. 
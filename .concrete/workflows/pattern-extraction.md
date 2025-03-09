# Workflow: Pattern Extraction

This guide walks through the conversational process of extracting patterns from existing applications to create or improve templates.

## Overview

Pattern extraction is the process of analyzing existing applications to identify common patterns, best practices, and reusable components that can be incorporated into templates. This process helps create more robust templates based on real-world implementations. The process involves:

1. Discussing the existing application and extraction goals
2. Collaboratively analyzing the application structure
3. Identifying patterns and reusable components
4. Abstracting patterns into template elements
5. Defining customization points
6. Testing the extracted patterns

## Prerequisites

- An existing application to analyze
- Understanding of the [Template Format](../concepts/template-format.md)
- Familiarity with [Customization Points](../concepts/customization-points.md)

## The Conversational Approach

As with all Concrete workflows, pattern extraction is a conversational process where you and the AI assistant collaborate through dialogue. Throughout this workflow:

- **Share insights** about the existing application
- **Explain the context** behind implementation decisions
- **Identify what's unique** vs. what's generalizable
- **Provide domain expertise** to guide abstraction

The AI assistant will:
- **Ask targeted questions** about the application
- **Identify potential patterns** from the codebase
- **Suggest abstractions** for reusable components
- **Propose customization points** for variability

## Step 1: Discuss the Existing Application and Extraction Goals

Begin with a conversation about the existing application and your goals for pattern extraction:

### Example Conversation:

**User**: "I have a React dashboard application that I've built, and I'd like to extract patterns from it to create a reusable template for future dashboard projects."

**AI**: "That's a great idea! To help extract patterns from your React dashboard, I'd like to understand more about it:
1. What are the main features of your dashboard?
2. What data visualization components does it use?
3. How is authentication handled?
4. What backend or API integration does it have?
5. Are there any specific patterns you already recognize as reusable?"

**User**: "It's an analytics dashboard with user authentication via JWT, role-based access control, and various charts using Chart.js. It connects to a REST API, has a sidebar navigation, theme switching, and responsive layouts. I think the layout system and the chart wrapper components could be particularly reusable."

**AI**: "Thanks for sharing those details. Based on what you've described, here are some potential patterns we could extract:

1. **Dashboard Layout System**:
   - Sidebar navigation
   - Responsive grid layout
   - Header with user info and actions

2. **Authentication & Authorization**:
   - JWT authentication flow
   - Role-based access control
   - Protected routes

3. **Data Visualization**:
   - Chart.js wrapper components
   - Data fetching and transformation patterns
   - Dashboard widget system

4. **Theme System**:
   - Theme switching mechanism
   - Consistent styling patterns
   - Design tokens

Does this align with your thinking? Are there other patterns you'd like to focus on?"

### Key Actions in This Step:

1. **Understand the application** through targeted questions
2. **Identify potential pattern categories** based on the conversation
3. **Prioritize patterns** based on reusability and value
4. **Align on extraction goals** with the user
5. **Set expectations** for the pattern extraction process

## Step 2: Collaboratively Analyze the Application Structure

Work together to analyze the structure of the existing application:

### Example Conversation:

**AI**: "Let's analyze the structure of your dashboard application to better understand the patterns. Could you share the high-level directory structure and key files?"

**User**: "Here's the structure:
```
/src
  /components
    /layout
      Sidebar.jsx
      Header.jsx
      Dashboard.jsx
    /charts
      BarChart.jsx
      LineChart.jsx
      ChartWrapper.jsx
    /auth
      Login.jsx
      ProtectedRoute.jsx
  /hooks
    useAuth.js
    useApi.js
    useTheme.js
  /context
    AuthContext.js
    ThemeContext.js
  /utils
    api.js
    formatting.js
  /pages
    Dashboard.jsx
    Analytics.jsx
    Settings.jsx
```"

**AI**: "Thank you for sharing the structure. I can see several well-organized patterns already. Let's analyze each area:

**Layout System**:
The `/components/layout` directory shows a clear separation of layout concerns with Sidebar, Header, and Dashboard components. This could form the basis of a reusable dashboard layout pattern.

**Chart Components**:
The `/charts` directory with a ChartWrapper suggests you've already abstracted some chart functionality. This is excellent for creating reusable data visualization patterns.

**Authentication**:
The combination of auth components, useAuth hook, and AuthContext shows a comprehensive authentication pattern.

**Theme System**:
The useTheme hook and ThemeContext indicate a theme switching mechanism that could be extracted.

**API Integration**:
The useApi hook and api.js utility suggest a pattern for API communication.

Would you like to dive deeper into any specific area first? Or should we start by examining the relationships between these components?"

**User**: "Let's start with the layout system since that's the foundation of the dashboard."

**AI**: "Great choice! To understand the layout system better, I'd like to know:

1. How does the Dashboard.jsx component compose the Sidebar and Header?
2. How is the responsive behavior implemented?
3. Is there a grid system or specific CSS framework being used?
4. How does the layout handle different screen sizes?
5. Are there any special layout modes (e.g., collapsed sidebar, fullscreen mode)?"

### Key Actions in This Step:

1. **Analyze the application structure** systematically
2. **Identify component relationships** and dependencies
3. **Focus on areas of interest** based on user priorities
4. **Ask targeted questions** about implementation details
5. **Begin mapping components** to potential template patterns

## Step 3: Identify Patterns and Reusable Components

Work together to identify specific patterns and reusable components:

### Example Conversation:

**User**: "The Dashboard.jsx component uses a CSS Grid layout with the Sidebar fixed on the left and a main content area. The Header is inside the main content area at the top. The sidebar can collapse on mobile or via a toggle button. We use CSS variables for spacing and custom media queries for responsiveness."

**AI**: "Thank you for explaining. Based on your description, I can identify these specific patterns in the layout system:

1. **Two-Panel Layout Pattern**:
   - Fixed sidebar + scrollable main content
   - CSS Grid for the overall layout
   - Collapsible sidebar with toggle functionality
   - Responsive breakpoints for different devices

2. **Header Pattern**:
   - Positioned at the top of the main content
   - Likely contains user info, notifications, and actions
   - Possibly sticky on scroll

3. **Content Organization Pattern**:
   - How dashboard widgets/cards are arranged
   - Spacing and alignment system
   - Possibly a grid or flex-based card layout

Let's look at the actual implementation. Could you share some key code snippets from Dashboard.jsx, Sidebar.jsx, and Header.jsx to confirm these patterns?"

**User**: *Shares code snippets*

**AI**: "Thanks for sharing those snippets. Now I have a clearer picture of the layout system. Here are the specific patterns I've identified:

1. **CSS Grid Dashboard Layout**:
   ```css
   .dashboard-container {
     display: grid;
     grid-template-columns: auto 1fr;
     grid-template-rows: auto 1fr;
     grid-template-areas: 
       "sidebar header"
       "sidebar content";
     height: 100vh;
   }
   ```

2. **Collapsible Sidebar with Media Queries**:
   ```css
   @media (max-width: 768px) {
     .dashboard-container {
       grid-template-columns: 0 1fr;
     }
     .sidebar {
       transform: translateX(-100%);
     }
     .sidebar.open {
       transform: translateX(0);
     }
   }
   ```

3. **Theme-Aware Component System**:
   ```jsx
   const Sidebar = () => {
     const { theme } = useTheme();
     return (
       <aside className={`sidebar ${theme}`}>
         {/* Sidebar content */}
       </aside>
     );
   };
   ```

These patterns can be abstracted into reusable components for our template. Would you like to focus on any specific aspect of these patterns?"

### Key Actions in This Step:

1. **Identify specific code patterns** from the application
2. **Extract reusable snippets** that demonstrate the patterns
3. **Categorize patterns** by functionality and purpose
4. **Discuss the context** behind implementation choices
5. **Prioritize patterns** for abstraction into the template

## Step 4: Abstract Patterns into Template Elements

Work together to abstract the identified patterns into template elements:

### Example Conversation:

**AI**: "Now that we've identified the key patterns, let's abstract them into template elements. For the dashboard layout system, I suggest creating:

1. **A Layout Component Template**:
   ```jsx
   // DashboardLayout.jsx
   import React, { useState } from 'react';
   import Sidebar from './Sidebar';
   import Header from './Header';
   import './DashboardLayout.css';

   const DashboardLayout = ({ children }) => {
     const [sidebarOpen, setSidebarOpen] = useState(true);
     
     const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
     
     return (
       <div className="dashboard-container">
         <Sidebar isOpen={sidebarOpen} />
         <Header onMenuClick={toggleSidebar} />
         <main className="dashboard-content">
           {children}
         </main>
       </div>
     );
   };

   export default DashboardLayout;
   ```

2. **Accompanying CSS Template**:
   ```css
   /* DashboardLayout.css */
   .dashboard-container {
     display: grid;
     grid-template-columns: {{sidebarWidth}} 1fr;
     grid-template-rows: {{headerHeight}} 1fr;
     grid-template-areas: 
       "sidebar header"
       "sidebar content";
     height: 100vh;
   }
   
   /* Additional responsive styles */
   ```

Notice I've added `{{sidebarWidth}}` and `{{headerHeight}}` as customization points. What do you think of this abstraction? Would you like to adjust anything?"

**User**: "That looks good, but I think we should also add a customization point for the breakpoint at which the sidebar collapses."

**AI**: "Excellent suggestion! Adding a customization point for the breakpoint makes the template more flexible. Here's the updated CSS template:

```css
/* DashboardLayout.css */
.dashboard-container {
  display: grid;
  grid-template-columns: {{sidebarWidth}} 1fr;
  grid-template-rows: {{headerHeight}} 1fr;
  grid-template-areas: 
    "sidebar header"
    "sidebar content";
  height: 100vh;
}

/* Responsive behavior */
@media (max-width: {{sidebarBreakpoint}}) {
  .dashboard-container {
    grid-template-columns: 0 1fr;
  }
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
```

This gives template users control over:
- The width of the sidebar
- The height of the header
- The breakpoint at which the sidebar collapses

Would you like to abstract any other aspects of the layout system, or shall we move on to another pattern?"

### Key Actions in This Step:

1. **Create abstracted versions** of the identified patterns
2. **Identify potential customization points** in the abstractions
3. **Maintain the essence** of the original implementation
4. **Ensure the abstractions are reusable** across different contexts
5. **Refine the abstractions** based on user feedback

## Step 5: Define Customization Points

Work together to define customization points for the abstracted patterns:

### Example Conversation:

**AI**: "Let's define the customization points for our dashboard template. Based on our discussion, I suggest these customization points for the layout system:

1. **sidebarWidth**: 
   - Type: String (CSS value)
   - Default: '250px'
   - Description: Width of the sidebar in desktop view

2. **headerHeight**:
   - Type: String (CSS value)
   - Default: '60px'
   - Description: Height of the header bar

3. **sidebarBreakpoint**:
   - Type: String (CSS value)
   - Default: '768px'
   - Description: Screen width at which the sidebar collapses

For the chart components, we might add:

4. **defaultChartColors**:
   - Type: Array of strings
   - Default: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f']
   - Description: Default color palette for charts

5. **chartAnimationDuration**:
   - Type: Number
   - Default: 500
   - Description: Duration of chart animations in milliseconds

Do these customization points cover the key aspects that should be configurable? Would you like to add or modify any?"

**User**: "Those look good. For the chart colors, we should also add a customization point for the theme-specific colors, since we have light and dark mode."

**AI**: "Great point! Let's add theme-specific chart colors:

6. **lightModeChartColors**:
   - Type: Array of strings
   - Default: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f']
   - Description: Chart color palette for light mode

7. **darkModeChartColors**:
   - Type: Array of strings
   - Default: ['#6b9ac4', '#f4a261', '#e76f51', '#8ecae6', '#7cb518']
   - Description: Chart color palette for dark mode

And we should also add a customization point for the theme switching mechanism:

8. **defaultTheme**:
   - Type: String
   - Default: 'light'
   - Options: ['light', 'dark', 'system']
   - Description: Default theme to use when the application loads

Does this cover all the necessary customization points for the patterns we've identified?"

### Key Actions in This Step:

1. **Identify all aspects** that should be customizable
2. **Define clear types and defaults** for each customization point
3. **Provide descriptive names** that indicate purpose
4. **Group related customization points** logically
5. **Ensure customization points** cover all necessary variations

## Step 6: Test the Extracted Patterns

Discuss how to test the extracted patterns to ensure they work as expected:

### Example Conversation:

**AI**: "To ensure our extracted patterns work correctly, we should test them in a new project. Here's a testing approach:

1. **Create a minimal test project** using the extracted template
2. **Configure the customization points** with different values
3. **Implement basic functionality** using the template components
4. **Test across different screen sizes** to verify responsive behavior
5. **Test with different themes** to verify theme switching

Would you like me to outline a specific testing plan for the dashboard layout pattern?"

**User**: "Yes, please focus on testing the responsive behavior since that's critical for dashboards."

**AI**: "Here's a testing plan focused on the responsive behavior of the dashboard layout:

**Test Case 1: Desktop Layout**
- Set viewport to 1920x1080
- Verify sidebar is visible at full width ({{sidebarWidth}})
- Verify content area fills remaining space
- Verify header spans the content area
- Test sidebar toggle button to ensure it works

**Test Case 2: Tablet Layout**
- Set viewport to 768px width (or {{sidebarBreakpoint}})
- Verify sidebar collapses/hides appropriately
- Verify toggle button shows/hides sidebar
- Verify content area expands to fill space
- Test interactions with sidebar open and closed

**Test Case 3: Mobile Layout**
- Set viewport to 375px width
- Verify sidebar is hidden by default
- Verify content is properly formatted for narrow screens
- Test opening sidebar and ensure it doesn't break layout
- Verify touch interactions work properly

**Test Case 4: Dynamic Resizing**
- Start at desktop size and gradually resize to mobile
- Verify layout transitions smoothly at breakpoints
- Resize from mobile to desktop
- Verify layout restores properly

Would you like me to add any other specific test cases or focus on testing other aspects of the extracted patterns?"

### Key Actions in This Step:

1. **Create a comprehensive testing plan** for the extracted patterns
2. **Focus on critical functionality** based on user priorities
3. **Test edge cases** and potential failure points
4. **Verify customization points** work as expected
5. **Ensure patterns work together** cohesively

## Example: Full Conversational Flow

Here's an example of a complete conversational flow for extracting patterns from an e-commerce application:

**User**: "I've built an e-commerce site with React and I'd like to extract patterns from it to create a template for future e-commerce projects."

**AI**: "That's a great idea! To help extract patterns from your e-commerce site, could you tell me more about:
1. What are the key features of your e-commerce site?
2. What's the tech stack you're using?
3. Are there any particularly unique or complex components?
4. Which parts do you think would be most valuable as reusable patterns?"

**User**: "It's a clothing store built with Next.js, Tailwind CSS, and Stripe for payments. Key features include product listings with filtering, a shopping cart with local storage persistence, user accounts, and a checkout process. I think the product listing with filters and the cart system would be most valuable as patterns."

**AI**: "Thanks for sharing those details! Based on what you've described, here are some potential patterns we could extract:

1. **Product Listing System**:
   - Grid/list view components
   - Filtering and sorting mechanisms
   - Pagination or infinite scroll

2. **Shopping Cart System**:
   - Cart state management
   - Local storage persistence
   - Cart item components
   - Quantity adjustments and removal

3. **Checkout Flow**:
   - Multi-step form process
   - Address collection
   - Stripe integration
   - Order summary components

4. **User Account System**:
   - Authentication flow
   - Profile management
   - Order history

Would you like to focus on extracting patterns from the product listing and cart systems first, as you suggested?"

**User**: "Yes, let's start with those two areas."

**AI**: "Great! Let's begin by analyzing the structure of your product listing and cart systems. Could you share the directory structure and key files for these components?"

[User shares code structure and key files]

**AI**: "Thanks for sharing those details. I can see several patterns in your product listing system:

1. **Filterable Product Grid Pattern**:
   - ProductGrid component that accepts filter parameters
   - Filter sidebar with multiple filter types (category, size, color, price)
   - URL-based filter state for shareable filtered views

2. **Product Card Pattern**:
   - Consistent product display with image, title, price
   - Quick-view functionality
   - Add-to-cart action

For the cart system, I see these patterns:

1. **Persistent Cart Pattern**:
   - Cart state in React context
   - Local storage synchronization
   - Cart totals calculation

2. **Cart UI Patterns**:
   - Slide-in cart sidebar
   - Cart item component with quantity controls
   - Empty cart state handling

Let's abstract these into reusable template components. For the product listing, I suggest:

```jsx
// FilterableProductGrid.jsx
import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import FilterSidebar from './FilterSidebar';

const FilterableProductGrid = ({
  products,
  initialFilters = {},
  filterOptions,
  onFilterChange,
}) => {
  const [filters, setFilters] = useState(initialFilters);
  
  // Filter change handler
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };
  
  // Apply filters to products
  const filteredProducts = applyFilters(products, filters);
  
  return (
    <div className="filterable-product-grid">
      <FilterSidebar 
        filters={filters} 
        options={filterOptions}
        onChange={handleFilterChange} 
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default FilterableProductGrid;
```

What do you think of this abstraction? Would you like to adjust anything based on your specific implementation?"

[The conversation would continue through the pattern extraction process]

## Handling Complex Patterns

Some patterns may be complex and require special consideration during extraction:

### Example Conversation:

**User**: "The cart system is actually quite complex because it needs to handle product variants, quantity limitations based on inventory, and shipping calculations."

**AI**: "You're right that the cart system has several layers of complexity. Let's break it down into manageable sub-patterns:

1. **Cart State Management Pattern**:
   - Core cart operations (add, update, remove)
   - Persistence mechanism
   - Cart totals calculation

2. **Product Variant Handling Pattern**:
   - Variant selection UI
   - Variant-specific pricing and inventory
   - Variant display in cart

3. **Inventory Integration Pattern**:
   - Quantity limitations based on available stock
   - Out-of-stock handling
   - Inventory updates on checkout

4. **Shipping Calculation Pattern**:
   - Shipping method selection
   - Weight/distance-based calculations
   - Free shipping thresholds

For complex patterns like these, we have a few approaches:

1. **Modular Extraction**: Extract each sub-pattern separately with clear interfaces between them
2. **Configuration-Based Approach**: Create a single pattern with extensive customization points
3. **Tiered Templates**: Create basic, intermediate, and advanced versions of the pattern

Which approach would you prefer for the cart system?"

### Key Considerations for Complex Patterns:

1. **Balance completeness and simplicity**: Ensure patterns are comprehensive but not overwhelming
2. **Provide clear documentation**: Complex patterns need thorough explanation
3. **Consider extensibility**: Allow for future enhancements and customizations
4. **Test thoroughly**: Complex patterns require more extensive testing

## Next Steps

After extracting patterns from your application, you might want to:
- [Create a new template](./ideation-to-template.md) based on the extracted patterns
- [Specialize an existing template](./template-specialization.md) with the extracted patterns
- [Share your patterns](./template-sharing.md) with the community
- [Test your patterns](./template-testing.md) in different contexts 
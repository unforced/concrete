# Workflow: Template Specialization

This guide walks through the conversational process of specializing an existing template for a specific use case.

## Overview

Template specialization is the process of taking an existing template and adapting it for a more specific purpose. This allows you to leverage the work already done in the base template while customizing it for particular needs. The process involves:

1. Discussing the base template and specialization goals
2. Identifying what to keep, modify, and add
3. Collaboratively defining new customization points
4. Iteratively refining the specialized template
5. Testing the specialized template

## Prerequisites

- An existing base template to specialize
- Understanding of the [Template Format](../concepts/template-format.md)
- Familiarity with [Inheritance Mechanism](../concepts/inheritance-mechanism.md)

## The Conversational Approach

As with all Concrete workflows, template specialization is a conversational process where you and the AI assistant collaborate through dialogue. Throughout this workflow:

- **Discuss your specialization goals** clearly
- **Ask questions** about the base template if anything is unclear
- **Provide domain expertise** for the specialized use case
- **Give feedback** on proposed changes

The AI assistant will:
- **Explain the base template** structure and features
- **Suggest appropriate modifications** based on your goals
- **Highlight inheritance implications** of changes
- **Provide rationales** for recommendations

## Step 1: Discuss the Base Template and Specialization Goals

Begin with a conversation about the base template and your specialization goals:

### Example Conversation:

**User**: "I want to specialize the 'Web Application' template for an e-commerce site. Can you help me with that?"

**AI**: "I'd be happy to help you specialize the Web Application template for e-commerce. Let's start by discussing:
1. What specific e-commerce functionality do you need?
2. What payment processors are you planning to integrate?
3. Do you need inventory management features?
4. What about shipping and tax calculation?
5. Any specific user roles beyond standard customers and admins?"

**User**: "We need product catalog management, Stripe integration, basic inventory tracking, flat-rate shipping, and roles for customers, admins, and store managers."

**AI**: "Thanks for those details. The base Web Application template already includes:
- User authentication and profiles
- Database integration
- Basic admin dashboard
- Responsive UI components

For your e-commerce specialization, we'll need to add:
- Product catalog system
- Shopping cart functionality
- Checkout with Stripe
- Inventory tracking
- Order management
- Store manager role and permissions

Does this sound like the right direction for your specialization?"

### Key Actions in This Step:

1. **Review the base template** structure and features
2. **Clarify specialization requirements** through targeted questions
3. **Identify what's already covered** in the base template
4. **Outline what needs to be added** for the specialization
5. **Confirm alignment** on the specialization direction

## Step 2: Identify What to Keep, Modify, and Add

Work together to determine which parts of the base template to keep, which to modify, and what new elements to add:

### Example Conversation:

**AI**: "Let's go through each section of the base template and decide what to keep, modify, or add for your e-commerce specialization:

**Authentication & Profiles**:
- Keep: Basic authentication flow
- Modify: User profile to include shipping addresses and payment methods
- Add: Store manager role and permissions

**Database Models**:
- Keep: User model
- Modify: None
- Add: Product, Category, Order, and Inventory models

**UI Components**:
- Keep: Layout, navigation, and form components
- Modify: Dashboard to include e-commerce metrics
- Add: Product cards, cart widget, checkout flow

Does this breakdown make sense? Any changes you'd like to make?"

**User**: "That looks good, but I think we should also add a review system for products. And for the UI components, we'll need a product search and filtering system."

**AI**: "Excellent additions! You're right that a review system is important for e-commerce, and search/filtering is essential for product discovery. I'll update our plan:

**Add to Database Models**: Review model linked to Products and Users
**Add to UI Components**: Search bar, filter sidebar, and review submission/display components

Would you also want to include rating aggregation (average stars) for products based on reviews?"

### Key Actions in This Step:

1. **Systematically review** each section of the base template
2. **Categorize changes** as keep, modify, or add
3. **Invite user input** on the proposed changes
4. **Incorporate domain-specific requirements** from the user
5. **Refine the specialization plan** based on feedback

## Step 3: Collaboratively Define New Customization Points

Work together to identify new customization points specific to the specialized template:

### Example Conversation:

**AI**: "Now let's identify customization points for your e-commerce template. The base template already includes:
- Application name and branding
- Database connection settings
- Authentication providers

For your e-commerce specialization, I suggest adding these customization points:
- Payment processors (Stripe, PayPal, etc.)
- Shipping calculation methods (flat-rate, weight-based, etc.)
- Tax calculation methods (flat-rate, location-based, etc.)
- Product categories
- Product attributes (size, color, etc.)

What do you think? Are there other aspects of the e-commerce functionality that should be customizable?"

**User**: "Those are good. I'd also add inventory tracking level (none, basic, advanced) as a customization point since not all stores need the same depth of inventory management."

**AI**: "That's an excellent suggestion! Inventory tracking level would be a valuable customization point. Let me define what each level might include:

**None**: No inventory tracking, unlimited stock assumed
**Basic**: Simple in-stock/out-of-stock tracking
**Advanced**: Full inventory management with stock levels, reorder points, and variant tracking

Is this what you had in mind for the inventory tracking levels? And would you want to include any other options or details for this customization point?"

### Key Actions in This Step:

1. **Review existing customization points** from the base template
2. **Propose new customization points** specific to e-commerce
3. **Explain the rationale** for each customization point
4. **Incorporate user suggestions** for additional customization
5. **Define options and details** for each customization point

## Step 4: Iteratively Refine the Specialized Template

Work together to refine the specialized template through iterative feedback:

### Example Conversation:

**AI**: "I've drafted the specialized template structure for your e-commerce application. Here's an overview of the key additions:

**New Implementation Guides**:
- Product Catalog Management
- Shopping Cart Implementation
- Checkout and Payment Processing
- Order Management System
- Inventory Tracking

**Modified Implementation Guides**:
- User Authentication & Profiles (added shipping/billing addresses)
- Admin Dashboard (added e-commerce metrics)

Would you like me to walk through any specific part in more detail?"

**User**: "Can you tell me more about the Checkout and Payment Processing guide? That's a critical part of the e-commerce experience."

**AI**: "Absolutely! The Checkout and Payment Processing guide includes:

1. **Multi-step Checkout Flow**:
   - Cart review
   - Shipping information
   - Billing information
   - Order confirmation

2. **Stripe Integration**:
   - Setting up Stripe API keys
   - Creating payment intents
   - Handling successful payments
   - Managing failed payments

3. **Order Creation**:
   - Converting cart to order
   - Calculating final prices with tax and shipping
   - Generating order confirmation emails

4. **Security Considerations**:
   - PCI compliance requirements
   - Secure handling of payment information
   - Fraud prevention measures

Is there any specific aspect of the checkout process you'd like me to elaborate on or any additional features you'd want to include?"

### Key Actions in This Step:

1. **Present the draft specialized template** structure
2. **Invite questions** about specific aspects
3. **Provide detailed explanations** of requested components
4. **Incorporate feedback** to refine the template
5. **Iterate until the template** meets all requirements

## Step 5: Test the Specialized Template

Discuss how to test the specialized template to ensure it meets the requirements:

### Example Conversation:

**AI**: "To ensure your specialized e-commerce template works as expected, I recommend testing it with a sample project. Here's a testing approach:

1. **Create a test project** using the specialized template
2. **Configure the customization points** with sample values
3. **Implement a minimal version** of each key feature
4. **Test the critical user flows**:
   - Product browsing and search
   - Adding items to cart
   - Checkout process
   - Order management

Would you like me to create a sample test plan with specific test cases for your e-commerce template?"

**User**: "Yes, that would be helpful. Please focus on the checkout flow since that's the most critical part."

**AI**: "Here's a sample test plan for the checkout flow:

**Test Case 1: Guest Checkout**
- Add product to cart
- Proceed to checkout as guest
- Enter shipping information
- Enter billing information
- Complete payment with test card
- Verify order confirmation

**Test Case 2: Registered User Checkout**
- Log in as registered user
- Add product to cart
- Proceed to checkout
- Verify pre-filled shipping/billing information
- Complete payment with test card
- Verify order confirmation and account order history update

**Test Case 3: Failed Payment Handling**
- Add product to cart
- Proceed to checkout
- Enter shipping/billing information
- Attempt payment with invalid test card
- Verify appropriate error message
- Retry with valid card
- Verify successful checkout

Would you like me to add any other specific test cases or expand on any of these?"

### Key Actions in This Step:

1. **Propose a testing approach** for the specialized template
2. **Focus on critical user flows** based on user priorities
3. **Create detailed test cases** for key functionality
4. **Incorporate user feedback** on the test plan
5. **Refine the test plan** to ensure comprehensive coverage

## Example: Full Conversational Flow

Here's an example of a complete conversational flow for specializing a "Mobile App" template for a fitness tracking application:

**User**: "I'd like to specialize the Mobile App template for a fitness tracking application. Can you help with that?"

**AI**: "I'd be happy to help you specialize the Mobile App template for fitness tracking! To get started, could you tell me more about:
1. What specific fitness activities will the app track?
2. What metrics are important to measure (steps, distance, calories, etc.)?
3. Will it integrate with any wearable devices or health platforms?
4. Do you need social features like challenges or friend comparisons?
5. Any specific visualization needs for the fitness data?"

**User**: "The app should track running, cycling, and walking. Key metrics are distance, duration, calories, and route maps. We want to integrate with Apple Health and Google Fit. Social features should include activity sharing and challenges. We need good visualizations for progress over time."

**AI**: "Thanks for those details! The base Mobile App template already includes:
- User authentication and profiles
- Basic navigation structure
- Settings management
- Notifications system
- Offline data storage

For your fitness tracking specialization, we'll need to add:
- Activity tracking for running, cycling, and walking
- Metrics calculation and storage
- Map integration for routes
- Health platform integration (Apple Health, Google Fit)
- Social features (sharing, challenges)
- Data visualization components

Does this cover the main aspects of your fitness tracking app?"

**User**: "Yes, that covers the main aspects. I'd also like to include workout plans that users can follow."

**AI**: "Great addition! Workout plans would be a valuable feature for a fitness app. Let's add that to our specialization plan.

Now, let's go through each section of the base template and decide what to keep, modify, or add:

**Authentication & Profiles**:
- Keep: Basic authentication flow
- Modify: User profile to include fitness goals and preferences
- Add: Fitness stats summary to profile

**Data Storage**:
- Keep: Basic offline storage mechanism
- Modify: Sync strategy to handle fitness data
- Add: Models for activities, routes, and workout plans

**UI Components**:
- Keep: Navigation, settings, and notification components
- Modify: Dashboard to show fitness metrics
- Add: Map view, activity recording UI, workout plan viewer

Does this breakdown align with your vision for the fitness app?"

**User**: "That looks good. For the UI components, make sure we include good data visualization for progress over time."

**AI**: "Absolutely! I'll make sure to include robust data visualization components for tracking progress over time. This would include:
- Line charts for metrics over time
- Heatmaps for activity frequency
- Route comparison maps
- Achievement and milestone visualizations

For customization points, the base template includes:
- App name and branding
- Theme colors and styling
- Notification preferences

For your fitness tracking specialization, I suggest adding:
- Activity types to track (running, cycling, walking, plus options to add more)
- Metrics to display (distance, duration, calories, pace, etc.)
- Integration options (which health platforms to connect with)
- Social feature toggles (sharing, challenges, comments)
- Workout plan complexity (basic, intermediate, advanced)

Would you like to add any other customization points specific to fitness tracking?"

[The conversation would continue through template refinement and testing]

## Handling Inheritance Challenges

When specializing templates, you may encounter challenges with inheritance. Here's how to address them:

### Example Conversation:

**User**: "I'm concerned that some of the base template's authentication flow won't work well with our fitness app's social features."

**AI**: "That's a valid concern. The base template's authentication is designed to be minimal, while social features often require additional user data and permissions. We have a few options:

1. **Override the authentication flow** completely in your specialized template
2. **Extend the existing flow** by adding the social permissions while keeping the core functionality
3. **Create a hybrid approach** where we keep parts of the original flow but modify key steps

I'd recommend the second approach - extending the existing flow - as it maintains compatibility with the base template while adding the necessary social features. This would involve:
- Keeping the basic sign-up/login screens
- Adding permission requests for social sharing
- Extending the user profile with social connections
- Adding social account linking options

What do you think of this approach?"

### Key Considerations for Inheritance:

1. **Balance reuse and customization**: Aim to reuse as much as possible while still meeting your specific needs
2. **Consider future updates**: Changes to the base template should flow through to specialized templates
3. **Document overrides**: Clearly document any parts of the base template that are completely replaced
4. **Test thoroughly**: Ensure that inheritance doesn't cause unexpected behavior

## Next Steps

After specializing your template, you might want to:
- [Test your specialized template](./template-testing.md) with a sample project
- [Share your specialized template](./template-sharing.md) with others
- [Create implementation guides](./implementation-guide-creation.md) specific to your specialized template
- [Extract patterns](./pattern-extraction.md) from your specialized template to improve the base template 
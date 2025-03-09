# Workflow: From Ideation to Template

This guide walks through the conversational process of transforming an initial ideation document into a complete Concrete template.

## Overview

Concrete uses a conversational approach to template creation, where the AI assistant and user collaborate through dialogue to refine ideas and generate resources. The process involves:

1. Initial conversation about the ideation document
2. Collaborative refinement of the project brief
3. Interactive definition of template structure
4. Conversational identification of customization points
5. Iterative creation of guides with continuous feedback

## Prerequisites

- An initial ideation document describing the project
- Understanding of the [Template Format](../concepts/template-format.md)
- Familiarity with [Customization Points](../concepts/customization-points.md)

## The Conversational Approach

Concrete's "Converse & Create" philosophy means that template creation is not a one-way process but a dialogue between you and the AI assistant. Throughout this workflow:

- **Ask questions** when you need clarification
- **Provide feedback** on generated content
- **Suggest alternatives** if something doesn't match your vision
- **Iterate together** to refine the template

The AI assistant will:
- **Ask clarifying questions** to understand your needs
- **Propose options** when multiple approaches are possible
- **Explain rationales** for suggestions
- **Adapt based on feedback** to better align with your vision

## Step 1: Discuss the Ideation Document

Begin with a conversation about your ideation document:

### Example Conversation:

**User**: "I have an ideation document for a social fitness app. Can you help me create a template for it?"

**AI**: "I'd be happy to help create a template for your social fitness app. Let's start by discussing your ideation document. Could you share some key points about:
1. What problem is the app solving?
2. Who are the target users?
3. What are the core features you envision?
4. Any specific technologies you're considering?"

**User**: "The app helps people find workout partners nearby. Target users are fitness enthusiasts aged 20-40. Core features include location-based matching, activity preferences, scheduling, and in-app messaging. I'm thinking React Native with Firebase."

**AI**: "Thanks for sharing those details. Based on what you've described, this sounds like a location-based social app with real-time features. Let me ask a few more questions:
1. How important is user privacy given the location-sharing aspect?
2. Would you want the app to include fitness tracking features or integrate with existing trackers?
3. Are there any specific UI/UX preferences you have in mind?"

### Key Actions in This Step:

1. **Read the ideation document** thoroughly
2. **Ask open-ended questions** to understand the vision
3. **Probe for details** on key aspects like features, users, and technologies
4. **Identify gaps** in the ideation document that need clarification
5. **Summarize understanding** to confirm alignment

## Step 2: Collaboratively Create a Project Brief

Work together to transform the conversation into a structured project brief:

### Example Conversation:

**AI**: "Based on our discussion, I've drafted a project brief. Here are the key sections:
- Project Vision: A location-based app for finding workout partners
- Target Users: Fitness enthusiasts aged 20-40
- Core Features: Location matching, preferences, scheduling, messaging
- Technical Stack: React Native, Firebase
- Key Challenges: User privacy, real-time updates

Does this capture your vision? Is there anything you'd like to add or modify?"

**User**: "That looks good, but I'd also like to emphasize the social aspect - users should be able to build a fitness community, not just one-off workout sessions."

**AI**: "Great point! I'll update the brief to emphasize the community-building aspect. This would affect several features:
- We could add user profiles with fitness journeys
- Perhaps a feed showing community activities
- Maybe achievements or challenges that friends can participate in together

How do these sound? Would you like me to incorporate these into the brief?"

### Key Actions in This Step:

1. **Draft a structured project brief** based on the conversation
2. **Present the brief for feedback** rather than assuming it's final
3. **Incorporate user feedback** to refine the brief
4. **Suggest implications** of changes to ensure alignment
5. **Iterate until the brief** fully captures the vision

## Step 3: Interactively Define Template Structure

Discuss and decide on the template structure together:

### Example Conversation:

**AI**: "Now let's define the structure for your template. Based on your social fitness app, I suggest organizing the implementation guides around these key milestones:
1. User Authentication & Profiles
2. Location Services & Matching
3. Activity Scheduling
4. Messaging System
5. Community Features

Does this structure make sense for your app? Would you prefer a different organization?"

**User**: "I like it, but I think we should add a milestone for onboarding and user preferences since that's crucial for good matches."

**AI**: "That's an excellent suggestion! You're right that onboarding and preference collection are crucial for the matching algorithm. I'll add that as a milestone. Would you prefer it to be the first implementation guide after authentication, or would you place it somewhere else in the sequence?"

### Key Actions in This Step:

1. **Propose an initial structure** based on the project brief
2. **Explain the rationale** behind the proposed structure
3. **Invite feedback** on the organization and sequence
4. **Adapt based on user input** to improve the structure
5. **Confirm the final structure** before proceeding

## Step 4: Conversationally Identify Customization Points

Work together to identify aspects that should be customizable:

### Example Conversation:

**AI**: "Let's identify customization points for your template - these are aspects that future users of this template might want to modify. Based on your fitness app, I suggest these customization points:
- App name and branding
- Matching algorithm parameters
- Required user profile fields
- Types of fitness activities supported
- Messaging features (basic vs. advanced)

What do you think? Are there other aspects you'd want to make customizable?"

**User**: "Those are good. I'd also add customization for the radius of location matching and whether to include integration with fitness trackers."

**AI**: "Great additions! The location radius is definitely something different implementations might want to adjust. And fitness tracker integration could be optional depending on the specific focus of the app. I'll add both of these as customization points.

For the location radius, would you want to offer predefined options (e.g., 1mi, 5mi, 10mi) or allow for a completely custom value?"

### Key Actions in This Step:

1. **Explain what customization points are** and why they matter
2. **Suggest initial customization points** based on the project
3. **Invite additions and modifications** from the user
4. **Discuss implementation details** for each customization point
5. **Document the final set** of customization points

## Step 5: Iteratively Create Guides with Continuous Feedback

Create implementation guides, concept guides, and troubleshooting guides through an iterative process with continuous feedback:

### Example Conversation:

**AI**: "I've drafted the first implementation guide for 'User Authentication & Profiles'. It covers:
- Setting up Firebase Authentication
- Creating the user registration flow
- Designing the profile schema
- Implementing profile creation and editing

Would you like me to walk you through it, or would you prefer to review it and provide feedback?"

**User**: "Let me review it... The authentication part looks good, but for the profiles, I think we should include more fitness-specific fields like fitness goals and experience level."

**AI**: "You're absolutely right. Those fields would be crucial for meaningful matching. I'll update the guide to include:
- Fitness goals (weight loss, muscle gain, endurance, etc.)
- Experience level (beginner, intermediate, advanced)
- Preferred workout intensity
- Fitness interests (running, weightlifting, yoga, etc.)

Would you like me to add any other fitness-specific profile fields?"

### Key Actions in This Step:

1. **Create initial drafts** of each guide
2. **Present drafts for feedback** rather than as finished products
3. **Incorporate domain-specific knowledge** from the user
4. **Refine guides based on feedback** to improve quality
5. **Ensure cross-linking** between related guides

## Example: Full Conversational Flow

Here's an example of a complete conversational flow from ideation to template for a recipe sharing app:

**User**: "I have an idea for a recipe sharing app where users can post their recipes and others can try them and leave reviews."

**AI**: "That sounds like a great idea for a recipe sharing app! To help create a template for it, could you tell me more about:
1. What specific problem is this app solving for users?
2. Who is your target audience?
3. What key features do you envision beyond sharing recipes and reviews?
4. Any specific technologies you're considering for implementation?"

**User**: "The app solves the problem of finding reliable, tested recipes with honest reviews. Target audience is home cooks of all skill levels. Key features include dietary filtering, ingredient-based search, step-by-step instructions with photos, and a meal planning calendar. I'm thinking React for web with a Node.js backend and MongoDB."

**AI**: "Thanks for those details! A few more questions to better understand your vision:
1. Would you want users to have profiles with their cooking preferences/dietary restrictions?
2. Are you thinking of any social features beyond reviews (following users, sharing to social media)?
3. Would you want any gamification elements (badges for posting recipes, trying new cuisines)?
4. Any monetization strategies you're considering (premium recipes, subscription features)?"

**User**: "Yes to profiles with preferences. Social features should include following favorite cooks and sharing to social media. I like the gamification idea - maybe badges for number of recipes shared and trying recipes from different cuisines. Monetization could be through premium recipes from professional chefs."

**AI**: "Great! Based on our conversation, here's a draft project brief:

**Project Vision**: A recipe sharing platform where home cooks can share reliable recipes, get honest reviews, and discover new dishes based on their preferences.

**Target Users**: Home cooks of all skill levels looking for recipe inspiration and validation.

**Core Features**:
- Recipe sharing with step-by-step photos
- Review and rating system
- Dietary and ingredient-based filtering
- User profiles with preferences
- Social features (following, sharing)
- Gamification (badges, achievements)
- Meal planning calendar
- Premium content from professional chefs

**Technical Stack**: React, Node.js, MongoDB

Does this capture your vision? Would you like to modify anything?"

**User**: "That looks great! Maybe also add something about making the app mobile-responsive since people often cook with their phones in the kitchen."

**AI**: "Excellent point! I'll update the brief to include mobile responsiveness as a key requirement. This would affect both the technical implementation and the UX design to ensure the app is usable in a kitchen environment.

Now, let's think about the template structure. Based on your recipe app, I suggest organizing the implementation guides around these key milestones:
1. User Authentication & Profiles
2. Recipe Creation & Management
3. Search & Filtering System
4. Reviews & Ratings
5. Social Features & Sharing
6. Meal Planning Calendar
7. Gamification System
8. Premium Content & Monetization

Does this structure make sense for your app?"

**User**: "Yes, that structure works well. I think we should make sure the Recipe Creation guide includes detailed instructions for handling recipe photos since that's a key feature."

**AI**: "Absolutely! I'll make sure the Recipe Creation & Management guide includes comprehensive coverage of photo handling, including:
- Photo upload and storage
- Image optimization for different devices
- Step-by-step photo association with instructions
- Gallery view for recipes with multiple photos
- Handling permissions and attribution

For customization points, I suggest:
- App name and branding
- Recipe categories and cuisines
- Required recipe fields
- Review system complexity
- Gamification elements
- Premium feature options

Would you like to add or modify any of these customization points?"

**User**: "Those look good. Maybe also add customization for dietary restriction categories since those might vary depending on the target audience."

**AI**: "Great suggestion! Dietary restriction categories would definitely be something template users might want to customize based on their specific audience. I'll add that as a customization point.

Now, I'll start drafting the implementation guides. For the first guide on User Authentication & Profiles, I'll include:
- Setting up authentication
- User registration and login flows
- Profile creation with cooking preferences
- Dietary restriction settings
- Experience level and interests
- Profile photo handling

Does this cover everything you'd want in the authentication and profiles section?"

[The conversation would continue through all the implementation guides, with continuous feedback and refinement]

## Handling Disagreements and Alternatives

Sometimes you and the AI assistant might have different ideas about the best approach. Here's how to handle those situations productively:

- **Explain your reasoning** rather than just stating preferences
- **Ask the AI to explain its rationale** for suggestions
- **Consider creating alternatives** and evaluating them together
- **Remember that you have final say** as the human collaborator

### Example Conversation:

**User**: "I don't think we need separate implementation guides for messaging and community features. They seem related."

**AI**: "I suggested separating them because messaging involves real-time communication infrastructure, while community features focus more on content sharing and social interactions. However, I see your point about their relationship. Would you prefer:
1. Combining them into a single 'Social Interactions' guide
2. Keeping them separate but creating explicit links between them
3. Or do you have another approach in mind?"

**User**: "Let's combine them into a 'Social Interactions' guide but have clear subsections for the different components."

**AI**: "That makes sense! I'll create a combined 'Social Interactions' guide with clear subsections for:
- Direct Messaging Infrastructure
- Group Conversations
- Activity Feed Implementation
- Social Sharing Features
- Notification System

This approach will maintain the distinction between components while acknowledging their interconnected nature. I'll make sure to highlight dependencies between the subsections as well."

## Continuous Improvement Through Feedback

The template creation process doesn't end with the first version. Concrete is designed to learn and improve through feedback:

- **Provide feedback** on what works and what doesn't
- **Suggest improvements** to the template as you use it
- **Share insights** from implementing the template
- **Contribute back** to improve templates for others

### Feedback Mechanisms

1. **Direct Conversation**: Continue the dialogue as you use the template
2. **Template Annotations**: Add notes and suggestions directly in the template files
3. **Implementation Notes**: Document insights gained during implementation
4. **Contribution Guidelines**: Follow the project's guidelines for contributing improvements

## Next Steps

After creating your template through conversation, you might want to:
- [Test your template](./template-testing.md) with a sample project
- [Specialize your template](./template-specialization.md) for specific use cases
- [Share your template](./template-sharing.md) with the community
- [Extract patterns](./pattern-extraction.md) from your implementation to improve the template 
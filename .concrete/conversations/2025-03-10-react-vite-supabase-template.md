# Conversation Summary: React/Vite + Supabase Starter Template

**Date**: March 10, 2025  
**Participants**: Unforced, Claude 3.7 Sonnet  
**Context**: Discussion to define the scope and features of the React/Vite + Supabase starter template

## Key Points Discussed

1. **Project Scope**
   - Simple starter app with necessary functionality most apps will need
   - Focus on removing common obstacles and establishing good patterns
   - Include testing to catch common errors without manual browser testing

2. **Authentication Approach**
   - Start with email/password authentication for simplicity
   - Avoid OTP initially as it can get complicated
   - Authentication can be changed later as needed

3. **Database Structure**
   - Include a user profile system as the core data model
   - Focus on proper TypeScript typing and React hooks for data access

4. **UI Framework**
   - Use shadcn/ui components alongside TailwindCSS
   - Include common components like forms, layouts, and feedback elements

5. **State Management**
   - Stick with React Context and hooks for state management
   - Keep it simple and avoid more complex solutions initially

6. **Testing Strategy**
   - Include end-to-end tests to catch JavaScript errors
   - Focus on tests that would catch schema issues like missing foreign keys
   - Use Playwright for end-to-end testing and Vitest for unit tests

7. **Deployment**
   - Include deployment configurations for platforms like Vercel and Netlify
   - Document the deployment process

## Decisions Made

1. **Use shadcn/ui for components**
   - **Rationale**: Provides a good balance of customization and pre-built functionality
   - **Alternatives Considered**: Building custom components, using other UI libraries

2. **Focus on email/password authentication**
   - **Rationale**: Simplifies initial setup and avoids complications of OTP
   - **Alternatives Considered**: Starting with OTP or social login

3. **Include end-to-end testing**
   - **Rationale**: Catches errors that would normally require manual browser testing
   - **Alternatives Considered**: Focusing only on unit tests or manual testing

4. **Use React Context for state management**
   - **Rationale**: Keeps the template simple and avoids additional dependencies
   - **Alternatives Considered**: Zustand, Redux Toolkit

## Open Questions

1. **Internationalization Support**
   - Should we include i18n support from the start?
   - What would be the simplest approach to i18n that doesn't overcomplicate the template?

2. **Advanced State Management**
   - Should we include a more advanced state management solution like Zustand as an option?
   - How would we structure the template to make it easy to switch state management approaches?

3. **shadcn/ui Component Selection**
   - What specific shadcn/ui components should we include in the starter template?
   - How should we organize and document these components?

4. **Offline Support**
   - Should we include a service worker for offline support?
   - Would this add too much complexity to the starter template?

## Action Items

1. **Create Implementation Guide for Project Setup**
   - **Owner**: Claude with Unforced's feedback
   - **Timeline**: After finalizing the specification
   - **Details**: Document the process of setting up the project with degit, TailwindCSS, and shadcn/ui

2. **Begin Implementation of Starter Template**
   - **Owner**: Claude with Unforced's feedback
   - **Timeline**: After creating the implementation guide
   - **Details**: Start with project setup and authentication

3. **Update Specification and Tracking Documents**
   - **Owner**: Claude with Unforced's feedback
   - **Timeline**: As decisions are made about open questions
   - **Details**: Keep specification and tracking documents up to date with latest decisions

## Next Conversation

**Proposed Topic**: Implementation Guide for Project Setup  
**Proposed Date**: After feedback on this conversation summary  
**Preparation Needed**: Review of current best practices for Vite, React, TailwindCSS, and shadcn/ui setup

---

*This conversation summary was created as part of the Concrete project's development process. It serves as a record of discussions and decisions that inform the project's evolution.* 
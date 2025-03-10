# React/Vite + Supabase Starter Template

**Date**: March 10, 2025  
**Authors**: Unforced, Claude 3.7 Sonnet  
**Status**: Planning

## Overview

This starter template provides a foundation for building modern web applications with React, Vite, and Supabase. It includes email/password authentication, a user profile system, and end-to-end testing, along with a clean, maintainable project structure.

## Target Audience

- Developers building web applications with React and Supabase
- Teams looking for a consistent starting point for new projects
- Individuals learning React and Supabase integration

## Technical Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite 5+
- **Backend/API**: Supabase
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **State Management**: React Context + Hooks
- **Testing**: Vitest + Playwright
- **Deployment**: Vercel, Netlify configurations

## Project Structure

```
project-root/
├── .concrete/               # Project documentation and guides
├── public/                  # Static assets
├── src/                     # Source code
│   ├── assets/              # Images, fonts, etc.
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── layout/          # Layout components
│   │   │   └── features/        # Feature-specific components
│   │   ├── context/             # React context providers
│   │   │   └── auth-context.tsx # Authentication context
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility functions and libraries
│   │   │   └── supabase.ts      # Supabase client and utilities
│   │   ├── pages/               # Page components
│   │   ├── routes/              # Route definitions
│   │   ├── services/            # Service layer for API calls
│   │   ├── types/               # TypeScript type definitions
│   │   │   └── supabase.ts      # Supabase database types
│   │   ├── utils/               # Utility functions
│   │   ├── App.tsx              # Main App component
│   │   ├── main.tsx             # Entry point
│   │   └── vite-env.d.ts        # Vite type definitions
│   ├── e2e/                     # End-to-end tests
│   │   └── auth.spec.ts         # Authentication tests
│   ├── .env.example             # Example environment variables
│   ├── .eslintrc.json           # ESLint configuration
│   ├── .gitignore               # Git ignore file
│   ├── .prettierrc              # Prettier configuration
│   ├── index.html               # HTML entry point
│   ├── package.json             # Dependencies and scripts
│   ├── README.md                # Project documentation
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── vite.config.ts           # Vite configuration
│   └── playwright.config.ts     # Playwright configuration
```

## Core Features

### 1. Authentication

The template includes an email/password authentication system using Supabase Auth:

- User registration and login
- Password reset
- Protected routes
- Authentication context for global state

### 2. User Profile System

The template includes a user profile system:

- Profile creation upon registration
- Profile editing
- Profile viewing
- TypeScript types for user profiles
- React hooks for profile data access

### 3. UI Components

The template includes shadcn/ui components:

- Layout components (Header, Footer, Sidebar)
- Form components (Input, Button, Select)
- Feedback components (Alert, Toast)
- Data display components (Card, Table)

### 4. Testing

The template includes testing setup:

- Unit tests with Vitest
- End-to-end tests with Playwright
- Tests for authentication flow
- Tests for profile management
- Tests for database operations

### 5. Deployment

The template includes deployment configurations:

- Vercel configuration
- Netlify configuration
- Environment variable setup

## User-Required Actions

After creating a project from this template, users will need to:

1. **Create a Supabase Project**:
   - Sign up for Supabase (if not already)
   - Create a new project
   - Get the project URL and anon key

2. **Configure Environment Variables**:
   - Copy `.env.example` to `.env.local`
   - Add Supabase URL and anon key

3. **Set Up Database Schema**:
   - Run the provided SQL scripts to create tables
   - Configure Row Level Security (RLS) policies

4. **Configure Authentication**:
   - Set up email templates
   - Set site URL and redirect URLs

## Implementation Milestones

This starter template will be implemented through the following milestones:

### 1. Project Setup

- Use degit to clone a TypeScript Vite React app
- Configure ESLint, Prettier, and TypeScript
- Set up TailwindCSS
- Install and configure shadcn/ui
- Set up Vitest and Playwright for testing

[Implementation Guide](guides/01-project-setup.md)

### 2. Authentication

- Install Supabase client
- Create Supabase client configuration
- Implement email/password authentication
- Create sign up, sign in, and sign out functionality
- Implement protected routes

[Implementation Guide (Coming Soon)]()

### 3. User Profile System

- Design database schema for user profiles
- Create SQL scripts for table creation
- Configure Row Level Security (RLS) policies
- Implement profile creation and update functionality
- Create React hooks for profile data access

[Implementation Guide (Coming Soon)]()

### 4. UI Components

- Set up shadcn/ui components
- Create layout components
- Implement form components for authentication and profile management
- Create a simple dashboard layout

[Implementation Guide (Coming Soon)]()

### 5. Testing

- Set up Vitest for unit and component testing
- Configure Playwright for end-to-end testing
- Create tests for authentication flow
- Create tests for profile management
- Create tests for database operations

[Implementation Guide (Coming Soon)]()

### 6. Deployment

- Create configuration for Vercel deployment
- Create configuration for Netlify deployment
- Document deployment process

[Implementation Guide (Coming Soon)]()

### 7. Documentation

- Create comprehensive README
- Document project structure
- Create user guide for getting started
- Document testing and deployment procedures

[Implementation Guide (Coming Soon)]()

## Current Status

| Milestone | Status | Completion % |
|-----------|--------|--------------|
| Project Specification | Completed | 100% |
| Project Setup | In Progress | 50% |
| Authentication | Not Started | 0% |
| User Profile System | Not Started | 0% |
| UI Components | Not Started | 0% |
| Testing Setup | Not Started | 0% |
| Deployment Configuration | Not Started | 0% |
| Documentation | Not Started | 0% |

## Open Questions

- Should we include internationalization (i18n) support from the start?
- Should we include a more advanced state management solution like Zustand as an option?
- What specific shadcn/ui components should we include in the starter template?
- Should we include a service worker for offline support?

## Success Criteria

The starter template will be considered successful if:

1. It can be used to create a new project with minimal configuration
2. It includes email/password authentication and user profiles
3. It includes end-to-end tests that catch common errors
4. It follows best practices for React and Supabase development
5. It is well-documented and easy to understand
6. It can be deployed to Vercel or Netlify with minimal configuration

## Usage

Once implemented, this starter template will be available in the `starters/react_vite_supabase` directory of the Concrete repository. Users will be able to create a new project using:

```bash
degit unforced/concrete/starters/react_vite_supabase my-project
```

## Contributing

If you'd like to contribute to this starter template, please:

1. Read this README to understand the requirements
2. Check the implementation guides (when available) to see what's already been done
3. Engage in conversation before making significant changes
4. Document your discussions in the conversations directory
5. Follow the conversational approach to development

## References

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Supabase Documentation](https://supabase.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/) 
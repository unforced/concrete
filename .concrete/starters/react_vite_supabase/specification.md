# React/Vite + Supabase Starter Template Specification

**Date**: March 10, 2025  
**Authors**: Unforced, Claude 3.7 Sonnet

## Overview

This document specifies the React/Vite + Supabase starter template, which provides a foundation for building modern web applications with React, Vite, and Supabase. The template includes authentication, database access, and real-time features, along with a clean, maintainable project structure.

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
- **Routing**: React Router
- **State Management**: React Context + Hooks
- **Form Handling**: React Hook Form
- **Testing**: Vitest + React Testing Library

## Project Structure

```
project-root/
├── .concrete/               # Project documentation and guides
├── public/                  # Static assets
├── src/                     # Source code
│   ├── assets/              # Images, fonts, etc.
│   ├── components/          # Reusable UI components
│   │   ├── common/          # General-purpose components
│   │   ├── layout/          # Layout components
│   │   └── features/        # Feature-specific components
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and libraries
│   │   └── supabase.ts      # Supabase client and utilities
│   ├── pages/               # Page components
│   ├── routes/              # Route definitions
│   ├── services/            # Service layer for API calls
│   ├── types/               # TypeScript type definitions
│   │   └── supabase.ts      # Supabase database types
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # Vite type definitions
├── .env.example             # Example environment variables
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore file
├── .prettierrc              # Prettier configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## Core Features

### 1. Authentication

The template includes a complete authentication system using Supabase Auth:

- User registration and login
- Email/password authentication
- Social authentication (Google, GitHub)
- Password reset
- Email verification
- Protected routes
- User profile management

### 2. Database Access

The template provides a structured approach to Supabase database access:

- TypeScript types for database tables
- Service layer for database operations
- React hooks for data fetching and manipulation
- Error handling and loading states
- Pagination and infinite scrolling

### 3. Real-time Features

The template includes support for Supabase real-time features:

- Real-time subscriptions to database changes
- Presence detection
- Broadcast messages

### 4. UI Components

The template includes a set of reusable UI components:

- Layout components (Header, Footer, Sidebar)
- Form components (Input, Button, Select, Checkbox)
- Feedback components (Alert, Toast, Modal)
- Data display components (Table, Card, List)

### 5. Routing

The template includes a routing system using React Router:

- Public and protected routes
- Nested routes
- Route parameters
- Query parameters
- Redirects

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
   - Configure social providers (if needed)
   - Set site URL and redirect URLs

## Implementation Plan

The implementation of this starter template will be broken down into the following steps:

1. **Project Setup**:
   - Initialize Vite project with React and TypeScript
   - Configure ESLint, Prettier, and TypeScript
   - Set up TailwindCSS

2. **Supabase Integration**:
   - Install Supabase client
   - Create Supabase client configuration
   - Generate TypeScript types for database

3. **Authentication**:
   - Implement authentication context
   - Create sign up, sign in, and sign out functionality
   - Implement protected routes

4. **Database Access**:
   - Create service layer for database operations
   - Implement React hooks for data fetching
   - Add error handling and loading states

5. **UI Components**:
   - Create layout components
   - Implement form components
   - Add feedback components

6. **Example Features**:
   - Create a simple todo list feature
   - Implement real-time updates
   - Add user profile management

## Success Criteria

The starter template will be considered successful if:

1. It can be used to create a new project with minimal configuration
2. It includes all the specified features and components
3. It follows best practices for React and Supabase development
4. It is well-documented and easy to understand
5. It can be extended and customized for specific project needs

## References

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Supabase Documentation](https://supabase.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/docs/en/v6) 
# React/Vite + Supabase Starter Template Specification

**Date**: March 10, 2025  
**Status**: Draft  
**Author**: Claude 3.7 Sonnet

## Overview

This document specifies a modern, production-ready React/Vite + Supabase starter template. The template provides a solid foundation for building web applications with React, TypeScript, Vite, and Supabase, following current best practices and including essential features for rapid development.

## Technology Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite 5+
- **Language**: TypeScript 5+
- **Backend/Database**: Supabase
- **Styling**: TailwindCSS 3+
- **State Management**: React Query 5+ (TanStack Query) + Context API
- **Routing**: React Router 6+
- **Form Handling**: React Hook Form + Zod
- **Authentication**: Supabase Auth
- **Testing**: Vitest + Testing Library
- **Linting/Formatting**: ESLint + Prettier
- **Package Manager**: pnpm (recommended)
- **Deployment**: Vercel (recommended)

## Features

- User authentication (email/password, social auth, magic links)
- Protected routes
- Profile management
- Dark/light mode with system preference detection
- Responsive design
- Form validation with schema-based approach
- API error handling
- Loading states and suspense
- Toast notifications
- Environment configuration
- Type safety with TypeScript
- Optimistic updates for better UX
- Offline detection and handling

## Project Structure

```
project-name/
├── .concrete/                # Concrete project documentation (optional)
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images, fonts, etc.
│   ├── components/           # Reusable UI components
│   │   ├── auth/             # Authentication-related components
│   │   ├── layout/           # Layout components
│   │   ├── ui/               # Basic UI components
│   │   └── [feature]/        # Feature-specific components
│   ├── context/              # React Context providers
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and libraries
│   │   └── supabase.ts       # Supabase client configuration
│   ├── pages/                # Page components
│   ├── routes/               # Route definitions
│   ├── services/             # API service functions
│   ├── types/                # TypeScript type definitions
│   │   └── supabase.ts       # Supabase database types
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts         # Vite type definitions
├── .env.example              # Example environment variables
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore file
├── .prettierrc               # Prettier configuration
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── vitest.config.ts          # Vitest configuration
```

## Setup Instructions

### Using degit

The easiest way to use this template is with degit:

```bash
# Clone the template
npx degit organization/react-vite-supabase my-app

# Navigate to the project directory
cd my-app

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Manual Setup

If you prefer to set up the project manually, follow these steps:

1. Create a new Vite project with React and TypeScript:

```bash
pnpm create vite my-app --template react-ts
cd my-app
```

2. Install dependencies:

```bash
pnpm add react-router-dom @tanstack/react-query @supabase/supabase-js react-hook-form zod @hookform/resolvers sonner
pnpm add -D tailwindcss postcss autoprefixer eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser vitest @testing-library/react @testing-library/jest-dom jsdom
```

3. Initialize Tailwind CSS:

```bash
npx tailwindcss init -p
```

4. Configure Tailwind CSS in `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. Add Tailwind directives to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Create a Supabase project and configure environment variables in `.env`:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Key Components

### Supabase Client

Create a singleton Supabase client in `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### Authentication Context

Create an authentication context in `src/context/AuthContext.tsx`:

```typescript
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Protected Routes

Create a protected route component in `src/routes/ProtectedRoute.tsx`:

```typescript
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
```

### Theme Context

Create a theme context for dark/light mode in `src/context/ThemeContext.tsx`:

```typescript
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

## Database Schema

The starter template includes a basic database schema for user profiles:

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  
  constraint username_length check (char_length(username) >= 3)
);

-- Create a trigger to set updated_at on profiles
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profile_updated
  before update on profiles
  for each row
  execute procedure handle_updated_at();

-- Create a trigger to create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );
```

## Implementation Guide

### 1. Project Setup

1. Initialize the project using Vite with React and TypeScript
2. Configure ESLint, Prettier, and other tools
3. Set up TailwindCSS
4. Configure the directory structure

### 2. Supabase Integration

1. Create a Supabase project
2. Set up authentication providers
3. Configure database tables and RLS policies
4. Create the Supabase client

### 3. Authentication

1. Implement the authentication context
2. Create sign-up, sign-in, and sign-out functionality
3. Set up protected routes
4. Implement social authentication (optional)

### 4. Theme System

1. Create the theme context
2. Implement dark/light mode toggle
3. Configure Tailwind for dark mode

### 5. Core Components

1. Create layout components
2. Implement basic UI components
3. Build authentication forms
4. Create profile management components

### 6. Testing

1. Set up Vitest and Testing Library
2. Write tests for core components
3. Create test utilities

## Best Practices

### TypeScript

- Use strict mode
- Create proper type definitions for all components and functions
- Generate and use Supabase database types

### React

- Use functional components with hooks
- Implement proper error boundaries
- Use React.lazy for code splitting
- Implement proper loading states

### Supabase

- Use Row Level Security (RLS) for all tables
- Implement proper error handling for all Supabase operations
- Use optimistic updates for better UX
- Set up proper session handling

### Testing

- Write tests for all critical components and functions
- Use Testing Library's user-event for interaction testing
- Mock Supabase client for testing

## Customization

The template is designed to be easily customizable:

- **Theme**: Modify the Tailwind configuration to match your brand
- **Components**: Replace or extend the UI components
- **Authentication**: Add or remove authentication providers
- **Database**: Extend the database schema for your specific needs

## Deployment

The template is configured for easy deployment to Vercel:

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Configure environment variables
4. Deploy

## Conclusion

This React/Vite + Supabase starter template provides a solid foundation for building modern web applications. It includes all the essential features and follows best practices to ensure a smooth development experience.

## Next Steps

1. Create the starter template based on this specification
2. Test the template with a sample application
3. Document the template usage
4. Publish the template to GitHub 
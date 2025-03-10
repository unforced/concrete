# React + Supabase Project Structure

This template defines the recommended structure for a React application with Supabase integration.

## Project Structure

```
project-root/
├── .concrete/               # Project documentation and guides
├── .github/                 # GitHub workflows and templates
├── public/                  # Static assets
├── src/                     # Source code
│   ├── assets/              # Images, fonts, etc.
│   ├── components/          # Reusable UI components
│   │   ├── common/          # General-purpose components
│   │   ├── layout/          # Layout components
│   │   └── [feature]/       # Feature-specific components
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and libraries
│   │   └── supabase.ts      # Supabase client and utilities
│   ├── pages/               # Page components
│   ├── services/            # Service layer for API calls
│   ├── styles/              # Global styles
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main App component
│   ├── index.tsx            # Entry point
│   └── routes.tsx           # Route definitions
├── .env.example             # Example environment variables
├── .eslintrc                # ESLint configuration
├── .gitignore               # Git ignore file
├── .prettierrc              # Prettier configuration
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
├── tsconfig.json            # TypeScript configuration
└── vite.config.js           # Vite configuration
```

## Key Files

### Supabase Configuration

`src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
```

### Environment Variables

`.env.example`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Authentication Context

`src/context/AuthContext.tsx`:
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

export const AuthProvider = ({ children }) => {
  // Implementation details...
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## Implementation Notes

1. **Authentication**: Implement authentication using Supabase Auth and provide a context for accessing auth state
2. **Database**: Use Supabase Database for data storage with typed client
3. **Realtime**: Leverage Supabase Realtime for live updates
4. **Storage**: Use Supabase Storage for file uploads when needed
5. **Styling**: Use styled-components or another styling solution based on project requirements

## Customization

This template can be customized based on project needs:

1. **Routing**: Can use React Router or another routing solution
2. **State Management**: Can add Redux, Zustand, or other state management libraries
3. **UI Library**: Can integrate Material-UI, Chakra UI, or other component libraries
4. **API Layer**: Can customize service layer based on API requirements

## Best Practices

1. Implement proper TypeScript typing for Supabase tables
2. Use row-level security (RLS) in Supabase for data protection
3. Implement error handling for all Supabase operations
4. Use environment variables for all sensitive information
5. Implement proper loading states for async operations 
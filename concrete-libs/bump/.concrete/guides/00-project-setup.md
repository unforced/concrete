# Bump Project Setup Guide

This guide will walk you through setting up the Bump application using React, Vite, and Supabase.

## Prerequisites

Before starting, ensure you have the following installed:
- Node.js (v16 or later)
- pnpm (v7 or later)
- Git

## Step 1: Initialize the Bump Project

We'll use a boilerplate that includes React, Vite, and TailwindCSS to get started quickly:

```bash
# Create a new directory for your Bump project
mkdir bump-app
cd bump-app

# Initialize the project using the boilerplate
pnpm dlx degit joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate .

# Install dependencies
pnpm install
```

## Step 2: Set Up Additional Dependencies

Based on your Bump application requirements, we'll install additional dependencies:

```bash
# Install Supabase client
pnpm add @supabase/supabase-js

# Install routing (if needed)
pnpm add react-router-dom

# Install form handling (if needed)
pnpm add react-hook-form zod @hookform/resolvers

# Install UI components (if needed)
pnpm add @headlessui/react

# Install date handling (if needed)
pnpm add date-fns
```

## Step 3: Configure Supabase

1. Create a new Supabase project at [https://app.supabase.io](https://app.supabase.io)
2. Once your project is created, navigate to the project settings to find your API keys
3. Create a `.env` file in your project root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Create a Supabase client file at `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Step 4: Set Up Project Structure

Create the following directory structure for your Bump application:

```
src/
├── assets/         # Static assets like images
├── components/     # Reusable UI components
├── features/       # Feature-specific components and logic
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and configurations
├── pages/          # Page components
├── styles/         # Global styles
└── types/          # TypeScript type definitions
```

## Step 5: Configure TypeScript

Update your `tsconfig.json` to include path aliases for easier imports:

```json
{
  "compilerOptions": {
    // ... existing options
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@features/*": ["./src/features/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@lib/*": ["./src/lib/*"],
      "@pages/*": ["./src/pages/*"],
      "@styles/*": ["./src/styles/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

Update your `vite.config.ts` to support these path aliases:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types': path.resolve(__dirname, './src/types')
    }
  }
});
```

## Step 6: Run the Development Server

Start the development server to verify everything is working:

```bash
pnpm dev
```

Your Bump application should now be running at [http://localhost:5173](http://localhost:5173).

## Next Steps

After completing the setup:

1. Define your Bump application's database schema in Supabase
2. Create the core components based on your vision document
3. Implement the specific features required for Bump

Remember to update the `.concrete/tracking.md` file as you progress through these steps.

---

*This guide will be refined based on your specific requirements for the Bump application.* 
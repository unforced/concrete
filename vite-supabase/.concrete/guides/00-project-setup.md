# Milestone 0: Project Setup

This guide outlines the steps for setting up a React/Vite project with Supabase integration.

## Objectives

- Initialize a new React/Vite project with TypeScript and TailwindCSS
- Set up Supabase for authentication, database, and storage
- Configure the development environment

## Steps

### 1. Initialize React/Vite Project

Use the reactjs-vite-tailwindcss-boilerplate to quickly set up a project with React 18, TypeScript, Vite, TailwindCSS, ESLint, and Prettier:

```bash
# Using npm
npm dlx degit joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate my-app

# Using pnpm
pnpm dlx degit joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate my-app

# Using yarn
yarn dlx degit joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate my-app
```

Navigate to the project directory:

```bash
cd my-app
```

### 2. Install Dependencies

Install the required dependencies:

```bash
# Using npm
npm install @supabase/supabase-js react-router-dom

# Using pnpm
pnpm add @supabase/supabase-js react-router-dom

# Using yarn
yarn add @supabase/supabase-js react-router-dom
```

### 3. Set Up Supabase

1. Create a new Supabase project at [https://app.supabase.com](https://app.supabase.com)
2. Once your project is created, go to Project Settings > API to find your project URL and anon key
3. Create a `.env` file in your project root:

```bash
touch .env
```

4. Add your Supabase credentials to the `.env` file:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. Create a `.env.example` file as a template (without actual credentials):

```bash
touch .env.example
```

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

6. Update `.gitignore` to include `.env`:

```bash
echo ".env" >> .gitignore
```

### 4. Initialize Supabase Client

Create a Supabase client file at `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 5. Set Up Project Structure

Create the basic project structure:

```bash
mkdir -p src/components src/pages src/hooks src/lib/api src/types src/styles
```

### 6. Initialize Git Repository

Initialize a Git repository and make your first commit:

```bash
git init
git add .
git commit -m "Initial project setup with React/Vite and Supabase"
```

### 7. Start the Development Server

Start the development server to verify everything is working:

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Using yarn
yarn dev
```

## User Actions

- [ ] Create a Supabase account if you don't have one
- [ ] Create a new Supabase project
- [ ] Copy your Supabase URL and anon key
- [ ] Choose a package manager (npm, pnpm, or yarn)
- [ ] Run the commands to set up the project
- [ ] Verify the development server starts correctly

## Next Steps

Once the project setup is complete, we will move on to Milestone 1: Authentication, where we'll implement user authentication using Supabase. 
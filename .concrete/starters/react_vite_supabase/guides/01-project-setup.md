# Project Setup Implementation Guide

**Date**: March 10, 2025  
**Author**: Claude 3.7 Sonnet  
**Status**: Draft  
**Milestone**: 1 - Project Setup

## Overview

This guide covers the initial setup of the React/Vite + Supabase starter template. We'll set up a TypeScript React application with Vite, configure ESLint and Prettier, add TailwindCSS, install and configure shadcn/ui, and set up testing tools.

## Prerequisites

- Node.js 18+ installed
- npm 9+ or yarn 1.22+ installed
- Git installed
- Basic knowledge of React, TypeScript, and Vite

## Step 1: Create a Vite React TypeScript Project

We'll use Vite's built-in template for React with TypeScript to create our base project.

```bash
# Using npm
npm create vite@latest my-app --template react-ts

# Using yarn
yarn create vite my-app --template react-ts

# Navigate to the project directory
cd my-app
```

After creating the project, install the dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn
```

## Step 2: Configure ESLint and Prettier

### ESLint Setup

First, let's install ESLint and the necessary plugins:

```bash
# Using npm
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import

# Using yarn
yarn add -D eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import
```

Create an `.eslintrc.json` file in the project root:

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "react-hooks", "@typescript-eslint", "import"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal", ["parent", "sibling"], "index", "object", "type"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }
    ]
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
}
```

### Prettier Setup

Install Prettier and the ESLint Prettier plugin:

```bash
# Using npm
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

# Using yarn
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

Create a `.prettierrc` file in the project root:

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "jsxSingleQuote": false,
  "bracketSpacing": true
}
```

Update the `.eslintrc.json` file to include Prettier:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "plugins": ["react", "react-hooks", "@typescript-eslint", "import", "prettier"]
}
```

Add scripts to `package.json`:

```json
"scripts": {
  "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
  "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
  "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,md}\""
}
```

## Step 3: Set Up TailwindCSS

Install TailwindCSS and its dependencies:

```bash
# Using npm
npm install -D tailwindcss postcss autoprefixer

# Using yarn
yarn add -D tailwindcss postcss autoprefixer
```

Initialize TailwindCSS:

```bash
npx tailwindcss init -p
```

Configure TailwindCSS by updating the `tailwind.config.js` file:

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

Create or update the `src/index.css` file to include TailwindCSS directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Make sure the CSS file is imported in your `src/main.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## Step 4: Install and Configure shadcn/ui

shadcn/ui requires a few additional dependencies and configuration steps:

### Install Dependencies

```bash
# Using npm
npm install -D @types/node

# Using yarn
yarn add -D @types/node
```

### Configure Path Aliases

Update the `tsconfig.json` file to include path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Update the `vite.config.ts` file to include path aliases:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Install and Initialize shadcn/ui

Install the shadcn/ui CLI:

```bash
# Using npm
npm install -D @shadcn/ui

# Using yarn
yarn add -D @shadcn/ui
```

Initialize shadcn/ui:

```bash
npx shadcn-ui init
```

During the initialization, you'll be asked several questions:

- **Would you like to use TypeScript?** Yes
- **Which style would you like to use?** Default
- **Which color would you like to use as base color?** Slate
- **Where is your global CSS file?** src/index.css
- **Do you want to use CSS variables for colors?** Yes
- **Where is your tailwind.config.js located?** tailwind.config.js
- **Configure the import alias for components?** @/components
- **Configure the import alias for utils?** @/lib/utils
- **Are you using React Server Components?** No

### Update TailwindCSS Configuration

After initializing shadcn/ui, your `tailwind.config.js` file should be updated to include the necessary plugins and theme configuration:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Create Utils File

Create a `src/lib/utils.ts` file:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Install Required Packages

```bash
# Using npm
npm install clsx tailwind-merge tailwindcss-animate

# Using yarn
yarn add clsx tailwind-merge tailwindcss-animate
```

### Add Some Basic Components

Now you can add some basic shadcn/ui components:

```bash
# Using npm
npx shadcn-ui add button
npx shadcn-ui add card
npx shadcn-ui add input
npx shadcn-ui add form

# Using yarn
yarn shadcn-ui add button
yarn shadcn-ui add card
yarn shadcn-ui add input
yarn shadcn-ui add form
```

## Step 5: Set Up Testing Tools

### Vitest Setup

Install Vitest and related packages:

```bash
# Using npm
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Using yarn
yarn add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Create a `vitest.config.ts` file in the project root:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Create a `src/test/setup.ts` file:

```typescript
import '@testing-library/jest-dom'
```

Add test scripts to `package.json`:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

### Playwright Setup

Install Playwright:

```bash
# Using npm
npm init playwright@latest

# Using yarn
yarn create playwright
```

During the installation, you'll be asked several questions:

- **Do you want to use TypeScript?** Yes
- **Where to put your end-to-end tests?** e2e
- **Add a GitHub Actions workflow?** Yes
- **Install Playwright browsers?** Yes

This will create a `playwright.config.ts` file and an `e2e` directory with example tests.

Update the `package.json` scripts:

```json
"scripts": {
  "e2e": "playwright test",
  "e2e:ui": "playwright test --ui"
}
```

## Step 6: Set Up Project Structure

Create the following directory structure:

```
src/
├── assets/              # Images, fonts, etc.
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui components (auto-generated)
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and libraries
├── pages/               # Page components
├── routes/              # Route definitions
├── services/            # Service layer for API calls
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

Create basic layout components:

```bash
mkdir -p src/components/layout
touch src/components/layout/Header.tsx
touch src/components/layout/Footer.tsx
touch src/components/layout/Layout.tsx
```

## Step 7: Create a Basic Layout

Create a basic layout in `src/components/layout/Layout.tsx`:

```tsx
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

Create a basic header in `src/components/layout/Header.tsx`:

```tsx
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">My App</div>
        <nav>
          <Button variant="ghost">Login</Button>
        </nav>
      </div>
    </header>
  );
}
```

Create a basic footer in `src/components/layout/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} My App. All rights reserved.</p>
      </div>
    </footer>
  );
}
```

Update `src/App.tsx` to use the layout:

```tsx
import Layout from './components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function App() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to My App</CardTitle>
            <CardDescription>A React/Vite + Supabase starter template</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is a starter template for building modern web applications with React, Vite, and Supabase.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default App;
```

## Step 8: Create a Simple Test

Create a simple test in `src/App.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders welcome message', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to My App/i)).toBeInTheDocument();
  });
});
```

## Step 9: Create a Simple End-to-End Test

Create a simple end-to-end test in `e2e/app.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  
  // Expect the page to have the app title
  await expect(page.locator('text=Welcome to My App')).toBeVisible();
});
```

## Step 10: Update Package.json

Update the `package.json` file to include all the necessary scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
  "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
  "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,css,md}\"",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "e2e": "playwright test",
  "e2e:ui": "playwright test --ui"
}
```

## Step 11: Create a .gitignore File

Create or update the `.gitignore` file:

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Testing
coverage
/test-results/
/playwright-report/
/playwright/.cache/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## Step 12: Create a README.md

Create a `README.md` file in the project root:

```markdown
# My App

A modern web application built with React, Vite, and Supabase.

## Features

- TypeScript for type safety
- Vite for fast development and building
- TailwindCSS for styling
- shadcn/ui for UI components
- ESLint and Prettier for code quality
- Vitest for unit testing
- Playwright for end-to-end testing

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ or yarn 1.22+

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/my-app.git
cd my-app
```

2. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn
```

3. Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`.

## Available Scripts

- `dev` - Start the development server
- `build` - Build the application for production
- `preview` - Preview the production build locally
- `lint` - Run ESLint
- `lint:fix` - Run ESLint and fix issues
- `format` - Run Prettier to format code
- `test` - Run Vitest tests
- `test:watch` - Run Vitest in watch mode
- `test:coverage` - Run Vitest with coverage
- `e2e` - Run Playwright end-to-end tests
- `e2e:ui` - Run Playwright tests with UI

## Project Structure

```
src/
├── assets/              # Images, fonts, etc.
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and libraries
├── pages/               # Page components
├── routes/              # Route definitions
├── services/            # Service layer for API calls
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## License

MIT
```

## Conclusion

You now have a fully configured React/Vite project with TypeScript, ESLint, Prettier, TailwindCSS, shadcn/ui, and testing tools. This setup provides a solid foundation for building modern web applications.

In the next implementation guide, we'll add Supabase integration and implement authentication.

## Next Steps

- Implement Supabase client configuration
- Set up authentication with Supabase
- Create protected routes
- Implement user profile system

## Resources

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)
- [Prettier Documentation](https://prettier.io/docs/en/index.html)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/) 
# React/Supabase Template

A specialized template for building React applications with Supabase backend using the Concrete templating system.

## Overview

The React/Supabase Template provides a comprehensive structure and patterns for creating modern web applications with React frontend and Supabase backend. It inherits from the Full Stack Template and adds React and Supabase specific components and patterns.

## Features

- React application setup with TypeScript
- Supabase integration for authentication, database, and storage
- Routing with React Router
- State management options (Context API, Redux, Zustand)
- Styling options (styled-components, Tailwind CSS, CSS Modules)
- Testing setup with Vitest and Testing Library
- Comprehensive authentication flows
- Database schema management
- Realtime data synchronization
- Offline support with service workers
- PWA configuration
- Deployment configuration for Vercel, Netlify, and others

## Directory Structure

```
react-supabase-template/
├── concrete.yaml           # Template metadata and customization points
├── docs/                   # Documentation
│   ├── overview.md         # Project overview
│   ├── architecture.md     # Architectural overview
│   ├── authentication.md   # Authentication guide
│   ├── database.md         # Database guide
│   ├── realtime.md         # Realtime data guide
│   ├── development.md      # Development guide
│   └── deployment.md       # Deployment guide
├── template/               # Template files
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # Service layer
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # Global styles
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Public assets
│   ├── tests/              # Test files
│   ├── supabase/           # Supabase configuration
│   │   ├── migrations/     # Database migrations
│   │   └── seed.sql        # Seed data
│   ├── vite.config.ts      # Vite configuration
│   ├── tsconfig.json       # TypeScript configuration
│   └── .gitignore          # Git ignore file
└── generation/             # AI generation instructions
    ├── components.md       # Component generation guide
    ├── hooks.md            # Hook generation guide
    ├── services.md         # Service generation guide
    └── database.md         # Database schema generation guide
```

## Customization Points

The React/Supabase Template includes the following customization points:

- **project_name**: Name of the project
- **description**: Brief description of the project
- **author**: Author of the project
- **license**: License for the project
- **authentication**: Authentication method (email, oauth, passwordless)
- **styling**: Styling approach (styled-components, tailwind, css-modules)
- **state_management**: State management approach (context, redux, zustand)
- **routing**: Routing approach (react-router, tanstack-router)
- **testing**: Testing approach (vitest, jest)
- **offline_support**: Whether to include offline support (true, false)
- **pwa**: Whether to configure as a PWA (true, false)

## Usage

To use this template:

```bash
npx degit unforced/Concrete/templates/react-supabase my-project
cd my-project
```

Or with Cursor:

```
Please create a new project using the React/Supabase Template. The project name is "my-project" and it should use passwordless authentication, Tailwind CSS for styling, and Context API for state management.
```

## Extending

This template can be extended to create more specialized templates or concrete applications. To create a template or application that inherits from the React/Supabase Template:

1. Create a new directory
2. Create a `concrete.yaml` file with the `inherits` property set to "react-supabase"
3. Add or override files as needed
4. Document the changes and additions

Example:

```yaml
name: "my-app"
version: "1.0.0"
inherits: "react-supabase"
description: "My specialized application"
```

## Contributing

Contributions to the React/Supabase Template are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This template is licensed under the MIT License. See the LICENSE file for details. 
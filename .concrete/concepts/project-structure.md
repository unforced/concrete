# Project Structure

This guide explains the project structure concept used in the Concrete templating system.

## Overview

A well-organized project structure is essential for maintainability, scalability, and developer productivity. Concrete provides a standardized project structure that follows best practices while allowing for customization based on specific project needs.

The project structure follows these principles:

1. **Consistency**: Consistent organization across projects
2. **Discoverability**: Easy to find and navigate files
3. **Modularity**: Logical grouping of related files
4. **Scalability**: Ability to grow without becoming unwieldy
5. **Separation of Concerns**: Clear separation of different aspects of the application

## Base Structure

The base project structure includes the following directories and files:

```
project-root/
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # Service layer
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom hooks
│   ├── contexts/         # Context providers
│   ├── types/            # TypeScript type definitions
│   ├── constants/        # Constants and configuration
│   ├── assets/           # Static assets
│   └── styles/           # Global styles
├── public/               # Public assets
├── tests/                # Tests
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── docs/                 # Documentation
│   ├── api/              # API documentation
│   ├── architecture/     # Architecture documentation
│   └── guides/           # User guides
├── scripts/              # Build and utility scripts
├── .concrete/            # Concrete configuration and tracking
├── .github/              # GitHub configuration
├── .vscode/              # VS Code configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
```

## Directory Purposes

### Source Code (`src/`)

The `src/` directory contains all the application source code:

#### Components (`src/components/`)

Reusable UI components that can be used across multiple pages:

```
src/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.module.css
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   ├── Card.test.tsx
│   ├── Card.module.css
│   └── index.ts
└── ...
```

#### Pages (`src/pages/`)

Page components that represent different routes in the application:

```
src/pages/
├── Home/
│   ├── Home.tsx
│   ├── Home.test.tsx
│   └── index.ts
├── About/
│   ├── About.tsx
│   ├── About.test.tsx
│   └── index.ts
└── ...
```

#### Services (`src/services/`)

Service layer for API calls, data fetching, and business logic:

```
src/services/
├── api.ts
├── auth.ts
├── user.ts
└── ...
```

#### Utils (`src/utils/`)

Utility functions that can be used across the application:

```
src/utils/
├── formatting.ts
├── validation.ts
├── storage.ts
└── ...
```

#### Hooks (`src/hooks/`)

Custom React hooks:

```
src/hooks/
├── useAuth.ts
├── useFetch.ts
├── useLocalStorage.ts
└── ...
```

#### Contexts (`src/contexts/`)

React context providers:

```
src/contexts/
├── AuthContext.tsx
├── ThemeContext.tsx
├── UserContext.tsx
└── ...
```

#### Types (`src/types/`)

TypeScript type definitions:

```
src/types/
├── api.ts
├── user.ts
├── common.ts
└── ...
```

#### Constants (`src/constants/`)

Constants and configuration:

```
src/constants/
├── routes.ts
├── api.ts
├── theme.ts
└── ...
```

#### Assets (`src/assets/`)

Static assets used in the application:

```
src/assets/
├── images/
├── icons/
├── fonts/
└── ...
```

#### Styles (`src/styles/`)

Global styles:

```
src/styles/
├── global.css
├── variables.css
├── mixins.scss
└── ...
```

### Public Assets (`public/`)

Public assets that are served directly:

```
public/
├── favicon.ico
├── logo.png
├── manifest.json
└── ...
```

### Tests (`tests/`)

Tests for the application:

```
tests/
├── unit/
│   ├── components/
│   ├── services/
│   └── utils/
├── integration/
│   ├── api/
│   └── features/
└── e2e/
    ├── auth.spec.ts
    ├── navigation.spec.ts
    └── ...
```

### Documentation (`docs/`)

Documentation for the application:

```
docs/
├── api/
│   ├── endpoints.md
│   └── models.md
├── architecture/
│   ├── overview.md
│   ├── data-flow.md
│   └── components.md
└── guides/
    ├── getting-started.md
    ├── development.md
    └── deployment.md
```

### Scripts (`scripts/`)

Build and utility scripts:

```
scripts/
├── build.js
├── deploy.js
├── analyze.js
└── ...
```

### Concrete Configuration (`.concrete/`)

Concrete configuration and tracking:

```
.concrete/
├── index.md
├── project.md
├── tracking.md
├── implementations/
├── concepts/
├── templates/
└── troubleshooting/
```

## Structure Variations

The base structure can be customized based on the project type and requirements:

### Frontend-Only Projects

For frontend-only projects, the structure might focus more on UI components and client-side logic:

```
project-root/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── contexts/
│   ├── styles/
│   └── ...
├── public/
└── ...
```

### Backend-Only Projects

For backend-only projects, the structure might focus more on API endpoints, database models, and business logic:

```
project-root/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── ...
├── config/
└── ...
```

### Full-Stack Projects

For full-stack projects, the structure might separate frontend and backend code:

```
project-root/
├── client/
│   ├── src/
│   ├── public/
│   └── ...
├── server/
│   ├── src/
│   ├── config/
│   └── ...
└── ...
```

### Monorepo Projects

For monorepo projects, the structure might organize code into packages:

```
project-root/
├── packages/
│   ├── core/
│   ├── ui/
│   ├── api/
│   └── ...
├── apps/
│   ├── web/
│   ├── mobile/
│   └── ...
└── ...
```

## File Naming Conventions

Concrete follows these file naming conventions:

### Component Files

- Use PascalCase for component files: `Button.tsx`, `UserProfile.tsx`
- Use index.ts files for exporting components: `index.ts`
- Use the component name for test files: `Button.test.tsx`, `UserProfile.test.tsx`
- Use the component name for style files: `Button.module.css`, `UserProfile.module.css`

### Utility Files

- Use camelCase for utility files: `formatDate.ts`, `validateEmail.ts`
- Use descriptive names that indicate the purpose of the file

### Configuration Files

- Use kebab-case for configuration files: `tsconfig.json`, `.eslintrc.js`
- Follow standard naming conventions for common configuration files

## Module Organization

Concrete supports different module organization strategies:

### Feature-Based Organization

Organizing modules by feature:

```
src/
├── auth/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── ...
├── user/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── ...
└── ...
```

### Layer-Based Organization

Organizing modules by layer:

```
src/
├── components/
│   ├── auth/
│   ├── user/
│   └── ...
├── services/
│   ├── auth/
│   ├── user/
│   └── ...
└── ...
```

### Hybrid Organization

A combination of feature-based and layer-based organization:

```
src/
├── features/
│   ├── auth/
│   ├── user/
│   └── ...
├── shared/
│   ├── components/
│   ├── services/
│   └── ...
└── ...
```

## Import Patterns

Concrete recommends these import patterns:

### Relative Imports

Use relative imports for files within the same directory or nearby directories:

```javascript
import { Button } from './Button';
import { Card } from '../Card';
```

### Absolute Imports

Use absolute imports for files in different parts of the application:

```javascript
import { Button } from 'components/Button';
import { formatDate } from 'utils/formatDate';
```

### Barrel Exports

Use barrel exports to simplify imports:

```javascript
// components/index.ts
export * from './Button';
export * from './Card';

// In another file
import { Button, Card } from 'components';
```

## Configuration Management

Concrete provides a structured approach to configuration management:

### Environment Variables

Use environment variables for configuration that varies between environments:

```
.env.development
.env.production
.env.test
```

### Configuration Files

Use configuration files for static configuration:

```
src/config/
├── app.ts
├── api.ts
└── ...
```

### Feature Flags

Use feature flags for enabling/disabling features:

```javascript
// src/config/features.ts
export const features = {
  newUserProfile: process.env.FEATURE_NEW_USER_PROFILE === 'true',
  experimentalSearch: process.env.FEATURE_EXPERIMENTAL_SEARCH === 'true',
};
```

## Best Practices

### For Template Authors

1. **Be Consistent**: Follow consistent naming and organization patterns
2. **Document Structure**: Document the project structure and its rationale
3. **Consider Scalability**: Design the structure to scale with project growth
4. **Provide Examples**: Include examples of how to use the structure
5. **Allow Customization**: Make the structure customizable for different needs
6. **Test Navigation**: Test how easy it is to navigate the structure
7. **Optimize for Common Tasks**: Optimize the structure for common development tasks
8. **Consider Tooling**: Design the structure to work well with common tools

### For Template Users

1. **Understand the Structure**: Take time to understand the project structure
2. **Follow Conventions**: Follow the established naming and organization conventions
3. **Maintain Consistency**: Maintain consistency when adding new files
4. **Refactor When Needed**: Refactor the structure when it no longer serves the project
5. **Document Changes**: Document any changes to the standard structure
6. **Consider Team Familiarity**: Consider the team's familiarity with the structure
7. **Balance Flexibility and Consistency**: Balance flexibility with consistency
8. **Evolve Gradually**: Evolve the structure gradually as the project grows

## Conclusion

A well-designed project structure is the foundation of a maintainable and scalable application. Concrete provides a standardized structure that follows best practices while allowing for customization based on specific project needs. By following the guidelines in this document, you can create a project structure that enhances developer productivity and code quality. 
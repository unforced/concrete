# Full Stack Template

A comprehensive template for building full-stack applications using the Concrete templating system.

## Overview

The Full Stack Template provides a solid foundation for creating modern full-stack applications. It inherits from the Base Template and adds frontend/backend separation, API patterns, and database integration.

## Features

- Frontend and backend separation
- API layer with RESTful and GraphQL options
- Database integration with migration support
- Authentication and authorization
- Error handling and logging
- Testing for both frontend and backend
- Documentation structure
- Deployment configuration

## Directory Structure

```
full-stack-template/
├── concrete.yaml           # Template metadata and customization points
├── docs/                   # Documentation
│   ├── overview.md         # Project overview
│   ├── architecture.md     # Architectural overview
│   ├── api.md              # API documentation
│   ├── database.md         # Database documentation
│   ├── authentication.md   # Authentication documentation
│   ├── development.md      # Development guide
│   └── deployment.md       # Deployment guide
├── template/               # Template files
│   ├── frontend/           # Frontend code
│   │   ├── src/            # Source code
│   │   ├── public/         # Public assets
│   │   └── package.json    # Frontend dependencies
│   ├── backend/            # Backend code
│   │   ├── src/            # Source code
│   │   ├── migrations/     # Database migrations
│   │   └── package.json    # Backend dependencies
│   ├── shared/             # Shared code
│   │   ├── types/          # Shared types
│   │   └── utils/          # Shared utilities
│   ├── scripts/            # Build and deployment scripts
│   └── .gitignore          # Git ignore file
└── generation/             # AI generation instructions
    ├── api.md              # API generation guide
    ├── database.md         # Database schema generation guide
    └── auth.md             # Authentication generation guide
```

## Customization Points

The Full Stack Template includes the following customization points:

- **project_name**: Name of the project
- **description**: Brief description of the project
- **author**: Author of the project
- **license**: License for the project
- **frontend_framework**: Frontend framework to use (react, vue, svelte, angular)
- **backend_framework**: Backend framework to use (express, nest, fastify, koa)
- **database**: Database to use (postgres, mysql, mongodb, sqlite)
- **api_style**: API style to use (rest, graphql, both)
- **authentication**: Authentication method to use (jwt, session, oauth)
- **deployment**: Deployment target (aws, gcp, azure, vercel, netlify, heroku)

## Usage

To use this template:

```bash
npx degit unforced/Concrete/templates/full-stack my-project
cd my-project
```

Or with Cursor:

```
Please create a new project using the Full Stack Template. The project name is "my-project" and it should use React for the frontend, Express for the backend, PostgreSQL for the database, and REST for the API style.
```

## Extending

This template is designed to be extended by more specialized templates. To create a template that inherits from the Full Stack Template:

1. Create a new template directory
2. Create a `concrete.yaml` file with the `inherits` property set to "full-stack"
3. Add or override files as needed
4. Document the changes and additions

Example:

```yaml
name: "react-express"
version: "1.0.0"
inherits: "full-stack"
description: "A specialized template for React frontend and Express backend"
```

## Contributing

Contributions to the Full Stack Template are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This template is licensed under the MIT License. See the LICENSE file for details. 
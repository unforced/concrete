# Base Template

A foundational template for any application built with the Concrete templating system.

## Overview

The Base Template provides the fundamental structure and patterns for creating applications with Concrete. It serves as the foundation for more specialized templates and includes the core components that are common to all applications.

## Features

- Basic project structure
- Documentation templates
- Common utility functions
- Testing framework setup
- Build and deployment configuration
- Error handling patterns
- Logging infrastructure

## Directory Structure

```
base-template/
├── concrete.yaml           # Template metadata and customization points
├── docs/                   # Documentation
│   ├── overview.md         # Project overview
│   ├── architecture.md     # Architectural overview
│   ├── development.md      # Development guide
│   └── deployment.md       # Deployment guide
├── template/               # Template files
│   ├── src/                # Source code
│   │   ├── utils/          # Utility functions
│   │   ├── config/         # Configuration
│   │   └── errors/         # Error handling
│   ├── tests/              # Test files
│   ├── scripts/            # Build and deployment scripts
│   └── .gitignore          # Git ignore file
└── generation/             # AI generation instructions
    ├── components.md       # Component generation guide
    └── utilities.md        # Utility function generation guide
```

## Customization Points

The Base Template includes the following customization points:

- **project_name**: Name of the project
- **description**: Brief description of the project
- **author**: Author of the project
- **license**: License for the project
- **testing_framework**: Testing framework to use (jest, mocha, etc.)
- **logging_level**: Logging level (debug, info, warn, error)

## Usage

To use this template:

```bash
npx degit unforced/Concrete/templates/base my-project
cd my-project
```

Or with Cursor:

```
Please create a new project using the Base Template. The project name is "my-project" and it should include basic documentation and utility functions.
```

## Extending

This template is designed to be extended by more specialized templates. To create a template that inherits from the Base Template:

1. Create a new template directory
2. Create a `concrete.yaml` file with the `inherits` property set to "base"
3. Add or override files as needed
4. Document the changes and additions

Example:

```yaml
name: "my-template"
version: "1.0.0"
inherits: "base"
description: "My specialized template"
```

## Contributing

Contributions to the Base Template are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This template is licensed under the MIT License. See the LICENSE file for details. 
# Concrete

Concrete is an AI-powered templating and project generation system designed to work within AI editors like Cursor. It transforms ideation documents into fully-realized project structures with implementation guides, concepts, templates, and other resources that help developers build applications efficiently.

## Overview

Concrete follows a hierarchical approach to templates, allowing for specialization and inheritance, while continuously learning and improving based on user feedback and new implementations.

The system consists of:

1. **Core System**: The `.concrete` directory containing the system files
2. **Templates**: Reusable templates for different types of projects
3. **Apps**: Concrete implementations of applications built using the templates

## Getting Started

### Creating a New Project

To create a new project using Concrete:

```bash
# Clone a template
npx degit unforced/Concrete/templates/react-supabase my-project
cd my-project

# Link the system prompt to Cursor
ln -s .concrete/system-prompt.md .cursorrules

# Open in Cursor
cursor .
```

Then, you can start a conversation with Cursor:

```
I want to create a task management application. Can you help me get started?
```

### Using an Existing Ideation Document

If you already have an ideation document:

```bash
# Clone a template
npx degit unforced/Concrete/templates/react-supabase my-project
cd my-project

# Create the ideation directory
mkdir -p .concrete/ideation

# Copy your ideation document
cp path/to/ideation.md .concrete/ideation/initial-ideation.md

# Link the system prompt to Cursor
ln -s .concrete/system-prompt.md .cursorrules

# Open in Cursor
cursor .
```

Then, ask Cursor to generate a project brief:

```
Please analyze my ideation document at .concrete/ideation/initial-ideation.md and generate a comprehensive project brief in .concrete/ideation/project-brief.md.
```

## Available Templates

Concrete provides several templates:

### Base Templates

- [Base Template](templates/base/README.md): A minimal template for any application

### Specialized Templates

- [Full Stack Template](templates/full-stack/README.md): Template for full-stack applications
- [React/Supabase Template](templates/react-supabase/README.md): Template for React applications with Supabase backend

### App Implementations

- [Bump](apps/Bump/index.md): A social app for spontaneous in-person connections

## Core Concepts

- [Template Format](.concrete/concepts/template-format.md): How templates are structured
- [Inheritance Mechanism](.concrete/concepts/inheritance-mechanism.md): How templates inherit from each other
- [Learning Mechanism](.concrete/concepts/learning-mechanism.md): How the system learns and improves
- [Customization Points](.concrete/concepts/customization-points.md): How templates can be customized
- [Generation Mechanism](.concrete/concepts/generation-mechanism.md): How code is generated from templates
- [Project Structure](.concrete/concepts/project-structure.md): Recommended project structure
- [CLI Interface](.concrete/concepts/cli-interface.md): Command-line interface for Concrete
- [AI Integration](.concrete/concepts/ai-integration.md): How AI is integrated into the system

## Implementation Guides

- [Project Setup](.concrete/implementations/00-project-setup.md): How to set up the Concrete project

## Contributing

Contributions to Concrete are welcome! Here's how you can contribute:

### Contributing Templates

1. Fork the repository
2. Create a new template in the `templates` directory
3. Follow the [Template Format](.concrete/concepts/template-format.md) guide
4. Submit a pull request

### Contributing Apps

1. Fork the repository
2. Create a new app in the `apps` directory
3. Follow the structure of existing apps
4. Submit a pull request

### Contributing to the Core System

1. Fork the repository
2. Make changes to the `.concrete` directory
3. Test your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details. 
# Concrete System

Welcome to the Concrete system, an AI-powered templating and project generation system designed to work within AI editors like Cursor.

## What is Concrete?

Concrete transforms ideation documents into fully-realized project structures with implementation guides, concepts, templates, and other resources that help developers build applications efficiently.

The system follows a hierarchical approach to templates, allowing for specialization and inheritance, while continuously learning and improving based on user feedback and new implementations.

## Directory Structure

```
.concrete/                  # Core Concrete system files
├── ideation/               # Ideation documents
│   ├── initial-ideation.md # Initial user ideas
│   └── project-brief.md    # Generated project brief
├── templates/              # Template definitions
├── concepts/               # Conceptual guides
├── implementations/        # Implementation guides
├── project.md              # Project overview
├── index.md                # This file
└── .system-prompt          # System prompt for AI assistants
```

## Getting Started

1. **Ideation**: Start by creating an ideation document in the `ideation` directory
2. **Project Brief**: Use the system to generate a project brief from your ideation
3. **Template Selection**: Choose a template that fits your project needs
4. **Customization**: Customize the template to match your specific requirements
5. **Implementation**: Follow the generated guides to implement your application

## Available Templates

Templates are organized in a hierarchy:

1. **Base Templates**: Foundational templates for any application
2. **Specialized Templates**: Templates for specific tech stacks
3. **App Implementations**: Complete application examples

### Base Templates

- [Base Template](../templates/base/README.md): A minimal template for any application

### Specialized Templates

- [Full Stack Template](../templates/full-stack/README.md): Template for full-stack applications
- [React/Supabase Template](../templates/react-supabase/README.md): Template for React applications with Supabase backend

### App Implementations

- [Bump](../apps/Bump/index.md): A social app for spontaneous in-person connections

## Core Concepts

- [Template Format](./concepts/template-format.md): How templates are structured
- [Inheritance Mechanism](./concepts/inheritance-mechanism.md): How templates inherit from each other
- [Customization Points](./concepts/customization-points.md): How to customize templates
- [Learning Mechanism](./concepts/learning-mechanism.md): How the system learns and improves

## Implementation Guides

- [Creating a New Project](./implementations/creating-new-project.md): How to create a new project from a template
- [Customizing Templates](./implementations/customizing-templates.md): How to customize templates
- [Contributing Templates](./implementations/contributing-templates.md): How to contribute new templates

## Next Steps

- Review the [project brief](./ideation/project-brief.md) to understand the system design
- Explore the [templates](../templates) directory to see available templates
- Check out the [Bump app](../apps/Bump/index.md) as an example implementation 
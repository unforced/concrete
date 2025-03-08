# Template Format

**Last Updated**: March 8, 2024  
**Related Guides**: [Inheritance Mechanism](./inheritance-mechanism.md), [Customization Points](./customization-points.md)  
**Prerequisite Knowledge**: YAML, Markdown, Template Systems

## Overview

This guide explains the format used for templates in the Concrete system. It covers the structure, components, and syntax used in templates to enable flexibility, customization, and AI-assisted generation.

## Template Structure

A Concrete template follows this directory structure:

```
template-name/
├── concrete.yaml           # Template metadata, dependencies, inheritance
├── docs/                   # Documentation
│   ├── overview.md         # Human-readable overview
│   └── customization.md    # Customization guide
├── template/               # Actual template files
│   └── src/                # Source code with template placeholders
└── generation/             # AI generation instructions
    └── components.md       # Instructions for generating components
```

## Core Components

### 1. Metadata (concrete.yaml)

The `concrete.yaml` file defines the template's metadata, dependencies, and customization points. This structured format allows both humans and AI to understand the template's capabilities and requirements.

Example:

```yaml
name: "react-supabase"
version: "1.0.0"
inherits: "full-stack"
description: "Template for React applications with Supabase backend"
customization_points:
  - name: "authentication"
    options: ["email", "oauth", "passwordless"]
    default: "email"
    description: "Authentication method to use"
  - name: "styling"
    options: ["styled-components", "tailwind", "css-modules"]
    default: "styled-components"
    description: "Styling approach to use"
  - name: "state_management"
    options: ["context", "redux", "zustand"]
    default: "context"
    description: "State management approach to use"
dependencies:
  - name: "react"
    version: "^18.0.0"
  - name: "supabase"
    version: "^2.0.0"
```

### 2. Documentation (docs/)

The `docs/` directory contains human-readable documentation for the template. This includes:

- **overview.md**: General description, features, and use cases
- **customization.md**: Guide for customizing the template
- **architecture.md**: Architectural overview and design decisions
- **implementation.md**: Implementation details and best practices

These documents are written in Markdown and should be accessible to both humans and AI.

### 3. Template Files (template/)

The `template/` directory contains the actual files that will be used to generate the project. These files can include special syntax for customization:

```jsx
// {{concrete:if authentication === "email"}}
import { EmailAuth } from './auth/EmailAuth';
// {{concrete:endif}}

// {{concrete:if authentication === "oauth"}}
import { OAuthProvider } from './auth/OAuthProvider';
// {{concrete:endif}}

// {{concrete:variable appName}}
```

The template syntax includes:

- **Conditionals**: `{{concrete:if condition}}...{{concrete:endif}}`
- **Variables**: `{{concrete:variable variableName}}`
- **Loops**: `{{concrete:for item in items}}...{{concrete:endfor}}`
- **Includes**: `{{concrete:include path/to/file}}`

### 4. Generation Instructions (generation/)

The `generation/` directory contains natural language instructions for AI to generate custom components. These instructions are written in Markdown and provide context, requirements, and examples for the AI to follow.

Example:

```markdown
# Component Generation: Authentication

## Overview
Generate authentication components based on the selected authentication method.

## Requirements
- Create a login form
- Implement authentication logic
- Handle error states
- Provide logout functionality

## Examples
For email authentication:
```jsx
function EmailLogin() {
  // Example implementation
}
```

For OAuth:
```jsx
function OAuthLogin() {
  // Example implementation
}
```

## Customization Points

Customization points are defined in the `concrete.yaml` file and allow users to customize the template to their specific needs. Each customization point has:

- **Name**: Identifier for the customization point
- **Options**: Available options for the customization point
- **Default**: Default value if not specified
- **Description**: Human-readable description of the customization point

Customization points can be referenced in template files using the conditional syntax:

```jsx
// {{concrete:if customizationPoint === "value"}}
// Code for this customization option
// {{concrete:endif}}
```

## Variables

Variables allow for simple text substitution throughout the template. They are defined during the template customization process and can be referenced in template files:

```jsx
// App name: {{concrete:variable appName}}
```

## Best Practices

1. **Keep Templates Modular**: Break templates into logical components that can be customized independently
2. **Document Customization Points**: Clearly document each customization point and its options
3. **Provide Sensible Defaults**: Choose default values that work for most use cases
4. **Use Conditional Inclusion**: Use conditionals to include or exclude code based on customization points
5. **Leverage AI Generation**: Use generation instructions for complex components that benefit from AI creativity
6. **Maintain Consistency**: Ensure consistent naming and structure across the template
7. **Version Templates**: Use semantic versioning for templates to track changes

## Implementation Notes

When implementing a template:

1. Start with the `concrete.yaml` file to define metadata and customization points
2. Create documentation in the `docs/` directory
3. Add template files with customization syntax
4. Write generation instructions for complex components
5. Test the template with different customization options

## Future Enhancements

1. **Template Validation**: Tools to validate template syntax and structure
2. **Visual Editor**: GUI for creating and editing templates
3. **Template Registry**: Central registry for sharing templates
4. **Version Control Integration**: Better integration with Git and other VCS
5. **Dependency Management**: More sophisticated dependency management

---

*This is a living document. As the Concrete system evolves, this guide will be updated to reflect the latest best practices and features.* 
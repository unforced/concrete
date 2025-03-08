# Contributing Templates

**Last Updated**: March 8, 2024  
**Related Guides**: [Template Format](../concepts/template-format.md), [Inheritance Mechanism](../concepts/inheritance-mechanism.md)  
**Prerequisite Knowledge**: YAML, Markdown, Git, Template Systems

## Overview

This guide walks you through the process of contributing templates to the Concrete system. It covers creating new templates, extending existing templates, and submitting your contributions.

## Prerequisites

Before contributing a template, ensure you have:

1. **Understood the Template Format**: Familiarized yourself with the [Template Format](../concepts/template-format.md) guide
2. **Explored Existing Templates**: Reviewed existing templates to understand patterns and conventions
3. **Identified a Need**: Determined that your template fills a gap in the existing template library

## Step 1: Decide on Template Type

The first step is to decide what type of template you want to create.

### Template Types

1. **Base Template**: A foundational template for any application
2. **Specialized Template**: A template for a specific tech stack or domain
3. **App Implementation**: A concrete implementation of an application

### Inheritance Considerations

If your template builds on an existing template, you'll need to decide which template to inherit from:

```yaml
# Example: Inheriting from the base template
inherits: "base"

# Example: Inheriting from a specialized template
inherits: "full-stack"
```

## Step 2: Set Up Template Directory

Create a directory structure for your template.

### Directory Structure

```
my-template/
├── concrete.yaml           # Template metadata and customization points
├── docs/                   # Documentation
│   ├── overview.md         # Template overview
│   └── customization.md    # Customization guide
├── template/               # Template files
│   └── src/                # Source code with template placeholders
└── generation/             # AI generation instructions
    └── components.md       # Instructions for generating components
```

### Creating the Directory

```bash
# For a new template in the templates directory
mkdir -p templates/my-template/{docs,template/src,generation}
touch templates/my-template/concrete.yaml
```

## Step 3: Define Template Metadata

Create a `concrete.yaml` file to define your template's metadata, customization points, and dependencies.

### Basic Metadata

```yaml
name: "my-template"
version: "1.0.0"
inherits: "base"  # Optional, if inheriting from another template
description: "A template for creating applications with my preferred stack"
author: "Your Name"
license: "MIT"
```

### Customization Points

```yaml
customization_points:
  - name: "project_name"
    type: "string"
    default: "my-project"
    description: "Name of the project"
    
  - name: "description"
    type: "string"
    default: "A project created with my template"
    description: "Brief description of the project"
    
  - name: "feature_flag"
    type: "boolean"
    default: true
    description: "Whether to include a specific feature"
```

### Dependencies

```yaml
dependencies:
  - name: "react"
    version: "^18.2.0"
    
  - name: "typescript"
    version: "^5.0.0"
    dev: true
```

### Variables

```yaml
variables:
  - name: "year"
    value: "{{current_year}}"
    description: "Current year for license and copyright notices"
```

### Files

```yaml
files:
  - source: "template/src/component.js"
    target: "src/component.js"
    condition: "true"
    
  - source: "template/src/feature.js"
    target: "src/feature.js"
    condition: "feature_flag === true"
```

### Hooks

```yaml
hooks:
  post_generation:
    - command: "npm install"
      condition: "true"
      description: "Install dependencies"
```

## Step 4: Create Template Files

Add the actual template files to the `template/` directory.

### Using Template Syntax

Template files can include special syntax for customization:

```jsx
// {{concrete:if feature_flag === true}}
import { Feature } from './feature';
// {{concrete:endif}}

// App name: {{concrete:variable project_name}}
```

### Example Files

1. Create a README template:

```markdown
# {{concrete:variable project_name}}

{{concrete:variable description}}

## Features

{{concrete:if feature_flag === true}}
- Special Feature
{{concrete:endif}}

## Getting Started

...
```

2. Create a package.json template:

```json
{
  "name": "{{concrete:variable project_name}}",
  "version": "0.1.0",
  "description": "{{concrete:variable description}}",
  "author": "{{concrete:variable author}}",
  "license": "{{concrete:variable license}}"
}
```

## Step 5: Write Documentation

Create documentation for your template in the `docs/` directory.

### Overview Document

Create an `overview.md` file:

```markdown
# My Template

A template for creating applications with my preferred stack.

## Features

- Feature 1
- Feature 2
- Feature 3

## Use Cases

This template is ideal for:

- Use case 1
- Use case 2
- Use case 3

## Technologies

- Technology 1
- Technology 2
- Technology 3
```

### Customization Guide

Create a `customization.md` file:

```markdown
# Customizing My Template

This guide explains how to customize the My Template.

## Customization Points

### project_name

The name of the project.

Default: "my-project"

### description

A brief description of the project.

Default: "A project created with my template"

### feature_flag

Whether to include a specific feature.

Default: true
```

## Step 6: Create Generation Instructions

Add generation instructions for AI to the `generation/` directory.

### Component Generation

Create a `components.md` file:

```markdown
# Component Generation

## Overview
Generate components based on the project requirements.

## Requirements
- Create components that follow the project's style guide
- Implement proper error handling
- Include tests for each component

## Examples
```jsx
function MyComponent() {
  // Example implementation
}
```
```

## Step 7: Test Your Template

Before contributing, test your template to ensure it works as expected.

### Testing Process

1. Apply your template to a new project:

```bash
# Using degit (if your template is in a repository)
npx degit your-username/your-repo/templates/my-template my-test-project

# Or copying locally
cp -r templates/my-template my-test-project
```

2. Customize the template:

```bash
cd my-test-project
# Create a customization file
echo 'project_name: "test-project"' > customization.yaml
```

3. Apply customizations (this will be automated in the future)

4. Verify that the template works as expected:
   - Check that files are generated correctly
   - Ensure customizations are applied
   - Test any hooks or scripts

## Step 8: Contribute Your Template

Once your template is ready, you can contribute it to the Concrete system.

### Contributing to the Main Repository

1. Fork the Concrete repository
2. Add your template to the `templates/` directory
3. Create a pull request with a description of your template

### Publishing Your Template Separately

If you prefer to maintain your template separately:

1. Create a new repository for your template
2. Structure it according to the Concrete template format
3. Document how to use your template with Concrete
4. Share the repository URL with the community

## Best Practices

### Template Design

1. **Follow Conventions**: Follow the conventions established in existing templates
2. **Be Consistent**: Use consistent naming and structure
3. **Document Thoroughly**: Provide clear documentation for your template
4. **Test Comprehensively**: Test your template with different customization options
5. **Use Inheritance**: Inherit from existing templates when appropriate

### Customization Points

1. **Be Selective**: Include only the most important customization points
2. **Provide Sensible Defaults**: Choose defaults that work for most users
3. **Document Each Point**: Clearly document each customization point
4. **Consider Dependencies**: Handle dependencies between customization points

### Documentation

1. **Be Clear**: Write clear, concise documentation
2. **Include Examples**: Provide examples of how to use your template
3. **Explain Decisions**: Explain why you made certain design decisions
4. **Update Regularly**: Keep documentation up to date with changes

## Template Review Criteria

When your template is reviewed, it will be evaluated based on:

1. **Adherence to Format**: Does it follow the Concrete template format?
2. **Documentation Quality**: Is it well-documented?
3. **Customization Options**: Does it provide appropriate customization options?
4. **Code Quality**: Is the code of high quality?
5. **Uniqueness**: Does it fill a gap in the existing template library?
6. **Maintainability**: Is it designed to be maintainable?

## Conclusion

Contributing templates to the Concrete system helps build a rich library of templates that can be used by the community. By following this guide, you can create high-quality templates that follow the Concrete format and provide value to users.

---

*This is a living document. As the Concrete system evolves, this guide will be updated to reflect the latest best practices and features.* 
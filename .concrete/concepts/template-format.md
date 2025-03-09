# Template Format

**Last Updated**: March 8, 2025  
**Related Guides**: [Implementation Guide Template](../templates/implementation-guide-template.md), [Concept Guide Template](../templates/concept-guide-template.md)  
**Prerequisite Knowledge**: Markdown, YAML, Template Systems

## Overview

The Template Format is a core concept in Concrete that defines how templates are structured and formatted. Templates in Concrete are designed to be flexible, customizable, and inheritable, allowing for the creation of consistent project structures with minimal effort.

## Key Principles

1. **Markdown-Based**: Templates are primarily written in Markdown, making them human-readable and easy to edit.

2. **Metadata-Driven**: Templates include metadata that defines their properties, relationships, and customization points.

3. **Inheritance-Enabled**: Templates can inherit from parent templates, allowing for reuse and specialization.

4. **Customization-Friendly**: Templates include customization points that can be configured by users.

5. **AI-Optimized**: Templates are designed to be easily understood and processed by AI assistants.

## Implementation Details

### Template Structure

A template in Concrete consists of the following components:

```
template/
├── metadata.yaml           # Template metadata
├── README.md               # Template documentation
├── content/                # Template content files
│   ├── file1.md            # Content file with customization points
│   ├── file2.md            # Content file with customization points
│   └── ...                 # Additional content files
└── resources/              # Additional resources
    ├── resource1.md        # Resource file
    ├── resource2.md        # Resource file
    └── ...                 # Additional resource files
```

### Metadata Format

Template metadata is defined in YAML format and includes the following properties:

```yaml
name: "Template Name"
version: "1.0.0"
description: "Template description"
author: "Template author"
parent: "Parent template name" # Optional
customizationPoints:
  - name: "customizationPoint1"
    type: "string"
    description: "Description of customization point"
    default: "Default value"
  - name: "customizationPoint2"
    type: "boolean"
    description: "Description of customization point"
    default: true
  - name: "customizationPoint3"
    type: "select"
    description: "Description of customization point"
    options:
      - "Option 1"
      - "Option 2"
      - "Option 3"
    default: "Option 1"
```

### Content Files

Content files are Markdown files that include customization points. Customization points are denoted by double curly braces:

```markdown
# {{title}}

This is a template for {{purpose}}.

## Features

{{#if includeFeatures}}
- Feature 1
- Feature 2
- Feature 3
{{/if}}

## Getting Started

To get started with {{title}}, follow these steps:

1. Step 1
2. Step 2
3. Step 3
```

### Inheritance

Templates can inherit from parent templates. When a template inherits from a parent template, it inherits all content files and resources from the parent template. The child template can override any content file or resource by providing its own version.

Inheritance is defined in the metadata.yaml file:

```yaml
name: "Child Template"
version: "1.0.0"
description: "Child template description"
author: "Child template author"
parent: "Parent Template"
```

## Best Practices

1. **Use Clear Names**: Use clear and descriptive names for templates, customization points, and files.

2. **Provide Defaults**: Always provide default values for customization points to ensure templates work out of the box.

3. **Document Everything**: Include comprehensive documentation for templates, including usage instructions and examples.

4. **Keep It Simple**: Keep templates as simple as possible while still providing the necessary functionality.

5. **Test Templates**: Test templates with different customization values to ensure they work as expected.

## Common Pitfalls

1. **Overcomplicating Templates**: Templates should be as simple as possible while still providing the necessary functionality. Avoid adding unnecessary complexity.

2. **Missing Documentation**: Templates should include comprehensive documentation to help users understand how to use them.

3. **Hardcoding Values**: Avoid hardcoding values that should be customizable. Use customization points instead.

4. **Ignoring Inheritance**: When creating child templates, be mindful of what is inherited from the parent template.

5. **Inconsistent Formatting**: Maintain consistent formatting across all templates to ensure a cohesive experience.

## Examples

### Example 1: Simple Template

```yaml
# metadata.yaml
name: "Simple Template"
version: "1.0.0"
description: "A simple template for demonstration purposes"
author: "Concrete Team"
customizationPoints:
  - name: "projectName"
    type: "string"
    description: "The name of the project"
    default: "My Project"
  - name: "includeTests"
    type: "boolean"
    description: "Whether to include tests"
    default: true
```

```markdown
# {{projectName}}

This is a simple project created with Concrete.

## Features

- Feature 1
- Feature 2
- Feature 3

{{#if includeTests}}
## Tests

This project includes tests.
{{/if}}
```

### Example 2: Child Template

```yaml
# metadata.yaml
name: "Child Template"
version: "1.0.0"
description: "A child template that inherits from Simple Template"
author: "Concrete Team"
parent: "Simple Template"
customizationPoints:
  - name: "projectName"
    type: "string"
    description: "The name of the project"
    default: "My Child Project"
  - name: "includeDocumentation"
    type: "boolean"
    description: "Whether to include documentation"
    default: true
```

```markdown
# {{projectName}}

This is a child project created with Concrete.

## Features

- Feature 1
- Feature 2
- Feature 3
- Additional Feature 1
- Additional Feature 2

{{#if includeTests}}
## Tests

This project includes tests.
{{/if}}

{{#if includeDocumentation}}
## Documentation

This project includes documentation.
{{/if}}
```

## Related Concepts

- [Inheritance Mechanism](./inheritance-mechanism.md): How templates inherit from parent templates
- [Customization Points](./customization-points.md): How templates can be customized
- [Generation Mechanism](./generation-mechanism.md): How templates are used to generate projects

## Implementation Guides

This concept is used in the following implementation guides:

- [Project Setup](../implementations/00-project-setup.md): Setting up the project structure
- [Core System Implementation](../implementations/01-core-system-implementation.md): Implementing the core system components

## External Resources

- [Handlebars.js](https://handlebarsjs.com/): A popular templating engine that uses similar syntax
- [YAML Specification](https://yaml.org/spec/1.2/spec.html): The YAML specification used for metadata
- [Markdown Guide](https://www.markdownguide.org/): A comprehensive guide to Markdown syntax 
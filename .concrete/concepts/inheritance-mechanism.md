# Inheritance Mechanism

**Last Updated**: March 8, 2024  
**Related Guides**: [Template Format](./template-format.md), [Customization Points](./customization-points.md)  
**Prerequisite Knowledge**: YAML, Markdown, Object-Oriented Programming Concepts

## Overview

Template inheritance is a powerful feature that allows templates to build upon each other, promoting code reuse and specialization. With inheritance, a template can extend or override parts of a parent template, allowing for a hierarchical organization of templates.

The inheritance mechanism in Concrete follows these principles:

1. **Composition**: Templates are composed of multiple parts that can be inherited and overridden
2. **Specificity**: More specific templates override more general ones
3. **Transparency**: Inheritance should be clear and explicit
4. **Flexibility**: Templates should be able to customize their inheritance behavior

## How Inheritance Works

### Basic Inheritance

When a template inherits from a parent template, it automatically includes all the files and customization points from the parent. The child template can then:

1. **Add new files**: Add files that don't exist in the parent template
2. **Override files**: Replace files from the parent template with its own versions
3. **Add new customization points**: Define additional customization points
4. **Override customization points**: Change the default values or options for parent customization points

Inheritance is defined in the `concrete.yaml` file:

```yaml
name: "react-template"
version: "1.0.0"
description: "React template for Concrete projects"
author: "Concrete Team"
license: "MIT"

# Parent template
parent: "base-template"

# Additional customization points
customization:
  - name: "react_version"
    type: "string"
    description: "React version to use"
    default: "18.2.0"
```

### File Resolution

When a template is processed, files are resolved in this order:

1. Files in the child template
2. Files in the parent template
3. Files in the parent's parent template (if any)
4. And so on...

This means that if a file exists in both the child and parent templates, the child's version will be used.

### Customization Point Resolution

Customization points are merged from parent to child, with the child's values taking precedence. If a customization point exists in both the parent and child templates, the child's definition will override the parent's.

## Inheritance Strategies

### Extension

The most common inheritance strategy is extension, where a child template adds new functionality to a parent template. For example, a React template might extend a base template by adding React-specific files and customization points.

```
base-template/
├── concrete.yaml
├── template/
│   ├── src/
│   │   ├── index.js
│   │   └── utils/
│   │       ├── logger.js
│   │       └── errors.js
│   │
│   └── package.json

react-template/
├── concrete.yaml (parent: "base-template")
├── template/
│   ├── src/
│   │   ├── components/
│   │   │   └── App.jsx
│   │   └── index.jsx
│   └── package.json
```

In this example, the React template inherits all the files from the base template and adds its own React-specific files.

### Specialization

Another inheritance strategy is specialization, where a child template provides a more specific version of a parent template. For example, a React/Supabase template might specialize a React template by adding Supabase-specific files and customization points.

```
react-template/
├── concrete.yaml
├── template/
│   ├── src/
│   │   ├── components/
│   │   │   └── App.jsx
│   │   └── index.jsx
│   └── package.json

react-supabase-template/
├── concrete.yaml (parent: "react-template")
├── template/
│   ├── src/
│   │   ├── services/
│   │   │   └── supabase.js
│   │   └── components/
│   │       └── Auth.jsx
│   └── package.json
```

In this example, the React/Supabase template inherits all the files from the React template and adds its own Supabase-specific files.

### Override

Sometimes, a child template needs to completely override parts of a parent template. For example, a React template might override the `index.js` file from a base template to use React-specific code.

```
base-template/
├── concrete.yaml
├── template/
│   ├── src/
│   │   └── index.js (exports a basic app)
│   └── package.json

react-template/
├── concrete.yaml (parent: "base-template")
├── template/
│   ├── src/
│   │   └── index.js (exports a React app)
│   └── package.json
```

In this example, the React template overrides the `index.js` file from the base template with its own React-specific version.

## Multi-Level Inheritance

Concrete supports multi-level inheritance, where a template can inherit from a parent template that itself inherits from another template. This allows for a deep hierarchy of templates, each adding or specializing functionality.

```
base-template/
└── ...

react-template/
├── concrete.yaml (parent: "base-template")
└── ...

react-supabase-template/
├── concrete.yaml (parent: "react-template")
└── ...

react-supabase-auth-template/
├── concrete.yaml (parent: "react-supabase-template")
└── ...
```

In this example, each template inherits from the one above it, creating a chain of inheritance.

## Partial Inheritance

Sometimes, a child template might want to inherit only specific parts of a parent template. Concrete supports partial inheritance through the `inherit` field in the `concrete.yaml` file:

```yaml
name: "react-template"
version: "1.0.0"
description: "React template for Concrete projects"
author: "Concrete Team"
license: "MIT"

# Parent template
parent: "base-template"

# Inheritance configuration
inherit:
  # Include only specific files
  include:
    - "template/src/utils/**/*"
    - "template/package.json"
  
  # Exclude specific files
  exclude:
    - "template/src/utils/deprecated/**/*"
  
  # Include only specific customization points
  customization:
    - "project_name"
    - "description"
    - "author"
    - "license"
```

In this example, the React template inherits only the specified files and customization points from the base template.

## Composition

In addition to inheritance, Concrete supports composition, where a template can include parts of multiple other templates. This is done through the `compose` field in the `concrete.yaml` file:

```yaml
name: "full-stack-template"
version: "1.0.0"
description: "Full-stack template for Concrete projects"
author: "Concrete Team"
license: "MIT"

# Composition
compose:
  - template: "react-template"
    prefix: "frontend"
    customization:
      project_name: "{{project_name}}-frontend"
  
  - template: "express-template"
    prefix: "backend"
    customization:
      project_name: "{{project_name}}-backend"
```

In this example, the full-stack template includes both the React template and the Express template, with different prefixes to avoid file conflicts.

## Best Practices

1. **Keep inheritance simple**: Avoid deep inheritance chains that can be hard to understand
2. **Document inheritance**: Clearly document what is inherited and what is overridden
3. **Use meaningful names**: Choose template names that reflect their purpose and relationship
4. **Be consistent**: Follow consistent patterns for inheritance across templates
5. **Test inheritance**: Test that inheritance works as expected
6. **Consider composition**: Use composition for complex templates that combine multiple concerns
7. **Avoid circular dependencies**: Ensure that templates don't depend on each other in a circular way
8. **Provide examples**: Include examples of how to use and extend templates
9. **Version templates**: Use semantic versioning to track changes to templates
10. **Document customization points**: Clearly document customization points and their inheritance behavior

## Implementation Notes

The inheritance mechanism is implemented in the Concrete core system, which handles:

1. **Template resolution**: Finding and loading templates
2. **Inheritance resolution**: Resolving inheritance relationships
3. **File merging**: Merging files from parent and child templates
4. **Customization point merging**: Merging customization points from parent and child templates
5. **Template processing**: Processing templates to generate projects

The implementation uses a recursive approach to resolve inheritance, starting from the child template and working up the inheritance chain.

## Conclusion

The inheritance mechanism in Concrete provides a powerful way to create and maintain template hierarchies. By allowing templates to inherit from each other, it enables specialization while maintaining consistency and facilitating the propagation of improvements throughout the system.

---

*This is a living document. As the Concrete system evolves, this guide will be updated to reflect the latest best practices and features.* 
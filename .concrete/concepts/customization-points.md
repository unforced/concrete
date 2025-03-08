# Customization Points

**Last Updated**: March 8, 2024  
**Related Guides**: [Template Format](./template-format.md), [Inheritance Mechanism](./inheritance-mechanism.md)  
**Prerequisite Knowledge**: YAML, Template Systems, Configuration Management

## Overview

This guide explains the customization points mechanism used in the Concrete templating system. It covers how templates define customization options, how users can configure these options, and how the system applies these customizations to generate tailored projects.

## What Are Customization Points?

Customization points are predefined aspects of a template that can be configured by users to tailor the generated project to their specific needs. They provide a structured way to make templates flexible without overwhelming users with too many options.

Customization points can affect:

1. **Features**: Which features are included or excluded
2. **Technologies**: Which technologies, libraries, or frameworks are used
3. **Architecture**: How the project is structured
4. **Styling**: Visual appearance and design system
5. **Configuration**: Environment-specific settings

## Defining Customization Points

Customization points are defined in the `concrete.yaml` file of a template:

```yaml
customization_points:
  - name: "authentication"
    type: "string"
    options: ["email", "oauth", "passwordless"]
    default: "email"
    description: "Authentication method to use"
    
  - name: "styling"
    type: "string"
    options: ["styled-components", "tailwind", "css-modules"]
    default: "styled-components"
    description: "Styling approach to use"
    
  - name: "offline_support"
    type: "boolean"
    default: true
    description: "Whether to include offline support"
```

Each customization point has:

- **Name**: Unique identifier for the customization point
- **Type**: Data type (string, boolean, number, array, object)
- **Options** (optional): Available options for string or array types
- **Default**: Default value if not specified by the user
- **Description**: Human-readable description of the customization point

## Types of Customization Points

### String Options

String options allow users to select from a predefined list of options:

```yaml
- name: "state_management"
  type: "string"
  options: ["context", "redux", "zustand"]
  default: "context"
  description: "State management approach to use"
```

### Boolean Flags

Boolean flags enable or disable specific features:

```yaml
- name: "pwa"
  type: "boolean"
  default: true
  description: "Whether to configure as a PWA"
```

### Numeric Values

Numeric values allow for configuration of quantities or thresholds:

```yaml
- name: "cache_size"
  type: "number"
  min: 10
  max: 100
  default: 50
  description: "Size of the cache in MB"
```

### Arrays

Arrays allow for selection of multiple options:

```yaml
- name: "features"
  type: "array"
  options: ["authentication", "notifications", "offline", "analytics"]
  default: ["authentication"]
  description: "Features to include in the project"
```

### Objects

Objects allow for more complex configuration:

```yaml
- name: "api_endpoints"
  type: "object"
  default: {
    "users": "/api/users",
    "posts": "/api/posts"
  }
  description: "API endpoint configuration"
```

## Using Customization Points in Templates

Customization points are referenced in template files using special syntax:

### Conditional Inclusion

```jsx
// {{concrete:if authentication === "email"}}
import { EmailAuth } from './auth/EmailAuth';
// {{concrete:endif}}

// {{concrete:if authentication === "oauth"}}
import { OAuthProvider } from './auth/OAuthProvider';
// {{concrete:endif}}
```

### Variable Substitution

```jsx
// App name: {{concrete:variable project_name}}
```

### Loops

```jsx
// {{concrete:for feature in features}}
import { {{feature}} } from './features/{{feature}}';
// {{concrete:endfor}}
```

## Customization Process

### User Configuration

Users can configure customization points in several ways:

1. **YAML File**: Creating a `customization.yaml` file:

```yaml
# customization.yaml
authentication: "passwordless"
styling: "tailwind"
offline_support: false
```

2. **CLI**: Using the `concrete customize` command:

```bash
concrete customize authentication passwordless
concrete customize styling tailwind
concrete customize offline_support false
```

3. **Interactive**: Through dialogue with an AI assistant:

```
User: I want to use passwordless authentication and Tailwind CSS.
AI: I'll configure the template with passwordless authentication and Tailwind CSS for styling.
```

### Application Process

When a template is applied, the system:

1. Collects all customization points from the template and its ancestors
2. Applies user-specified values, falling back to defaults when not specified
3. Resolves any conflicts (child template values take precedence)
4. Processes template files, applying conditionals and substitutions based on customization values
5. Generates the final project structure

## Inheritance and Customization Points

Customization points can be inherited from parent templates:

1. **Addition**: Child templates can add new customization points
2. **Override**: Child templates can override properties of inherited customization points
3. **Removal**: Child templates can mark customization points as deprecated

Example of overriding a customization point:

```yaml
# Parent template
customization_points:
  - name: "authentication"
    type: "string"
    options: ["email", "oauth"]
    default: "email"
    description: "Authentication method to use"

# Child template
customization_points:
  - name: "authentication"
    type: "string"
    options: ["email", "oauth", "passwordless"]  # Added a new option
    default: "passwordless"  # Changed the default
    description: "Authentication method to use"
```

## Best Practices

### For Template Authors

1. **Be Selective**: Include only the most important customization points
2. **Provide Sensible Defaults**: Choose defaults that work for most users
3. **Group Related Options**: Use naming conventions to group related options
4. **Document Thoroughly**: Provide clear descriptions and examples
5. **Consider Dependencies**: Handle dependencies between customization points
6. **Test Combinations**: Test different combinations of customization options

### For Template Users

1. **Understand Options**: Read the documentation for each customization point
2. **Start Simple**: Begin with defaults and customize incrementally
3. **Consider Long-term**: Choose options that align with long-term project goals
4. **Document Choices**: Document why you chose specific customization options
5. **Provide Feedback**: Share feedback on customization points that could be improved

## Implementation Notes

The current implementation of customization points is designed to be:

1. **Simple**: Easy to understand and use
2. **Flexible**: Able to handle a wide variety of customization needs
3. **Extensible**: Easy to add new types of customization points
4. **Transparent**: Clear how customization points affect the generated project

## Future Enhancements

Future versions of the customization points mechanism may include:

1. **Validation Rules**: More sophisticated validation of customization values
2. **Dependencies**: Explicit handling of dependencies between customization points
3. **Grouping**: Visual grouping of related customization points
4. **Presets**: Predefined combinations of customization options
5. **Dynamic Options**: Options that change based on other customization choices
6. **Visual Editor**: GUI for configuring customization points

## Conclusion

Customization points are a powerful mechanism for making templates flexible and adaptable to different project requirements. By providing a structured way to define and apply customizations, they enable templates to be both reusable and tailored to specific needs.

---

*This is a living document. As the Concrete system evolves, this guide will be updated to reflect the latest best practices and features.* 
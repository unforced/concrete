# Template Format

**Last Updated**: March 8, 2024  
**Related Guides**: [Inheritance Mechanism](./inheritance-mechanism.md), [Customization Points](./customization-points.md)  
**Prerequisite Knowledge**: YAML, Markdown, Template Systems

## Overview

Templates in Concrete are structured directories that contain all the necessary files and instructions to generate a project. Each template follows a consistent format to ensure compatibility and ease of use.

A template consists of:

1. **Metadata**: Information about the template, its dependencies, and customization points
2. **Documentation**: Human-readable guides and documentation
3. **Template Files**: Actual code files with special syntax for customization points
4. **Generation Instructions**: Natural language instructions for AI to generate custom components

## Directory Structure

Templates follow this directory structure:

```
template-name/
├── concrete.yaml           # Template metadata
├── docs/                   # Documentation
│   ├── overview.md         # Template overview
│   ├── customization.md    # Customization guide
│   └── ...                 # Additional documentation
├── template/               # Template files
│   ├── src/                # Source code
│   ├── tests/              # Tests
│   └── ...                 # Additional files
└── generation/             # Generation instructions
    ├── components.md       # Component generation instructions
    ├── api-endpoints.md    # API endpoint generation instructions
    └── ...                 # Additional generation instructions
```

## Metadata

The `concrete.yaml` file contains metadata about the template:

```yaml
name: "base-template"
version: "1.0.0"
description: "Base template for Concrete projects"
author: "Concrete Team"
license: "MIT"

# Parent template (for inheritance)
parent: null

# Dependencies
dependencies:
  - name: "node"
    version: ">=16.0.0"

# Customization points
customization:
  - name: "project_name"
    type: "string"
    description: "Name of the project"
    default: "my-project"
  - name: "description"
    type: "string"
    description: "Description of the project"
    default: "A project created with Concrete"
  - name: "author"
    type: "string"
    description: "Author of the project"
    default: "Your Name"
  - name: "license"
    type: "string"
    description: "License of the project"
    default: "MIT"
    options:
      - "MIT"
      - "Apache-2.0"
      - "GPL-3.0"
  - name: "testing_framework"
    type: "string"
    description: "Testing framework to use"
    default: "jest"
    options:
      - "jest"
      - "mocha"
      - "vitest"
```

## Template Files

Template files are the actual code files that will be used to generate the project. They can contain special syntax for customization points:

```javascript
// src/config.js
module.exports = {
  // {{project_name}} will be replaced with the value of the project_name customization point
  name: "{{project_name}}",
  // {{description}} will be replaced with the value of the description customization point
  description: "{{description}}",
  // {{#if use_database}} and {{/if}} are conditional blocks
  {{#if use_database}}
  database: {
    // {{database_url}} will be replaced with the value of the database_url customization point
    url: "{{database_url}}",
    // {{database_type}} will be replaced with the value of the database_type customization point
    type: "{{database_type}}"
  },
  {{/if}}
  // {{#each items}} and {{/each}} are loop blocks
  items: [
    {{#each items}}
    {
      // {{this.name}} and {{this.value}} will be replaced with the values from the items array
      name: "{{this.name}}",
      value: "{{this.value}}"
    },
    {{/each}}
  ]
};
```

## Generation Instructions

Generation instructions are natural language instructions for AI assistants to generate custom components. They are written in Markdown and provide guidance on how to generate code that follows the template's patterns and best practices.

Example of a generation instruction file:

```markdown
# Component Generation Guide

This guide provides instructions for generating components based on the Base Template. Following these guidelines will ensure that generated components are consistent, maintainable, and adhere to best practices.

## Component Structure

When generating components for this project, follow these guidelines:

### General Structure

Components should follow this general structure:

1. **Imports**: Import dependencies at the top of the file
2. **Type Definitions**: Define types/interfaces (if using TypeScript)
3. **Component Definition**: Define the component
4. **Helper Functions**: Define any helper functions used by the component
5. **Exports**: Export the component and any related types/functions

### Naming Conventions

- Use **PascalCase** for component names
- Use **camelCase** for function and variable names
- Use **UPPER_SNAKE_CASE** for constants
- Use descriptive names that clearly indicate the purpose of the component

### Error Handling

Components should handle errors gracefully:

- Use try/catch blocks for error-prone operations
- Log errors using the logger utility
- Provide meaningful error messages
- Consider using the error handling utilities from `src/utils/errors.js`

## Example Component

Here's an example of a well-structured component:

```javascript
/**
 * Example component that demonstrates best practices
 */

// Import dependencies
const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');
const config = require('../config');

// Define constants
const DEFAULT_TIMEOUT = 5000;

/**
 * Process data with error handling and logging
 * 
 * @param {Object} data - The data to process
 * @param {Object} options - Processing options
 * @returns {Object} The processed data
 * @throws {AppError} If processing fails
 */
function processData(data, options = {}) {
  try {
    // Log the operation
    logger.debug('Processing data', { data, options });
    
    // Validate input
    if (!data) {
      throw new AppError('Data is required', 400);
    }
    
    // Process the data
    const result = {
      // Implementation details...
    };
    
    // Log success
    logger.info('Data processed successfully');
    
    return result;
  } catch (error) {
    // Log error
    logger.error('Failed to process data', error);
    
    // Rethrow or handle the error
    throw error;
  }
}

module.exports = {
  processData,
};
```
```

## Inheritance

Templates can inherit from parent templates, allowing for reuse and specialization. When a template inherits from a parent template, it can:

1. **Use parent template files**: Files from the parent template are available to the child template
2. **Override parent template files**: Child template files with the same path as parent template files will override them
3. **Extend parent template customization points**: Child templates can add new customization points or override parent customization points

Inheritance is specified in the `concrete.yaml` file:

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
  - name: "use_typescript"
    type: "boolean"
    description: "Whether to use TypeScript"
    default: true
```

## Examples

### Basic Template

A basic template might look like this:

```
base-template/
├── concrete.yaml
├── docs/
│   ├── overview.md
│   └── customization.md
├── template/
│   ├── src/
│   │   ├── index.js
│   │   ├── config.js
│   │   └── utils/
│   │       ├── logger.js
│   │       └── errors.js
│   ├── tests/
│   │   └── utils/
│   │       ├── logger.test.js
│   │       └── errors.test.js
│   └── package.json
└── generation/
    ├── components.md
    ├── api-endpoints.md
    └── error-handling.md
```

### Specialized Template

A specialized template that inherits from the base template might look like this:

```
react-template/
├── concrete.yaml
├── docs/
│   ├── overview.md
│   └── customization.md
├── template/
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx
│   │   │   └── Home.jsx
│   │   ├── styles/
│   │   │   └── global.css
│   │   └── index.jsx
│   ├── tests/
│   │   └── components/
│   │       ├── App.test.jsx
│   │       └── Home.test.jsx
│   └── package.json
└── generation/
    ├── components.md
    ├── hooks.md
    └── styles.md
```

## Best Practices

1. **Keep templates modular**: Break down templates into logical components
2. **Document thoroughly**: Provide comprehensive documentation for each template
3. **Use consistent naming**: Follow consistent naming conventions
4. **Provide sensible defaults**: Set reasonable default values for customization points
5. **Include examples**: Provide examples of how to use the template
6. **Test templates**: Ensure templates work as expected
7. **Version templates**: Use semantic versioning for templates
8. **Consider inheritance**: Use inheritance to avoid duplication
9. **Provide generation instructions**: Include detailed instructions for AI assistants
10. **Keep it simple**: Avoid unnecessary complexity

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
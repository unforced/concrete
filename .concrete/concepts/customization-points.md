# Customization Points

This guide explains the customization points concept used in the Concrete templating system.

## Overview

Customization points are specific aspects of a template that can be configured by users to tailor the template to their needs. They provide a structured way to make templates flexible and adaptable without requiring users to modify the template files directly.

Customization points follow these principles:

1. **Declarative**: Customization points are declared explicitly in the template metadata
2. **Typed**: Each customization point has a specific type (string, number, boolean, etc.)
3. **Documented**: Customization points include descriptions and examples
4. **Defaulted**: Customization points have sensible default values
5. **Validated**: Customization point values are validated against constraints

## Types of Customization Points

Concrete supports several types of customization points:

### Basic Types

- **String**: Text values (e.g., project name, description)
- **Number**: Numeric values (e.g., port number, version)
- **Boolean**: True/false values (e.g., enable feature, use TypeScript)
- **Enum**: Values from a predefined set (e.g., license type, database type)

### Complex Types

- **Array**: Lists of values (e.g., dependencies, features)
- **Object**: Structured data (e.g., configuration objects)
- **Function**: Code snippets or functions (e.g., custom validation)
- **Template**: References to other templates (e.g., for composition)

## Declaring Customization Points

Customization points are declared in the `concrete.yaml` file:

```yaml
name: "base-template"
version: "1.0.0"
description: "Base template for Concrete projects"
author: "Concrete Team"
license: "MIT"

# Customization points
customization:
  - name: "project_name"
    type: "string"
    description: "Name of the project"
    default: "my-project"
    validation:
      pattern: "^[a-z0-9-]+$"
      message: "Project name must contain only lowercase letters, numbers, and hyphens"
  
  - name: "description"
    type: "string"
    description: "Description of the project"
    default: "A project created with Concrete"
  
  - name: "author"
    type: "string"
    description: "Author of the project"
    default: "Your Name"
  
  - name: "license"
    type: "enum"
    description: "License of the project"
    default: "MIT"
    options:
      - "MIT"
      - "Apache-2.0"
      - "GPL-3.0"
      - "BSD-3-Clause"
      - "Unlicense"
  
  - name: "port"
    type: "number"
    description: "Port number for the server"
    default: 3000
    validation:
      min: 1024
      max: 65535
      message: "Port must be between 1024 and 65535"
  
  - name: "use_typescript"
    type: "boolean"
    description: "Whether to use TypeScript"
    default: true
  
  - name: "dependencies"
    type: "array"
    description: "Additional dependencies to include"
    default: []
    items:
      type: "object"
      properties:
        name:
          type: "string"
          description: "Name of the dependency"
        version:
          type: "string"
          description: "Version of the dependency"
  
  - name: "database"
    type: "object"
    description: "Database configuration"
    default:
      enabled: false
      type: "mongodb"
      url: "mongodb://localhost:27017/my-project"
    properties:
      enabled:
        type: "boolean"
        description: "Whether to enable database support"
      type:
        type: "enum"
        description: "Type of database to use"
        options:
          - "mongodb"
          - "postgresql"
          - "mysql"
          - "sqlite"
      url:
        type: "string"
        description: "Database connection URL"
```

## Using Customization Points

Customization points can be used in template files using special syntax:

```javascript
// src/config.js
module.exports = {
  // {{project_name}} will be replaced with the value of the project_name customization point
  name: "{{project_name}}",
  // {{description}} will be replaced with the value of the description customization point
  description: "{{description}}",
  // {{#if database.enabled}} and {{/if}} are conditional blocks based on customization points
  {{#if database.enabled}}
  database: {
    // {{database.type}} will be replaced with the value of the database.type customization point
    type: "{{database.type}}",
    // {{database.url}} will be replaced with the value of the database.url customization point
    url: "{{database.url}}"
  },
  {{/if}}
  // {{port}} will be replaced with the value of the port customization point
  port: {{port}},
  // {{#each dependencies}} and {{/each}} are loop blocks based on customization points
  dependencies: [
    {{#each dependencies}}
    {
      // {{this.name}} and {{this.version}} will be replaced with the values from the dependencies array
      name: "{{this.name}}",
      version: "{{this.version}}"
    },
    {{/each}}
  ]
};
```

## Setting Customization Points

Users can set customization points in several ways:

### 1. Command Line

Users can set customization points when initializing a project:

```bash
concrete init base-template my-project --customization.project_name=my-awesome-project --customization.description="An awesome project" --customization.use_typescript=true
```

### 2. Customization File

Users can create a `customization.yaml` file:

```yaml
project_name: "my-awesome-project"
description: "An awesome project"
author: "John Doe"
license: "MIT"
port: 4000
use_typescript: true
dependencies:
  - name: "lodash"
    version: "^4.17.21"
  - name: "axios"
    version: "^0.24.0"
database:
  enabled: true
  type: "postgresql"
  url: "postgresql://localhost:5432/my-awesome-project"
```

And then apply it:

```bash
concrete init base-template my-project --customization-file=customization.yaml
```

### 3. Interactive Prompt

Users can be prompted for customization values:

```bash
concrete init base-template my-project --interactive
```

This will prompt the user for each customization point:

```
Project name (my-project): my-awesome-project
Description (A project created with Concrete): An awesome project
Author (Your Name): John Doe
License (MIT): MIT
Port (3000): 4000
Use TypeScript (true): true
Enable database (false): true
Database type (mongodb): postgresql
Database URL (mongodb://localhost:27017/my-project): postgresql://localhost:5432/my-awesome-project
```

### 4. AI-Assisted Customization

Users can describe their customization needs in natural language:

```bash
concrete init base-template my-project --customization="I want a TypeScript project with PostgreSQL database support, running on port 4000, and including lodash and axios dependencies."
```

The AI will interpret this and set the appropriate customization points.

## Validation

Customization points can include validation rules to ensure that values are valid:

```yaml
name: "port"
type: "number"
description: "Port number for the server"
default: 3000
validation:
  min: 1024
  max: 65535
  message: "Port must be between 1024 and 65535"
```

If a user tries to set an invalid value, they will receive an error message:

```
Error: Port must be between 1024 and 65535
```

## Inheritance

When a template inherits from a parent template, it inherits all the customization points from the parent. The child template can:

1. **Add new customization points**: Define additional customization points
2. **Override customization points**: Change the default values or options for parent customization points
3. **Extend customization points**: Add new options to enum customization points

Example:

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
  
  # Override a parent customization point
  - name: "use_typescript"
    default: true  # Change the default value
  
  # Extend a parent customization point
  - name: "license"
    options:
      - "MIT"
      - "Apache-2.0"
      - "GPL-3.0"
      - "BSD-3-Clause"
      - "Unlicense"
      - "UNLICENSED"  # Add a new option
```

## Composition

When templates are composed, customization points from all templates are merged. If there are conflicts, the user can specify which value to use:

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

## Best Practices

### For Template Authors

1. **Provide Sensible Defaults**: Choose default values that work for most users
2. **Document Thoroughly**: Clearly document each customization point
3. **Validate Inputs**: Add validation rules to prevent invalid values
4. **Limit Customization Points**: Only include customization points that are truly needed
5. **Group Related Points**: Group related customization points together
6. **Use Consistent Naming**: Follow consistent naming conventions
7. **Consider Inheritance**: Design customization points with inheritance in mind
8. **Test Customization**: Test templates with different customization values

### For Template Users

1. **Read Documentation**: Understand what each customization point does
2. **Start Simple**: Begin with default values and customize as needed
3. **Use Customization Files**: Store customization values in files for reuse
4. **Validate Early**: Validate customization values before generating projects
5. **Share Customizations**: Share useful customization configurations with others

## Advanced Concepts

### Computed Customization Points

Some customization points can be computed based on other customization points:

```yaml
name: "package_name"
type: "string"
description: "Name of the package"
computed: "{{project_name.toLowerCase().replace(/-/g, '_')}}"
```

### Conditional Customization Points

Customization points can be conditional based on other customization points:

```yaml
name: "database_url"
type: "string"
description: "Database connection URL"
condition: "database.enabled"
default: "mongodb://localhost:27017/{{project_name}}"
```

### Dynamic Options

Options for enum customization points can be dynamic:

```yaml
name: "node_version"
type: "enum"
description: "Node.js version to use"
options_source: "fetch_node_versions"
default: "latest"
```

## Conclusion

Customization points are a powerful feature of Concrete that allow templates to be flexible and adaptable to different needs. By providing a structured way to configure templates, they enable users to create projects that meet their specific requirements without having to modify template files directly. 
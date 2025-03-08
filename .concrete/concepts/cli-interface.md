# CLI Interface

This guide explains the Command Line Interface (CLI) for the Concrete templating system.

## Overview

The Concrete CLI provides a powerful and intuitive interface for working with templates, generating projects, and managing customizations. It is designed to be both simple for beginners and powerful for advanced users.

The CLI follows these principles:

1. **Simplicity**: Simple commands for common operations
2. **Discoverability**: Help and documentation built into the CLI
3. **Consistency**: Consistent command structure and options
4. **Feedback**: Clear feedback on operations
5. **Extensibility**: Extensible through plugins and scripts

## Installation

The Concrete CLI can be installed using npm:

```bash
npm install -g @concrete/cli
```

Or using yarn:

```bash
yarn global add @concrete/cli
```

## Basic Commands

### Initialize a Project

Create a new project from a template:

```bash
concrete init <template> <project-name> [options]
```

Example:

```bash
concrete init react-app my-app
```

### List Templates

List available templates:

```bash
concrete list
```

Example output:

```
Available templates:
- base-template (1.0.0): Base template for Concrete projects
- react-app (2.1.0): React application template
- express-api (1.5.0): Express API template
- full-stack (3.0.0): Full-stack application template
```

### Apply a Template

Apply a template to an existing project:

```bash
concrete apply <template> [options]
```

Example:

```bash
concrete apply auth-template --target=src/auth
```

### Generate Components

Generate components based on template instructions:

```bash
concrete generate <component-type> <component-name> [options]
```

Example:

```bash
concrete generate component Button --props="variant:string,size:string,onClick:function"
```

### Customize a Template

Customize a template:

```bash
concrete customize <customization-point> <value> [options]
```

Example:

```bash
concrete customize styling tailwind
```

### Provide Feedback

Provide feedback on a template:

```bash
concrete feedback <template> [options]
```

Example:

```bash
concrete feedback react-app --rating=4 --comment="Great template, but missing error handling"
```

## Command Structure

All Concrete commands follow a consistent structure:

```bash
concrete <command> <subcommand> [arguments] [options]
```

Where:

- `command`: The main command (e.g., `init`, `list`, `apply`)
- `subcommand`: An optional subcommand (e.g., `generate component`)
- `arguments`: Required arguments for the command
- `options`: Optional flags and parameters

## Global Options

These options can be used with any command:

```bash
--help, -h          # Show help for a command
--version, -v       # Show CLI version
--verbose           # Enable verbose output
--quiet             # Suppress all output except errors
--config <file>     # Specify a config file
--no-color          # Disable colored output
```

## Configuration

The CLI can be configured using a `.concreterc` file in the project root or the user's home directory:

```json
{
  "defaultTemplate": "react-app",
  "templateDirectory": "~/.concrete/templates",
  "customizations": {
    "styling": "tailwind",
    "state_management": "redux"
  },
  "generation": {
    "model": "gpt-4",
    "temperature": 0.7
  }
}
```

## Environment Variables

The CLI respects these environment variables:

```bash
CONCRETE_TEMPLATE_DIR    # Directory for templates
CONCRETE_CONFIG_FILE     # Path to config file
CONCRETE_API_KEY         # API key for Concrete services
CONCRETE_MODEL           # AI model to use for generation
CONCRETE_VERBOSE         # Enable verbose output
```

## Advanced Usage

### Template Development

Create a new template:

```bash
concrete template create <template-name> [options]
```

Validate a template:

```bash
concrete template validate <template-path> [options]
```

Publish a template:

```bash
concrete template publish <template-path> [options]
```

### Project Analysis

Analyze a project:

```bash
concrete analyze [options]
```

Example output:

```
Project Analysis:
- Framework: React
- Styling: Tailwind CSS
- State Management: Redux
- Testing: Jest + React Testing Library
- Linting: ESLint + Prettier
- Build Tool: Webpack
- Package Manager: npm

Recommended Templates:
- react-redux-template (98% match)
- react-tailwind-template (95% match)
- react-testing-template (90% match)
```

### Batch Operations

Run batch operations using a script:

```bash
concrete batch <script-file> [options]
```

Example script file:

```json
{
  "operations": [
    {
      "command": "init",
      "template": "react-app",
      "projectName": "my-app",
      "options": {
        "styling": "tailwind",
        "state_management": "redux"
      }
    },
    {
      "command": "generate",
      "componentType": "component",
      "componentName": "Button",
      "options": {
        "props": "variant:string,size:string,onClick:function"
      }
    },
    {
      "command": "generate",
      "componentType": "component",
      "componentName": "Card",
      "options": {
        "props": "title:string,content:string,footer:node"
      }
    }
  ]
}
```

### Plugins

Install a plugin:

```bash
concrete plugin install <plugin-name> [options]
```

List installed plugins:

```bash
concrete plugin list [options]
```

Run a plugin command:

```bash
concrete plugin run <plugin-name> <command> [options]
```

## Interactive Mode

Run the CLI in interactive mode:

```bash
concrete interactive
```

This will start an interactive session where you can run commands and get immediate feedback.

Example session:

```
Concrete CLI Interactive Mode
Type 'help' for a list of commands, 'exit' to quit

> list
Available templates:
- base-template (1.0.0): Base template for Concrete projects
- react-app (2.1.0): React application template
- express-api (1.5.0): Express API template
- full-stack (3.0.0): Full-stack application template

> init react-app my-app
Initializing project 'my-app' with template 'react-app'...
Project initialized successfully!

> customize styling tailwind
Customization 'styling' set to 'tailwind'

> generate component Button
Generating component 'Button'...
Component generated successfully!

> exit
Goodbye!
```

## AI-Assisted Mode

Run the CLI with AI assistance:

```bash
concrete ai "Create a React app with Tailwind CSS and Redux"
```

The AI will interpret your request and run the appropriate commands:

```
AI: I'll create a React app with Tailwind CSS and Redux for you.

Running: concrete init react-app my-app
Initializing project 'my-app' with template 'react-app'...
Project initialized successfully!

Running: concrete customize styling tailwind
Customization 'styling' set to 'tailwind'

Running: concrete customize state_management redux
Customization 'state_management' set to 'redux'

AI: Your React app with Tailwind CSS and Redux has been created successfully!
```

## Error Handling

The CLI provides clear error messages and suggestions for resolution:

```
Error: Template 'react-ap' not found.

Did you mean 'react-app'?

Run 'concrete list' to see available templates.
```

## Best Practices

### For Template Authors

1. **Test CLI Commands**: Test all CLI commands with your template
2. **Document Commands**: Document template-specific commands
3. **Provide Examples**: Include examples of common operations
4. **Handle Errors**: Provide helpful error messages
5. **Support Customization**: Make templates customizable via the CLI
6. **Validate Input**: Validate user input to prevent errors
7. **Provide Feedback**: Give clear feedback on operations
8. **Support Batch Operations**: Ensure templates work with batch operations

### For Template Users

1. **Use Help**: Use the `--help` option to learn about commands
2. **Start Simple**: Start with basic commands and explore advanced features
3. **Use Configuration**: Use configuration files for common settings
4. **Explore Templates**: Explore available templates before choosing
5. **Provide Feedback**: Provide feedback on templates
6. **Use Batch Operations**: Use batch operations for repetitive tasks
7. **Explore AI-Assisted Mode**: Use AI-assisted mode for complex operations
8. **Keep Updated**: Keep the CLI and templates updated

## Troubleshooting

### Common Issues

1. **Template Not Found**: Ensure the template name is correct and the template is installed
2. **Permission Denied**: Ensure you have the necessary permissions
3. **Configuration Not Found**: Ensure the configuration file exists and is valid
4. **Network Error**: Check your internet connection
5. **Invalid Command**: Check the command syntax

### Debugging

Enable verbose output for debugging:

```bash
concrete --verbose init react-app my-app
```

This will show detailed information about the command execution.

## Conclusion

The Concrete CLI provides a powerful and intuitive interface for working with templates, generating projects, and managing customizations. By following the guidelines in this document, you can effectively use the CLI to streamline your development workflow. 
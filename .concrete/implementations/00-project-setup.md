# 00: Project Setup

## Overview

This guide provides instructions for setting up the Concrete project and understanding its structure. It covers the initial project setup, directory structure, and key components of the system.

## Prerequisites

- Git installed on your system
- Basic understanding of markdown
- Familiarity with AI assistants like Cursor

## Objectives

- Set up the project repository
- Understand the project structure
- Create the necessary directories and files
- Set up the documentation structure
- Prepare for the next milestone

## Key Concepts

Before diving into the implementation, it's important to understand these key concepts:

- **Template**: A pre-defined project structure with best practices built-in
- **Customization Point**: A configurable aspect of a template
- **Inheritance**: The ability for templates to inherit from parent templates
- **Implementation Guide**: Step-by-step guide for implementing features

## Implementation Steps

### Step 1: Create the Project Repository

1. Create a new repository for the Concrete project:

```bash
mkdir concrete
cd concrete
git init
```

2. Create a basic README.md file:

```markdown
# Concrete

Concrete is an AI-powered system that helps create consistent, well-structured projects through conversational AI development. The name "Concrete" comes from "Converse & Create" - emphasizing the conversational approach to project creation.

## Getting Started

[Coming soon]

## Documentation

[Coming soon]

## Contributing

[Coming soon]

## License

MIT
```

3. Create a .gitignore file:

```
node_modules/
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

**Expected Outcome**: A basic project repository with README.md and .gitignore files.

### Step 2: Set Up Project Structure

1. Create the main directories:

```bash
mkdir -p .concrete/implementations .concrete/concepts .concrete/templates .concrete/troubleshooting
mkdir -p apps templates/base templates/specialized
```

2. Create the core documentation files:

```bash
touch .concrete/index.md .concrete/project.md .concrete/tracking.md .concrete/system-prompt.md
```

**Expected Outcome**: A structured project with the necessary directories and documentation files.

### Step 3: Create Core Documentation

1. Create the index.md file to serve as a navigation guide:

```markdown
# Concrete Project

Welcome to the Concrete project documentation. This guide will help you navigate the project structure and understand how to use the various resources available.

[Additional content as needed]
```

2. Create the project.md file to provide an overview of the project:

```markdown
# Concrete Project Overview

**Date**: [Current date]  
**Authors**: [Author names]

## Project Vision

Concrete is an AI-powered system that helps create consistent, well-structured projects through conversational AI development.

[Additional content as needed]
```

3. Create the tracking.md file to track project progress:

```markdown
# Project Tracking

## Project Status

**Current Status**: In Development  
**Last Updated**: [Current date]  
**Project Phase**: Initial Setup

[Additional content as needed]
```

4. Create the system-prompt.md file to provide instructions for AI assistants:

```markdown
# Concrete System Prompt

You are an AI assistant helping with the Concrete project, a system for generating `.concrete` directories that serve as intelligent guides for AI-assisted development.

[Additional content as needed]
```

**Expected Outcome**: Core documentation files that provide an overview of the project, track progress, and guide AI assistants.

### Step 4: Create Template Files

1. Create template files for implementation guides, concept guides, and troubleshooting guides:

```bash
touch .concrete/templates/implementation-guide-template.md
touch .concrete/templates/concept-guide-template.md
touch .concrete/templates/troubleshooting-guide-template.md
```

2. Fill in the templates with appropriate content (see the templates directory for examples).

**Expected Outcome**: Template files that can be used to create consistent documentation.

### Step 5: Set Up System Prompt Symlink

1. Create a symlink from .concrete/system-prompt.md to .cursorrules:

```bash
# On Unix-like systems
ln -s .concrete/system-prompt.md .cursorrules

# On Windows (requires administrator privileges)
# mklink .cursorrules .concrete\system-prompt.md
```

**Expected Outcome**: A symlink that allows AI assistants to access the system prompt.

## Testing

To test the project setup, follow these steps:

1. Verify that all directories and files have been created:

```bash
find . -type d -not -path "*/\.*" | sort
find .concrete -type f | sort
```

2. Verify that the symlink works:

```bash
cat .cursorrules
```

3. Open the project in Cursor and verify that the AI assistant can access the system prompt.

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Symlink not working on Windows | Ensure you're running the command prompt as administrator |
| Files not showing up in Git | Ensure they're not being ignored by .gitignore |
| Markdown not rendering correctly | Check for syntax errors in the markdown files |

## Validation Checklist

- [ ] Project repository created
- [ ] Directory structure set up
- [ ] Core documentation files created
- [ ] Template files created
- [ ] System prompt symlink created
- [ ] All files committed to Git

## Next Steps

After completing this milestone, you should proceed to [01: Core System Implementation](./01-core-system-implementation.md) to implement the core system components.

## Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [Git Documentation](https://git-scm.com/doc)
- [Cursor AI Editor](https://cursor.sh/) 
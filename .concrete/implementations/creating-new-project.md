# Creating a New Project with Concrete

**Last Updated**: March 8, 2024  
**Related Guides**: [Template Format](../concepts/template-format.md), [Customization Points](../concepts/customization-points.md)  
**Prerequisite Knowledge**: Basic command line, Git, Markdown

## Overview

This guide walks you through the process of creating a new project using the Concrete templating system. It covers ideation, project brief creation, template selection, customization, and implementation.

## Prerequisites

Before starting, ensure you have:

1. **Git**: Installed and configured
2. **Cursor**: The AI-powered editor installed
3. **Node.js**: Version 16+ for running CLI tools (optional)

## Step 1: Ideation

The first step is to create an ideation document that describes your project at a high level.

### Creating an Ideation Document

1. Create a new directory for your project:

```bash
mkdir my-project
cd my-project
```

2. Create an ideation document:

```bash
mkdir -p .concrete/ideation
touch .concrete/ideation/initial-ideation.md
```

3. Open the ideation document in your editor and describe your project. Include:

- **Purpose**: What problem does your project solve?
- **Target Audience**: Who will use your project?
- **Key Features**: What are the main features?
- **Technical Requirements**: Any specific technical requirements?
- **Design Considerations**: Any design preferences or requirements?

Example:

```markdown
# Project Ideation: Task Manager

I want to create a task management application that helps users organize their work and personal tasks. The app should be simple to use but powerful enough for complex workflows.

## Key Features
- Task creation, editing, and deletion
- Task categorization and tagging
- Due dates and reminders
- Priority levels
- Filtering and sorting
- User authentication
- Data synchronization across devices

## Technical Requirements
- Web-based application
- React frontend
- Supabase for backend and authentication
- Mobile-responsive design
- Offline capability

## Design Considerations
- Clean, minimalist interface
- Dark and light mode
- Accessible to all users
- Intuitive navigation
```

## Step 2: Generate Project Brief

Once you have your ideation document, you can use Cursor to generate a project brief.

### Using Cursor to Generate a Brief

1. Open your project in Cursor:

```bash
cursor .
```

2. Ask Cursor to generate a project brief:

```
Please analyze my ideation document at .concrete/ideation/initial-ideation.md and generate a comprehensive project brief in .concrete/ideation/project-brief.md. The brief should include project specifications, open questions, and a proposed structure.
```

3. Review the generated project brief and refine it through dialogue with Cursor.

4. Once you're satisfied with the project brief, proceed to template selection.

## Step 3: Select a Template

Based on your project brief, select a template that best fits your needs.

### Available Templates

Concrete provides several templates:

1. **Base Template**: A minimal template for any application
2. **Full Stack Template**: Template for full-stack applications
3. **React/Supabase Template**: Template for React applications with Supabase backend

### Template Selection Process

1. Review available templates:

```bash
ls -la templates/
```

2. Read the documentation for each template:

```bash
cat templates/react-supabase/docs/overview.md
```

3. Select the template that best matches your project requirements.

## Step 4: Apply the Template

Once you've selected a template, you can apply it to your project.

### Using degit

The simplest way to apply a template is using degit:

```bash
npx degit unforced/Concrete/templates/react-supabase .
```

### Using Cursor

Alternatively, you can use Cursor to apply the template:

```
Please apply the React/Supabase template to my project. Use the project brief at .concrete/ideation/project-brief.md to customize the template.
```

## Step 5: Customize the Template

After applying the template, customize it to match your specific requirements.

### Customization Points

Each template has customization points defined in `concrete.yaml`. Review these points:

```bash
cat concrete.yaml
```

Example:

```yaml
customization_points:
  - name: "authentication"
    options: ["email", "oauth", "passwordless"]
    default: "email"
    description: "Authentication method to use"
  - name: "styling"
    options: ["styled-components", "tailwind", "css-modules"]
    default: "styled-components"
    description: "Styling approach to use"
```

### Customization Process

1. Create a customization file:

```bash
touch .concrete/customization.yaml
```

2. Specify your customization choices:

```yaml
authentication: "passwordless"
styling: "tailwind"
app_name: "TaskMaster"
```

3. Apply customizations using Cursor:

```
Please apply the customizations from .concrete/customization.yaml to the template.
```

## Step 6: Generate Implementation Guides

Once the template is customized, generate implementation guides.

### Using Cursor

Ask Cursor to generate implementation guides:

```
Please generate implementation guides based on the customized template and project brief. Place the guides in the .concrete/implementations directory.
```

## Step 7: Implement the Project

Follow the implementation guides to build your project.

### Implementation Process

1. Start with the first implementation guide:

```bash
cat .concrete/implementations/01-project-setup.md
```

2. Follow the steps in the guide to implement that part of the project.

3. Use Cursor for assistance:

```
I'm working on the project setup as described in .concrete/implementations/01-project-setup.md. Can you help me implement the first step?
```

4. Continue through each implementation guide until your project is complete.

## Step 8: Provide Feedback

As you implement your project, provide feedback to improve the templates.

### Feedback Process

1. Note any issues or improvements:

```bash
mkdir -p .concrete/feedback
touch .concrete/feedback/template-feedback.md
```

2. Document your feedback:

```markdown
# Template Feedback

## Authentication
- The passwordless authentication flow is too complex
- Suggestion: Simplify the OTP verification process

## Styling
- Tailwind integration works well
- The default color scheme is too bland
```

3. Share your feedback:

```
Please analyze my feedback in .concrete/feedback/template-feedback.md and suggest how it could be incorporated into the template.
```

## Troubleshooting

### Common Issues

1. **Template Application Fails**:
   - Ensure you're in the correct directory
   - Check that you have the necessary permissions
   - Try using a different method (degit vs. Cursor)

2. **Customization Not Applied**:
   - Verify the customization.yaml syntax
   - Check that the customization points exist in the template
   - Try applying customizations manually

3. **Implementation Guides Not Generated**:
   - Ensure the template is properly applied
   - Check that the project brief is comprehensive
   - Try generating guides for specific parts of the project

## Next Steps

After creating your project:

1. **Version Control**: Initialize a Git repository and commit your changes
2. **CI/CD**: Set up continuous integration and deployment
3. **Documentation**: Create user and developer documentation
4. **Testing**: Implement comprehensive tests
5. **Deployment**: Deploy your application to production

## Conclusion

Creating a new project with Concrete is a structured process that guides you from ideation to implementation. By following this process, you can create high-quality projects efficiently and contribute to the improvement of the templating system.

---

*This is a living document. As the Concrete system evolves, this guide will be updated to reflect the latest best practices and features.* 
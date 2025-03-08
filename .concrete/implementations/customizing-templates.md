# Customizing Templates

**Last Updated**: March 8, 2024  
**Related Guides**: [Template Format](../concepts/template-format.md), [Customization Points](../concepts/customization-points.md)  
**Prerequisite Knowledge**: YAML, Markdown, Basic Command Line

## Overview

This guide walks you through the process of customizing templates in the Concrete system. It covers how to identify customization points, configure them, and apply customizations to generate tailored projects.

## Prerequisites

Before customizing a template, ensure you have:

1. **Selected a Template**: Chosen a template that matches your project needs
2. **Reviewed Documentation**: Read the template's documentation to understand its capabilities
3. **Identified Customization Needs**: Determined which aspects of the template you need to customize

## Step 1: Identify Customization Points

The first step is to identify the customization points available in the template.

### Viewing Customization Points

1. Examine the template's `concrete.yaml` file:

```bash
cat templates/react-supabase/concrete.yaml
```

2. Look for the `customization_points` section:

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
```

3. Review the documentation for more details:

```bash
cat templates/react-supabase/docs/customization.md
```

### Using Cursor to Explore Customization Points

You can also use Cursor to explore customization points:

```
Please list all customization points available in the React/Supabase template and explain what each one does.
```

## Step 2: Plan Your Customizations

Based on your project requirements, decide which customization points you want to configure.

### Considerations

When planning customizations, consider:

1. **Project Requirements**: What features and technologies your project needs
2. **Team Expertise**: What technologies your team is familiar with
3. **Future Maintenance**: How easy the customized project will be to maintain
4. **Performance**: How the customizations will affect performance
5. **Dependencies**: How customization points depend on each other

### Example Customization Plan

For a task management application, you might plan:

```
- authentication: "passwordless" (for simpler user onboarding)
- styling: "tailwind" (for rapid UI development)
- state_management: "context" (for simplicity)
- offline_support: true (for mobile users)
- pwa: true (for installation on devices)
```

## Step 3: Create a Customization File

Create a YAML file to specify your customizations.

### Creating the File

1. Create a directory for your customizations:

```bash
mkdir -p .concrete/customization
```

2. Create a customization file:

```bash
touch .concrete/customization/customization.yaml
```

3. Edit the file to specify your customizations:

```yaml
# .concrete/customization/customization.yaml
project_name: "TaskMaster"
description: "A task management application"
author: "Your Name"
authentication: "passwordless"
styling: "tailwind"
state_management: "context"
offline_support: true
pwa: true
```

### Using Cursor to Create the Customization File

Alternatively, you can use Cursor to create the customization file:

```
Please create a customization file at .concrete/customization/customization.yaml with the following settings:
- Project name: TaskMaster
- Description: A task management application
- Authentication: passwordless
- Styling: tailwind
- State management: context
- Offline support: enabled
- PWA: enabled
```

## Step 4: Apply Customizations

Once you've created your customization file, you can apply it to the template.

### Using the CLI

If you have the Concrete CLI installed:

```bash
concrete apply react-supabase --customization=.concrete/customization/customization.yaml --target=./my-project
```

### Using degit and Manual Application

If you don't have the CLI:

1. Clone the template:

```bash
npx degit unforced/Concrete/templates/react-supabase my-project
cd my-project
```

2. Copy your customization file:

```bash
mkdir -p .concrete/customization
cp /path/to/customization.yaml .concrete/customization/
```

3. Apply customizations manually (this will be automated in the future):

```bash
# This is a placeholder for future automation
```

### Using Cursor to Apply Customizations

You can also use Cursor to apply customizations:

```
Please apply the customizations from .concrete/customization/customization.yaml to the React/Supabase template and generate a project in the current directory.
```

## Step 5: Verify Customizations

After applying customizations, verify that they were applied correctly.

### Checking Files

1. Check that files specific to your customizations were generated:

```bash
# For Tailwind CSS
ls tailwind.config.js

# For passwordless authentication
ls src/components/auth/PasswordlessAuth.tsx
```

2. Check that configuration files reflect your customizations:

```bash
cat vite.config.ts
cat src/App.tsx
```

### Using Cursor to Verify Customizations

You can also use Cursor to verify customizations:

```
Please verify that the customizations were applied correctly by checking for Tailwind CSS configuration and passwordless authentication components.
```

## Step 6: Make Additional Customizations

After applying the initial customizations, you may want to make additional customizations that aren't covered by the template's customization points.

### Manual Customization

1. Identify files that need to be modified
2. Make changes to those files
3. Test the changes

### Using Cursor for Additional Customizations

You can use Cursor for more complex customizations:

```
I'd like to add a dark mode toggle to the application. Can you help me implement this?
```

## Best Practices

### For Simple Projects

1. **Start with Defaults**: Begin with default customization points
2. **Customize Incrementally**: Add customizations one at a time
3. **Test Frequently**: Test after each customization

### For Complex Projects

1. **Plan Thoroughly**: Create a detailed customization plan
2. **Document Decisions**: Document why you chose specific customizations
3. **Create Custom Components**: Create custom components for unique requirements
4. **Extend Templates**: Consider creating a specialized template for reuse

## Troubleshooting

### Common Issues

1. **Customization Not Applied**:
   - Ensure the customization file is in the correct location
   - Check that the customization point exists in the template
   - Verify the syntax of your customization file

2. **Conflicts Between Customizations**:
   - Check for dependencies between customization points
   - Ensure customizations are compatible with each other
   - Review the template documentation for constraints

3. **Missing Files**:
   - Verify that the template supports your customization
   - Check for conditional file inclusion based on customization points
   - Ensure the template is up to date

### Getting Help

If you encounter issues:

1. Check the template documentation
2. Review the [Customization Points](../concepts/customization-points.md) guide
3. Ask Cursor for assistance:

```
I'm having trouble with the authentication customization. The passwordless authentication component isn't being generated. Can you help me troubleshoot this?
```

## Next Steps

After customizing your template:

1. **Implement Your Project**: Follow the implementation guides for your template
2. **Provide Feedback**: Share your experience and suggestions for improvement
3. **Contribute**: Consider contributing your customizations back to the template

## Conclusion

Customizing templates in Concrete allows you to tailor projects to your specific needs while still benefiting from the structure and best practices provided by the template. By following this guide, you can effectively customize templates to create projects that meet your requirements.

---

*This is a living document. As the Concrete system evolves, this guide will be updated to reflect the latest best practices and features.* 
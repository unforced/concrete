# Milestone 3: Create Adaptive Concrete

This guide outlines the steps for creating the Adaptive Concrete template, which is designed to analyze and adapt to existing projects.

## Objectives

- Create a concrete template that can analyze an existing codebase
- Generate documentation that reflects the current state of the project
- Provide a foundation for capturing future ideas and directions
- Respect existing project structure and conventions

## Steps

### 1. Create Essential Directories

Create the basic directory structure for the adaptive concrete template:

```bash
mkdir -p adaptive/.concrete/conversations
mkdir -p adaptive/.concrete/ideation
mkdir -p adaptive/.concrete/guides
```

### 2. Create System Prompt

Create a specialized system prompt focused on repository analysis and adaptation:

```bash
touch adaptive/.concrete/system-prompt.md
```

The system prompt should include:
- Instructions for analyzing the existing repository structure
- Guidelines for identifying technologies and frameworks
- Directions for generating documentation based on analysis
- Approach for integrating with existing project conventions
- Instructions for helping capture future ideas and directions

### 3. Create Repository Analysis Script

Create a script to help analyze the repository:

```bash
touch adaptive/.concrete/guides/00-repository-analysis.md
```

This guide should include:
- Steps for scanning directory structure
- Methods for identifying key files and technologies
- Techniques for understanding project architecture
- Process for creating an inventory of major components
- Guidelines for respecting existing conventions

### 4. Create README Template

Create an adaptive README template:

```bash
touch adaptive/.concrete/README.md
```

The README should include:
- Placeholder sections to be filled based on repository analysis
- Structure for documenting existing components
- Framework for capturing project vision and goals
- Navigation guide for the project structure

### 5. Create Tracking Template

Create a minimal tracking template focused on current state:

```bash
touch adaptive/.concrete/tracking.md
```

The tracking template should include:
- Structure for documenting the current state of the project
- Framework for capturing existing components and features
- Placeholder for future milestones once new directions emerge
- Current status section that reflects the project as-is

### 6. Create Ideation Capture Guide

Create a guide for capturing new ideas:

```bash
touch adaptive/.concrete/guides/01-capturing-new-directions.md
```

This guide should include:
- Process for documenting new ideas and directions
- Method for updating the README with expanded vision
- Approach for creating milestones based on new directions
- Guidelines for evolving the project while respecting its foundations

### 7. Test Adaptive Concrete Template

Verify that the adaptive concrete template has the essential components needed to analyze an existing repository and provide a foundation for future development.

### 8. Commit Adaptive Concrete Template

```bash
git add adaptive
git commit -m "Create adaptive concrete template: Foundation for existing projects"
```

## User Actions

- [ ] Review the adaptive concrete template
- [ ] Provide feedback on the template structure
- [ ] Approve the adaptive concrete template

## Next Steps

Once the adaptive concrete template is complete, we can test it on an existing project to verify its effectiveness. 
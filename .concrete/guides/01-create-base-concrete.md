# Milestone 1: Create Base Concrete

This guide outlines the steps for creating the base Concrete template, which will serve as a generic foundation for any project.

## Objectives

- Create a non-specific concrete template suitable for any project
- Include basic git integration but remain otherwise flexible
- Ensure the template can be easily extended for specific project types

## Steps

### 1. Create Essential Directories

Create the basic directory structure for the base concrete template:

```bash
mkdir -p concrete-libs/base/.concrete/conversations
mkdir -p concrete-libs/base/.concrete/ideation
mkdir -p concrete-libs/base/.concrete/guides
```

### 2. Create System Prompt

Create a generic system prompt that can be adapted to any project:

```bash
touch concrete-libs/base/.concrete/system-prompt.md
```

The system prompt should include:
- General guidelines for AI assistance
- Instructions for maintaining project structure
- Guidelines for conversation management
- Instructions for documentation and testing

### 3. Create README Template

Create a generic README template that can be customized for any project:

```bash
touch concrete-libs/base/.concrete/README.md
```

The README should include:
- Project overview section (to be filled in)
- Project structure section
- Milestones section (to be filled in)
- How to use the project section

### 4. Create Tracking Template

Create a generic tracking template:

```bash
touch concrete-libs/base/.concrete/tracking.md
```

The tracking template should include:
- Milestones section (to be filled in)
- Current status section
- Next steps section

### 5. Create Initial Guide Template

Create a template for the project setup guide:

```bash
touch concrete-libs/base/.concrete/guides/00-project-setup.md
```

The guide template should include:
- Objectives section
- Steps section
- User actions section
- Next steps section

### 6. Test Base Concrete Template

Verify that the base concrete template has all the necessary components and can be easily adapted to different project types.

### 7. Commit Base Concrete Template

```bash
git add concrete-libs/base
git commit -m "Create base concrete template: Generic foundation for any project"
```

## User Actions

- [ ] Review the base concrete template
- [ ] Provide feedback on the template structure
- [ ] Approve the base concrete template

## Next Steps

Once the base concrete template is complete, we will move on to Milestone 2: Create Vite-Supabase Concrete. 
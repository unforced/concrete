# Milestone 1: Create Base Concrete

This guide outlines the steps for creating the base Concrete template, which will serve as a generic foundation for any project.

## Objectives

- Create a minimal, non-specific concrete template suitable for any project
- Focus on facilitating conversation flow and adaptation to user vision
- Ensure the template can be easily extended for specific project types

## Steps

### 1. Create Essential Directories

Create the basic directory structure for the base concrete template:

```bash
mkdir -p base/.concrete/conversations
mkdir -p base/.concrete/ideation
mkdir -p base/.concrete/guides
```

### 2. Create System Prompt

Create a generic system prompt focused on maintaining conversational flow:

```bash
touch base/.concrete/system-prompt.md
```

The system prompt should include:
- Guidelines for facilitating conversation with the user
- Instructions for adapting to the user's vision
- Guidelines for conversation management and documentation
- Instructions for helping users share ideas via ideation or chat

### 3. Create README Template

Create a simple README template that explains the structure:

```bash
touch base/.concrete/README.md
```

The README should include:
- Brief explanation of the Concrete system
- Description of the folder structure
- Instructions for users on how to share their vision
- Guidance on using ideation documents and conversations

### 4. Create Tracking Template

Create a minimal tracking template:

```bash
touch base/.concrete/tracking.md
```

The tracking template should include:
- Basic structure for tracking progress
- Current status section
- Next steps section

### 5. Test Base Concrete Template

Verify that the base concrete template has the essential components needed to facilitate conversation and adapt to a user's vision.

### 6. Commit Base Concrete Template

```bash
git add base
git commit -m "Create base concrete template: Minimal foundation for any project"
```

## User Actions

- [ ] Review the base concrete template
- [ ] Provide feedback on the template structure
- [ ] Approve the base concrete template

## Next Steps

Once the base concrete template is complete, we will move on to Milestone 2: Create Vite-Supabase Concrete. 
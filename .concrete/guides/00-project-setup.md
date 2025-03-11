# Milestone 0: Project Setup

This guide outlines the steps for setting up the initial project structure for Concrete.

## Objectives

- Initialize the git repository
- Create the `.concrete` folder with essential files and directories
- Set up the project structure for concrete templates

## Steps

### 1. Initialize Git Repository

```bash
git init
```

### 2. Create `.concrete` Folder Structure

Create the essential directories:

```bash
mkdir -p .concrete/conversations .concrete/ideation .concrete/guides
```

### 3. Create Essential Files

Create the following files:
- `.concrete/system-prompt.md`: The system prompt for the AI assistant
- `.concrete/README.md`: Project documentation and navigation guide
- `.concrete/tracking.md`: Progress tracking and milestone management

### 4. Create Project Structure

Create the template directories:

```bash
mkdir -p base/.concrete vite-supabase/.concrete
```

### 5. Commit Initial Project Structure

```bash
git add .
git commit -m "Initial project setup: Create .concrete folder and project structure"
```

## User Actions

- [ ] Review the created structure and files
- [ ] Approve the initial commit
- [ ] Provide any additional requirements or modifications

## Next Steps

Once the project setup is complete, we will move on to Milestone 1: Create Base Concrete. 
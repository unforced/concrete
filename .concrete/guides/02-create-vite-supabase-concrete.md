# Milestone 2: Create Vite-Supabase Concrete

This guide outlines the steps for creating the Vite-Supabase Concrete template, which will serve as a specialized foundation for projects using React/Vite and Supabase.

## Objectives

- Build on the base concrete template
- Customize for React/Vite and Supabase projects
- Include project setup guide with boilerplate initialization
- Provide specific guidance for Supabase integration

## Steps

### 1. Copy Base Concrete Template

Copy the base concrete template to create the vite-supabase template:

```bash
cp -r concrete-libs/base/* concrete-libs/vite-supabase/
```

### 2. Customize System Prompt

Modify the system prompt to include specific guidelines for React/Vite and Supabase development:

```bash
nano concrete-libs/vite-supabase/.concrete/system-prompt.md
```

Add sections for:
- React/Vite best practices
- Supabase integration guidelines
- TypeScript usage
- Testing with Vitest and Testing Library

### 3. Customize README Template

Modify the README template to include specific sections for React/Vite and Supabase projects:

```bash
nano concrete-libs/vite-supabase/.concrete/README.md
```

Add sections for:
- Frontend architecture
- Backend architecture with Supabase
- Authentication flow
- Database schema
- API endpoints

### 4. Customize Tracking Template

Modify the tracking template to include common milestones for React/Vite and Supabase projects:

```bash
nano concrete-libs/vite-supabase/.concrete/tracking.md
```

Add example milestones for:
- Project setup with Vite
- Supabase setup and configuration
- Authentication implementation
- Database schema setup
- Frontend component development

### 5. Create Project Setup Guide

Create a detailed project setup guide for initializing a React/Vite project with Supabase:

```bash
nano concrete-libs/vite-supabase/.concrete/guides/00-project-setup.md
```

Include steps for:
- Initializing a boilerplate build with Vite, React 18, TypeScript, Vitest, Testing Library, TailwindCSS 3, Eslint and Prettier using `pnpm dlx degit joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate my-app`
- Setting up Supabase
- Configuring environment variables
- Installing necessary dependencies

### 6. Test Vite-Supabase Concrete Template

Verify that the vite-supabase concrete template has all the necessary components and provides clear guidance for React/Vite and Supabase projects.

### 7. Commit Vite-Supabase Concrete Template

```bash
git add concrete-libs/vite-supabase
git commit -m "Create vite-supabase concrete template: Specialized foundation for React/Vite and Supabase projects"
```

## User Actions

- [ ] Review the vite-supabase concrete template
- [ ] Provide feedback on the template structure and content
- [ ] Approve the vite-supabase concrete template

## Next Steps

Once the vite-supabase concrete template is complete, we will move on to Milestone 3: Create Bump Concrete. 
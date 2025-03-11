# Milestone 3: Create Bump Concrete

This guide outlines the steps for creating the Bump Concrete template, which will serve as a foundation for the Bump application.

## Objectives

- Build on the vite-supabase concrete template
- Prepare the template to receive user ideation input
- Create a minimal structure that can be refined based on user vision

## Steps

### 1. Copy Vite-Supabase Concrete Template

Copy the vite-supabase concrete template to create the bump template:

```bash
cp -r concrete-libs/vite-supabase/* concrete-libs/bump/
```

### 2. Create Placeholder for Ideation Document

Create a placeholder for the user's ideation document:

```bash
touch concrete-libs/bump/.concrete/ideation/README.md
```

Add instructions in the README.md for users to place their vision document in the ideation folder.

### 3. Update System Prompt

Modify the system prompt to include instructions for processing user ideation input:

```bash
nano concrete-libs/bump/.concrete/system-prompt.md
```

Add instructions for:
- Reading and understanding user ideation documents
- Refining the concrete structure based on user vision
- Guiding the conversation to clarify requirements

### 4. Update README Template

Modify the README template to include instructions for users:

```bash
nano concrete-libs/bump/.concrete/README.md
```

Add sections for:
- How to provide vision and requirements
- How to use the ideation folder
- Next steps after providing vision

### 5. Test Bump Concrete Template

Verify that the bump concrete template is ready to receive user ideation input and can be refined accordingly.

### 6. Commit Bump Concrete Template

```bash
git add concrete-libs/bump
git commit -m "Create bump concrete template: Foundation for the Bump application"
```

## User Actions

- [ ] Review the bump concrete template
- [ ] Provide feedback on the template structure
- [ ] Add ideation document to refine the template

## Next Steps

Once the bump concrete template is complete and the user has provided their ideation document, the system will refine the template to match the user's vision for the Bump application. 
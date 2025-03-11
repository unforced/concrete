# Milestone 3: Create Bump Concrete

This guide outlines the steps for creating the Bump Concrete template, which will serve as a specialized foundation for the Bump application.

## Objectives

- Build on the vite-supabase concrete template
- Customize for the specific needs of the Bump application
- Incorporate application-specific requirements and features
- Provide detailed guidance for implementing the Bump application

## Steps

### 1. Copy Vite-Supabase Concrete Template

Copy the vite-supabase concrete template to create the bump template:

```bash
cp -r concrete-libs/vite-supabase/* concrete-libs/bump/
```

### 2. Create Ideation Document

Create an ideation document to capture the vision and requirements for the Bump application:

```bash
touch concrete-libs/bump/.concrete/ideation/bump-vision.md
```

The ideation document should include:
- Application purpose and goals
- Target audience
- Key features and functionality
- User experience considerations
- Technical requirements

### 3. Customize System Prompt

Modify the system prompt to include specific guidelines for the Bump application:

```bash
nano concrete-libs/bump/.concrete/system-prompt.md
```

Add sections for:
- Bump application architecture
- Feature implementation guidelines
- UI/UX standards
- Performance considerations
- Security requirements

### 4. Customize README Template

Modify the README template to include specific sections for the Bump application:

```bash
nano concrete-libs/bump/.concrete/README.md
```

Add sections for:
- Bump application overview
- Feature list
- User flows
- Data models
- API endpoints
- Deployment instructions

### 5. Customize Tracking Template

Modify the tracking template to include specific milestones for the Bump application:

```bash
nano concrete-libs/bump/.concrete/tracking.md
```

Add milestones for:
- Project setup
- Authentication implementation
- Core feature development
- UI implementation
- Testing and quality assurance
- Deployment

### 6. Create Milestone Guides

Create detailed guides for each milestone in the Bump application development:

```bash
mkdir -p concrete-libs/bump/.concrete/guides
touch concrete-libs/bump/.concrete/guides/00-project-setup.md
touch concrete-libs/bump/.concrete/guides/01-authentication.md
touch concrete-libs/bump/.concrete/guides/02-core-features.md
touch concrete-libs/bump/.concrete/guides/03-ui-implementation.md
touch concrete-libs/bump/.concrete/guides/04-testing.md
touch concrete-libs/bump/.concrete/guides/05-deployment.md
```

Each guide should include:
- Detailed steps for implementing the milestone
- Code examples and snippets
- Testing instructions
- User actions

### 7. Test Bump Concrete Template

Verify that the bump concrete template has all the necessary components and provides clear guidance for implementing the Bump application.

### 8. Commit Bump Concrete Template

```bash
git add concrete-libs/bump
git commit -m "Create bump concrete template: Specialized foundation for the Bump application"
```

## User Actions

- [ ] Review the bump concrete template
- [ ] Provide feedback on the template structure and content
- [ ] Approve the bump concrete template

## Next Steps

Once the bump concrete template is complete, the project will be ready for use in developing the Bump application or other similar applications. 
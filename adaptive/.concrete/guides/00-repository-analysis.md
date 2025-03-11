# Repository Analysis Guide

This guide outlines the process for analyzing an existing repository to understand its structure, technologies, and purpose. This analysis will be used to populate the `.concrete/README.md` and `.concrete/tracking.md` files.

## Objectives

- Understand the repository structure and organization
- Identify technologies, frameworks, and libraries in use
- Determine the project's purpose and goals
- Document the current state of the project

## Steps

### 1. Explore Directory Structure

Begin by exploring the top-level directories to understand the project organization:

```bash
ls -la
```

For each major directory, explore its contents to understand its purpose:

```bash
ls -la <directory_name>
```

Look for patterns in the directory structure that might indicate the project's architecture (e.g., MVC, microservices, etc.).

### 2. Identify Technologies

Look for key files that indicate the technologies in use:

- **Frontend**:
  - `package.json`: Node.js/JavaScript project
  - `angular.json`: Angular project
  - `next.config.js`: Next.js project
  - `vite.config.js`: Vite project
  - `webpack.config.js`: Webpack project

- **Backend**:
  - `requirements.txt`: Python project
  - `pom.xml`: Java/Maven project
  - `build.gradle`: Java/Gradle project
  - `Gemfile`: Ruby project
  - `composer.json`: PHP project
  - `go.mod`: Go project

- **Database**:
  - `.env` or configuration files for database connections
  - Migration files or schema definitions

- **DevOps**:
  - `Dockerfile` or `docker-compose.yml`: Docker
  - `.github/workflows`: GitHub Actions
  - `.gitlab-ci.yml`: GitLab CI
  - `Jenkinsfile`: Jenkins

### 3. Analyze Code Patterns

Examine key source files to understand the code structure and patterns:

- Look for main entry points (e.g., `main.py`, `index.js`, `App.js`)
- Identify major components or modules
- Note coding conventions and patterns

### 4. Review Existing Documentation

Look for existing documentation to understand the project's purpose and goals:

- `README.md` files
- Documentation directories
- Comments in code
- Issue trackers or project boards

### 5. Document Findings

Based on your analysis, document your findings:

#### Update README.md

Create or update `.concrete/README.md` with:

- Project name and brief description
- Technologies and frameworks used
- Project structure and organization
- Major components and features
- Getting started instructions (if available)

#### Update tracking.md

Create or update `.concrete/tracking.md` with:

- Current state of the project
- Inventory of existing components and features
- Any obvious next steps or TODOs

### 6. Validate with User

Present your findings to the user and ask for validation:

- Confirm your understanding of the project structure
- Verify the technologies identified
- Clarify the project's purpose and goals
- Ask for any additional context or information

## Example Analysis

Here's an example of what your analysis might look like:

```
Project: E-commerce Platform

Technologies:
- Frontend: React with Next.js
- Backend: Node.js with Express
- Database: PostgreSQL
- Authentication: Auth0
- Styling: Tailwind CSS

Project Structure:
- /pages: Next.js pages and API routes
- /components: React components
- /lib: Utility functions and API clients
- /styles: CSS and Tailwind configuration
- /public: Static assets

Major Components:
- Product catalog
- Shopping cart
- User authentication
- Checkout process
- Admin dashboard

Current State:
- Basic product catalog implemented
- Shopping cart functionality working
- User authentication integrated
- Checkout process partially implemented
- Admin dashboard not started
```

## Next Steps

Once you have completed the repository analysis and documented your findings, you can move on to helping the user capture new ideas and directions for the project using the [Capturing New Directions Guide](01-capturing-new-directions.md). 
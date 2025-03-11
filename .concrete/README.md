# Concrete

Concrete is the ultimate vibe coding companion, helping to bring structure to your vision to enable AI to more effectively execute. Concrete serves as the foundation for your application, to ensure the AI stays aligned.

## Project Vision

Concrete is a companion system that lives in a `.concrete` folder within any project, providing structure to help AI better execute on a user's vision. The goal of this specific project is to create the Concrete system itself, which will then be used to generate `.concrete` folders for other projects.

By providing a consistent structure and workflow, Concrete helps ensure that:
- AI assistants understand and maintain project documentation
- Users can easily share their vision and ideas
- Project progress is tracked and visible
- Development follows a structured, milestone-based approach

## Project Structure

### Core Components

- **`.concrete/`**: The Concrete system for this project
  - **`system-prompt.md`**: The system prompt for the AI assistant
  - **`README.md`**: This file - project documentation and navigation guide
  - **`tracking.md`**: Progress tracking and milestone management
  - **`conversations/`**: Summaries of AI-human interactions
  - **`ideation/`**: User thoughts and brainstorming
    - [`vision-refined.md`](.concrete/ideation/vision-refined.md): Initial vision for the Concrete system
  - **`guides/`**: Milestone-specific instruction files
    - [`00-project-setup.md`](.concrete/guides/00-project-setup.md): Guide for project setup
    - [`01-create-base-concrete.md`](.concrete/guides/01-create-base-concrete.md): Guide for creating base concrete
    - [`02-create-vite-supabase-concrete.md`](.concrete/guides/02-create-vite-supabase-concrete.md): Guide for creating vite-supabase concrete
    - [`03-create-adaptive-concrete.md`](.concrete/guides/03-create-adaptive-concrete.md): Guide for creating adaptive concrete

### Project Deliverables

- **`base/`**: Generic foundation template for any project
- **`vite-supabase/`**: Specialized template for React/Vite and Supabase projects
- **`adaptive/`**: Template designed to analyze and adapt to existing projects

## Milestones

### Milestone 0: Project Setup
- **Objective**: Initialize git repository, create project structure
- **Key Tasks**:
  - Create essential directories and files
  - Set up the basic structure for concrete templates
- **Guide**: [00-project-setup.md](.concrete/guides/00-project-setup.md)

### Milestone 1: Create Base Concrete
- **Objective**: Develop the generic foundation
- **Key Tasks**:
  - Create a minimal concrete template suitable for any project
  - Focus on facilitating conversation flow and adaptation to user vision
- **Guide**: [01-create-base-concrete.md](.concrete/guides/01-create-base-concrete.md)

### Milestone 2: Create Vite-Supabase Concrete
- **Objective**: Develop specialized template for React/Vite and Supabase projects
- **Key Tasks**:
  - Build on the base template
  - Add specific structure for React/Vite and Supabase projects
  - Include project setup guide with boilerplate initialization
- **Guide**: [02-create-vite-supabase-concrete.md](.concrete/guides/02-create-vite-supabase-concrete.md)

### Milestone 3: Create Adaptive Concrete
- **Objective**: Develop template that can analyze and adapt to existing projects
- **Key Tasks**:
  - Create system for repository analysis
  - Generate documentation reflecting current project state
  - Provide foundation for capturing future ideas and directions
- **Guide**: [03-create-adaptive-concrete.md](.concrete/guides/03-create-adaptive-concrete.md)

## How to Use This Repository

This repository serves as both an implementation of Concrete and a library of Concrete templates for other projects. To use it:

1. Clone this repository
2. Choose a template (`base/`, `vite-supabase/`, or `adaptive/`) that matches your project needs
3. Copy the chosen template's `.concrete` folder to your project
4. Follow the guides in the `.concrete/guides/` folder to develop your project

## Conversations

Important discussions about the project are documented in the `.concrete/conversations/` folder:
- [2024-03-11-project-setup.md](.concrete/conversations/2024-03-11-project-setup.md): Initial project setup
- [2024-03-11-base-concrete-implementation.md](.concrete/conversations/2024-03-11-base-concrete-implementation.md): Base concrete implementation
- [2024-03-11-vite-supabase-concrete-implementation.md](.concrete/conversations/2024-03-11-vite-supabase-concrete-implementation.md): Vite-Supabase concrete implementation
- [2024-03-11-repository-structure-simplification.md](.concrete/conversations/2024-03-11-repository-structure-simplification.md): Repository structure simplification

## Contributing

Contributions to improve the Concrete system are welcome. Please ensure that any contributions maintain the structured approach that makes Concrete effective. 
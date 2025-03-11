# Concrete

Concrete is the ultimate vibe coding companion, helping to bring structure to your vision to enable AI to more effectively execute. Concrete serves as the foundation for your application, to ensure the AI stays aligned.

## Project Overview

This project aims to create the Concrete system itself, which will then be used to generate `.concrete` folders for other projects. The Concrete system lives within the `.concrete` folder in any project and provides a structured foundation for AI-assisted development.

### Project Structure

- **`.concrete/`**: The Concrete system for this project
  - **`system-prompt.md`**: The system prompt for the AI assistant
  - **`README.md`**: This file - project documentation and navigation guide
  - **`tracking.md`**: Progress tracking and milestone management
  - **`conversations/`**: Summaries of AI-human interactions
  - **`ideation/`**: User thoughts and brainstorming
    - [`vision-refined.md`](.concrete/ideation/vision-refined.md): Initial vision for the Concrete system
  - **`guides/`**: Milestone-specific instruction files

- **`concrete-libs/`**: Template `.concrete` folders for different project types
  - **`base/`**: Generic foundation for any project
  - **`vite-supabase/`**: Specialized for React/Vite and Supabase projects
  - **`bump/`**: Specific implementation for the Bump application

- **`starter-projects/`**: Full example applications with their `.concrete` folders

## Milestones

0. **Project Setup**: Initialize git repository, create project structure
   - Create essential directories and files
   - Set up the basic structure for concrete-libs

1. **Create Base Concrete**: Develop the generic foundation
   - Create a non-specific concrete template suitable for any project
   - Include basic git integration but remain otherwise flexible

2. **Create Vite-Supabase Concrete**: Develop specialized template
   - Build on the base template
   - Add specific structure for React/Vite and Supabase projects
   - Include project setup guide with boilerplate initialization

3. **Create Bump Concrete**: Develop application-specific template
   - Build on the vite-supabase template
   - Customize for the specific needs of the Bump application

## How to Use This Repository

This repository serves as both an implementation of Concrete and a tool for generating Concrete templates for other projects. To use it:

1. Clone this repository
2. Choose a template from `concrete-libs/` that matches your project needs
3. Copy the chosen template to your project as a `.concrete` folder
4. Follow the guides in the `.concrete/guides/` folder to develop your project

## Contributing

Contributions to improve the Concrete system are welcome. Please ensure that any contributions maintain the structured approach that makes Concrete effective. 
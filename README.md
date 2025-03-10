# Concrete

Concrete is an AI-powered system that helps create consistent, well-structured projects through conversational AI development. The name "Concrete" comes from "Converse & Create" - emphasizing the conversational approach to project creation.

## Overview

Concrete generates `.concrete` directories that serve as intelligent guides for AI assistants like Cursor, providing context and structure for building applications and other digital artifacts. These `.concrete` directories contain:

- Implementation guides for project milestones
- Concept guides explaining core concepts
- Templates for consistent code and documentation
- Troubleshooting guides for common issues

## Getting Started

To use Concrete to create a new project, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/concrete.git
   cd concrete
   ```

2. Create a new project ideation document:
   - Copy the template from `.concrete/templates/ideation-template.md`
   - Fill in the template with your project ideas
   - Save it as `.concrete/ideation/my-project-ideation.md`

3. Start a conversation with the AI assistant (in Cursor):
   - Tell the assistant about your project ideation document
   - Ask it to analyze your ideation and create a project brief
   - Review and refine the project brief through conversation

4. Generate implementation guides:
   - Once the project brief is finalized, ask the AI to generate implementation guides
   - These will be created in the `.concrete/implementations` directory

5. Start implementing your project following the guides

## Starter Templates

Concrete includes starter templates for different types of projects:

- React + Supabase Application - A template for building web applications with React and Supabase

To use a starter template, ask the AI assistant to generate a new project based on one of these templates and your project brief.

## Documentation

All documentation for Concrete is located in the `.concrete` directory:

- [Project Overview](./.concrete/project.md) - Overview of the Concrete project and its requirements
- [Project Tracking](./.concrete/tracking.md) - Current status and progress of the project
- [System Prompt](./.concrete/system-prompt.md) - System prompt for AI assistants

## Directory Structure

```
concrete/
├── .concrete/               # Documentation and resources for Concrete itself
│   ├── index.md             # Navigation guide
│   ├── project.md           # Project overview
│   ├── tracking.md          # Project progress
│   ├── system-prompt.md     # AI instructions
│   ├── ideation/            # Project ideation documents
│   ├── implementations/     # Implementation guides
│   ├── concepts/            # Concept guides
│   ├── templates/           # Templates
│   └── troubleshooting/     # Troubleshooting guides
├── apps/                    # Generated app examples
├── templates/               # Base templates for different project types
└── .cursorrules             # Symlink to .concrete/system-prompt.md
```

## Feedback and Improvement

Concrete is designed to improve over time through user feedback. Each project generated with Concrete includes a `feedback.md` file where you can document what worked well, challenges encountered, and suggestions for improvement.

## Contributing

If you'd like to contribute to Concrete, please follow these guidelines:

1. Read the existing documentation to understand the project's goals and structure.
2. Check the [Project Tracking](./.concrete/tracking.md) to see what needs to be done.
3. Follow the templates when creating new documentation.
4. Submit your changes for review.

## License

MIT 
# Concrete

Concrete is the ultimate vibe coding companion, helping to bring structure to your vision to enable AI to more effectively execute. Concrete serves as the foundation for your application, to ensure the AI stays aligned.

## AI Assistant Guidelines

You are an AI assistant helping to develop the Concrete system, a structured foundation for AI-assisted development projects. This README serves as both project documentation and your system prompt.

### Core Principles

1. **Structured Development**: Follow the milestones defined in this README and the `.concrete/tracking.md` file. Each milestone should have a corresponding guide file in the `.concrete/guides/` folder.

2. **Regular Updates**: Update `.concrete/tracking.md` after completing significant tasks or milestones. Make regular, descriptive git commits with meaningful messages.

3. **Conversation Management**: After substantial conversations with the user, offer to save a summary in the `.concrete/conversations/` folder with the format `{date-of-convo}-{title-of-convo}.md`.

4. **User Collaboration**: Always articulate your plan of action and ask for user approval before executing it. Ask clarifying questions when the user's intent is unclear.

5. **Documentation**: Ensure all code and systems are well-documented. This README should serve as the central navigation point and project overview.

6. **Testing and Quality**: Regularly test code and ensure it meets quality standards. Follow best practices for the specific technologies being used.

### Conversation Guidelines

1. **Active Listening**: When the user shares ideas, either in chat or through `.concrete/ideation/` documents, listen attentively and ask questions to ensure you fully understand their vision.

2. **Clarification**: If something is unclear, ask specific questions to gain clarity rather than making assumptions.

3. **Summarization**: Periodically summarize the conversation to ensure alignment and offer to save important conversations in the `.concrete/conversations/` folder.

4. **Ideation Support**: Encourage users to share their thoughts in the `.concrete/ideation/` folder and help them refine their ideas.

### Documentation Guidelines

1. **README Maintenance**: Keep this README updated with the current project vision and structure. This is the central document for the project and should always reflect the current state and goals.
   - After creating a new conversation summary, always update the Conversations section in this README
   - When project structure changes, immediately update the relevant sections
   - When milestones are completed or modified, reflect these changes in the Milestones section
   - Ensure any significant architectural decisions are documented here

2. **Tracking Progress**: Regularly update the `.concrete/tracking.md` file after completing tasks or milestones. Mark completed items with [x] and update the current status and next steps sections.

3. **Conversation Records**: After substantial conversations, offer to save a summary in the `.concrete/conversations/` folder with the format `{date-of-convo}-{title-of-convo}.md`.
   - Always update the Conversations section in this README with a link to the new summary
   - Include a brief description of what the conversation covered
   - Ensure any key decisions from the conversation are reflected in other relevant sections of this README

4. **Git Commits**: Make regular, descriptive git commits with meaningful messages after significant changes or milestone completions.

### Adaptation Guidelines

1. **Vision Adaptation**: As the user shares their vision (through conversation or ideation documents), adapt this README to reflect this evolving understanding.

2. **Milestone Adaptation**: Create or modify milestones in both this README and `.concrete/tracking.md` based on the user's goals.

3. **Guide Creation**: Create guide files in `.concrete/guides/` for each milestone as the project develops.

4. **Continuous Refinement**: Continuously refine all documentation based on ongoing conversations and project evolution.

### Workflow

1. Consult this README for project overview and milestones
2. Check `.concrete/tracking.md` for current progress and next steps
3. Reference the appropriate guide file in `.concrete/guides/` for the current milestone
4. Engage with the user to clarify requirements and get approval
5. Execute the plan, making regular updates to `.concrete/tracking.md`
6. Commit changes with descriptive messages
7. Offer to save conversation summaries in `.concrete/conversations/` at meaningful points

## Project Vision

Concrete is a companion system that lives in a `.concrete` folder within any project, providing structure to help AI better execute on a user's vision. The goal of this specific project is to create the Concrete system itself, which will then be used to generate `.concrete` folders for other projects.

By providing a consistent structure and workflow, Concrete helps ensure that:
- AI assistants understand and maintain project documentation
- Users can easily share their vision and ideas
- Project progress is tracked and visible
- Development follows a structured, milestone-based approach

### Web Interface Vision

The next phase of Concrete involves creating a web interface with a chatbot that helps users develop their project vision and generate appropriate .concrete structures. Key components include:

1. **Conversational AI Interface**: A chatbot that guides users through vision refinement with optional voice capabilities
2. **Visualization Tools**: Mind-mapping and real-time preview of the .concrete structure being built
3. **Multi-modal Input**: Support for sketches, file uploads, and template customization
4. **Export & Integration**: One-click export and direct integration with development environments
5. **Collaborative Features**: Shared sessions and version history for team-based development

This web interface will make Concrete more accessible to users who prefer a guided approach to project setup and ideation.

## Project Structure

### Concrete System Structure

The Concrete system lives within the `.concrete` folder and consists of:

1. **`README.md`**: This file - serves as both project documentation and AI system prompt
2. **`tracking.md`**: Progress tracking and milestone management
3. **`guides/`**: Contains step-by-step guides for implementing project milestones
4. **`conversations/`**: Summaries of AI-human interactions
5. **`ideation/`**: User thoughts and brainstorming

### Core Components

- **`.concrete/`**: The Concrete system for this project
  - **`README.md`**: This file - project documentation and AI system prompt
  - **`tracking.md`**: Progress tracking and milestone management
  - **`conversations/`**: Summaries of AI-human interactions
  - **`ideation/`**: User thoughts and brainstorming
    - [`vision-refined.md`](.concrete/ideation/vision-refined.md): Initial vision for the Concrete system
    - [`expanded-next-phase.md`](.concrete/ideation/expanded-next-phase.md): Expanded vision for the web interface
    - [`web-interface-mvp-plan.md`](.concrete/ideation/web-interface-mvp-plan.md): Detailed implementation plan for the web interface MVP
    - [`web-interface-design-concepts.md`](.concrete/ideation/web-interface-design-concepts.md): UX principles, visual design, and wireframes
    - [`web-interface-user-personas.md`](.concrete/ideation/web-interface-user-personas.md): Detailed user personas and design implications
    - [`web-interface-conversation-flow.md`](.concrete/ideation/web-interface-conversation-flow.md): Chatbot conversation patterns and scripts
  - **`guides/`**: Milestone-specific instruction files
    - [`00-project-setup.md`](.concrete/guides/00-project-setup.md): Guide for project setup
    - [`01-create-base-concrete.md`](.concrete/guides/01-create-base-concrete.md): Guide for creating base concrete
    - [`02-create-vite-supabase-concrete.md`](.concrete/guides/02-create-vite-supabase-concrete.md): Guide for creating vite-supabase concrete
    - [`03-create-adaptive-concrete.md`](.concrete/guides/03-create-adaptive-concrete.md): Guide for creating adaptive concrete
    - [`04-web-interface-development.md`](.concrete/guides/04-web-interface-development.md): Guide for web interface development

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

### Milestone 4: Web Interface Development
- **Objective**: Create a web interface with chatbot for generating .concrete structures
- **Key Tasks**:
  - Design and implement conversational AI interface
  - Develop visualization tools for project structure
  - Create multi-modal input methods
  - Implement export and integration options
  - Add collaborative features
- **Guide**: [04-web-interface-development.md](.concrete/guides/04-web-interface-development.md)

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
- [2024-03-15-readme-system-prompt-consolidation.md](.concrete/conversations/2024-03-15-readme-system-prompt-consolidation.md): Combining README.md and system-prompt.md into a single file for simplicity and better maintenance
- [2024-05-15-next-phase-ideation.md](.concrete/conversations/2024-05-15-next-phase-ideation.md): Exploring ideas for the web interface and chatbot experience for the next phase of Concrete
- [2024-05-15-web-interface-mvp-planning.md](.concrete/conversations/2024-05-15-web-interface-mvp-planning.md): Detailed implementation planning for the web interface MVP
- [2024-05-15-web-interface-design-phase.md](.concrete/conversations/2024-05-15-web-interface-design-phase.md): Design phase work including user personas, design concepts, and conversation flow

## Contributing

Contributions to improve the Concrete system are welcome. Please ensure that any contributions maintain the structured approach that makes Concrete effective. 
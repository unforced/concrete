# Concrete

Concrete is an AI-powered system that helps create consistent, well-structured projects through conversational AI development. The name "Concrete" comes from "Converse & Create" - emphasizing the conversational approach to project creation.

## Project Vision

Concrete generates `.concrete` directories that serve as intelligent guides for AI assistants like Cursor, providing context and structure for building applications and other digital artifacts. These `.concrete` directories contain documentation and resources that help guide the development process through conversation-driven development.

## Problem Statement

Developers often spend significant time setting up new projects, implementing boilerplate code, and establishing best practices. This process is repetitive and time-consuming, especially when starting new projects or working with unfamiliar technologies. Additionally, while AI assistants can generate code, they often lack the context and structure needed to create cohesive, well-organized projects.

## Solution

Concrete addresses these challenges by providing:

1. **Conversational Project Creation**: Transform ideation conversations into structured project guides
2. **Intelligent Resource Generation**: Generate implementation guides, concept guides, templates, and troubleshooting resources
3. **Interconnected Documentation**: Create cross-linked resources that provide context for AI assistants
4. **Customization and Flexibility**: Support various project types and structures with customizable templates
5. **Learning and Evolution**: Improve templates based on feedback and successful implementations

## Directory Structure

```
.concrete/
├── README.md              # Project overview and structure
├── tracking.md            # Project tracking and status
├── system-prompt.md       # System prompt for AI assistants
├── conversations/         # Record of important discussions
│   ├── README.md          # Guide to using conversation summaries
│   └── template.md        # Template for conversation summaries
├── starters/              # Specifications for starter templates
├── ideation/              # Project ideation documents
├── concepts/              # Concept guides explaining core concepts
└── templates/             # Templates and examples
```

## Core Principles

### Conversational Approach

Concrete is built on a conversational approach to development:

1. **Ideation → Dialogue → Understanding → Action**
   - Start with user ideas or requirements
   - Engage in conversation to explore and refine ideas
   - Ensure mutual understanding before proceeding
   - Take incremental steps with user approval

2. **Conversation Documentation**
   - Document key discussions in the conversations directory
   - Include decisions, rationale, and open questions
   - Use conversation summaries as reference for implementation

3. **Checkpoints and Sign-off**
   - Present plans before execution
   - Seek explicit approval before creating or modifying files
   - Propose small, incremental changes rather than large transformations

### Multi-layered Document Approach

Concrete uses a layered approach to document development:

1. **Document Progression**
   - One document leads to conversation
   - Conversation leads to mutual understanding
   - Understanding leads to multiple new documents
   - Each document becomes another point of conversation

2. **Incremental Development**
   - Start with high-level documents
   - Progress to more detailed documents
   - Ensure user approval at each stage
   - Allow for revision and refinement throughout the process

## Current Focus

Our current focus is on developing:

1. **Starter Templates**
   - Create specifications for React/Vite + Supabase starter template
   - Generate a fully working starter application
   - Enable easy adoption through degit or similar tools

2. **Conversation-Driven Development**
   - Enhance the conversational approach
   - Improve documentation of discussions
   - Ensure mutual understanding before action

## Getting Started

To use Concrete to create a new project, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/concrete.git
   cd concrete
   ```

2. Create a new project ideation document in the `.concrete/ideation/` directory

3. Start a conversation with the AI assistant (in Cursor):
   - Tell the assistant about your project ideation document
   - Ask it to analyze your ideation and create a project brief
   - Review and refine the project brief through conversation

4. Document important conversations in the `.concrete/conversations/` directory

5. Start implementing your project following the conversation-driven approach

## Feedback and Improvement

Concrete is designed to improve over time through user feedback. Each project generated with Concrete includes a feedback mechanism where you can document what worked well, challenges encountered, and suggestions for improvement.

## Contributing

If you'd like to contribute to Concrete, please follow these guidelines:

1. Read the existing documentation to understand the project's goals and structure
2. Check the [Project Tracking](./.concrete/tracking.md) to see what needs to be done
3. Engage in conversation before making significant changes
4. Document your discussions in the conversations directory
5. Follow the conversational approach to development

## License

MIT 
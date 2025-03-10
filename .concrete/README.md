# Concrete Project

**Date**: March 10, 2025  
**Authors**: Unforced, Claude 3.7 Sonnet

## Project Vision

Concrete is an AI-powered system that helps create consistent, well-structured projects through conversational AI development. The name "Concrete" comes from "Converse & Create" - emphasizing the conversational approach to project creation. Concrete generates `.concrete` directories that serve as intelligent guides for AI assistants like Cursor, providing context and structure for building applications and other digital artifacts.

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

The `.concrete` directory contains all the documentation and resources for the Concrete project:

```
.concrete/
├── README.md              # This file - project overview and structure
├── tracking.md            # Project tracking and status
├── system-prompt.md       # System prompt for AI assistants
├── conversations/         # Record of important discussions
│   ├── README.md          # Guide to using conversation summaries
│   └── template.md        # Template for conversation summaries
├── ideation/              # Project ideation documents
├── starters/              # Specifications for starter templates
├── implementations/       # Implementation guides for milestones
├── concepts/              # Concept guides explaining core concepts
└── troubleshooting/       # Troubleshooting guides
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

3. **User Action Guidance**
   - Clearly specify required user actions
   - Provide guidance for setup tasks
   - Adapt to different project types

## Key Components

### Conversations

The `conversations/` directory contains summaries of important discussions that bridge ideation and implementation. These summaries preserve key insights, decisions, and action items that emerge during the development process.

### Ideation

The `ideation/` directory contains initial project ideas and requirements. These documents serve as the starting point for conversations and eventual implementation.

### Starters

The `starters/` directory contains specifications for starter templates that can be used to quickly bootstrap new projects. These specifications are used to generate fully working starter applications.

### Implementations

The `implementations/` directory contains step-by-step guides for implementing project milestones. These guides provide detailed instructions, code examples, and validation criteria.

### Concepts

The `concepts/` directory contains explanations of core concepts and patterns used in the project. These guides help users understand the underlying principles and best practices.

### Troubleshooting

The `troubleshooting/` directory contains solutions for common issues that users might encounter. These guides provide diagnostic procedures, solutions, and prevention strategies.

## How to Use This Project

1. **Start with Ideation**
   - Create an ideation document describing your project
   - Engage in conversation with the AI assistant to refine your ideas

2. **Document Conversations**
   - Summarize key discussions in the conversations directory
   - Use these summaries as reference for implementation

3. **Generate Implementation Guides**
   - Once your project is well-defined, generate implementation guides
   - Follow these guides to build your project

4. **Reference Concept Guides**
   - Use concept guides to understand underlying principles
   - Apply these concepts in your implementation

5. **Troubleshoot Issues**
   - Refer to troubleshooting guides when you encounter problems
   - Contribute new solutions based on your experience

## Contributing

If you'd like to contribute to Concrete, please follow these guidelines:

1. Read this README to understand the project's goals and structure
2. Check the tracking.md file to see what needs to be done
3. Engage in conversation before making significant changes
4. Document your discussions in the conversations directory
5. Follow the conversational approach to development

## References

- [Cursor AI Editor](https://cursor.sh/)
- [GitHub Copilot](https://github.com/features/copilot)
- [Yeoman Generator](https://yeoman.io/)
- [Create React App](https://create-react-app.dev/)
- [Next.js](https://nextjs.org/) 
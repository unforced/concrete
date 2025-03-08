# Concrete Project Brief

## Project Overview

Concrete is an AI-powered templating and project generation system designed to work within AI editors like Cursor. It transforms ideation documents into fully-realized project structures with implementation guides, concepts, templates, and other resources that help developers build applications efficiently.

The system follows a hierarchical approach to templates, allowing for specialization and inheritance, while continuously learning and improving based on user feedback and new implementations.

## Core Concepts

### Templating Hierarchy

Concrete uses a hierarchical template system:

1. **Base Templates**: Foundational templates that provide the most generic structure and guidance
2. **Specialized Templates**: Templates that inherit from base templates but are specialized for specific tech stacks (e.g., React/Supabase)
3. **App Implementations**: Concrete implementations of applications built using the templates (e.g., Bump)

This hierarchy allows for:
- Knowledge sharing between templates
- Specialization for specific use cases
- Continuous improvement as insights from implementations feed back into templates

### Workflow

The Concrete workflow consists of:

1. **Ideation**: User creates an initial ideation document describing their project
2. **Project Brief**: System generates a structured project brief with specifications and questions
3. **Refinement**: User interacts with the system to refine the brief
4. **Generation**: System generates the complete project structure with guides, concepts, and templates
5. **Implementation**: User follows the guides to implement the application
6. **Feedback**: Insights from implementation feed back into the template system

### Directory Structure

```
Concrete/
├── .concrete/                  # Core Concrete system files
│   ├── ideation/               # Ideation documents
│   │   ├── initial-ideation.md # Initial user ideas
│   │   └── project-brief.md    # Generated project brief
│   ├── templates/              # Template definitions
│   ├── concepts/               # Conceptual guides
│   ├── implementations/        # Implementation guides
│   ├── project.md              # Project overview
│   ├── index.md                # Entry point and navigation
│   └── .system-prompt          # System prompt for AI assistants
│
├── apps/                       # Concrete implementations of specific apps
│   └── Bump/                   # Bump app implementation
│       ├── implementations/    # Implementation guides for Bump
│       ├── templates/          # Templates used in Bump
│       ├── concepts/           # Conceptual guides for Bump
│       ├── troubleshooting/    # Troubleshooting guides for Bump
│       ├── index.md            # Entry point for Bump
│       ├── project.md          # Project overview for Bump
│       └── tracking.md         # Project tracking for Bump
│
└── templates/                  # Generalized templates derived from apps
    ├── base/                   # Base template for any application
    ├── full-stack/             # Template for full-stack applications
    └── react-supabase/         # Template specialized for React/Supabase apps
```

## System Components

### 1. Ideation Processing

- **Input**: Initial ideation document (markdown)
- **Process**: AI analyzes the document to understand project requirements
- **Output**: Structured project brief with specifications and questions

### 2. Project Brief Refinement

- **Input**: Project brief and user feedback
- **Process**: Iterative refinement through dialogue
- **Output**: Finalized project brief

### 3. Template Selection and Customization

- **Input**: Finalized project brief
- **Process**: Selection of appropriate template and customization
- **Output**: Customized template for the specific project

### 4. Guide Generation

- **Input**: Customized template and project brief
- **Process**: Generation of implementation guides, concepts, and other resources
- **Output**: Complete project structure

### 5. System Prompt Generation

- **Input**: Project structure
- **Process**: Creation of system prompt for AI assistants
- **Output**: .system-prompt file (symlinked to .cursorrules)

## Implementation Plan

### Phase 1: Core System Setup

1. Create the basic directory structure for the Concrete system
2. Define the template hierarchy and relationships
3. Create the system prompt generation mechanism
4. Implement the project brief generation from ideation documents

### Phase 2: Template Extraction

1. Analyze the Bump app implementation
2. Extract patterns and structures into a React/Supabase template
3. Further generalize into a full-stack template
4. Create a base template for any application

### Phase 3: Integration and Tooling

1. Create tools for template selection and customization
2. Implement mechanisms for template inheritance
3. Develop utilities for easy template installation (e.g., degit integration)
4. Create documentation for using the system

### Phase 4: Learning and Improvement

1. Implement feedback mechanisms for templates
2. Create systems for propagating improvements up and down the hierarchy
3. Develop metrics for template effectiveness
4. Build a community around template sharing and improvement

## Open Questions

1. **Template Format**: What is the most effective format for templates that balances flexibility with ease of use?
2. **Inheritance Mechanism**: How should template inheritance be implemented to allow for specialization while maintaining consistency?
3. **Versioning**: How should templates be versioned to track changes and improvements?
4. **Customization Points**: What are the key points where users should be able to customize templates?
5. **Integration Method**: What's the best way for users to integrate Concrete into their workflow (e.g., CLI, web interface, editor plugin)?
6. **Learning Mechanism**: How should the system capture and incorporate learnings from implementations?
7. **Community Aspects**: How can we foster a community around template sharing and improvement?
8. **Evaluation Metrics**: How do we measure the effectiveness of templates in helping users build applications?

## Next Steps

1. Review and refine this project brief through dialogue
2. Answer the open questions to clarify the system design
3. Begin implementing the core system components
4. Extract the React/Supabase template from the Bump app
5. Create the base template
6. Implement the template hierarchy and inheritance mechanism
7. Develop tools for template selection and customization
8. Create documentation for using the system 
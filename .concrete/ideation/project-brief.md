# Concrete Project Brief

## Project Overview

**Project Name**: Concrete  
**Date**: March 8, 2025
**Author**: Unforced, Claude 3.7 Sonnet

## Vision

Concrete is an AI-powered system that helps create consistent, well-structured projects through conversational AI development. The name "Concrete" comes from "Converse & Create" - emphasizing the conversational approach to project creation. Concrete generates `.concrete` directories that serve as intelligent guides for AI assistants like Cursor, providing context and structure for building applications and other digital artifacts.

## Primary Goals

1. Create a system that transforms ideation conversations into structured project guides
2. Enable quick transition from idea to implementation through AI-assisted development
3. Provide clear specifications for project structure, components, styles, and data models
4. Establish a framework that AI assistants can easily understand and work with
5. Support customization and evolution of project templates over time

## Immediate Focus

Our immediate goal is to create the `.concrete` directory for Concrete itself, along with a simple directory structure for this repository. This `.concrete` directory will serve as both:

1. A guide for developing Concrete (eating our own dog food)
2. A template for how other `.concrete` directories should be structured

## Core Components

The `.concrete` directory for Concrete should include:

1. **Project Documentation**
   - `project.md`: Comprehensive project overview and requirements
   - `tracking.md`: Project progress, milestones, and status
   - `index.md`: Navigation guide to all resources

2. **Implementation Guides**
   - Milestone-based guides for implementing Concrete
   - Each guide should link to relevant concepts, templates, and troubleshooting resources

3. **Concept Guides**
   - Explanations of core concepts in Concrete
   - Examples: template format, inheritance mechanism, customization points

4. **Templates**
   - Reusable patterns for creating resources within Concrete
   - Examples: implementation guide template, concept guide template

5. **Troubleshooting Guides**
   - Solutions for common issues when using Concrete
   - Best practices for resolving specific problems

6. **System Prompt**
   - `system-prompt.md`: Instructions for AI assistants on how to work with Concrete
   - Should be symlinked to `.cursorrules` in the root directory

## User Flow

The intended user flow for Concrete is:

1. User clones the Concrete repository
2. User starts a conversation with Cursor about what they want to create
3. Concrete (via Cursor) helps generate the appropriate folder structure in `apps/`
4. The generated app folder can be copied to a new project's `.concrete` directory
5. The `system-prompt.md` is symlinked to `.cursorrules` in the new project
6. The user can then use Cursor to build the project with full context

## Key Features

### 1. Conversational Project Creation

Concrete should be able to:
- Understand project requirements through natural conversation
- Ask clarifying questions to refine understanding
- Generate structured project briefs from ideation conversations
- Refine project briefs through further dialogue

### 2. Intelligent Resource Generation

Concrete should generate:
- Implementation guides tailored to the project
- Concept guides for important project patterns
- Templates for consistent code and documentation
- Troubleshooting guides for common issues

### 3. Interconnected Resources

Resources should be:
- Cross-linked for easy navigation
- Contextually relevant to each other
- Organized in a way that AI assistants can easily understand
- Structured to provide maximum context when needed

### 4. Customization and Flexibility

The system should:
- Support various project types and structures
- Allow customization of the `.concrete` directory structure
- Provide sensible defaults while enabling flexibility
- Adapt to different development workflows

### 5. Learning and Evolution

Concrete should:
- Recognize when it misses something important
- Invite edits to improve future performance
- Learn from successful project implementations
- Evolve templates based on best practices

## Technical Requirements

### Directory Structure

The initial directory structure for Concrete should include:

```
concrete/
├── .concrete/
│   ├── index.md                # Navigation guide
│   ├── project.md              # Project overview
│   ├── tracking.md             # Project progress
│   ├── system-prompt.md        # AI instructions (symlinked to .cursorrules)
│   ├── implementations/        # Implementation guides
│   ├── concepts/               # Concept guides
│   ├── templates/              # Templates
│   └── troubleshooting/        # Troubleshooting guides
├── apps/                       # Generated app templates
│   └── bump/                   # Example app template
├── templates/                  # Base templates for different project types
│   ├── base/                   # Base template
│   └── specialized/            # Specialized templates
└── .cursorrules                # Symlink to .concrete/system-prompt.md
```

### Content Requirements

1. **Implementation Guides**
   - Should follow a consistent format
   - Include clear objectives, prerequisites, and steps
   - Link to relevant concepts, templates, and troubleshooting guides
   - Provide validation criteria for completion

2. **Concept Guides**
   - Should explain core concepts clearly
   - Include examples and best practices
   - Reference related concepts and implementation guides
   - Provide context for why the concept is important

3. **Templates**
   - Should be easily adaptable
   - Include placeholders for customization
   - Provide clear instructions for use
   - Follow best practices for the relevant domain

4. **System Prompt**
   - Should provide clear instructions for AI assistants
   - Explain the purpose and structure of Concrete
   - Guide the AI in helping users create projects
   - Include examples of effective interactions

## Open Questions

1. **Template Inheritance**: How should we implement the inheritance mechanism between templates? Should it be file-based, metadata-based, or something else?

2. **Customization Points**: What's the best syntax for defining customization points in templates? Should we use a special markup or leverage existing formats like YAML front matter?

3. **Learning Mechanism**: How should Concrete track and incorporate feedback? Should we use a dedicated feedback file, annotations in existing files, or something else?

4. **AI Integration**: How tightly should Concrete integrate with specific AI assistants like Cursor? Should we provide adapter layers for different assistants?

5. **Versioning**: How should we handle versioning of templates and `.concrete` directories? Should we use semantic versioning, git tags, or something else?

## Success Criteria

The initial implementation of Concrete will be successful if:

1. We create a complete `.concrete` directory for Concrete itself
2. The directory structure is clear, navigable, and well-documented
3. The system prompt effectively guides AI assistants in working with Concrete
4. We can use Concrete to help develop itself (meta-development)
5. The structure is flexible enough to support various project types in the future

## Next Steps

1. Create the basic directory structure for Concrete
2. Develop the core documentation (project.md, tracking.md, index.md)
3. Create the system prompt for AI assistants
4. Develop implementation guides for key milestones
5. Create concept guides for core concepts
6. Develop templates for creating resources
7. Create troubleshooting guides for common issues

## Timeline

This is a preliminary timeline for developing the `.concrete` directory for Concrete:

1. **Week 1**: Create basic directory structure and core documentation
2. **Week 2**: Develop system prompt and initial implementation guides
3. **Week 3**: Create concept guides and templates
4. **Week 4**: Develop troubleshooting guides and refine all resources
5. **Week 5**: Test the system by using it to develop itself further 
# Workflow: From Ideation to Implementation

This guide explains the process of using Concrete to take a project from initial idea to implementation.

## Overview

The Concrete workflow follows these key steps:

1. **Ideation**: Capture your initial project ideas in an ideation document
2. **Project Brief**: Refine your ideas into a structured project brief
3. **Guide Generation**: Generate implementation guides based on the project brief
4. **Implementation**: Build your project following the implementation guides
5. **Feedback**: Provide feedback to improve the process

## Step 1: Ideation

The first step is to capture your initial project ideas in an ideation document.

### Creating an Ideation Document

1. Copy the ideation template:
   ```bash
   cp .concrete/templates/ideation-template.md .concrete/ideation/my-project-ideation.md
   ```

2. Fill in the template with your project ideas:
   - Project overview
   - Problem statement
   - Target users
   - Core features
   - Technical requirements
   - UI/UX considerations
   - Project scope
   - Timeline
   - Additional context
   - Open questions

3. Don't worry about being perfect - the ideation document is a starting point for conversation.

## Step 2: Project Brief

Next, work with the AI assistant to refine your ideation document into a structured project brief.

### Creating a Project Brief

1. Start a conversation with the AI assistant:
   ```
   I've created an ideation document at .concrete/ideation/my-project-ideation.md. 
   Can you help me refine this into a project brief?
   ```

2. The AI will analyze your ideation document and ask clarifying questions:
   - Answer the questions to provide additional context
   - Ask questions of your own if you're uncertain about any aspects
   - Discuss alternatives and trade-offs

3. The AI will generate a project brief that includes:
   - Refined project vision
   - Detailed problem statement
   - Target user personas
   - Feature specifications
   - Technical architecture
   - Implementation approach
   - Success criteria

4. Review the project brief and continue the conversation until you're satisfied with the plan.

## Step 3: Guide Generation

Once the project brief is finalized, the AI assistant will generate implementation guides.

### Generating Implementation Guides

1. Ask the AI to generate implementation guides:
   ```
   Now that we have a project brief, can you generate implementation guides for this project?
   ```

2. The AI will analyze the project brief and create a series of implementation guides:
   - Each guide will focus on a specific milestone or feature
   - Guides will be organized in a logical sequence
   - Guides will reference relevant concept guides

3. The AI will also generate:
   - Concept guides for key concepts in the project
   - Templates for common patterns
   - Troubleshooting guides for common issues

## Step 4: Implementation

Now you can start implementing your project following the implementation guides.

### Building Your Project

1. Start with the first implementation guide:
   - Follow the step-by-step instructions
   - Reference concept guides when needed
   - Use templates for common patterns

2. Engage with the AI assistant when you encounter challenges:
   - Ask for clarification on specific steps
   - Request additional examples or explanations
   - Discuss alternative approaches

3. Progress through each implementation guide in sequence:
   - Validate your progress at each step
   - Commit your changes regularly
   - Track your progress in tracking.md

## Step 5: Feedback

Throughout the process, provide feedback to improve Concrete.

### Providing Feedback

1. Record feedback in feedback.md:
   - What worked well
   - Challenges encountered
   - Missing elements
   - Improvement suggestions

2. Discuss your feedback with the AI assistant:
   - Specific improvements to guides
   - Additional templates or concepts that would be helpful
   - Workflow enhancements

3. The AI will incorporate your feedback into future iterations of Concrete.

## Example Workflow

### Example: Building a Todo App with React and Supabase

1. **Ideation**:
   - Create an ideation document describing a todo app
   - Include features like task creation, completion, categories, due dates

2. **Project Brief**:
   - Work with the AI to define user personas, technical architecture, etc.
   - Decide on authentication approach, data model, UI/UX

3. **Guide Generation**:
   - AI generates implementation guides for project setup, authentication, task management, etc.
   - AI creates concept guides for React hooks, Supabase RLS, etc.

4. **Implementation**:
   - Follow the implementation guides to build the app
   - Engage with the AI when you need additional help

5. **Feedback**:
   - Provide feedback on the guides and process
   - Suggest improvements for future projects

## Best Practices

1. **Start Simple**: Begin with a clear, focused idea and expand as needed
2. **Be Detailed**: Provide sufficient detail in your ideation document
3. **Ask Questions**: Don't hesitate to ask the AI for clarification
4. **Iterate**: Refine your project brief and implementation guides as you learn more
5. **Commit Regularly**: Make small, focused commits with descriptive messages
6. **Provide Feedback**: Help improve Concrete by sharing your experience

---

*This workflow guide was created by Concrete. If you have suggestions for improvement, please update the feedback document.* 
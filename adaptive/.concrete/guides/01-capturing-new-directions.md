# Capturing New Directions Guide

This guide outlines the process for capturing new ideas and directions for the project after the initial repository analysis has been completed.

## Objectives

- Help users articulate and refine their vision for the project
- Document new ideas and directions in a structured way
- Update project documentation to reflect the evolving vision
- Create milestones based on new directions

## Steps

### 1. Facilitate Ideation

Encourage the user to share their thoughts and ideas for the project:

- Ask open-ended questions about their vision
- Explore pain points or limitations in the current implementation
- Discuss potential new features or improvements
- Consider alternative approaches or technologies

### 2. Document Ideas

Help the user document their ideas in the `.concrete/ideation/` folder:

```bash
# Create a new ideation document
touch .concrete/ideation/$(date +%Y-%m-%d)-project-vision.md
```

The ideation document should include:
- The overall vision for the project
- Specific ideas for new features or improvements
- Potential challenges or considerations
- Any relevant references or inspirations

### 3. Refine Through Conversation

Engage in a conversation to refine the ideas:

- Ask clarifying questions
- Suggest potential implementations
- Discuss trade-offs and alternatives
- Help prioritize ideas based on impact and feasibility

### 4. Update README.md

Update `.concrete/README.md` to reflect the expanded vision:

- Add or update the project vision section
- Include new features or components
- Revise the project structure if necessary
- Add any new technologies or frameworks

### 5. Create Milestones

Based on the new directions, create milestones in `.concrete/tracking.md`:

- Break down the vision into concrete, achievable milestones
- Define key tasks for each milestone
- Establish a logical sequence for implementation
- Consider dependencies between milestones

### 6. Document the Conversation

Offer to save a summary of the conversation:

```bash
# Create a new conversation summary
touch .concrete/conversations/$(date +%Y-%m-%d)-vision-discussion.md
```

The conversation summary should include:
- Key points discussed
- Decisions made
- Next steps agreed upon
- Any open questions or considerations

## Example Milestones

Here's an example of how you might structure milestones based on new directions:

```
## Milestones

### Milestone 1: Improve User Authentication
- Implement social login options
- Add two-factor authentication
- Create user profile management
- Enhance password reset flow

### Milestone 2: Enhance Product Catalog
- Implement advanced search and filtering
- Add product recommendations
- Create product comparison feature
- Improve product detail page

### Milestone 3: Optimize Checkout Process
- Streamline checkout flow
- Add multiple payment options
- Implement address validation
- Create order tracking system
```

## Ongoing Process

Capturing new directions is an ongoing process:

- Regularly revisit and refine the vision
- Update documentation as the project evolves
- Create new milestones as previous ones are completed
- Continue to document important conversations

By following this process, you can help ensure that the project evolves in a structured way that aligns with the user's vision. 
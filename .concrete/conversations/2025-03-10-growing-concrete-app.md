# Conversation Summary: Growing the Concrete App

**Date**: March 10, 2025  
**Participants**: Unforced, Claude 3.7 Sonnet  
**Context**: Discussion following the updated growing-the-app.md ideation document to clarify the vision for Concrete's evolution

## Key Points Discussed

1. **Better Templating Approach**
   - Need for a starters directory with template specifications
   - Focus on creating a React/Vite + Supabase starter template
   - Templates should be usable via degit (e.g., `degit unforced/concrete/starters/react_vite_supabase`)

2. **Conversation-Driven Development**
   - Emphasis on dialogue before action
   - Multi-layered approach: document → conversation → understanding → more documents
   - Need for more feedback checkpoints throughout the development process

3. **Feedback Integration**
   - Addition of feedback.md to track system feedback
   - Using feedback to periodically improve the system

4. **User Action Guidance**
   - Clear specification of required user actions (e.g., setting up Supabase, environment variables)
   - Adaptability to different project types

5. **Project Structure Revision**
   - Need to start from a clearer slate
   - Many existing components don't reflect the correct understanding
   - Addition of a conversations directory to capture dialogue insights

## Decisions Made

1. **Clear out existing directories**
   - **Rationale**: Many existing files were created without proper understanding of the vision
   - **Alternatives Considered**: Keeping and modifying existing files

2. **Add conversations directory**
   - **Rationale**: Preserve insights from discussions that bridge ideation and implementation
   - **Alternatives Considered**: Relying solely on ideation documents and implementation guides

3. **Create conversation summary template**
   - **Rationale**: Ensure consistent capture of key points, decisions, and action items
   - **Alternatives Considered**: Free-form conversation notes

4. **Focus on starters directory next**
   - **Rationale**: This represents the core of the new templating approach
   - **Alternatives Considered**: Focusing first on revising core documentation

## Open Questions

1. **System prompt approach**
   - Should the system prompt be unique to each concrete project or a universal prompt for all .concrete apps?
   - What's the best way to structure the system prompt to emphasize conversation?

2. **Starters directory structure**
   - What exactly should go into the `.concrete/starters/react_vite_supabase` directory?
   - How detailed should the specifications be versus the actual implementation?

## Action Items

1. **Revise core documentation**
   - **Owner**: Claude with Unforced's feedback
   - **Timeline**: After conversation structure is finalized
   - **Details**: Update system-prompt.md, project.md, and index.md to reflect the conversation-driven approach

2. **Create starters directory structure**
   - **Owner**: Claude with Unforced's feedback
   - **Timeline**: After conversation structure is finalized
   - **Details**: Begin defining what should go into `.concrete/starters/react_vite_supabase`

## Next Conversation

**Proposed Topic**: Revising core documentation (system-prompt.md, project.md)  
**Proposed Date**: After feedback on conversation structure  
**Preparation Needed**: Review of existing documentation and preparation of proposed revisions

---

*This conversation summary was created as part of the Concrete project's development process. It serves as a record of discussions and decisions that inform the project's evolution.* 
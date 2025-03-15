# Concrete

<p align="center">
  <em>The ultimate vibe coding companion for AI-assisted development</em>
</p>

Concrete is a structured foundation that helps bring clarity to your vision and enables AI to more effectively execute on your ideas. It serves as the foundation for your application, ensuring the AI stays aligned with your goals throughout the development process.

## What is Concrete?

Concrete is a companion system that lives in a `.concrete` folder within your project. It provides:

- **Structure** for AI-assisted development
- **Documentation** that evolves with your project
- **Conversation management** to capture important discussions
- **Progress tracking** to keep development on course
- **Ideation support** to help refine your vision

By providing a consistent structure and workflow, Concrete helps ensure that:
- AI assistants understand and maintain project documentation
- You can easily share your vision and ideas
- Project progress is tracked and visible
- Development follows a structured, milestone-based approach

## Getting Started

Choose the template that best fits your project needs:

### Base Template

A minimal foundation suitable for any project type:

```bash
# Using pnpm
pnpx degit unforced/concrete/base my-project

# Using npm
npx degit unforced/concrete/base my-project

# Using yarn
yarn dlx degit unforced/concrete/base my-project
```

### Vite-Supabase Template

Specialized for React/Vite projects with Supabase integration:

```bash
# Using pnpm
pnpx degit unforced/concrete/vite-supabase my-vite-project

# Using npm
npx degit unforced/concrete/vite-supabase my-vite-project

# Using yarn
yarn dlx degit unforced/concrete/vite-supabase my-vite-project
```

### Adaptive Template

Designed to analyze and adapt to existing projects:

```bash
# Using pnpm
pnpx degit unforced/concrete/adaptive .concrete

# Using npm
npx degit unforced/concrete/adaptive .concrete

# Using yarn
yarn dlx degit unforced/concrete/adaptive .concrete
```

## How to Use Concrete

Once you've added Concrete to your project, here's how to use it:

1. **Share Your Vision**: 
   - Chat with your AI assistant about your project ideas
   - Create documents in the `.concrete/ideation/` folder for more detailed thoughts

2. **Track Progress**: 
   - Use `.concrete/tracking.md` to monitor progress and plan next steps
   - The AI will help keep this updated as your project evolves

3. **Document Conversations**: 
   - Important discussions will be summarized in the `.concrete/conversations/` folder
   - These summaries help maintain context across development sessions

4. **Follow Guides**: 
   - The `.concrete/guides/` folder contains helpful guides for working with your project
   - These guides will be created and updated as your project develops

5. **Maintain Documentation**:
   - The `.concrete/README.md` serves as the central documentation for your project
   - It will evolve as your project develops, always reflecting the current state

## Template Descriptions

### Base Template

The Base template provides a minimal foundation suitable for any project type. It focuses on:
- Capturing your vision and project goals
- Establishing a basic project structure
- Facilitating conversation flow and documentation
- Adapting to your specific needs regardless of technology stack

### Vite-Supabase Template

The Vite-Supabase template is specialized for React/Vite projects with Supabase integration. It includes:
- React/Vite project structure recommendations
- Supabase integration guidance
- Authentication flow setup
- State management patterns
- Styling approaches with TailwindCSS

### Adaptive Template

The Adaptive template is designed to analyze and adapt to existing projects. It helps:
- Analyze your repository structure
- Document the current state of your project
- Capture new ideas and directions
- Integrate Concrete into established workflows

## Concrete Structure

The `.concrete` folder contains:

- **`README.md`**: The central documentation for your project and system prompt for the AI
- **`tracking.md`**: Progress tracking and milestone management
- **`conversations/`**: Summaries of important discussions
- **`ideation/`**: Your thoughts, brainstorming, and vision documents
- **`guides/`**: Step-by-step guides for implementing project milestones

## AI Integration

Concrete works best with AI coding assistants that can:
1. Read and understand the project structure
2. Update documentation based on conversations
3. Follow the guidelines in the `.concrete/README.md`

For Cursor users, the `.concrete/README.md` file can be symlinked to `.cursorrules` to provide guidance to the AI assistant.

## Contributing

Contributions to improve the Concrete system are welcome. Please ensure that any contributions maintain the structured approach that makes Concrete effective.

## License

MIT 
# Concrete Web Interface: Conversation Flow Design

This document outlines the detailed conversation flow for the Concrete web interface chatbot, including specific questions, decision points, and response patterns.

## Conversation Principles

1. **Friendly but Professional**: Maintain a helpful, conversational tone without being overly casual
2. **Adaptive Questioning**: Adjust follow-up questions based on previous answers
3. **Progressive Guidance**: Start broad, then narrow down to specifics
4. **Regular Summarization**: Periodically reflect understanding back to the user
5. **Educational Moments**: Briefly explain concepts when relevant, without being condescending

## Initial Engagement Flow

### Welcome Message

```
👋 Hi there! I'm your Concrete assistant. I'll help you create a structured foundation for your project that works great with AI tools.

Would you like to:
1. Start a new project from scratch
2. Use a template as a starting point
3. Analyze an existing project
```

### Response Handling

#### If user selects "Start a new project from scratch":

```
Great! Let's build a custom structure for your project. To get started:

What type of project are you building? (e.g., web app, mobile app, API, library, etc.)
```

#### If user selects "Use a template as a starting point":

```
Templates can save you time and provide best practices. Here are some options:

- Base (minimal structure for any project)
- Vite-React (optimized for React with Vite)
- Next.js (full-stack React with Next.js)
- Express API (backend API with Express)
- Mobile App (React Native structure)

Which template interests you? Or I can ask some questions to recommend one.
```

#### If user selects "Analyze an existing project":

```
I can help analyze your existing project and create a Concrete structure that fits.

You can either:
1. Provide a GitHub repository URL
2. Upload a zip file of your project
3. Describe your project structure manually

Which would you prefer?
```

## Project Vision Exploration

### For New Projects

#### Project Purpose

```
What problem does your project solve? Or what is its main purpose?

(This helps me understand the core focus of your project)
```

#### Target Users

```
Who are the primary users or audience for this project?

(Understanding your users helps shape the project structure)
```

#### Key Features

```
What are 3-5 key features or capabilities your project needs to have?

(This helps identify the main components we'll need to structure)
```

#### Technical Stack

```
Do you have specific technologies in mind for this project? 

For example:
- Frontend: React, Vue, Angular, etc.
- Backend: Node.js, Python, Java, etc.
- Database: MongoDB, PostgreSQL, Firebase, etc.
- Hosting: AWS, Vercel, Netlify, etc.

(Share as much or as little as you've decided so far)
```

### For Template-Based Projects

#### Template Customization

```
The [Selected Template] provides [brief description of template].

Would you like to:
1. Use it as-is
2. Customize it for your specific needs

If you'd like to customize, what aspects are most important to modify?
```

#### Project Specifics

```
Let's customize this template for your project:

1. What's the name of your project?
2. What's the main problem it solves?
3. Are there any specific features beyond what the template provides?
```

### For Existing Projects

#### Project Analysis

```
I've analyzed your project and found:
- [Key structure elements]
- [Technologies detected]
- [Patterns identified]

Does this look correct? What aspects of the project would you like the Concrete structure to focus on?
```

## Adaptive Follow-up Questions

### Web Application Follow-ups

If the user indicates they're building a web application:

```
For your web application:

1. Will users need to log in or have accounts?
2. Do you need to store data persistently?
3. Are there any specific UI frameworks you plan to use?
4. Will this be a single-page application or multi-page?
```

### API Follow-ups

If the user indicates they're building an API:

```
For your API:

1. What authentication method do you plan to use?
2. Will this be a REST API, GraphQL, or something else?
3. What types of data will this API primarily handle?
4. Do you need documentation generation for the API?
```

### Mobile App Follow-ups

If the user indicates they're building a mobile app:

```
For your mobile app:

1. Are you targeting iOS, Android, or both?
2. Will you need offline functionality?
3. Do you plan to use device features like camera or location?
4. Will the app connect to a backend service?
```

## Summarization and Confirmation

After gathering sufficient information:

```
Based on our conversation, here's what I understand about your project:

- Project Type: [Type]
- Purpose: [Purpose]
- Key Features: [Features]
- Technical Stack: [Stack]
- [Other relevant details]

Is this accurate? Would you like to adjust anything?
```

## Structure Generation and Preview

### Structure Proposal

```
I've designed a Concrete structure for your project:

.concrete/
├── README.md - Project overview and AI guidance
├── tracking.md - Progress tracking
├── conversations/ - Important discussions
├── ideation/ - Vision and brainstorming
└── guides/ - Implementation instructions

This structure will help:
- Keep your project organized
- Guide AI assistants effectively
- Document your vision and progress
- Maintain consistency as you develop

You can see a preview in the visualization panel. Does this look good?
```

### Customization Options

```
Would you like to customize this structure? You can:

1. Add additional folders or files
2. Modify the existing structure
3. Add specific content to certain files
4. Keep it as proposed
```

## Export and Next Steps

### Export Options

```
Your Concrete structure is ready! How would you like to export it?

1. Download as ZIP file
2. Create a new GitHub repository
3. Copy setup instructions
4. Email the structure to yourself
```

### Setup Guidance

```
To use your new Concrete structure:

1. Extract the ZIP file into your project directory
2. Open the .concrete/README.md file to get started
3. Share this README with any AI assistants you use

The structure is designed to evolve with your project. Feel free to update it as your needs change!
```

## Recovery Patterns

### If User Provides Vague Answers

```
That gives me a general idea, but I'd love to understand a bit more specifically. For example, [provide specific example related to their project type]. Could you share a few more details?
```

### If User Changes Direction

```
I see you're thinking about a different approach now. Let's adjust our plan:

[Summarize new understanding]

Is this the direction you'd like to go?
```

### If User Seems Confused

```
Let me take a step back and explain. Concrete helps structure your project by creating a special .concrete folder with documentation and organization that helps both you and AI tools understand your vision.

Would it help if I showed you an example of what we're creating?
```

## Educational Moments

### Explaining Concrete Benefits

```
Quick note: The .concrete structure we're creating will serve as a "shared brain" for you and any AI assistants you use. It helps the AI understand your project's context, goals, and structure - which means less time explaining and more time building!
```

### Explaining File Purposes

```
The README.md file we're creating is special - it serves as both documentation for humans and instructions for AI assistants. Think of it as a mission control center that keeps everyone aligned with your vision.
```

## Conversation Closure

### Successful Completion

```
Your Concrete structure is ready and exported! 🎉

Remember, this is just the beginning. As your project evolves:
1. Update the tracking.md file to monitor progress
2. Save important conversations in the conversations/ folder
3. Refine your vision in the ideation/ folder

Is there anything else you'd like to know about using your new Concrete structure?
```

### Follow-up Invitation

```
I'd love to hear how Concrete works for your project! Feel free to come back and share your experience or ask questions anytime.

Good luck with your project! 👍
```

## Decision Trees

### Project Type Decision Tree

```
User indicates project type
├── Web Application
│   ├── Frontend-only
│   │   └── Ask about UI framework
│   ├── Full-stack
│   │   ├── Ask about frontend
│   │   └── Ask about backend
│   └── Backend-only
│       └── Ask about API type
├── Mobile Application
│   ├── React Native
│   ├── Native iOS/Android
│   └── Progressive Web App
├── Library/Package
│   ├── Ask about language
│   └── Ask about distribution method
└── Other
    └── Ask for description
```

### Technical Stack Decision Tree

```
User indicates technical preferences
├── React ecosystem
│   ├── Next.js
│   ├── Create React App
│   ├── Vite
│   └── Other
├── Vue ecosystem
│   ├── Nuxt
│   ├── Vue CLI
│   └── Vite
├── Backend focus
│   ├── Node.js
│   │   ├── Express
│   │   ├── Nest.js
│   │   └── Other
│   ├── Python
│   │   ├── Django
│   │   ├── Flask
│   │   └── FastAPI
│   └── Other
└── Database preferences
    ├── SQL
    │   ├── PostgreSQL
    │   ├── MySQL
    │   └── Other
    ├── NoSQL
    │   ├── MongoDB
    │   ├── Firebase
    │   └── Other
    └── Other
```

## Prompt Templates

### Vision Extraction Prompt

```
Based on the user's description:
"{user_input}"

Extract the following:
1. Core purpose of the project
2. Target users or audience
3. Key features or capabilities
4. Technical preferences (if any)
5. Project constraints or requirements

Format the response as a concise summary that can be used to generate an appropriate Concrete structure.
```

### Structure Generation Prompt

```
Generate a Concrete structure for a project with the following characteristics:
- Project type: {project_type}
- Purpose: {purpose}
- Key features: {features}
- Technical stack: {stack}
- Additional context: {context}

The structure should include:
1. A README.md with appropriate guidance for the project type
2. A tracking.md template with relevant milestones
3. Appropriate guide files for the technical stack
4. Any specialized folders needed for this project type

Format the response as a JSON structure representing the file tree.
``` 
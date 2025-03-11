# React/Vite Project with Supabase

*This is a Concrete-powered project. Concrete helps bring structure to your vision and enables AI to more effectively assist in development.*

## Project Overview

*[This section will be filled with your project vision and goals as they develop through our conversations.]*

## Tech Stack

This project uses the following technologies:

- **Frontend**:
  - React 18+
  - TypeScript
  - Vite (for fast builds and development)
  - TailwindCSS (for styling)
  - React Router (for routing)

- **Backend**:
  - Supabase (for authentication, database, storage, and more)

- **Testing**:
  - Vitest
  - React Testing Library

- **Code Quality**:
  - ESLint
  - Prettier

## Project Structure

### Frontend Structure

- **`src/`**: Source code directory
  - **`components/`**: Reusable React components
  - **`pages/`**: Page components for routing
  - **`hooks/`**: Custom React hooks
  - **`lib/`**: Utility functions and libraries
  - **`styles/`**: CSS/SCSS files
  - **`types/`**: TypeScript type definitions
  - **`api/`**: API integration with Supabase

- **`public/`**: Static assets

### Supabase Structure

- **Authentication**: User management and authentication
- **Database**: PostgreSQL database tables and relationships
- **Storage**: File storage buckets
- **Edge Functions**: Serverless functions (if needed)

### Concrete Structure

This project uses the Concrete system to provide structure and guidance. Here's how it works:

- **`.concrete/`**: The Concrete system for this project
  - **`README.md`**: This file - the central documentation for your project
  - **`tracking.md`**: Progress tracking and next steps
  - **`system-prompt.md`**: Guidelines for the AI assistant (you don't need to modify this)
  - **`conversations/`**: Summaries of our important discussions
    - [`README.md`](./conversations/README.md): Explains how conversation summaries work
  - **`ideation/`**: Your thoughts, brainstorming, and vision documents
    - [`README.md`](./ideation/README.md): Guidelines for creating ideation documents
  - **`guides/`**: Step-by-step guides for project milestones
    - [`00-project-setup.md`](./guides/00-project-setup.md): Guide for setting up your React/Vite project with Supabase
    - [`README.md`](./guides/README.md): Explains how guide files work

## Milestones

This project will be developed through a series of milestones. Each milestone has a corresponding guide file with detailed instructions.

### Milestone 0: Project Setup
- **Objective**: Set up a new React/Vite project with Supabase integration
- **Key Tasks**:
  - Initialize a new React/Vite project with TypeScript and TailwindCSS
  - Set up Supabase for authentication, database, and storage
  - Configure the development environment
- **Guide**: [00-project-setup.md](./guides/00-project-setup.md)

### Milestone 1: Authentication
- **Objective**: Implement user authentication with Supabase
- **Key Tasks**:
  - Create authentication UI components
  - Set up Supabase authentication
  - Implement protected routes
- **Guide**: *Will be created when ready to begin this milestone*

### Milestone 2: Database Schema
- **Objective**: Design and implement the database schema
- **Key Tasks**:
  - Create tables in Supabase
  - Set up relationships between tables
  - Implement Row Level Security policies
- **Guide**: *Will be created when ready to begin this milestone*

### Milestone 3: Core Features
- **Objective**: Implement the core features of your application
- **Key Tasks**: *To be defined based on your project requirements*
- **Guide**: *Will be created when ready to begin this milestone*

## Getting Started

### Prerequisites

- Node.js 16+ and npm/pnpm
- Git
- A Supabase account

### Initial Setup

1. **Share your vision**: Tell the AI assistant about your project idea, or create an ideation document in the [`.concrete/ideation/`](./ideation/) folder.

2. **Refine the project structure**: Work with the AI to define the project structure, milestones, and goals.

3. **Set up the project**: Follow the [project setup guide](./guides/00-project-setup.md) to set up a new Vite project with React, TypeScript, and Supabase integration.

4. **Track progress**: Use the [tracking.md](./tracking.md) file to monitor progress and plan next steps.

## How to Share Your Vision

There are two main ways to share your ideas and vision for this project:

1. **Direct conversation**: Simply chat with the AI assistant about your ideas, and they will help refine and structure them.

2. **Ideation documents**: For more complex or detailed thoughts, create a document in the [`.concrete/ideation/`](./ideation/) folder. The AI will read these documents and help you develop your ideas.

## Supabase Integration

The AI assistant will help you with:

- Setting up a Supabase project
- Configuring authentication
- Designing your database schema
- Implementing Row Level Security (RLS) policies
- Creating API integrations
- Setting up file storage

---

*This README will evolve as your project develops. The AI assistant will help you keep it updated with the latest information about your project.* 
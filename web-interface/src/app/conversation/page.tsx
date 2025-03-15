'use client';

import React from 'react';
import SplitViewLayout from '@/components/layout/split-view-layout';
import ChatInterface from '@/components/chat/chat-interface';
import StructureViewer from '@/components/visualization/structure-viewer';
import { Header } from '@/components/layout/main-layout';

// Sample structure data
const sampleStructure = {
  id: 'root',
  name: '.concrete',
  type: 'directory' as const,
  children: [
    {
      id: 'system',
      name: 'system.md',
      type: 'file' as const,
      content: '# Concrete\n\nConcrete is the ultimate vibe coding companion, helping to bring structure to your vision to enable AI to more effectively execute.',
    },
    {
      id: 'milestones',
      name: 'milestones',
      type: 'directory' as const,
      children: [
        {
          id: 'milestone-1',
          name: '01-project-setup.md',
          type: 'file' as const,
          content: '# Milestone 1: Project Setup\n\nThis milestone focuses on setting up the project structure.',
        },
        {
          id: 'milestone-2',
          name: '02-implementation.md',
          type: 'file' as const,
          content: '# Milestone 2: Implementation\n\nThis milestone focuses on implementing the core features.',
        },
      ],
    },
    {
      id: 'conversations',
      name: 'conversations',
      type: 'directory' as const,
      children: [
        {
          id: 'conversation-1',
          name: '2024-05-15-initial-discussion.md',
          type: 'file' as const,
          content: '# Conversation: Initial Discussion\n\nThis conversation focused on defining the project scope and goals.',
        },
      ],
    },
    {
      id: 'ideation',
      name: 'ideation',
      type: 'directory' as const,
      children: [
        {
          id: 'ideation-1',
          name: 'project-vision.md',
          type: 'file' as const,
          content: '# Project Vision\n\nThis document outlines the vision for the project.',
        },
      ],
    },
  ],
};

export default function ConversationPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <SplitViewLayout
        leftPanel={<ChatInterface />}
        rightPanel={<StructureViewer structure={sampleStructure} />}
      />
    </div>
  );
} 
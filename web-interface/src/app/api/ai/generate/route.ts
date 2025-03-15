import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    
    // For development, we'll allow requests without authentication
    // In production, you would want to require authentication
    if (!session && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { prompt, projectType } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would call an AI service
    // For now, we'll simulate a response
    const structure = generateMockStructure(projectType || 'default');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ structure });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

function generateMockStructure(projectType: string) {
  // Base structure that all project types have
  const baseStructure = {
    id: 'root',
    name: '.concrete',
    type: 'directory' as const,
    children: [
      {
        id: 'system',
        name: 'system.md',
        type: 'file' as const,
        content: '# Concrete\n\nConcrete is the ultimate vibe coding companion, helping to bring structure to your vision.',
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
        ],
      },
      {
        id: 'conversations',
        name: 'conversations',
        type: 'directory' as const,
        children: [],
      },
      {
        id: 'ideation',
        name: 'ideation',
        type: 'directory' as const,
        children: [],
      },
    ],
  };

  // Add project-specific files based on project type
  if (projectType === 'web') {
    const milestones = baseStructure.children.find(c => c.id === 'milestones');
    const ideation = baseStructure.children.find(c => c.id === 'ideation');
    
    if (milestones && milestones.children) {
      milestones.children.push({
        id: 'milestone-web',
        name: '02-web-development.md',
        type: 'file' as const,
        content: '# Milestone 2: Web Development\n\nThis milestone focuses on web development tasks.',
      });
    }
    
    if (ideation && ideation.children) {
      ideation.children.push({
        id: 'ideation-web',
        name: 'web-architecture.md',
        type: 'file' as const,
        content: '# Web Architecture\n\nThis document outlines the architecture for the web application.',
      });
    }
  } else if (projectType === 'mobile') {
    const milestones = baseStructure.children.find(c => c.id === 'milestones');
    const ideation = baseStructure.children.find(c => c.id === 'ideation');
    
    if (milestones && milestones.children) {
      milestones.children.push({
        id: 'milestone-mobile',
        name: '02-mobile-development.md',
        type: 'file' as const,
        content: '# Milestone 2: Mobile Development\n\nThis milestone focuses on mobile development tasks.',
      });
    }
    
    if (ideation && ideation.children) {
      ideation.children.push({
        id: 'ideation-mobile',
        name: 'mobile-architecture.md',
        type: 'file' as const,
        content: '# Mobile Architecture\n\nThis document outlines the architecture for the mobile application.',
      });
    }
  } else if (projectType === 'api') {
    const milestones = baseStructure.children.find(c => c.id === 'milestones');
    const ideation = baseStructure.children.find(c => c.id === 'ideation');
    
    if (milestones && milestones.children) {
      milestones.children.push({
        id: 'milestone-api',
        name: '02-api-development.md',
        type: 'file' as const,
        content: '# Milestone 2: API Development\n\nThis milestone focuses on API development tasks.',
      });
    }
    
    if (ideation && ideation.children) {
      ideation.children.push({
        id: 'ideation-api',
        name: 'api-architecture.md',
        type: 'file' as const,
        content: '# API Architecture\n\nThis document outlines the architecture for the API.',
      });
    }
  }

  return baseStructure;
} 
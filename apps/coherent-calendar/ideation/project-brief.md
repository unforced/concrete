# Coherent Calendar: Project Brief

## Project Vision

Coherent Calendar is an intelligent event aggregation and discovery platform that solves the problem of calendar fragmentation. It collects events from various sources across a community, organizes them with AI-powered categorization, and presents them in a user-friendly interface. The system significantly reduces the manual effort required to maintain community calendars while making it easier for community members to discover relevant events.

The name "Coherent Calendar" reflects the app's purpose: bringing coherence to the fragmented landscape of community event information.

## Problem Statement

Current challenges with community calendars include:

1. **Calendar Fragmentation**: Events are scattered across multiple websites, social media platforms, and communication channels, making it difficult for community members to find relevant events without checking multiple sources.

2. **Manual Maintenance Burden**: Maintaining calendars requires significant manual effort to find, verify, and input event information, creating a barrier for community organizers.

3. **Inconsistent Information**: Event details may vary across different platforms, leading to confusion about correct dates, times, and locations.

4. **Discovery Difficulty**: Community members struggle to find events relevant to their interests without being overwhelmed by irrelevant information.

## Target Users

1. **Community Members**: People looking to discover relevant events in their area without checking multiple sources.

2. **Community Organizers**: People who maintain calendars for their communities and need to reduce the manual effort of aggregating events.

3. **Community Administrators**: People who manage event listings and sources, including specific communities like Boulder.earth and Boulder.Builders.

4. **Platform Administrators**: People who manage the technical aspects of the platform, including the scraping strategies and AI components.

## Core Features

### Event Aggregation System
- Web scraping of event listings from various sources (initially junkyardsocial, Trident Cafe, and The Dairy Arts Center)
- Intelligent parsing of event details (title, date, time, location, description)
- Customizable scraping strategies per source with conversational AI refinement
- Manual URL submission for individual events, especially from community chats like Telegram
- Deduplication system using AI-determined canonical URLs as unique identifiers
- Integration with messaging platforms for simplified event submission

### Admin Interface
- Management of event sources with customizable scraping cadence
- **AI-assisted scraping strategy development and refinement through conversation** (key differentiator)
- Visual feedback on scraping results with ability to manually correct and provide feedback
- URL schema-based custom prompting for different platforms (e.g., Meetup, Facebook)
- System for adapting scraping strategies based on admin feedback
- Verification dashboard for reviewing scraped events before publication

### User Interface
- Searchable and filterable event database with clean, intuitive design
- Semi-automated tagging and categorization with human oversight
- Ability for admins to trigger dynamic re-categorization of events
- Progressive disclosure of technical details (source attribution without overwhelming users)
- Clear display of event details with verification status
- Comprehensive error messaging that provides actionable information

### AI Components
- Conversational interface for refining scraping strategies without code changes
- Semi-automated event categorization with human curation capabilities
- Adaptive learning system that improves from admin feedback
- Agentic scraping capabilities that can handle various website structures
- AI-powered event identification and deduplication

## Technical Architecture

### Frontend
- **Framework**: React with Vite for fast development and modern features
- **UI Library**: Tailwind CSS for responsive design and consistent styling
- **State Management**: React Query for server state and Zustand for client state
- **Routing**: React Router for navigation
- **Component Structure**: Atomic design pattern for scalable component architecture
- **Error Handling**: Centralized error boundary system with user-friendly error messages

### Backend & API Layer
- **Database**: Supabase PostgreSQL for relational data storage
- **Authentication**: Supabase Auth with role-based access control
- **API**: Supabase REST and real-time subscriptions
- **Serverless Functions**: Supabase Edge Functions for lightweight operations and coordination
- **Error Handling**: Structured error responses with error codes and human-readable messages

### Scraping Service (Separate Component)
- **Platform**: Railway for hosting the dedicated scraping service
- **Language**: Python for robust scraping capabilities and ML integration
- **Architecture**: Microservice design with API endpoints for triggering scrapes
- **Dependencies**: 
  - Puppeteer (via Pyppeteer) for JavaScript-heavy websites
  - Beautiful Soup/Requests for simpler static HTML sites
  - LangChain for AI-powered scraping strategies
- **Communication**: REST API for integration with the main Supabase backend
- **Containerization**: Docker for consistent deployment and scaling
- **Scheduling**: Cron jobs or message queue for handling regular scraping tasks
- **Error Handling**: Detailed logging and error reporting system

### AI and Agent System
- **Agent Framework**: LangChain for building the AI agents
  - Reasoning: Provides flexible agent architecture, tools integration, and memory systems
  - Will use LangChain's ReAct pattern for reasoning and action in scraping tasks
- **LLM Integration**: OpenAI API for the conversational interface and content understanding
- **Event Identification**: AI-powered system for determining canonical URLs as unique identifiers for events
- **State Management**: LangChain memory systems with state persistence in Supabase

### Data Model
- **Events**: 
  - Core event data with relations to sources
  - Canonical URL as primary identifier
  - Verification status field
- **Sources**: Information about scraped websites with scraper configuration
- **Tags**: Dynamic categorization system for events
- **Users**: Admin and regular user accounts with roles
- **Feedback**: Tracking of corrections and suggestions for improving scrapers
- **Strategies**: Stored scraping strategies per source
- **Error Logs**: Structured error information for debugging and improvement

## System Integration

```
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│                     │      │                     │      │                     │
│   React Frontend    │◄────►│  Supabase Backend   │◄────►│   Python Scraping   │
│                     │      │                     │      │      Service        │
│  - User Interface   │      │  - Database         │      │  - Web Scraping     │
│  - Admin Dashboard  │      │  - Authentication   │      │  - LangChain Agents │
│  - Error Handling   │      │  - Edge Functions   │      │  - ML Processing    │
│                     │      │  - API Gateway      │      │                     │
└─────────────────────┘      └─────────────────────┘      └─────────────────────┘
                                       ▲                           ▲
                                       │                           │
                                       ▼                           ▼
                            ┌─────────────────────┐      ┌─────────────────────┐
                            │                     │      │                     │
                            │  External APIs      │      │   Target Websites   │
                            │                     │      │                     │
                            │  - OpenAI           │      │  - junkyardsocial   │
                            │  - Calendar APIs    │      │  - Trident Cafe     │
                            │  - Telegram         │      │  - The Dairy        │
                            │                     │      │                     │
                            └─────────────────────┘      └─────────────────────┘
```

## Development Approach

### Phase 1: Core Infrastructure
- Set up Supabase project with authentication and initial database schema
- Create React/Vite frontend with basic routing and UI components
- Set up the Python scraping service on Railway with basic API endpoints
- Establish communication between Supabase and the scraping service

### Phase 2: Scraping Engine
- Develop LangChain agents for different website types within the Python service
- Implement the event identification system using canonical URLs
- Create the feedback system for improving strategies
- Test with initial sources (junkyardsocial, Trident Cafe, The Dairy Arts Center)

### Phase 3: Admin Interface
- Build the admin dashboard for managing sources
- Implement the verification dashboard for reviewing scraped events
- Create the configuration interface for scraping strategies
- Develop the tagging management system
- Implement comprehensive error visibility and management

### Phase 4: User Interface
- Design and implement the event discovery interface
- Create search and filtering functionality
- Implement tag-based browsing
- Develop the progressive disclosure system for event details
- Build user-friendly error handling and messaging

### Phase 5: Testing and Refinement
- Comprehensive testing with real-world sources
- Performance optimization of both frontend and scraping service
- User experience refinement
- Documentation and deployment
- Monitoring and alerting setup

## Milestones

1. **Project Setup**: Initialize React/Vite frontend, Supabase backend, and Python scraping service
   - React/Vite project with Tailwind CSS
   - Supabase project with authentication
   - Python service scaffolding on Railway
   - Initial database schema
   - Basic CI/CD setup
   - Inter-service communication established

2. **LangChain Integration**: Implement the core AI framework in the Python service
   - LangChain agent setup
   - OpenAI API integration
   - Basic scraping capabilities
   - Conversational interface prototype
   - Event identification system using canonical URLs

3. **Basic Scraping System**: Implement the core web scraping functionality
   - Puppeteer and Beautiful Soup integration
   - Source configuration system
   - Initial scraping agents for test sources
   - Event parsing and storage
   - Error handling and reporting system

4. **Admin Interface**: Create the admin interface for managing sources and events
   - Source management dashboard
   - Verification dashboard for reviewing scraped events
   - Scraping strategy visualization and editing
   - Manual event editing and verification
   - Feedback collection system
   - Error monitoring and management tools

5. **User Interface**: Develop the user-facing event discovery interface
   - Event listing with search and filters
   - Tag-based browsing
   - Calendar view
   - Event detail pages
   - User-friendly error messaging

6. **AI Enhancement**: Implement semi-automated categorization with human oversight
   - Tag generation system
   - Content analysis for categorization
   - Admin controls for tag management
   - Learning from user interactions

7. **Feedback System**: Create the system for improving scraping based on admin feedback
   - Feedback collection and analysis
   - Strategy adjustment based on feedback
   - Performance metrics
   - Continuous improvement loop

8. **Testing & Refinement**: Test with real event sources in Boulder
   - Real-world source integration
   - Performance optimization
   - User experience refinement
   - Documentation and deployment
   - Monitoring and alerting setup

## Risk Management

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Websites changing structure | High | High | Implement adaptive scraping strategies with AI, regular testing |
| Scaling issues with many sources | Medium | High | Design for horizontal scaling in the Python service, monitoring |
| AI accuracy limitations | Medium | Medium | Human verification workflow, feedback loop for improvement |
| Integration complexity | Medium | Medium | Clear API contracts, comprehensive testing |
| Performance bottlenecks | Medium | Medium | Monitoring, caching strategies, background processing |
| Deployment challenges | Low | High | Containerization, CI/CD pipeline, staged rollout |

## Success Criteria

1. **Source Integration**: Successfully scrape and integrate events from the three initial sources (junkyardsocial, Trident Cafe, The Dairy Arts Center)

2. **Accuracy**: Events are accurately parsed with correct dates, times, and locations

3. **Admin Efficiency**: Admins can effectively manage and refine scraping strategies through conversation without requiring code changes

4. **User Experience**: Community members can easily discover relevant events through intuitive search and filtering

5. **Tagging Quality**: The semi-automated tagging system creates meaningful categorizations with minimal manual intervention

6. **Adaptability**: The system improves its scraping accuracy over time based on admin feedback

7. **Reduced Manual Effort**: Significant reduction in the manual effort required to maintain community calendars

8. **Error Transparency**: Users and admins receive clear, actionable information about any issues that arise

## Next Steps

1. Create detailed database schema design for Supabase
2. Design API contract between Supabase and the Python scraping service
3. Set up the Supabase project and configure authentication
4. Initialize the React/Vite frontend project
5. Set up the Python scraping service on Railway
6. Begin LangChain agent prototyping for the scraping system
7. Test basic scraping on junkyardsocial as first source 
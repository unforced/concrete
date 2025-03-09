# Project Setup: Getting Started with Coherent Calendar

## Overview
This guide provides a high-level overview for setting up the Coherent Calendar application and understanding its structure. It outlines the development environment, project organization, and initial steps needed before diving into specific implementation milestones.

## Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Python (v3.10 or later) for the scraping service
- Docker for containerization
- Git for version control
- A Railway account (for hosting the Python scraping service)
- A Supabase account (for backend services)
- An OpenAI API key (for LangChain integration)

## Related Resources

### Essential References
These resources are critical for understanding the project setup:

**Concepts:**
- [Data Model](../concepts/data-model.md) - Understand the overall data structure
- [Scraping Strategies](../concepts/scraping-strategies.md) - Learn about the web scraping approaches

**Templates:**
- [Component Template](../templates/component-template.md) - Standard patterns for creating React components
- [API Contract Template](../templates/api-contract-template.md) - Format for defining service communications

**Troubleshooting:**
- [Integration Issues](../troubleshooting/integration-issues.md) - Solutions for common integration problems

## Project Architecture

Coherent Calendar follows a three-tier architecture with clear separation of concerns:

```
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│                     │      │                     │      │                     │
│   React Frontend    │◄────►│  Supabase Backend   │◄────►│   Python Scraping   │
│                     │      │                     │      │      Service        │
└─────────────────────┘      └─────────────────────┘      └─────────────────────┘
```

### 1. Frontend (React/Vite)
- **Technologies**: React, Vite, Tailwind CSS, React Query, Zustand
- **Structure**: Follows atomic design principles with components organized by functionality
- **Responsibilities**: User interface, state management, API communication

### 2. Backend (Supabase)
- **Technologies**: Supabase (PostgreSQL, Auth, Functions)
- **Structure**: Database tables, authentication, edge functions
- **Responsibilities**: Data storage, user management, business logic coordination

### 3. Scraping Service (Python)
- **Technologies**: Python, FastAPI, LangChain, Beautiful Soup, Pyppeteer
- **Structure**: Microservice with API endpoints, containerized for deployment
- **Responsibilities**: Web scraping, AI processing, event extraction and identification

## Directory Structure

The project is organized into three main repositories:

### 1. Frontend Repository
```
coherent-calendar-frontend/
├── src/
│   ├── components/            # UI components
│   │   ├── atoms/             # Basic UI elements
│   │   ├── molecules/         # Compound components
│   │   ├── organisms/         # Complex components
│   │   └── templates/         # Page layouts
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   ├── services/              # API clients and services
│   ├── store/                 # State management
│   ├── styles/                # Global styles
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
├── public/                    # Static assets
├── tests/                     # Test files
└── vite.config.ts             # Vite configuration
```

### 2. Backend (Supabase Project)
```
coherent-calendar-backend/
├── supabase/
│   ├── migrations/            # Database migrations
│   ├── functions/             # Edge functions
│   │   ├── event-processing/  # Event processing functions
│   │   ├── scraper-triggers/  # Functions to trigger scraping
│   │   └── user-management/   # User-related functions
│   └── seed-data/             # Initial data for development
└── scripts/                   # Utility scripts
```

### 3. Scraping Service Repository
```
coherent-calendar-scraper/
├── src/
│   ├── api/                   # FastAPI routes
│   ├── scrapers/              # Website-specific scrapers
│   │   ├── generic/           # Generic scraping utilities
│   │   └── sites/             # Site-specific implementations
│   ├── agents/                # LangChain agent implementations
│   ├── models/                # Data models
│   └── utils/                 # Utility functions
├── tests/                     # Test files
├── Dockerfile                 # Container definition
└── railway.json               # Railway configuration
```

## Development Environment Setup

### Setting Up the Frontend

```bash
# Clone the repository (once created)
git clone https://github.com/your-org/coherent-calendar-frontend.git
cd coherent-calendar-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials and other config

# Start development server
npm run dev
```

### Setting Up the Backend (Supabase)

1. Create a new Supabase project at https://app.supabase.com
2. Use the SQL editor to create tables based on the data model design
3. Set up authentication providers as needed
4. Configure row-level security policies
5. Create edge functions for business logic

### Setting Up the Scraping Service

```bash
# Clone the repository (once created)
git clone https://github.com/your-org/coherent-calendar-scraper.git
cd coherent-calendar-scraper

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# Start the service locally
uvicorn src.main:app --reload
```

## Initial Configuration

### Environment Variables

#### Frontend (.env.local)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SCRAPER_API_URL=https://your-scraper-api.railway.app
```

#### Scraping Service (.env)
```
OPENAI_API_KEY=your-openai-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
```

### Supabase Configuration

The following SQL will set up the initial database structure:

```sql
-- This is a simplified version - refer to the data model guide for the complete schema
CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  cadence TEXT DEFAULT 'weekly',
  last_scraped TIMESTAMP WITH TIME ZONE,
  scraping_strategy JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  location TEXT,
  url TEXT,
  canonical_url TEXT NOT NULL,
  source_id UUID REFERENCES sources(id),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_event UNIQUE (canonical_url)
);

-- Additional tables will be needed for tags, users, feedback, etc.
```

## Development Workflow

1. **Local Development**:
   - Frontend: Run `npm run dev` to start the Vite dev server
   - Backend: Use the Supabase dashboard or CLI
   - Scraping Service: Run `uvicorn src.main:app --reload`

2. **Testing**:
   - Frontend: Run `npm test` for unit tests
   - Scraping Service: Run `pytest` for Python tests

3. **Deployment**:
   - Frontend: Deploy to Vercel, Netlify, or similar
   - Backend: Managed by Supabase
   - Scraping Service: Deploy to Railway using Docker

## Next Steps

1. Initialize the React/Vite frontend project (see [01-initialize-project.md](./01-initialize-project.md))
2. Set up the Supabase project and database schema (see [02-supabase-integration.md](./02-supabase-integration.md))
3. Create the Python scraping service (see [03-python-scraping-service.md](./03-python-scraping-service.md))

## Common Issues and Solutions

- **CORS errors**: Ensure proper CORS configuration in both the Supabase and Python service
- **Environment variable issues**: Double-check that all required environment variables are set
- **TypeScript errors**: Ensure proper typing of API responses and state
- **Docker build failures**: Check for dependency conflicts or missing build dependencies

## Checklist

Before proceeding to the next milestone, ensure:

- [ ] Development environment is properly set up
- [ ] Repository structure is planned and documented
- [ ] Supabase project is created
- [ ] Initial database schema is designed
- [ ] Python environment for the scraping service is configured
- [ ] All API keys and credentials are secured
- [ ] Team members have access to all required services 
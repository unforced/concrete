# Project Tracking: Coherent Calendar

## Project Status

**Current Status**: Planning  
**Last Updated**: March 8, 2025  
**Project Phase**: Initial Setup

## Milestone Progress

| Milestone | Status | Completion % | Target Date |
|-----------|--------|--------------|------------|
| Project Setup | In Progress | 20% | March 15, 2025 |
| Initialize React/Vite Frontend | Not Started | 0% | March 22, 2025 |
| Supabase Integration | Not Started | 0% | March 29, 2025 |
| Python Scraping Service | Not Started | 0% | April 5, 2025 |
| LangChain Integration | Not Started | 0% | April 12, 2025 |
| Admin Interface | Not Started | 0% | April 19, 2025 |
| Event Discovery Interface | Not Started | 0% | April 26, 2025 |
| AI Categorization | Not Started | 0% | May 3, 2025 |
| Testing & Deployment | Not Started | 0% | May 10, 2025 |

## Current Sprint Goals

- Complete project setup documentation
- Design database schema
- Research scraping approaches for initial sources (junkyardsocial, Trident Cafe, The Dairy Arts Center)
- Set up development environments for all three components

## Recent Updates

- **March 8, 2025**: Created project brief with detailed architecture
- **March 8, 2025**: Documented initial ideation
- **March 8, 2025**: Set up project structure and documentation framework
- **March 8, 2025**: Created initial implementation guide for project setup

## Completed Tasks

- ✅ Create initial ideation document
- ✅ Create comprehensive project brief
- ✅ Set up project structure and documentation framework
- ✅ Create initial implementation guide for project setup

## Next Tasks

- [ ] Initialize React/Vite frontend repository
- [ ] Set up Supabase project
- [ ] Design detailed database schema
- [ ] Set up Python scraping service repository
- [ ] Create API contract between services
- [ ] Research web scraping approaches for initial sources
- [ ] Create initial wireframes for admin and user interfaces

## Risks and Issues

| Risk/Issue | Likelihood | Impact | Mitigation/Resolution |
|------------|------------|--------|------------------------|
| Complex scraping requirements for different sites | High | High | Develop modular scraping system with site-specific strategies |
| AI accuracy in event parsing | Medium | Medium | Implement robust feedback system and manual verification |
| Integration complexity between services | Medium | High | Create clear API contracts and comprehensive testing |
| Scaling with many event sources | Medium | Medium | Design efficient database schema and caching strategy |
| Handling JavaScript-heavy websites | Medium | Medium | Use Puppeteer for dynamic content and test thoroughly |
| Deployment complexity with multiple services | Medium | Medium | Use containerization and CI/CD pipelines |

## Key Decisions

| Decision | Date | Rationale |
|----------|------|-----------|
| Use React/Vite for frontend | March 8, 2025 | Modern, fast development experience with good ecosystem |
| Use Supabase for backend | March 8, 2025 | Provides database, auth, and edge functions in one platform |
| Create separate Python scraping service | March 8, 2025 | Better suited for complex scraping tasks and AI integration |
| Use LangChain for AI agents | March 8, 2025 | Provides flexible agent architecture and tools integration |
| Host scraping service on Railway | March 8, 2025 | Easy deployment of containerized services |
| Use canonical URLs for event identification | March 8, 2025 | Provides reliable deduplication mechanism |

## Open Questions

- What is the best approach for handling recurring events?
- How should we structure the verification workflow for admins?
- What is the optimal way to store and retrieve LangChain agent state?
- How can we ensure the system scales efficiently as more event sources are added?
- What is the best approach for deploying Puppeteer in a serverless environment?

## Next Milestone Planning

### Initialize React/Vite Frontend (Target: March 22, 2025)

- [ ] Set up React/Vite project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up React Router
- [ ] Configure state management with Zustand
- [ ] Set up React Query for API communication
- [ ] Create basic component structure
- [ ] Implement authentication UI
- [ ] Set up testing framework 
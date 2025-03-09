# Data Model: Coherent Calendar

This guide explains the data model for the Coherent Calendar application, including the database schema, relationships between entities, and design considerations.

## Overview

The Coherent Calendar data model is designed to support the core functionality of aggregating events from various sources, categorizing them, and providing efficient search and filtering capabilities. The model also supports the AI-assisted scraping system and user management.

## Core Entities

### Events

The central entity in the system, representing calendar events from various sources.

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  location TEXT,
  location_details JSONB,
  url TEXT,
  canonical_url TEXT NOT NULL,
  image_url TEXT,
  source_id UUID REFERENCES sources(id) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verification_notes TEXT,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_event UNIQUE (canonical_url)
);

-- Index for efficient filtering and searching
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_verified ON events(verified);
CREATE INDEX idx_events_source_id ON events(source_id);
```

**Key Fields:**
- `canonical_url`: AI-determined unique identifier for deduplication
- `verified`: Indicates if the event has been verified by an admin
- `is_recurring`: Flag for recurring events
- `recurrence_pattern`: JSON structure defining the recurrence pattern
- `location_details`: Structured location data (coordinates, venue details)

### Sources

Represents websites or platforms from which events are scraped.

```sql
CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  cadence TEXT DEFAULT 'weekly',
  last_scraped TIMESTAMP WITH TIME ZONE,
  next_scrape TIMESTAMP WITH TIME ZONE,
  scraping_strategy JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Key Fields:**
- `cadence`: How often to scrape this source (weekly, daily, etc.)
- `scraping_strategy`: JSON structure containing the AI-determined scraping strategy
- `is_active`: Whether this source is currently being scraped

### Tags

Categories or labels applied to events for better organization and discovery.

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  is_auto_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_tag_name UNIQUE (name)
);
```

**Key Fields:**
- `is_auto_generated`: Indicates if the tag was created by the AI system

### Event Tags

Junction table for the many-to-many relationship between events and tags.

```sql
CREATE TABLE event_tags (
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  confidence FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (event_id, tag_id)
);
```

**Key Fields:**
- `confidence`: For AI-generated tags, the confidence level (0-1)

### Scraping Feedback

Stores feedback on scraping results to improve the AI system.

```sql
CREATE TABLE scraping_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id UUID REFERENCES sources(id) NOT NULL,
  event_id UUID REFERENCES events(id),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  feedback_type TEXT NOT NULL,
  feedback_details TEXT,
  original_data JSONB,
  corrected_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Key Fields:**
- `feedback_type`: Type of feedback (parsing_error, missing_field, wrong_date, etc.)
- `original_data`: The original scraped data
- `corrected_data`: The corrected data provided by the admin

### User Preferences

Stores user preferences for event discovery.

```sql
CREATE TABLE user_preferences (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  preferred_tags UUID[] REFERENCES tags(id),
  excluded_tags UUID[] REFERENCES tags(id),
  location_preference JSONB,
  notification_settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Key Fields:**
- `preferred_tags`: Tags the user is interested in
- `location_preference`: User's location preferences for event discovery
- `notification_settings`: User's notification preferences

## Relationships

The following diagram illustrates the relationships between the core entities:

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│             │       │             │       │             │
│   Sources   │──1─┬─►│   Events    │◄──┬─N─│  Event Tags │
│             │    │  │             │   │   │             │
└─────────────┘    │  └─────────────┘   │   └─────────────┘
                   │        ▲           │         │
                   │        │           │         │
                   │        │           │         │N
                   │        │           │         ▼
┌─────────────┐    │        │           │   ┌─────────────┐
│             │    │        │           │   │             │
│  Scraping   │    │        │           └─N─│    Tags     │
│  Feedback   │────┘        │               │             │
│             │             │               └─────────────┘
└─────────────┘             │                     ▲
                            │                     │
                            │                     │
┌─────────────┐             │               ┌─────────────┐
│             │             │               │             │
│    Users    │─────────────┘               │    User     │
│             │◄──────────────────────────1─│ Preferences │
└─────────────┘                             │             │
                                            └─────────────┘
```

## Design Considerations

### Event Identification and Deduplication

The `canonical_url` field serves as the unique identifier for events. This is determined by the AI system, which analyzes the event details and source to generate a consistent URL that represents the event, even if it appears on multiple sources with different URLs.

### Recurrence Handling

Recurring events are handled through the `is_recurring` flag and `recurrence_pattern` JSON structure. The system generates individual event instances based on the recurrence pattern, but maintains the relationship to the original event.

Example recurrence pattern:
```json
{
  "frequency": "weekly",
  "interval": 1,
  "day_of_week": ["monday", "wednesday"],
  "start_date": "2025-01-01",
  "end_date": "2025-06-30",
  "exceptions": ["2025-02-14"]
}
```

### Verification Workflow

Events scraped from sources start with `verified: false`. Admins can review and verify events, updating the `verified`, `verification_notes`, `verified_by`, and `verified_at` fields. Only verified events are shown to regular users by default.

### AI Feedback Loop

The `scraping_feedback` table stores feedback from admins about scraping results. This data is used to improve the AI scraping strategies over time. The system analyzes patterns in the feedback to adjust scraping strategies for specific sources.

## Row-Level Security

Supabase row-level security policies control access to the data:

```sql
-- Allow anyone to read verified events
CREATE POLICY "Anyone can read verified events"
  ON events FOR SELECT
  USING (verified = true);

-- Allow admins to read all events
CREATE POLICY "Admins can read all events"
  ON events FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Allow admins to update events
CREATE POLICY "Admins can update events"
  ON events FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Similar policies for other tables
```

## Migrations and Schema Evolution

The database schema will evolve over time. Migrations should be managed through Supabase migrations or a similar tool. Each migration should be versioned and include both up and down scripts.

Example migration file structure:
```
migrations/
├── 20250301000000_initial_schema.sql
├── 20250315000000_add_event_categories.sql
└── 20250401000000_add_user_bookmarks.sql
```

## Performance Considerations

- Indexes are created on frequently queried fields
- JSON fields are used for flexible data that doesn't need to be queried directly
- Partitioning may be considered for the events table if it grows very large
- Consider materialized views for complex queries that are run frequently

## Next Steps

1. Implement the initial schema in Supabase
2. Set up row-level security policies
3. Create initial seed data for testing
4. Develop database migration strategy
5. Implement data validation in the application layer 
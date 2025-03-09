# Scraping Strategies: Coherent Calendar

This guide explains the approaches and techniques used for web scraping in the Coherent Calendar application, including the AI-assisted scraping system, handling different website types, and the feedback loop for improvement.

## Overview

The Coherent Calendar scraping system is designed to extract event information from a variety of sources, each with its own structure and complexity. The system uses a combination of traditional web scraping techniques and AI-assisted approaches to handle the diversity of websites and adapt to changes over time.

## Core Architecture

The scraping system is implemented as a separate Python microservice with the following components:

```
┌─────────────────────────────────────────────────────────────┐
│                    Scraping Service                          │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │             │    │             │    │             │      │
│  │  Scraping   │    │  LangChain  │    │   Event     │      │
│  │  Endpoints  │◄──►│   Agents    │◄──►│  Extraction │      │
│  │             │    │             │    │             │      │
│  └─────────────┘    └─────────────┘    └─────────────┘      │
│         ▲                  ▲                  ▲             │
│         │                  │                  │             │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │  │                 │
│  Target         │  │  OpenAI API     │  │  Supabase       │
│  Websites       │  │                 │  │  Database       │
│                 │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Scraping Approaches

The system employs different scraping approaches based on the website type:

### 1. Static HTML Scraping

For simple websites with static HTML content, the system uses Beautiful Soup and Requests:

```python
import requests
from bs4 import BeautifulSoup

def scrape_static_site(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Extract event information
    events = []
    event_elements = soup.select('.event-card')  # Example selector
    
    for element in event_elements:
        event = {
            'title': element.select_one('.event-title').text.strip(),
            'date': element.select_one('.event-date').text.strip(),
            'location': element.select_one('.event-location').text.strip(),
            'url': element.select_one('a')['href'],
        }
        events.append(event)
    
    return events
```

### 2. JavaScript-Heavy Websites

For websites that rely heavily on JavaScript to render content, the system uses Pyppeteer (Python port of Puppeteer):

```python
import asyncio
from pyppeteer import launch

async def scrape_js_site(url):
    browser = await launch()
    page = await browser.newPage()
    await page.goto(url, {'waitUntil': 'networkidle0'})
    
    # Wait for specific elements to load
    await page.waitForSelector('.event-card')
    
    # Extract event information
    events = await page.evaluate('''() => {
        const eventElements = document.querySelectorAll('.event-card');
        return Array.from(eventElements).map(element => ({
            title: element.querySelector('.event-title').textContent.trim(),
            date: element.querySelector('.event-date').textContent.trim(),
            location: element.querySelector('.event-location').textContent.trim(),
            url: element.querySelector('a').href,
        }));
    }''')
    
    await browser.close()
    return events
```

### 3. AI-Assisted Scraping

For complex or frequently changing websites, the system uses LangChain agents to analyze the page structure and extract events:

```python
from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI

def scrape_with_ai(url, source_config):
    # Initialize LangChain components
    llm = OpenAI(temperature=0)
    
    # Define tools for the agent
    tools = [
        Tool(
            name="analyze_page_structure",
            func=analyze_page_structure,
            description="Analyzes the structure of a webpage to identify event elements"
        ),
        Tool(
            name="extract_events",
            func=extract_events,
            description="Extracts event information from identified elements"
        ),
        # Additional tools as needed
    ]
    
    # Initialize the agent
    agent = initialize_agent(tools, llm, agent="react-docstore", verbose=True)
    
    # Run the agent with the source configuration
    result = agent.run(f"Scrape events from {url} using the configuration: {source_config}")
    
    return result
```

## Scraping Strategy Storage

Scraping strategies are stored in the database as JSON structures that define how to extract information from each source:

```json
{
  "source_id": "123e4567-e89b-12d3-a456-426614174000",
  "url_pattern": "https://example.com/events*",
  "scraping_type": "static",
  "selectors": {
    "event_container": ".event-list .event-item",
    "title": ".event-title",
    "date": ".event-date",
    "time": ".event-time",
    "location": ".event-location",
    "description": ".event-description",
    "url": "a.event-link"
  },
  "date_format": "YYYY-MM-DD",
  "time_format": "HH:mm",
  "pagination": {
    "type": "next_button",
    "selector": "a.next-page",
    "max_pages": 5
  }
}
```

For AI-assisted scraping, the strategy includes prompts and examples:

```json
{
  "source_id": "123e4567-e89b-12d3-a456-426614174001",
  "url_pattern": "https://complex-site.com/events*",
  "scraping_type": "ai_assisted",
  "initial_prompt": "Analyze this webpage to identify event listings. Look for elements containing dates, titles, and locations grouped together.",
  "extraction_prompt": "For each event element, extract the title, date, time, location, and URL.",
  "examples": [
    {
      "html_snippet": "<div class='event-card'>...</div>",
      "extracted_data": {
        "title": "Example Event",
        "date": "2025-03-15",
        "time": "19:00",
        "location": "Example Venue"
      }
    }
  ],
  "fallback_selectors": {
    "event_container": ".event-card, .event-listing, .calendar-item"
  }
}
```

## Adaptive Scraping Process

The system follows this process for each source:

1. **Strategy Selection**: Choose the appropriate scraping strategy based on the source configuration
2. **Initial Scraping**: Attempt to scrape the source using the selected strategy
3. **Validation**: Validate the extracted events against expected patterns
4. **Adaptation**: If validation fails, use AI to analyze the page and update the strategy
5. **Retry**: Retry scraping with the updated strategy
6. **Feedback Integration**: Store feedback from admins to improve future scraping attempts

## LangChain Integration

The system uses LangChain's ReAct (Reasoning + Action) pattern to create agents that can analyze websites and extract events:

```python
from langchain.agents import AgentType, initialize_agent
from langchain.tools import BaseTool
from langchain.llms import OpenAI

class AnalyzePageTool(BaseTool):
    name = "analyze_page"
    description = "Analyzes a webpage to identify the structure of event listings"
    
    def _run(self, url):
        # Implementation to fetch and analyze the page
        pass

class ExtractEventsTool(BaseTool):
    name = "extract_events"
    description = "Extracts events from a webpage using the provided selectors"
    
    def _run(self, url, selectors):
        # Implementation to extract events using the selectors
        pass

def create_scraping_agent():
    llm = OpenAI(temperature=0)
    tools = [AnalyzePageTool(), ExtractEventsTool()]
    
    agent = initialize_agent(
        tools, 
        llm, 
        agent=AgentType.REACT_DOCSTORE,
        verbose=True
    )
    
    return agent
```

## Event Identification and Deduplication

The system uses AI to generate a canonical URL for each event, which serves as a unique identifier:

```python
def generate_canonical_url(event_data, source_url):
    # Create a prompt for the LLM
    prompt = f"""
    Generate a canonical URL for this event that would be consistent even if found on different websites:
    
    Title: {event_data['title']}
    Date: {event_data['date']}
    Location: {event_data['location']}
    Source URL: {source_url}
    
    The canonical URL should:
    1. Be deterministic (same event always gets same URL)
    2. Include key identifying information
    3. Be URL-safe
    4. Not depend on the source website
    
    Return only the canonical URL with no explanation.
    """
    
    # Get response from LLM
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=100,
        temperature=0
    )
    
    canonical_url = response.choices[0].text.strip()
    return canonical_url
```

## Handling Different Website Types

### Event Listing Pages

For pages that list multiple events:

1. Identify the container element that holds all events
2. Extract each event's basic information
3. Follow links to event detail pages if necessary
4. Combine information from both the listing and detail pages

### Calendar Pages

For interactive calendar interfaces:

1. Identify the calendar component
2. Extract visible events
3. Navigate through months/weeks if needed
4. Handle date formatting and conversion

### Single Event Pages

For pages dedicated to a single event:

1. Extract detailed information from the page
2. Look for structured data (Schema.org, JSON-LD, etc.)
3. Parse unstructured text using NLP techniques

## Feedback Loop for Improvement

The system includes a feedback loop to improve scraping accuracy over time:

1. **Feedback Collection**: Admins provide feedback on incorrectly scraped events
2. **Analysis**: The system analyzes patterns in the feedback
3. **Strategy Adjustment**: Scraping strategies are updated based on the analysis
4. **Verification**: The updated strategies are tested on historical data
5. **Deployment**: Successful strategies are deployed for future scraping

## Error Handling and Resilience

The scraping system includes robust error handling:

```python
def resilient_scrape(source):
    max_retries = 3
    backoff_factor = 2
    
    for attempt in range(max_retries):
        try:
            # Attempt to scrape
            events = scrape_source(source)
            return events
        except Exception as e:
            # Log the error
            logging.error(f"Scraping error for {source.url}: {str(e)}")
            
            # Determine if we should retry
            if attempt < max_retries - 1:
                # Calculate backoff time
                backoff_time = backoff_factor ** attempt
                logging.info(f"Retrying in {backoff_time} seconds...")
                time.sleep(backoff_time)
            else:
                # Max retries reached, report failure
                report_scraping_failure(source, str(e))
                return []
```

## Initial Source Configuration

For the three initial sources, the system will use these approaches:

### 1. Junkyard Social

```json
{
  "name": "Junkyard Social",
  "url": "https://junkyardsocial.com/events",
  "scraping_type": "static",
  "selectors": {
    "event_container": ".event-list .event-item",
    "title": ".event-title",
    "date": ".event-date",
    "location": ".event-venue",
    "url": "a.event-link"
  }
}
```

### 2. Trident Cafe

```json
{
  "name": "Trident Cafe",
  "url": "https://tridentcafe.com/events",
  "scraping_type": "js_rendered",
  "wait_for": ".events-container",
  "selectors": {
    "event_container": ".event-card",
    "title": "h3.event-name",
    "date": ".event-datetime",
    "location": "Trident Cafe, Boulder",
    "url": "a.event-details"
  }
}
```

### 3. The Dairy Arts Center

```json
{
  "name": "The Dairy Arts Center",
  "url": "https://thedairy.org/events",
  "scraping_type": "ai_assisted",
  "initial_prompt": "This is the events page for The Dairy Arts Center in Boulder. Identify the structure of event listings on this page.",
  "fallback_selectors": {
    "event_container": ".event, .performance, .show"
  }
}
```

## Next Steps

1. Implement the basic scraping infrastructure
2. Create scrapers for the three initial sources
3. Develop the LangChain agent for AI-assisted scraping
4. Implement the feedback collection and analysis system
5. Test the system with real-world websites 
# Concrete (Converse & Create)

Concrete is an open-source AI-powered project generator that transforms conversations into fully-realized projects. The current version specializes in generating Hugo static websites through natural dialogue.

## Overview

Concrete takes a unique, compartmentalized approach to project generation:

1. **Conversational Understanding**: Engages users in natural dialogue to understand their personal brand, project vision, and goals
2. **Structured Planning**: Generates foundational markdown files that outline the project's:
   - Visual style (`style.md`)
   - Site structure (`structure.md`)
   - Page overviews
3. **Implementation**: Transforms these specifications into a complete Hugo website

## How It Works

1. **Conversation**: Start a dialogue about your project
2. **Clarification**: AI ensures clear understanding of your vision
3. **Documentation**: Generates structured markdown specifications
4. **Generation**: Creates Hugo website files based on specifications

## Features

- Natural language interface
- Iterative clarification process
- Structured, modular generation approach
- Hugo static site specialization
- Markdown-based specification system

## Getting Started

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- An Anthropic API key

### Installation

```bash
git clone https://github.com/unforced/Concrete
cd concrete
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the root directory:

```bash
ANTHROPIC_API_KEY=your_anthropic_api_key
```

Run the script

```bash
python concrete_gen.py -n wovenweb3 -f whatiswovenweb -w "I want to create a simple website for Woven Web, that helps people understand what our organization is and how to get involved. It only needs a home page, about page, and a participate page"
```

## Contributing

[Coming soon]

## License

[License details]

## Project Status

This project is currently in active development. The first version focuses specifically on Hugo website generation, with plans to expand to other project types in the future.

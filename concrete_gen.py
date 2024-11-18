import os
import json
from anthropic import Anthropic
import httpx
import asyncio
from typing import Dict, List
from dotenv import load_dotenv
import zipfile

class ConcreteGenerator:
    def __init__(self):
        # Load environment variables from .env file
        load_dotenv()
        self.anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.perplexity_api_key = os.getenv("PERPLEXITY_API_KEY")
        self.project_info = {}
        self.research_data = ""
        self.style_guide = ""
        self.structure_guide = ""
        self.project_name = ""
        self.project_dir = ""
        self.guides_dir = ""

    async def get_user_input(self, prompt: str) -> str:
        """Get input from user with given prompt."""
        print("\n" + prompt)
        return input("> ").strip()

    async def research_topic(self, query: str) -> str:
        """Make API call to Perplexity for research."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.perplexity.ai/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.perplexity_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "llama-3.1-sonar-small-128k-online",
                    "messages": [{"role": "user", "content": f"Research this topic for a website: {query}"}],
                }
            )
            # Add error handling and debug the response
            if response.status_code != 200:
                print(f"Error: {response.status_code}")
                print(f"Response: {response.text}")
                return "Error researching topic"
            
            data = response.json()
            # Debug the actual response structure
            # print(f"API Response: {json.dumps(data, indent=2)}")
            
            # Update the response parsing based on actual Perplexity API structure
            return data.get("choices", [{}])[0].get("message", {}).get("content", "No research data found")

    async def get_claude_response(self, prompt: str) -> str:
        """Get response from Claude API."""
        message = self.anthropic.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}]
        )
        # Extract just the text content from the response
        return message.content[0].text if isinstance(message.content, list) else message.content

    async def setup_project_directories(self):
        """Create project directories and extract template."""
        self.project_dir = os.path.join(os.getcwd(), self.project_name)
        self.guides_dir = os.path.join(self.project_dir, "guides")
        
        # Create directories
        os.makedirs(self.project_dir, exist_ok=True)
        os.makedirs(self.guides_dir, exist_ok=True)
        
        # Extract template
        template_path = "template.zip"
        if os.path.exists(template_path):
            with zipfile.ZipFile(template_path, 'r') as zip_ref:
                zip_ref.extractall(self.project_dir)
            print(f"\nTemplate extracted to {self.project_dir}")
        else:
            print("\nWarning: template.zip not found")

    async def generate_and_save_markdown(self, content: str, filename: str):
        """Save generated content to markdown file in guides directory."""
        filepath = os.path.join(self.guides_dir, filename)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"\nSaved {filepath}")

    async def generate_style_guide(self) -> str:
        """Generate style guide using Claude."""
        style_prompt = f"""
        Based on the following project information and goals:
        {json.dumps(self.project_info, indent=2)}

        Generate a comprehensive style guide that includes:
        1. Core Message (3 sentences maximum)
        * Primary purpose/mission
        * Target audience
        * Key differentiator
        2. Thematic Elements (up to 5)
        * List key conceptual themes
        * Associated imagery/motifs
        * Emotional resonance
        3. Design Direction
        * Overall aesthetic (e.g., minimal, organic, technical)
        * Typography characteristics
        * Visual hierarchy principles
        * Spacing/whitespace philosophy
        * UI component personality
        4. Color Palette
        * Primary color with hex code
        * Secondary color with hex code
        * Accent color with hex code
        * Two neutral tones with hex codes
        * Contextual use guidelines

        Format output as a structured markdown file that can serve as a single source of truth for both messaging and visual design decisions.

        [Paste your content here]
        """
        return await self.get_claude_response(style_prompt)

    async def generate_structure_guide(self) -> str:
        """Generate structure guide using Claude."""
        structure_prompt = f"""
        Based on the following project information and goals:
        {json.dumps(self.project_info, indent=2)}

        Using the provided project information, generate a concise site structure document that includes:

        1. Navigation Structure
        * Primary navigation menu items
        * Any secondary navigation needs
        * Footer links organization

        2. Page Overview
        For each page, provide:
        * Page title
        * One-sentence purpose
        * 3-4 key content blocks (bullet points)
        * Primary call-to-action

        Example Format:

        ## Navigation Structure
        Primary Menu:
        - Home
        - About
        - Projects
        - Contact

        Footer Sections:
        - Contact Info
        - Quick Links
        - Newsletter Signup

        ## Pages

        ### Home
        Purpose: Introduce visitors to [project] and inspire engagement
        Content:
        - Hero section with main message
        - Core mission/value proposition
        - Featured projects/initiatives
        CTA: "Join Our Community"

        ### About
        Purpose: Share our story and mission
        Content:
        - Mission and vision
        - Team/organization overview
        - Impact highlights
        CTA: "Get Involved"

        [Continue for each page...]

        Format output as a structured markdown file that serves as a high-level blueprint for site content and organization.
        """
        return await self.get_claude_response(structure_prompt)

    async def run(self):
        """Main execution flow."""
        # Get project name first
        self.project_name = await self.get_user_input(
            "What is the name of your project? This will be used as the directory name:"
        )
        
        # Setup project structure
        await self.setup_project_directories()
        
        # Initial project information
        self.project_info["name"] = self.project_name
        self.project_info["purpose"] = await self.get_user_input(
            "What is the purpose of your website? Please describe your project or brand:"
        )
        
        # Research phase
        print("\nResearching your topic...")
        self.research_data = await self.research_topic(self.project_info["purpose"])
        
        # Validate understanding
        understanding_prompt = f"""Based on the user's input and research:
        User Input: {self.project_info["purpose"]}
        Research: {self.research_data}
        
        Please provide a concise summary of the website's purpose and target audience."""
        
        understanding = await self.get_claude_response(understanding_prompt)
        print("\nHere's my understanding of your website's purpose:")
        print(understanding)
        
        feedback = await self.get_user_input(
            "Is this understanding correct? Please provide any corrections or additional information:"
        )
        self.project_info["feedback"] = feedback

        # Style guide generation
        print("\nGenerating initial style concepts...")
        style_concept = await self.get_claude_response(
            f"""Based on the following project information:
            Purpose: {self.project_info["purpose"]}
            Understanding: {understanding}
            Feedback: {self.project_info["feedback"]}
            
            Suggest a brief style direction for this website."""
        )
        print("\nProposed style direction:")
        print(style_concept)
        
        style_feedback = await self.get_user_input(
            "How does this style direction sound? Please provide any feedback:"
        )
        self.project_info["style_feedback"] = style_feedback

        # Generate and save final style guide
        print("\nGenerating comprehensive style guide...")
        self.style_guide = await self.generate_style_guide()
        await self.generate_and_save_markdown(self.style_guide, "style.md")

        # Structure guide generation
        print("\nGenerating initial structure concept...")
        structure_concept = await self.get_claude_response(
            f"Based on the project information, suggest a basic site structure."
        )
        print("\nProposed site structure:")
        print(structure_concept)
        
        structure_feedback = await self.get_user_input(
            "How does this structure sound? Please provide any feedback:"
        )
        self.project_info["structure_feedback"] = structure_feedback

        # Generate and save final structure guide
        print("\nGenerating comprehensive structure guide...")
        self.structure_guide = await self.generate_structure_guide()
        await self.generate_and_save_markdown(self.structure_guide, "structure.md")

async def main():
    generator = ConcreteGenerator()
    await generator.run()

if __name__ == "__main__":
    asyncio.run(main()) 
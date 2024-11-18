import os
import json
from anthropic import Anthropic
from perplexipy import PerplexityClient
import httpx
import asyncio
from typing import Dict, List
from dotenv import load_dotenv

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

    async def generate_and_save_markdown(self, content: str, filename: str):
        """Save generated content to markdown file."""
        with open(filename, 'w') as f:
            f.write(content)
        print(f"\nSaved {filename}")

    async def generate_style_guide(self) -> str:
        """Generate style guide using Claude."""
        style_prompt = f"""
        Based on the following project information and goals:
        {json.dumps(self.project_info, indent=2)}

        Generate a comprehensive style guide markdown file that includes:
        1. Color scheme with hex codes
        2. Typography choices
        3. Visual elements and imagery style
        4. UI/UX principles
        5. Mood and aesthetic direction
        6. Brand voice and tone

        Format the response in markdown.
        """
        return await self.get_claude_response(style_prompt)

    async def generate_structure_guide(self) -> str:
        """Generate structure guide using Claude."""
        structure_prompt = f"""
        Based on the following project information and goals:
        {json.dumps(self.project_info, indent=2)}

        Generate a comprehensive site structure markdown file that includes:
        1. Overview of all pages
        2. Navigation structure
        3. Brief content outline for each page
        4. Key components and sections
        5. User flow considerations

        Format the response in markdown.
        """
        return await self.get_claude_response(structure_prompt)

    async def run(self):
        """Main execution flow."""
        # Initial project information
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
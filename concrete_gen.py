import os
import json
from anthropic import Anthropic
import httpx
import asyncio
from typing import Dict, List
from dotenv import load_dotenv
import yaml
import zipfile
import argparse

class ConcreteGenerator:
    def __init__(self, project_name=None, input_file=None):
        # Load environment variables from .env file
        load_dotenv()
        self.anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.perplexity_api_key = os.getenv("PERPLEXITY_API_KEY")
        self.context = {}
        self.research_data = ""
        self.style_guide = ""
        self.structure_guide = ""
        self.prompts = yaml.load(open("prompts.yaml"), Loader=yaml.FullLoader)
        self.project_name = project_name
        self.project_dir = ""
        self.guides_dir = ""
        self.layouts_dir = ""
        self.content_dir = ""
        self.input_file = input_file

    async def get_user_input(self, prompt: str) -> str:
        """Get input from user with given prompt."""
        print("\n" + prompt)
        return input("> ").strip()

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
        self.layouts_dir = os.path.join(self.project_dir, "layouts")
        self.content_dir = os.path.join(self.project_dir, "content")
        # Create directories
        os.makedirs(self.project_dir, exist_ok=True)
        os.makedirs(self.guides_dir, exist_ok=True)
        os.makedirs(self.layouts_dir, exist_ok=True)
        os.makedirs(self.content_dir, exist_ok=True)
        
        # Extract template
        template_path = "template.zip"
        if os.path.exists(template_path):
            with zipfile.ZipFile(template_path, 'r') as zip_ref:
                zip_ref.extractall(self.project_dir)
            print(f"\nTemplate extracted to {self.project_dir}")
        else:
            print("\nWarning: template.zip not found")

    async def save_file(self, content: str, filename: str):
        """Save generated content to file."""
        filepath = os.path.join(self.guides_dir, filename)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"\nSaved {filepath}")
    
    async def call_and_save_prompt(self, prompt_name: str) -> str:
        """Make a prompt from the prompts.yaml file."""
        prompt = self.prompts[prompt_name]["prompt"]
        save_context = self.prompts[prompt_name].get("save_context")
        save_guide = self.prompts[prompt_name].get("save_guide")
        save_layout = self.prompts[prompt_name].get("save_layout")
        save_content = self.prompts[prompt_name].get("save_content")
        load_context = self.prompts[prompt_name].get("load_context")
        prompt_with_context = "Given the following context:\n"
        for item in load_context:
            prompt_with_context += f"{item}:\n{self.context[item]}\n\n"
        prompt_with_context += "===END CONTEXT===\n\n"
        prompt_with_context += prompt
        response = await self.get_claude_response(prompt_with_context)
        if save_context:
            self.context[save_context] = response
        if save_guide:
            await self.save_file(response, os.path.join(self.guides_dir, save_guide))
        if save_layout:
            await self.save_file(response, os.path.join(self.layouts_dir, save_layout))
        if save_content:
            await self.save_file(response, os.path.join(self.content_dir, save_content))

    async def run(self):
        """Main execution flow."""
        # Get project name if not provided
        if not self.project_name:
            self.project_name = await self.get_user_input(
                "What is the name of your project? This will be used as the directory name:"
            )
        
        # Setup project structure
        await self.setup_project_directories()
        
        # Load initial project information from file if provided
        if self.input_file and os.path.exists(self.input_file):
            with open(self.input_file, 'r') as f:
                self.context['project_info'] = f.read()
        
        await self.call_and_save_prompt("overview")
        print("\nHere's my understanding of your website's purpose:")
        print(self.context['overview'])

        # Generate and save final style guide
        print("\nGenerating comprehensive style guide...")
        await self.call_and_save_prompt("style_guide")

        print("\nGenerating style plan...")
        await self.call_and_save_prompt("style_plan")

        # Generate and save final structure guide
        print("\nGenerating comprehensive structure guide...")
        await self.call_and_save_prompt("structure_guide")

        print("\nGenerating style files...")
        await self.call_and_save_prompt("maincss")
        await self.call_and_save_prompt("themejs")

        print("\nGenerating navigation partials...")
        await self.call_and_save_prompt("header")
        await self.call_and_save_prompt("footer")

        print("\nGenerating home page files...")
        await self.call_and_save_prompt("home_page_guide")
        await self.call_and_save_prompt("home_page_layout")
        await self.call_and_save_prompt("home_page_content")

async def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Generate a concrete website project')
    parser.add_argument('-n', '--name', help='Project name')
    parser.add_argument('-f', '--file', help='Input file path containing project information')
    
    args = parser.parse_args()
    
    generator = ConcreteGenerator(project_name=args.name, input_file=args.file)
    await generator.run()

if __name__ == "__main__":
    asyncio.run(main()) 
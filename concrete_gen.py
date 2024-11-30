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
    def __init__(self, project_name=None, input_file=None, website_intention=None):
        # Load environment variables from .env file
        load_dotenv()
        self.system_prompt = open("system-prompt.md", "r").read()
        self.anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.perplexity_api_key = os.getenv("PERPLEXITY_API_KEY")
        self.context = {
            "website_intention": website_intention
        }
        self.research_data = ""
        self.style_guide = ""
        self.structure_guide = ""
        self.prompts = yaml.load(open("prompts.yaml"), Loader=yaml.FullLoader)
        self.project_name = project_name
        self.project_dir = ""
        self.guides_dir = ""
        self.layouts_dir = ""
        self.content_dir = ""
        self.static_dir = ""
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
        self.static_dir = os.path.join(self.project_dir, "static")
        # Create directories
        os.makedirs(self.project_dir, exist_ok=True)
        os.makedirs(self.guides_dir, exist_ok=True)
        os.makedirs(self.layouts_dir, exist_ok=True)
        os.makedirs(self.content_dir, exist_ok=True)
        os.makedirs(self.static_dir, exist_ok=True)
        
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
        filepath = os.path.join(self.project_dir, filename)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"\nSaved {filepath}")
    
    async def call_and_save_prompt(self, prompt_name: str, use_yaml=False, added_context=[], save_file=None, save_context=None) -> str:
        """Make a prompt from the prompts.yaml file."""
        prompt = self.prompts[prompt_name]["prompt"]
        if not save_context:
            save_context = self.prompts[prompt_name].get("save_context")
        if not save_file:
            save_file = self.prompts[prompt_name].get("save_file")
        load_context = self.prompts[prompt_name].get("load_context") or []
        prompt_with_context = self.system_prompt
        prompt_with_context += "Given the following context:\n===BEGIN CONTEXT===\n"
        for item in (load_context + added_context):
            prompt_with_context += f"{item}:\n{self.context[item]}\n\n"
        prompt_with_context += "\n\n===END CONTEXT===\n\n"
        prompt_with_context += prompt
        response = await self.get_claude_response(prompt_with_context)
        if save_file:
            await self.save_file(response, save_file)
        if save_context:
            if use_yaml:
                response = yaml.safe_load(response)
            self.context[save_context] = response

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
        print("\nHere's the style guide:")
        print(self.context['style_guide'])

        # Generate and save final structure guide
        print("\nGenerating comprehensive structure guide...")
        await self.call_and_save_prompt("structure_guide", use_yaml=True)
        print("\nHere's the structure guide:")
        print(self.context['structure_guide'])

        print("\nGenerating style files...")
        await self.call_and_save_prompt("maincss")
        await self.call_and_save_prompt("themejs")

        print("\nGenerating navigation partials...")
        await self.call_and_save_prompt("header")
        await self.call_and_save_prompt("footer")

        pages = self.context['structure_guide']['pages']
        for page in self.context['structure_guide']['pages']:
            print(f"\nGenerating {page} page...")
            self.context[f"{page}_overview"] = f"Page: {page}\nPage title: {pages[page]['title']}\nPage description: {pages[page]['description']}"
            await self.call_and_save_prompt("page_guide",
                                            added_context=[f"{page}_overview"],
                                            save_file=f"guides/{page}_guide.md",
                                            save_context=f"{page}_guide")
            print(f"\nGenerating {page} layout...")
            layout_path = os.path.join(self.layouts_dir, page, "single.html")
            content_path = os.path.join(self.content_dir, page, "index.md")
            if page == 'index' or page == 'home':
                layout_path = os.path.join(self.layouts_dir, "index.html")
                content_path = os.path.join(self.content_dir, "index.md")
            else:
                os.makedirs(os.path.join(self.content_dir, page), exist_ok=True)
                os.makedirs(os.path.join(self.layouts_dir, page), exist_ok=True)
            await self.call_and_save_prompt("page_layout",
                                            added_context=[f"{page}_guide"],
                                            save_file=layout_path,
                                            save_context=f"{page}_layout")
            print(f"\nGenerating {page} content...")
            await self.call_and_save_prompt("page_content",
                                            added_context=[f"{page}_guide", f"{page}_layout"],
                                            save_file=content_path,
                                            save_context=f"{page}_content")




async def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Generate a concrete website project')
    parser.add_argument('-n', '--name', help='Project name')
    parser.add_argument('-f', '--file', help='Input file path containing project information')
    parser.add_argument('-w', '--website_intention', help='Website intention')
    
    args = parser.parse_args()
    
    generator = ConcreteGenerator(project_name=args.name, input_file=args.file, website_intention=args.website_intention)
    await generator.run()

if __name__ == "__main__":
    asyncio.run(main()) 
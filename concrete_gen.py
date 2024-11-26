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
    
    async def call_and_save_prompt(self, prompt_name: str) -> str:
        """Make a prompt from the prompts.yaml file."""
        prompt = self.prompts[prompt_name]["prompt"]
        save_context = self.prompts[prompt_name]["save_context"]
        save_file = self.prompts[prompt_name]["save_file"]
        load_context = self.prompts[prompt_name]["load_context"]
        prompt_with_context = "Given the following context:\n"
        for item in load_context:
            prompt_with_context += f"{item}:\n{self.context[item]}\n\n"
        prompt_with_context += "===END CONTEXT===\n\n"
        prompt_with_context += prompt
        response = await self.get_claude_response(prompt_with_context)
        self.context[save_context] = response
        await self.generate_and_save_markdown(response, save_file)

    async def generate_style_files(self):
        """Generate base style and template files."""
        # Read existing files
        css_path = os.path.join(self.project_dir, "static", "css", "main.css")
        js_path = os.path.join(self.project_dir, "static", "js", "theme.js")

        # Customize prompt to focus on styling only
        style_prompt = f"""
        Based on the following style guide:
        {self.context['style_guide']}

        Please generate a main.css and a theme.js file with the tailwind config.

        Only include the text for the files, don't worry about formatting.
        Include nothing else after these 2 files.

        Format each response section with clear markers:
        ---CSS---
        (file content)
        ---JS---
        (file content)
        """

        # Get response and parse updates
        response = await self.get_claude_response(style_prompt)
        
        # Parse sections using markers
        sections = {
            'css': '',
            'js': ''
        }
        
        for line in response.split('\n'):
            if '---CSS---' in line:
                current_section = 'css'
                continue
            elif '---JS---' in line:
                current_section = 'js'
                continue
            
            if current_section:
                sections[current_section] += line + '\n'

        # Apply updates to files
        for file_name, content in sections.items():
            if not content.strip():
                continue
            
            if file_name == 'css':
                with open(css_path, 'w') as f:
                    f.write(content)
                    
            elif file_name == 'js':
                # Append new CSS rules to main.css
                with open(js_path, 'a') as f:
                    f.write(content)
                    

        print("\nStyle updates have been applied to template files")

    async def generate_navigation_partials(self):
        """Generate header and footer partial templates based on style and structure guides."""
        nav_prompt = f"""
        Based on the following structure guide:

        Structure Guide:
        {self.context['structure_guide']}

        Generate two Hugo partial templates, using tailwind css:
        1. A header partial (header.html) with primary navigation
        2. A footer partial (footer.html) with footer sections

        Format each response section with clear markers:
        ---HEADER---
        (header.html content)
        ---FOOTER---
        (footer.html content)

        Only include the text for the files, don't worry about formatting.
        Include nothing else after these 2 files.
        """

        response = await self.get_claude_response(nav_prompt)
        
        # Parse and save partials
        current_section = None
        sections = {'header': '', 'footer': ''}
        
        for line in response.split('\n'):
            if '---HEADER---' in line:
                current_section = 'header'
                continue
            elif '---FOOTER---' in line:
                current_section = 'footer'
                continue
            
            if current_section:
                sections[current_section] += line + '\n'

        # Save partials
        partials_dir = os.path.join(self.project_dir, "layouts", "partials")
        os.makedirs(partials_dir, exist_ok=True)

        for name, content in sections.items():
            if content.strip():
                with open(os.path.join(partials_dir, f"{name}.html"), 'w') as f:
                    f.write(content)
        
        print("\nNavigation partials have been generated")

    async def generate_index_files(self):
        """Generate index.html and index.md files for the home page."""
        index_prompt = f"""
        Based on the following structure guide:
        
        Structure Guide:
        {self.structure_guide}

        Generate two files for the Hugo home page, using tailwind css:
        1. A layout template (index.html) that defines the home page structure
        2. A content file (index.md) with the actual content and front matter

        Format each response section with clear markers:
        ---HTML---
        (index.html content)
        ---MARKDOWN---
        (index.md content)

        Only include the text for the files, don't worry about formatting.
        Include nothing else after these 2 files.
        """

        response = await self.get_claude_response(index_prompt)
        
        # Parse and save files
        current_section = None
        sections = {'html': '', 'markdown': ''}
        
        for line in response.split('\n'):
            if '---HTML---' in line:
                current_section = 'html'
                continue
            elif '---MARKDOWN---' in line:
                current_section = 'markdown'
                continue
            
            if current_section:
                sections[current_section] += line + '\n'

        # Save index.html to layouts
        home_layout_dir = os.path.join(self.project_dir, "layouts")
        os.makedirs(home_layout_dir, exist_ok=True)
        
        if sections['html'].strip():
            with open(os.path.join(home_layout_dir, "index.html"), 'w') as f:
                f.write(sections['html'])

        # Save index.md to content
        content_dir = os.path.join(self.project_dir, "content")
        os.makedirs(content_dir, exist_ok=True)
        
        if sections['markdown'].strip():
            with open(os.path.join(content_dir, "_index.md"), 'w') as f:
                f.write(sections['markdown'])
        
        print("\nHome page files have been generated")

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
        
        # feedback = await self.get_user_input(
        #     "Is this understanding correct? Please provide any corrections or additional information:"
        # )
        # self.context["feedback"] = feedback

        # Style guide generation
        # print("\nGenerating initial style concepts...")
        # style_concept = await self.get_claude_response(
        #     f"""Based on the following project information:
        #     Purpose: {self.context["purpose"]}
        #     Understanding: {self.context['overview']}
        #     Feedback: {self.context["feedback"]}
            
        #     Suggest a brief style direction for this website."""
        # )
        # print("\nProposed style direction:")
        # print(style_concept)
        
        # style_feedback = await self.get_user_input(
        #     "How does this style direction sound? Please provide any feedback:"
        # )
        # self.context["style_feedback"] = style_feedback

        # Generate and save final style guide
        print("\nGenerating comprehensive style guide...")
        await self.call_and_save_prompt("style_guide")

        # Structure guide generation
        # print("\nGenerating initial structure concept...")
        # structure_concept = await self.get_claude_response(
        #     f"""Based on the following project information:
        #     Purpose: {self.project_info["purpose"]}
        #     Understanding: {self.context["overview"]}
        #     Feedback: {self.project_info["feedback"]}
            
        #     Suggest a brief structure for this website, with distinct pages to be included"""
        # )
        # print("\nProposed site structure:")
        # print(structure_concept)
        
        # structure_feedback = await self.get_user_input(
        #     "How does this structure sound? Please provide any feedback:"
        # )
        # self.context["structure_feedback"] = structure_feedback

        # Generate and save final structure guide
        print("\nGenerating comprehensive structure guide...")
        await self.call_and_save_prompt("structure_guide")

        print("\nGenerating style files...")
        await self.generate_style_files()

        print("\nGenerating navigation partials...")
        await self.generate_navigation_partials()

        print("\nGenerating home page files...")
        await self.generate_index_files()

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
Ok, we are building Concrete. Concrete is the ultimate vibe coding companion, helping to bring structure to your vision to enable AI to more effectively execute. Concrete serves as the foundation for your application, to ensure the AI stays aligned.
Concrete lives within the .concrete folder in whatever project you are building. While Concrete is primarily built for software applications, it is not technically restricted to it and it can effectively support the development of any project that can be defined within a file system and be readable/writable by an LLM.
Within the .concrete file there are 3 essential files which make up the backbone of any Concrete system. system-prompt.md, README.md, and tracking.md. Beyond that there are 3 essential folders that provide depth and interactivity for the project. conversations/, ideations/, and guides/
The system-prompt is the system prompt passed to the LLM coder which helps the AI to make sense of this project and know what rules are necessary to follow in its development. It helps to ensure the LLM follows certain guidelines such as regularity of committing and testing, consistency in conversation and tone, and more. This is the essential brain of the Concrete system. In an AI IDE such as Cursor, it will be symlinked to .cursorrules.

The README.md is the project document which articulates clearly the project that is being built, including various guidelines and rules, project structure such as URLs, pages, database schema, themes/styles/colors, and more. It should also serve as the navigation guide for the .concrete structure, and should have links and brief descriptions to all of the files in the conversations, ideations, and guides folders.

The tracking.md is the file where we are keeping a consistent track of what we've done so far and what still needs to be done. This should be in line with the project doc in README.md and should have a log of the milestones which are listed in that original project doc and sub-milestones along the way.

A typical project will involve a number of milestones, and each of these milestones should have articulated what is being done in that step, end goals, and any specifics; listed in a high level in the README.md.
Each of these milestones should also have a guide file, which should be numbered accordingly. Milestones should be numbered starting at 0 with the first milestone involving project setup, which should involve any initial work getting the repo set up, perhaps cloning a starter app, initializing git, etc...
Milestone 1 should be the first milestone which involves anything project specific. Guide files should be named like 00-project-setup.md, 01-name-of-milestone.md, etc...

Sometimes other guide files will be needed, and some projects may be less linear in terms of the guide files. Don't be dogmatic here, but keep to the simple structure.
Guide files should also include user actions, to denote which actions the user needs to take during this process.

The next two folders are ideation/ and conversations/

Ideation should be a place where the user is able to put their thoughts as they articulate them. As an example, something like this which I am writing would go in the ideation/ folder for concrete. The AI won't really be touching this folder much at all, other than when they are pointed to it by a user.

Conversations/ is a place where summaries and details from conversations between the AI and the human exist. After a conversation has gone on for some time, particularly when it's at a place where something has been completed, it's important for the AI to ask whether the user would like this conversation to be logged. Assuming the user consents, the AI should then create a document within conversations with the label {date-of-convo}-{title-of-convo}.md. The conversation doc should contain a summary of what was accomplished in the project during this conversation, what were some major talking points between the AI and the user such as questions asked and answered, and finally any major feedback the user needed to give to the AI such as points where the AI misunderstood something or needed majorly corrected.

This system all revolves around a really well done system-prompt which is able to point to the various parts of the system and ensure everything flows well.
It's essential that the README.md serves as a product requirements doc/source of truth/index/project overview which any human or AI could easily look at to understand exactly what the project is and where they can go to see more details.
It's essential that the tracking.md serves as a live state check of where the project is at and what needs done next.
Typically when the project gets to a major completion point, which may be the end of a milestone, or for larger milestones, may be the completion of a sub-task; the system should update tracking.md and should also make a git commit message which will be multi-lined and will give a good synopsis of what was done in this stage.

Once again, ideation is just a space for the user to type their thoughts out long form which they can then feed to the AI. Ideally, when the user feeds ideas to the AI, whether in long form such as through this folder, or through sharing directly in the chat; the system will engage in conversation about it, ask questions where it doesn't understand, and share what it is getting to ensure it has a clear vision that matches the user. The system should always articulate its plan of action and ask the user for approval before it executes it.

Its important to remember that conversations should be saved regularly; ideally at various milestones, and for long conversations, the same file should be saved and then updated.

Its important to build out the guides file simply. Once the README.md is clarified and has the users approval, with the milestones, the system should then generate one by one the various guide files for the milestones. Before we begin to execute a guide file for a milestone, the user should be asked for their permission and encouraged to read over the guide file to ensure it all feels clear.

---

What we are building here is the initial .concrete structure for the Concrete repository. The goal of this repository is to be able to generate .concrete files well. The .concrete files at the root of this repository are unique to this project, which has as its goal the generation of .concrete files. When we're articulating this project in the README, what we're talking about is the ability to generate concrete files to be able to easily create a foundation for any app.

Within this repository, aside from the .concrete folder, there should be a concrete-libs/ folder which should contain various concrete folders, each of which would be copy-pasted as the .concrete folder of a new project to begin the building process.
The first concrete-lib we will generate is the base/ one, which will serve as a base for any concrete project, and should be non-specific about many things, and should extend easily to projects that are not even software related. We will still use git in this base library, but otherwise it should be very non-specific. Ideation/, conversations/, and guides/ should all be empty here. Ideally this .concrete could be put into the root of any document and then a user would be able to talk about what the app wanted to be, and the system would be able to adapt itself to meet those needs.

The second concrete-lib we will generate is the vite-supabase lib, which will serve as a base for any concrete project which uses React/Vite and Supabase. It should have a healthy README that brings in basic structure around the app; and should ensure both through the README and the system-prompt that  include a 00-project-setup.md guide file, which should begin by initializing a boilerplate build with Vite, React 18, TypeScript, Vitest, Testing Library, TailwindCSS 3, Eslint and Prettier using `pnpm dlx degit joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate my-app`; and should also do initial setup of Supabase, including user instructions around setting Supabase environment variables.
This lib should begin as a copy of the base lib and then should build on top of it.

The third concrete-libs we will generate is the Bump lib, which will serve as a base for the Bump application. This will derive from the vite-supabase lib, and then a ideation document will be created by me which describes the application and which will be used to evolve the concrete lib into a full lib for the development of this project.


There should also be a starter-projects folder, which should contain full apps including their .concrete folder, which serve as a starting point for an app. We will not be building this out yet, but will create the directory.

Here are milestones I would like for this project:
0 project set up - Initialize git repository, create project structure
1 create base concrete
2 create vite-supabase concrete
3 create Bump concrete

---

All of these milestones are what the .concrete files are executing, and so the first step here is to create the .concrete files, including the system-prompt.md, README.md, and an initial tracking.md file. I have already created the ideation/ folder, and we should create the conversations/ and guides/ folders.

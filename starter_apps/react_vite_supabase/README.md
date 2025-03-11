# React/Vite + Supabase Starter Template

A modern, production-ready starter template for building web applications with React, TypeScript, Vite, and Supabase.

## Features

- 🔐 Authentication with Supabase Auth
- 🌙 Dark/light mode with system preference detection
- 📱 Responsive design with TailwindCSS
- 🔄 State management with React Query and Context API
- 📝 Form handling with React Hook Form and Zod
- 🧩 Type safety with TypeScript
- 🧪 Testing with Vitest and Testing Library
- 🚦 Linting and formatting with ESLint and Prettier

## Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite 5+
- **Language**: TypeScript 5+
- **Backend/Database**: Supabase
- **Styling**: TailwindCSS 3+
- **State Management**: React Query 5+ (TanStack Query) + Context API
- **Routing**: React Router 6+
- **Form Handling**: React Hook Form + Zod
- **Authentication**: Supabase Auth
- **Testing**: Vitest + Testing Library
- **Linting/Formatting**: ESLint + Prettier

## Getting Started

### Using degit

The easiest way to use this template is with degit:

```bash
# Clone the template
npx degit organization/react-vite-supabase my-app

# Navigate to the project directory
cd my-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Manual Setup

If you prefer to set up the project manually, follow these steps:

1. Clone this repository:

```bash
git clone https://github.com/organization/react-vite-supabase.git my-app
cd my-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your Supabase credentials.

5. Start the development server:

```bash
npm run dev
```

## Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com).

2. Run the following SQL in the Supabase SQL editor to set up the profiles table:

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  
  constraint username_length check (char_length(username) >= 3)
);

-- Create a trigger to set updated_at on profiles
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profile_updated
  before update on profiles
  for each row
  execute procedure handle_updated_at();

-- Create a trigger to create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );
```

3. Copy your Supabase URL and anon key from the Supabase dashboard and add them to your `.env` file.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
project-name/
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images, fonts, etc.
│   │   ├── auth/             # Authentication-related components
│   │   ├── layout/           # Layout components
│   │   ├── ui/               # Basic UI components
│   │   └── [feature]/        # Feature-specific components
│   ├── context/              # React Context providers
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and libraries
│   │   └── supabase.ts       # Supabase client configuration
│   ├── pages/                # Page components
│   ├── routes/               # Route definitions
│   ├── services/             # API service functions
│   ├── types/                # TypeScript type definitions
│   │   └── supabase.ts       # Supabase database types
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts         # Vite type definitions
├── .env.example              # Example environment variables
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore file
├── .prettierrc               # Prettier configuration
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── vitest.config.ts          # Vitest configuration
```

## Customization

### Theme

You can customize the theme by modifying the `tailwind.config.js` file. The template includes a dark mode configuration that respects the user's system preferences and allows manual toggling.

### Components

The template includes basic UI components that you can extend or replace as needed. All components are built with TailwindCSS for consistent styling.

### Authentication

The template includes a complete authentication system using Supabase Auth. You can add additional authentication providers (Google, GitHub, etc.) through the Supabase dashboard.

## Deployment

The template is configured for easy deployment to Vercel:

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Configure environment variables
4. Deploy

## License

MIT

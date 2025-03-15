import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function Header() {
  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-600"></div>
          <span className="text-xl font-bold">Concrete</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:underline">Dashboard</a>
          <a href="#" className="text-sm font-medium hover:underline">Projects</a>
          <a href="#" className="text-sm font-medium hover:underline">Templates</a>
          <a href="#" className="text-sm font-medium hover:underline">Docs</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800"></button>
        </div>
      </div>
    </header>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-gray-50 dark:bg-gray-900 md:block">
      <div className="flex h-full flex-col">
        <div className="p-4">
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 4h-5L7 7H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              Projects
            </a>
            <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                <polyline points="7.5 19.79 7.5 14.6 3 12" />
                <polyline points="21 12 16.5 14.6 16.5 19.79" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              Templates
            </a>
            <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              New Project
            </a>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="text-sm font-medium">Need help?</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Check our documentation or contact support for assistance.
            </p>
            <button className="mt-3 w-full rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between px-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Concrete. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-xs text-gray-500 hover:underline dark:text-gray-400">
            Privacy
          </a>
          <a href="#" className="text-xs text-gray-500 hover:underline dark:text-gray-400">
            Terms
          </a>
          <a href="#" className="text-xs text-gray-500 hover:underline dark:text-gray-400">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
} 
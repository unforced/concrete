# Web Interface Layout Structure

This document outlines the basic layout structure for the Concrete web interface, focusing on the main components and their organization.

## Layout Components

### 1. Root Layout

The root layout will provide the basic structure for the entire application, including:

- Global styles and theme
- Authentication context
- Navigation context
- Toast notifications

```tsx
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Main Layout

The main layout will be used for authenticated pages and will include:

- Header with logo and user menu
- Sidebar for navigation (collapsible)
- Main content area
- Footer with links and information

```tsx
// src/components/layout/main-layout.tsx
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
  )
}
```

### 3. Split View Layout

The split view layout will be used for the main conversation interface, with:

- Chat panel on the left
- Visualization panel on the right
- Resizable divider between panels
- Controls for each panel

```tsx
// src/components/layout/split-view-layout.tsx
export default function SplitViewLayout({
  leftPanel,
  rightPanel,
}: {
  leftPanel: React.ReactNode
  rightPanel: React.ReactNode
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-1/2 border-r">
        {leftPanel}
      </div>
      <div className="w-1/2">
        {rightPanel}
      </div>
    </div>
  )
}
```

## Page Structure

### 1. Landing Page

The landing page will have a unique layout focused on:

- Hero section with headline and CTA
- Feature showcase
- Testimonials
- Getting started guide

### 2. Dashboard Page

The dashboard will use the main layout and include:

- Recent projects
- Quick actions
- Templates gallery
- Activity feed

### 3. Conversation Page

The conversation page will use the split view layout with:

- Chat interface on the left
- Structure visualization on the right
- Export options at the bottom

### 4. Settings Page

The settings page will use the main layout with:

- User profile settings
- Appearance settings
- Integration settings
- Notification settings

## Component Organization

We'll organize components into the following directories:

```
src/
  components/
    ui/            # Basic UI components from shadcn
    layout/        # Layout components
    chat/          # Chat interface components
    visualization/ # Structure visualization components
    export/        # Export functionality components
    auth/          # Authentication components
    dashboard/     # Dashboard-specific components
    settings/      # Settings-specific components
```

## Responsive Considerations

- Mobile: Stack panels vertically instead of side-by-side
- Tablet: Collapsible sidebar, reduced padding
- Desktop: Full layout with optimal spacing

## Theme and Styling

We'll use the color palette defined in our design concepts:

- Primary: Deep blue (#1E40AF)
- Secondary: Teal (#0D9488)
- Accent: Amber (#F59E0B)
- Neutrals: Slate grays (#F8FAFC to #0F172A)
- Success: Emerald (#10B981)
- Error: Rose (#F43F5E)

These colors will be configured in the Tailwind theme to ensure consistency throughout the application.

## Next Steps

1. Set up the basic layout components
2. Implement the responsive behavior
3. Create the chat interface components
4. Develop the visualization components
5. Connect the components together in the page structure 
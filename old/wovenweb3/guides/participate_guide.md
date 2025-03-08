# Participate Page Guide

## Page Variables
- title: "Get Involved"
- description: "Discover ways to participate, connect with our community, and contribute to local resilience."

## Page Structure

### Hero Section
- Background: Light neutral background (using theme colors)
- Title: H1 heading with page title
- Subtitle: Page description text
- Optional: Background pattern or subtle visual element suggesting connection

### Main Content

#### Ways to Participate Section
- Heading: "Ways to Get Involved"
- Content: Grid or list of participation opportunities
- Each opportunity should include:
  - Title
  - Brief description
  - Action button or link
- Initial opportunities to include:
  - Join Community Events
  - Volunteer
  - Partner with Us
  - Share Resources

#### Current Opportunities Section
- Heading: "Current Opportunities"
- Content: List of specific, time-sensitive opportunities
- Each listing should include:
  - Opportunity title
  - Brief description
  - Date/timeframe
  - Action button/link

#### Contact Information Section
- Heading: "Connect With Us"
- Content:
  - Contact form or email address
  - Social media links
  - Newsletter signup option
- Style: Clean, organized layout with clear call-to-action buttons

#### Resources Section
- Heading: "Resources"
- Content: List of relevant resources for participants
- Each resource should include:
  - Resource title
  - Brief description
  - Access link or download button

## Content Elements
- use_contact_form: boolean (determines if contact form is shown)
- opportunities: array of objects containing:
  - title: string
  - description: string
  - action_url: string
  - action_text: string
- current_opportunities: array of objects containing:
  - title: string
  - description: string
  - date: string
  - action_url: string
- resources: array of objects containing:
  - title: string
  - description: string
  - link: string

## Layout Specifications
- Full-width container with max-width constraint
- Responsive grid system for opportunities
- Section spacing using consistent margins/padding
- Mobile-first approach with breakpoint adjustments

## Interactive Elements
- Hover effects on buttons and links
- Form validation if contact form is used
- Smooth scroll to sections if using anchor links

## Typography
- Use heading hierarchy (h1, h2, h3)
- Consistent font sizes from theme
- Appropriate line-height for readability
- Clear distinction between headings and body text

## Accessibility
- Proper heading structure
- ARIA labels where needed
- Sufficient color contrast
- Focus states for interactive elements

## Call-to-Action Emphasis
- Primary CTAs should stand out visually
- Secondary actions should be clear but less prominent
- Consistent button/link styling throughout
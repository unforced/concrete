# Workflow: From Template to Application

This guide walks through the conversational process of using a Concrete template to build a complete application.

## Overview

The template-to-app workflow is about leveraging an existing Concrete template to efficiently build a fully functional application. This process allows you to benefit from established patterns and best practices while customizing the implementation for your specific needs. The process involves:

1. Selecting and exploring the appropriate template
2. Discussing application requirements and customization needs
3. Configuring the template with your customization choices
4. Implementing the application following the template guides
5. Extending the template as needed for unique requirements
6. Testing and refining the application

## Prerequisites

- A selected Concrete template
- Clear understanding of your application requirements
- Basic knowledge of the technologies used in the template

## The Conversational Approach

As with all Concrete workflows, building an application from a template is a conversational process where you and the AI assistant collaborate through dialogue. Throughout this workflow:

- **Share your application vision** clearly
- **Ask questions** about the template capabilities
- **Provide feedback** on generated code and suggestions
- **Discuss implementation challenges** as they arise

The AI assistant will:
- **Explain template features** and capabilities
- **Suggest appropriate customizations** based on your needs
- **Guide you through implementation** steps
- **Propose solutions** to challenges that arise

## Step 1: Select and Explore the Template

Begin with a conversation about the template you're considering and your application needs:

### Example Conversation:

**User**: "I want to build a task management app for small teams. I'm considering using the 'Collaboration App' template. Can you help me understand if it's the right choice?"

**AI**: "I'd be happy to help you evaluate the 'Collaboration App' template for your task management app. Let's explore what this template offers:

The Collaboration App template includes:
- User authentication and team management
- Real-time updates using WebSockets
- Notification system
- Activity feeds
- Responsive UI for desktop and mobile
- Role-based permissions

For a task management app specifically, you'd likely need:
- Task creation and assignment
- Due dates and priority settings
- Task status tracking
- Team member collaboration on tasks
- Filtering and sorting capabilities

Most of these needs align well with the template's features. The template's team management and real-time updates would be particularly valuable for task collaboration.

Would you like me to explain any specific aspect of the template in more detail to help you decide if it's the right fit?"

**User**: "Yes, could you explain how the template handles permissions? We need different permission levels for team admins versus regular team members."

**AI**: "The Collaboration App template has a robust role-based permission system that would work well for your task management app:

1. **Role Definitions**:
   - The template defines three default roles: Admin, Member, and Guest
   - Each role has a set of permissions that can be customized
   - You can add custom roles if needed

2. **Permission Types**:
   - Resource-level permissions (e.g., can access projects, can view team members)
   - Action-level permissions (e.g., can create tasks, can assign tasks)
   - Admin-level permissions (e.g., can manage team settings, can invite members)

3. **Implementation**:
   - Permissions are checked both on the frontend (UI visibility) and backend (API security)
   - The template includes a `usePermissions` hook for easy permission checking in components
   - Backend middleware for route protection based on permissions

For your task management app, you could use this system to:
- Allow team admins to create projects, invite members, and set team settings
- Let regular members create and assign tasks within their projects
- Restrict certain actions like deleting projects to admins only

Does this permission system sound suitable for your needs?"

### Key Actions in This Step:

1. **Understand the template's capabilities** through exploration
2. **Match template features** to your application requirements
3. **Ask detailed questions** about specific aspects of the template
4. **Evaluate the fit** between the template and your needs
5. **Make an informed decision** about using the template

## Step 2: Discuss Application Requirements and Customization Needs

Work together to define your specific application requirements and identify necessary customizations:

### Example Conversation:

**AI**: "Now that we've confirmed the Collaboration App template is a good fit, let's discuss your specific requirements for the task management app. This will help us identify what customizations we'll need to make.

What specific features do you need for your task management app? For example:
1. What task attributes do you need to track (priority, due date, labels, etc.)?
2. Do you need recurring tasks?
3. What kind of views do you need (list, board, calendar, etc.)?
4. Any specific integration requirements?
5. What reporting or analytics features do you need?"

**User**: "We need to track priority, due dates, labels, and time estimates for tasks. Recurring tasks would be nice but not essential for the first version. We definitely need both list and board views. We'd like to integrate with Google Calendar and Slack. For analytics, we need basic reporting on team productivity and task completion rates."

**AI**: "Thank you for those details. Based on your requirements, here are the customizations we'll need to make to the Collaboration App template:

1. **Task Model Extensions**:
   - Add priority field (enum: low, medium, high)
   - Add time estimate field
   - Add labels functionality
   - The template already handles due dates

2. **View Implementations**:
   - The template has a list view we can adapt
   - We'll need to implement a Kanban board view from scratch

3. **Integrations**:
   - Add Google Calendar integration for syncing tasks
   - Add Slack integration for notifications
   - The template has a notification system we can extend

4. **Analytics**:
   - Implement productivity metrics
   - Create task completion reporting
   - The template has a basic analytics framework we can build upon

Are there any specific UI/UX preferences you have for the application? For example, do you prefer a particular color scheme or layout approach?"

**User**: "We'd like a clean, minimal interface with our company colors (blue #1a73e8 and green #34a853). The layout should prioritize the task list/board with a collapsible sidebar for navigation."

**AI**: "Great! We'll customize the template's UI with your company colors and layout preferences. The template already has a collapsible sidebar that we can adapt.

Now, let's identify the customization points in the template that we'll need to configure:

1. **branding**:
   - primaryColor: '#1a73e8' (your blue)
   - secondaryColor: '#34a853' (your green)
   - companyName: What's your company name?

2. **features**:
   - enableRecurringTasks: false (for now)
   - enableTimeTracking: true
   - enableLabels: true

3. **integrations**:
   - enableGoogleCalendar: true
   - enableSlack: true

4. **views**:
   - enableListView: true
   - enableBoardView: true
   - enableCalendarView: false

Does this customization plan align with your vision for the application?"

### Key Actions in This Step:

1. **Gather detailed requirements** for the application
2. **Identify template customization needs** based on requirements
3. **Discuss UI/UX preferences** and branding requirements
4. **Map requirements to template customization points**
5. **Create a customization plan** for the application

## Step 3: Configure the Template with Customization Choices

Work together to configure the template with your specific customization choices:

### Example Conversation:

**User**: "Yes, that customization plan looks good. Our company name is 'TaskFlow'. One question - how difficult would it be to add the recurring tasks feature later?"

**AI**: "Thanks for confirming, TaskFlow! Adding recurring tasks later would be straightforward because the template is designed with extensibility in mind.

The template has a specific extension point for task creation that we can leverage later. When we're ready to add recurring tasks, we would:
1. Extend the task model with recurrence fields
2. Add the recurrence UI to the task creation/edit forms
3. Implement the background job for creating recurring task instances
4. Update the task list/board views to indicate recurring status

Now, let's configure the template with your choices:

```javascript
// template-config.js
module.exports = {
  branding: {
    primaryColor: '#1a73e8',
    secondaryColor: '#34a853',
    companyName: 'TaskFlow',
    logoUrl: '' // You can add your logo URL later
  },
  features: {
    enableRecurringTasks: false,
    enableTimeTracking: true,
    enableLabels: true,
    enablePriorities: true
  },
  integrations: {
    enableGoogleCalendar: true,
    enableSlack: true
  },
  views: {
    enableListView: true,
    enableBoardView: true,
    enableCalendarView: false
  }
};
```

This configuration will be used to generate the initial application code. Would you like to make any adjustments to this configuration?"

**User**: "That looks good. Let's also enable the calendar view since it might be useful with the Google Calendar integration."

**AI**: "Good thinking! The calendar view would indeed complement the Google Calendar integration well. I'll update the configuration:

```javascript
// template-config.js
module.exports = {
  // Other config remains the same
  views: {
    enableListView: true,
    enableBoardView: true,
    enableCalendarView: true // Now enabled
  }
};
```

With this configuration, the template will generate:
1. A task management application with your branding
2. Task model with priority, due dates, labels, and time estimates
3. List, board, and calendar views
4. Integration points for Google Calendar and Slack
5. Basic analytics framework ready for customization

Would you like me to explain how the template generation process works, or shall we proceed to implementing the application?"

### Key Actions in This Step:

1. **Finalize customization choices** based on requirements
2. **Create the configuration file** with all customization points
3. **Discuss implications** of configuration choices
4. **Consider future extensibility** for features not included initially
5. **Prepare for template generation** and implementation

## Step 4: Implement the Application Following Template Guides

Work together to implement the application by following the template's implementation guides:

### Example Conversation:

**AI**: "Now that we have our configuration set, let's implement the TaskFlow application following the template's implementation guides. The Collaboration App template provides these implementation guides:

1. Project Setup
2. Authentication & User Management
3. Team Collaboration Features
4. Notification System
5. Analytics & Reporting

Each guide has step-by-step instructions with code examples. Let's start with the Project Setup guide. This will create the basic application structure with your customizations applied.

The first step is to generate the application skeleton. Would you like me to walk you through this process?"

**User**: "Yes, please guide me through the setup process."

**AI**: "Great! Let's set up the TaskFlow application:

1. First, let's create a new project using the template generator:

```bash
npx create-concrete-app taskflow --template collaboration-app
```

2. When prompted, provide the path to your configuration file or enter the values interactively.

3. Once the generation is complete, navigate to the project directory:

```bash
cd taskflow
```

4. Install the dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

The application should now be running at http://localhost:3000 with your branding and customizations applied.

Let's review what's been generated:
- A Next.js application with your TaskFlow branding
- Authentication system with user registration and login
- Team management functionality
- Basic task model (we'll extend this further)
- UI components with your color scheme
- API routes for data operations

The next step is to extend the task model according to your requirements. Would you like to proceed with that now?"

**User**: "Yes, let's extend the task model to include all the fields we need."

**AI**: "Perfect! Let's extend the task model to include priority, time estimates, and labels as per your requirements.

According to the template's 'Team Collaboration Features' guide, we need to modify these files:

1. First, let's update the database schema in `prisma/schema.prisma`:

```prisma
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  dueDate     DateTime?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // New fields
  priority    Priority @default(MEDIUM)
  timeEstimate Int?    // In minutes
  labels      Label[]  // Relation to labels
  
  // Existing relations
  assignedTo  User?    @relation("AssignedTasks", fields: [assignedToId], references: [id])
  assignedToId String?
  createdBy   User     @relation("CreatedTasks", fields: [createdById], references: [id])
  createdById String
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId   String
}

// New enum for priority
enum Priority {
  LOW
  MEDIUM
  HIGH
}

// New model for labels
model Label {
  id        String   @id @default(cuid())
  name      String
  color     String
  tasks     Task[]
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String
}
```

2. Now, let's update the task creation form in `components/tasks/TaskForm.jsx`:

```jsx
// Add these imports
import { PrioritySelect } from '../ui/PrioritySelect';
import { TimeEstimateInput } from '../ui/TimeEstimateInput';
import { LabelSelector } from '../ui/LabelSelector';

// In the form component
const TaskForm = ({ initialData, onSubmit, projectId }) => {
  // Existing form setup
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Existing fields */}
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
      />
      
      <DatePicker
        label="Due Date"
        name="dueDate"
        value={formData.dueDate}
        onChange={(date) => setFormData({ ...formData, dueDate: date })}
      />
      
      {/* New fields */}
      <PrioritySelect
        value={formData.priority}
        onChange={(priority) => setFormData({ ...formData, priority })}
      />
      
      <TimeEstimateInput
        value={formData.timeEstimate}
        onChange={(estimate) => setFormData({ ...formData, timeEstimate: estimate })}
      />
      
      <LabelSelector
        projectId={projectId}
        selectedLabels={formData.labels}
        onChange={(labels) => setFormData({ ...formData, labels })}
      />
      
      {/* Submit button */}
      <Button type="submit">Save Task</Button>
    </form>
  );
};
```

3. We'll also need to update the API route in `pages/api/tasks/index.js` to handle the new fields.

Would you like me to continue with the implementation of these components, or would you prefer to focus on another aspect of the application?"

### Key Actions in This Step:

1. **Follow the template's implementation guides** step by step
2. **Extend and customize** the generated code as needed
3. **Implement required features** based on your requirements
4. **Test each component** as it's implemented
5. **Maintain consistency** with the template's patterns and practices

## Step 5: Extend the Template for Unique Requirements

Work together to extend the template for requirements that aren't directly covered:

### Example Conversation:

**User**: "The template doesn't seem to include the board view we need. How should we implement that?"

**AI**: "You're right, we need to implement the Kanban board view from scratch since it's not included in the template. Let's create this feature while maintaining consistency with the template's patterns.

First, let's create the components for the board view:

1. Create a new file `components/tasks/BoardView.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskCard } from './TaskCard';
import { useApi } from '../../hooks/useApi';
import { useNotification } from '../../hooks/useNotification';

const BoardView = ({ projectId }) => {
  const [columns, setColumns] = useState({
    todo: { title: 'To Do', tasks: [] },
    inProgress: { title: 'In Progress', tasks: [] },
    completed: { title: 'Completed', tasks: [] }
  });
  const { api } = useApi();
  const { showNotification } = useNotification();

  // Fetch tasks and organize them into columns
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await api.get(`/api/projects/${projectId}/tasks`);
        
        // Organize tasks into columns based on status
        const newColumns = {
          todo: { ...columns.todo, tasks: tasks.filter(t => !t.completed && !t.inProgress) },
          inProgress: { ...columns.inProgress, tasks: tasks.filter(t => t.inProgress) },
          completed: { ...columns.completed, tasks: tasks.filter(t => t.completed) }
        };
        
        setColumns(newColumns);
      } catch (error) {
        showNotification('Failed to load tasks', 'error');
      }
    };
    
    fetchTasks();
  }, [projectId]);

  // Handle drag and drop
  const handleDragEnd = async (result) => {
    // Implementation of drag and drop logic
    // This would update task status based on the column it's moved to
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board-container">
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} className="board-column">
            <h3>{column.title}</h3>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="tasks-container"
                >
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardView;
```

2. We'll need to install the react-beautiful-dnd library:

```bash
npm install react-beautiful-dnd
```

3. Now, let's add the board view to the project page in `pages/projects/[id].jsx`:

```jsx
import { useState } from 'react';
import { TabGroup, Tab } from '../../components/ui/Tabs';
import ListView from '../../components/tasks/ListView';
import BoardView from '../../components/tasks/BoardView';
import CalendarView from '../../components/tasks/CalendarView';

const ProjectPage = ({ project }) => {
  const [activeView, setActiveView] = useState('list');
  
  return (
    <div>
      <h1>{project.name}</h1>
      
      <TabGroup value={activeView} onChange={setActiveView}>
        <Tab value="list">List</Tab>
        <Tab value="board">Board</Tab>
        <Tab value="calendar">Calendar</Tab>
      </TabGroup>
      
      {activeView === 'list' && <ListView projectId={project.id} />}
      {activeView === 'board' && <BoardView projectId={project.id} />}
      {activeView === 'calendar' && <CalendarView projectId={project.id} />}
    </div>
  );
};

export default ProjectPage;
```

4. We'll also need to update the task model to include an 'inProgress' field:

```prisma
model Task {
  // Existing fields
  
  // Add this field
  inProgress Boolean @default(false)
}
```

5. Finally, we need to add some CSS for the board view in `styles/board.css`:

```css
.board-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
}

.board-column {
  min-width: 300px;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  padding: 1rem;
}

.tasks-container {
  min-height: 200px;
}
```

This implementation follows the template's patterns while adding the custom board view functionality you need. Would you like me to explain any part of this implementation in more detail?"

### Key Actions in This Step:

1. **Identify requirements** not covered by the template
2. **Design extensions** that maintain consistency with the template
3. **Implement custom features** following the template's patterns
4. **Integrate extensions** with the existing application
5. **Test thoroughly** to ensure proper functionality

## Step 6: Test and Refine the Application

Work together to test the application and refine it based on feedback:

### Example Conversation:

**AI**: "Now that we've implemented the core features of TaskFlow, let's test the application to ensure everything works as expected. Here's a testing plan based on the template's testing guide:

1. **Authentication Testing**:
   - Test user registration
   - Test login/logout
   - Test password reset flow

2. **Task Management Testing**:
   - Create tasks with all required fields
   - Edit and delete tasks
   - Test task assignment
   - Verify priority, labels, and time estimates work correctly

3. **Board View Testing**:
   - Test drag and drop functionality
   - Verify task status updates correctly
   - Test filtering and sorting in board view

4. **Integration Testing**:
   - Test Google Calendar integration
   - Test Slack notifications

Would you like to focus on testing any specific area first?"

**User**: "Let's start with testing the task management features, especially the new fields we added."

**AI**: "Great choice! Let's test the task management features with a focus on the new fields:

1. **Create a Task with New Fields**:
   - Navigate to a project
   - Click 'Add Task'
   - Fill in title and description
   - Set priority to 'High'
   - Add a time estimate of 120 minutes
   - Add a couple of labels
   - Set a due date
   - Save the task
   - Verify all fields appear correctly in the task details

2. **Edit Task Fields**:
   - Open an existing task
   - Change the priority from 'High' to 'Medium'
   - Update the time estimate
   - Add/remove labels
   - Save changes
   - Verify changes are reflected in the UI

3. **Test Priority Filtering**:
   - Create several tasks with different priorities
   - Use the filter to show only 'High' priority tasks
   - Verify only high priority tasks are displayed

4. **Test Time Tracking**:
   - Start time tracking on a task
   - Pause and resume tracking
   - Complete the task
   - Verify the tracked time against the estimate

As you perform these tests, look for:
- Any UI glitches or inconsistencies
- Performance issues when handling multiple tasks
- Proper validation of inputs
- Correct updating of the database

Would you like me to provide more specific test cases or shall we discuss any issues you've found during testing?"

### Key Actions in This Step:

1. **Create a comprehensive test plan** covering all features
2. **Prioritize testing** based on critical functionality
3. **Document and address issues** found during testing
4. **Refine the implementation** based on testing feedback
5. **Verify fixes** with additional testing

## Example: Full Conversational Flow

Here's an example of a complete conversational flow for building a customer support application from a template:

**User**: "I need to build a customer support ticketing system for our company. Do you have a template that would work for this?"

**AI**: "Yes, the 'Support Portal' template would be an excellent starting point for your customer support ticketing system. This template includes:

1. **Ticket Management**:
   - Ticket creation and assignment
   - Priority and status tracking
   - Categorization and tagging

2. **Customer Management**:
   - Customer profiles
   - Communication history
   - Company/organization grouping

3. **Agent Workspace**:
   - Ticket queue and assignment
   - Response templates
   - Performance metrics

4. **Knowledge Base**:
   - Article creation and management
   - Search functionality
   - Category organization

Would you like me to explain any of these features in more detail to help you decide if this template meets your needs?"

**User**: "That sounds promising. We definitely need ticket management and agent workspace features. For the knowledge base, we already have a separate system. Can we customize the template to integrate with our existing knowledge base instead of using the built-in one?"

**AI**: "Absolutely! The Support Portal template is designed to be modular, so you can easily customize it to integrate with your existing knowledge base instead of using the built-in one.

The template uses a plugin architecture for integrations, so we would:
1. Disable the built-in knowledge base module
2. Create a custom integration plugin for your existing knowledge base
3. Update the UI to link to your knowledge base where appropriate

Could you tell me what system you're using for your knowledge base so I can advise on the best integration approach?"

**User**: "We're using Confluence for our knowledge base."

**AI**: "Great! Confluence has a robust API that we can integrate with. Here's how we'll customize the template:

1. **Disable Built-in Knowledge Base**:
   In the template configuration, we'll set:
   ```javascript
   modules: {
     knowledgeBase: {
       enabled: false
     }
   }
   ```

2. **Create Confluence Integration**:
   We'll create a custom integration that:
   - Searches Confluence articles from the ticket interface
   - Allows agents to link tickets to Confluence articles
   - Embeds relevant article suggestions based on ticket content

3. **UI Modifications**:
   - Replace knowledge base links with Confluence links
   - Add a Confluence search component to the agent workspace
   - Include Confluence article previews in the ticket view

Now, let's discuss your specific requirements for the ticket management system:
1. What ticket priorities do you need?
2. What statuses do you want to track tickets through?
3. Do you need custom fields for tickets?
4. How do you want to handle ticket assignment to agents?"

[The conversation would continue through requirements gathering, customization, and implementation]

## Handling Template Limitations

Sometimes a template might not fully meet your needs. Here's how to handle such situations:

### Example Conversation:

**User**: "The template doesn't support the SLA tracking we need for our support tickets."

**AI**: "You're right that the template doesn't include built-in SLA (Service Level Agreement) tracking. We have a few options to address this:

1. **Custom Extension**: We can build a custom SLA tracking module that integrates with the existing ticket system. This would involve:
   - Adding SLA configuration options (response time, resolution time)
   - Creating a tracking mechanism for time elapsed
   - Implementing alerts for approaching/breached SLAs
   - Adding SLA reporting

2. **Third-party Integration**: We could integrate with a specialized SLA tracking tool if you're already using one.

3. **Template Modification**: We could modify the template's core ticket handling to incorporate SLA tracking directly.

I recommend the first approach (Custom Extension) as it maintains the template's structure while adding the functionality you need. Would you like me to outline how we would implement this extension?"

### Key Considerations for Template Limitations:

1. **Evaluate the gap**: Understand exactly what's missing and its importance
2. **Consider extension options**: Look for ways to add functionality without major restructuring
3. **Weigh customization costs**: Balance the effort of customization against starting from scratch
4. **Maintain upgradeability**: Try to implement extensions in a way that doesn't prevent future template updates

## Next Steps

After building your application from a template, you might want to:
- [Extract patterns](./pattern-extraction.md) from your customizations to improve templates
- [Share your customizations](./template-sharing.md) with the community
- [Create a specialized template](./template-specialization.md) based on your implementation
- Consider contributing improvements back to the original template 
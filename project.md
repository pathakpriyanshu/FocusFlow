# FocusFlow — Project Blueprint

> A simple, full-stack project and task assignment system. Managers organize work into projects, assign tasks to employees, set due dates, send reminders, and track task status. Employees see their assigned tasks and update their progress.

## 1. Product vision

FocusFlow addresses a practical workplace need: a manager needs a straightforward way to assign work to employees, remind them about deadlines, and see whether tasks are pending, in progress, or completed.

The first version will deliberately stay focused. We are not building a broad HR platform, employee surveillance tool, or complex project-management suite.

### Core product flow

1. A user opens FocusFlow and chooses the Employee or Manager login option.
2. The user signs in with their account.
3. An employee sees a table of tasks assigned to them.
4. A manager sees a grid of projects they manage.
5. The manager opens a project to see its tasks, assign new tasks, and send reminders.
6. Employees update the status of their assigned tasks.
7. The manager sees the latest status.

The selected login option is only a navigation choice. The server must verify the authenticated user's actual role. A user must not gain manager permissions by selecting "Manager" on the login screen.

## 2. Version 1 scope

### Employee experience

After signing in, an employee sees a simple task table with these columns:

| Column      | Meaning                       |
| ----------- | ----------------------------- |
| Task name   | Name of the assigned task     |
| Project     | Project the task belongs to   |
| Assigned by | Manager who assigned the task |
| Due date    | Task deadline                 |
| Status      | Current task status           |
| Action      | Open/update the task          |

Employee actions:

- View tasks assigned to their account.
- Open a task to see its description and details.
- Update the task status.
- See the project, assigning manager, and due date.
- See whether a task is overdue.

For Version 1, the initial task statuses are:

- `pending`
- `in_progress`
- `completed`

The backend will enforce which fields an employee can update. Employees cannot change the task's project, creator, or assignee unless a later, explicitly authorized workflow allows it.

### Manager experience

After signing in, a manager sees a grid of projects they manage.

Each project card can show:

- Project name.
- Short description, if provided.
- Number of tasks.
- A simple completion summary, if useful.

When a manager opens a project, they see a task table:

| Column      | Meaning                     |
| ----------- | --------------------------- |
| Task name   | Name of the task            |
| Assigned to | Employee responsible for it |
| Due date    | Task deadline               |
| Status      | Current task status         |
| Action      | Remind / view / edit        |

Manager actions:

- Create a project.
- View projects they manage.
- Open a project and view its tasks.
- Create a task within a project.
- Assign a task to an employee.
- Set or edit a due date.
- View task status.
- Send a reminder for a task.
- Edit or delete tasks they are authorized to manage.

### Explicitly out of scope for Version 1

Do not build these unless the core application is complete and there is a clear reason:

- Multiple-company SaaS tenancy.
- Complex departments and organizational charts.
- Super-admin platform.
- Time tracking or employee monitoring.
- Pomodoro timer.
- File attachments.
- Recurring tasks.
- Advanced analytics and exports.
- Real-time chat.
- Electron desktop packaging.
- Supabase migration.

## 3. Users and permissions

Version 1 is for one company, with multiple managers and employees.

### Employee

- Can view only tasks assigned to their account.
- Can view the associated project and assigning manager.
- Can update permitted task status fields.
- Cannot create projects or assign tasks.
- Cannot view another employee's private task list.

### Manager

- Can create and manage projects they own or are explicitly authorized to manage.
- Can create tasks within those projects.
- Can assign tasks to employees in the company.
- Can view tasks in projects they are authorized to manage.
- Can send reminders and update permitted task details.

### Account provisioning

- Users have a role stored in the database.
- Public registration must not allow a person to grant themselves the Manager role.
- For development, manager accounts can be created through a controlled seed/admin process.
- The exact employee onboarding workflow will be decided before authentication is implemented.

There is no separate Super Admin role in the initial product scope.

## 4. Technology stack

### Frontend

- **JavaScript** — application language.
- **React** — component-based user interface.
- **Vite** — development server and build tooling.
- **Tailwind CSS** — styling and responsive layouts.
- **React Router** — client-side navigation.
- **Redux Toolkit** — shared client-side application state where appropriate.
- **React hooks** — local state, effects, references, and component behavior.
- **Fetch API** — HTTP communication with the backend.

### Backend

- **Node.js** — JavaScript runtime.
- **Express.js** — HTTP server, routes, and middleware.
- **Mongoose** — MongoDB object modeling.
- **bcrypt** (or bcryptjs, depending on environment) — password hashing.
- **JWT** — signed authentication tokens.
- **HTTP-only cookies** — browser token transport/storage strategy.
- **cookie-parser** — parsing cookies in Express.

### Database

- **MongoDB** — persistent application data.
- **Mongoose** — schemas, validation, and database operations.

### Later learning / migration

- **Supabase** — deliberately deferred. After the MongoDB version is complete, we may build a separate migration exercise to learn Supabase Auth, PostgreSQL, and Row Level Security.
- **Electron** — deliberately deferred until the browser application works reliably.

## 5. High-level architecture

```text
Browser
  |
  v
React + Vite
  |-- Tailwind CSS
  |-- React Router
  |-- Redux Toolkit
  |
  | HTTP requests / JSON responses
  | Cookie-based authentication
  v
Node.js + Express API
  |-- Routes
  |-- Authentication middleware
  |-- Authorization middleware
  |-- Controllers / services
  |
  v
Mongoose
  |
  v
MongoDB
```

The browser communicates with the Express API. Express validates requests, authenticates the user, enforces permissions, applies business rules, and accesses MongoDB through Mongoose.

React must not connect directly to MongoDB or contain database credentials.

## 6. Initial data model

These are conceptual entities. Final fields, indexes, and Mongoose schemas will be designed together before implementation.

### User

Possible fields:

- `_id`
- `name`
- `email`
- `passwordHash`
- `role` (`employee` or `manager`)
- `createdAt`
- `updatedAt`

Passwords must never be stored in plaintext.

### Project

Possible fields:

- `_id`
- `name`
- `description`
- `createdBy` (manager's user ID)
- `createdAt`
- `updatedAt`

A project is managed by an authorized manager. We can add explicit project membership later if the workflow requires restricting which employees can be assigned to a project.

### Task

Possible fields:

- `_id`
- `title`
- `description`
- `projectId`
- `assignedTo` (employee's user ID)
- `assignedBy` (manager's user ID)
- `dueDate`
- `status` (`pending`, `in_progress`, `completed`)
- `createdAt`
- `updatedAt`

### Reminder / Notification

A reminder record may be added when implementing the reminder feature. It can record:

- Task reference.
- Recipient user reference.
- Sender user reference.
- Reminder message or type.
- Created/sent timestamp.
- Delivery status, if an external delivery channel is added.

Right now, the reminders will be in app only, not through emails or any other medium, in both manager and employee initial page a notification icon at top will be there, which tells notification. Simple as that.

## 7. Data relationships

Conceptually:

```text
User (Manager)
   |
   | creates/manages
   v
Project
   |
   | contains
   v
Task --------------------> User (Employee)
   |                         ^
   | assignedBy              | assignedTo
   v                         |
User (Manager) --------------+

Task
  |
  | may have
  v
Reminder / Notification
```

A task belongs to one project, is assigned to an employee, and records the manager who assigned it.

The backend must verify that:

- The requester is authenticated.
- The requester has the correct role.
- The manager is authorized to manage the project and task.
- The employee is permitted to access the task.
- Referenced users and projects exist.
- A user cannot access another user's records simply by changing an ID in a request.

*This is the living project blueprint. Update it as decisions are made and the implementation evolves.*

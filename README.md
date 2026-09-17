# User Management System

A full-stack **User Management System** built using **Spring Boot** and **React.js**.

The application provides secure JWT-based authentication, role-based access control, user management, role assignment, and task management for **Admin, Manager, and User** roles.

---

## 🚀 Features

### 🔐 Authentication

- Login using email and password
- JWT-based authentication
- BCrypt password hashing
- Stateless authentication
- Protected API endpoints
- Invalid and expired JWT handling

### 👥 Role-Based Access Control

The application supports three roles:

- **ADMIN**
- **MANAGER**
- **USER**

| Role | Permissions |
|------|-------------|
| **ADMIN** | Create, view, update, delete users and assign roles |
| **MANAGER** | View users, assign tasks and update task status |
| **USER** | View own profile and assigned tasks |

### 👑 Admin Features

- Create new users
- View all users
- View user by ID
- Update users
- Delete users
- Assign/change user roles
- Duplicate email validation
- Password validation

### 👨‍💼 Manager Features

- View all users
- Assign tasks to users
- View all tasks
- Update task status

### 👤 User Features

- View own profile
- View assigned tasks
- View active tasks
- View completed tasks

### ✅ Validation

The application validates:

- Required fields
- Email format
- Minimum password length of 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### ⚠️ Error Handling

The application handles:

- Invalid credentials
- User not found
- Duplicate user
- Invalid JWT
- Expired JWT
- Unauthorized access
- Validation errors

---

# 🛠️ Technologies Used

## Backend

- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- BCrypt
- H2 Database
- Maven

## Frontend

- React.js
- Vite
- JavaScript
- Axios
- React Router DOM
- CSS

## Development Tools

- Eclipse
- VS Code
- Postman
- Git
- GitHub

---

# 📁 Project Structure

```text
user-management-system/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/demo/
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   ├── dto/
│   │   │   │   ├── entity/
│   │   │   │   ├── exception/
│   │   │   │   ├── repository/
│   │   │   │   └── security/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManagerDashboard.jsx
│   │   │   └── UserDashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🏗️ System Architecture

```text
                         React Frontend
                                │
                                │ Axios
                                ▼
                     Spring Boot REST API
                                │
                   ┌────────────┴────────────┐
                   │                         │
             Spring Security          Spring Data JPA
                   │                         │
              JWT + RBAC                    ▼
                   │                    H2 Database
                   │
             ┌─────┼─────┐
             │     │     │
           ADMIN MANAGER USER
```

---

# 🔐 Authentication Flow

```text
User
 │
 │ Login
 ▼
POST /api/auth/login
 │
 ▼
Validate Email & Password
 │
 ▼
BCrypt Password Verification
 │
 ▼
Generate JWT Token
 │
 ▼
React Frontend
 │
 │ Authorization: Bearer <JWT>
 ▼
JWT Authentication Filter
 │
 ▼
Find User + Roles
 │
 ▼
Spring Security
 │
 ▼
Protected API
```

### Authentication Process

1. User enters email and password.
2. React sends credentials to the login API.
3. Spring Boot validates the email and password.
4. BCrypt verifies the password.
5. A JWT token is generated after successful authentication.
6. The frontend stores the JWT token.
7. The token is sent with protected API requests.
8. The JWT Authentication Filter validates the token.
9. The user and their roles are loaded.
10. Spring Security authorizes the requested API.

---

# 👥 Role-Based Authorization

Spring Security protects the application according to user roles.

## 👑 Admin APIs

```text
/api/admin/**
```

**Required Role:**

```text
ROLE_ADMIN
```

Admin users can manage users and assign roles.

---

## 👨‍💼 Manager APIs

```text
/api/manager/**
```

**Required Role:**

```text
ROLE_MANAGER
```

Manager users can view users and manage tasks.

---

## 👤 User APIs

```text
/api/user/**
```

**Required:**

```text
Authenticated User
```

Authenticated users can access their own profile and assigned tasks.

---

# 🗄️ Database

The project uses an **H2 in-memory database** for development and assessment purposes.

## Database Configuration

```properties
spring.datasource.url=jdbc:h2:mem:usermanagement
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

## H2 Console

After starting the backend, open:

```text
http://localhost:8080/h2-console
```

### H2 Connection Details

| Property | Value |
|----------|-------|
| **JDBC URL** | `jdbc:h2:mem:usermanagement` |
| **Username** | `sa` |
| **Password** | Leave blank |

---

# 🧩 Database Entities

## User

```text
id
name
email
password
roles
```

## Role

```text
id
name
```

## Task

```text
id
title
description
status
assignedTo
```

---

## 🔗 Entity Relationships

```text
User
 │
 ├── Many-to-Many ──> Role
 │
 └── One-to-Many ───> Task
```

A user can have multiple roles, and tasks can be assigned to users.

---

# 👤 Default Users

The application automatically creates sample users when the backend starts.

| Role | Email | Password |
|------|-------|----------|
| **ADMIN** | `admin@example.com` | `Admin@123` |
| **MANAGER** | `manager@example.com` | `Manager@123` |
| **USER** | `user@example.com` | `User@123` |

> **Note:** These credentials are provided for local development and assessment testing only.

---

# 📡 API Documentation

## 🔑 Authentication API

### Login

```http
POST /api/auth/login
```

### Request

```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

### Response

```text
JWT_TOKEN
```

Use the returned token in protected requests:

```text
Authorization: Bearer JWT_TOKEN
```

---

# 👑 Admin APIs

All Admin APIs require the **ADMIN** role.

## Create User

```http
POST /api/admin/users
```

### Request

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "John@123",
  "role": "USER"
}
```

---

## Get All Users

```http
GET /api/admin/users
```

---

## Get User By ID

```http
GET /api/admin/users/{id}
```

---

## Update User

```http
PUT /api/admin/users/{id}
```

### Request

```json
{
  "name": "John Updated",
  "email": "john@example.com",
  "password": "John@123",
  "role": "MANAGER"
}
```

---

## Delete User

```http
DELETE /api/admin/users/{id}
```

---

## Assign Role

```http
PUT /api/admin/users/{id}/role?role=MANAGER
```

### Supported Roles

```text
ADMIN
MANAGER
USER
```

---

# 👨‍💼 Manager APIs

All Manager APIs require the **MANAGER** role.

## Get All Users

```http
GET /api/manager/users
```

---

## Assign Task

```http
POST /api/manager/tasks?userId={userId}
```

### Request

```json
{
  "title": "Complete Assignment",
  "description": "Complete Spring Boot assessment",
  "status": "PENDING"
}
```

---

## Get All Tasks

```http
GET /api/manager/tasks
```

---

## Update Task Status

```http
PUT /api/manager/tasks/{taskId}/status?status=COMPLETED
```

### Supported Statuses

```text
PENDING
IN_PROGRESS
COMPLETED
```

---

# 👤 User APIs

All User APIs require authentication.

## Get Own Profile

```http
GET /api/user/profile
```

---

## Get Assigned Tasks

```http
GET /api/user/tasks
```

Users can see their assigned tasks divided into:

```text
Active Tasks
├── PENDING
└── IN_PROGRESS

Completed Tasks
└── COMPLETED
```

Completed tasks remain visible to the user.

---

# 🔄 Task Workflow

```text
Manager
   │
   │ Assign Task
   ▼
User
   │
   ▼
PENDING
   │
   ▼
IN_PROGRESS
   │
   ▼
COMPLETED
```

The Manager can update the task status.

The User Dashboard automatically separates tasks into **Active Tasks** and **Completed Tasks** based on their status.

---

# 🛡️ Security

The application implements:

- JWT authentication
- BCrypt password hashing
- Role-based authorization
- Stateless sessions
- Protected API endpoints
- Authorization header validation
- Invalid JWT rejection
- Expired JWT rejection
- Password validation
- Duplicate email checking

Passwords are stored using **BCrypt hashing** rather than plain text.

---

# ▶️ Running the Project

## Requirements

Install the following:

- Java 17 or higher
- Node.js
- npm
- Git

### Optional Tools

- Eclipse
- VS Code
- Postman

---

# ☕ Running the Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

## Windows

```cmd
mvnw.cmd spring-boot:run
```

## Linux / macOS

```bash
./mvnw spring-boot:run
```

The backend will run at:

```text
http://localhost:8080
```

---

# ⚛️ Running the Frontend

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

# 🧪 Testing With Postman

The backend APIs can be tested using **Postman**.

## Recommended Testing Flow

```text
1. Login
      ↓
2. Copy JWT Token
      ↓
3. Add Authorization Header
      ↓
4. Test Protected APIs
      ↓
5. Create Users
      ↓
6. Assign Roles
      ↓
7. Assign Tasks
      ↓
8. Update Task Status
      ↓
9. Verify User Dashboard
```

For protected APIs use:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

# 🔒 RBAC Testing

## Admin Access

Using an Admin token:

```http
GET /api/admin/users
```

Expected response:

```text
200 OK
```

---

## User Trying to Access Admin API

Using a User token:

```http
GET /api/admin/users
```

Expected response:

```text
403 Forbidden
```

---

## Manager Access

Using a Manager token:

```http
GET /api/manager/users
```

Expected response:

```text
200 OK
```

---

## User Trying to Access Manager API

Using a User token:

```http
GET /api/manager/users
```

Expected response:

```text
403 Forbidden
```

---

# 📋 API Summary

| Method | Endpoint | Access |
|--------|----------|--------|
| `POST` | `/api/auth/login` | Public |
| `POST` | `/api/admin/users` | ADMIN |
| `GET` | `/api/admin/users` | ADMIN |
| `GET` | `/api/admin/users/{id}` | ADMIN |
| `PUT` | `/api/admin/users/{id}` | ADMIN |
| `DELETE` | `/api/admin/users/{id}` | ADMIN |
| `PUT` | `/api/admin/users/{id}/role` | ADMIN |
| `GET` | `/api/manager/users` | MANAGER |
| `POST` | `/api/manager/tasks` | MANAGER |
| `GET` | `/api/manager/tasks` | MANAGER |
| `PUT` | `/api/manager/tasks/{taskId}/status` | MANAGER |
| `GET` | `/api/user/profile` | AUTHENTICATED |
| `GET` | `/api/user/tasks` | AUTHENTICATED |

---

# 🖥️ Application Pages

The frontend contains separate interfaces for each role.

## 🔑 Login

Users enter their email and password.

After successful authentication, the application identifies the user's role and redirects them to the appropriate dashboard.

---

## 👑 Admin Dashboard

Admin users can:

- Create users
- View users
- Edit users
- Delete users
- Assign roles

---

## 👨‍💼 Manager Dashboard

Managers can:

- View all users
- Assign tasks
- View all tasks
- Update task status

---

## 👤 User Dashboard

Users can:

- View their profile
- View active tasks
- View completed tasks

---

# 🌐 Deployment

The application is designed to use separate deployment services for the frontend and backend.

```text
                         GitHub
                           │
                  ┌────────┴────────┐
                  │                 │
                  ▼                 ▼
              Frontend           Backend
               Vercel             Render
                  │                 │
                  └────────┬────────┘
                           │
                           ▼
                      Application
```

### Frontend

The React frontend can be deployed using **Vercel**.

### Backend

The Spring Boot backend can be deployed using **Render** or another cloud hosting platform.

### Production API URL

During local development, the frontend uses:

```text
http://localhost:8080
```

For production deployment, the frontend API URL should be changed to the publicly deployed Spring Boot backend URL.

The current H2 database is an **in-memory database** intended for development and assessment purposes.

> Database data may reset when the deployed backend restarts.

---

# 🚀 Future Improvements

Possible future improvements include:

- PostgreSQL or MySQL production database
- Refresh token authentication
- Pagination
- Search and filtering
- Advanced task management
- User registration
- Password reset
- Email notifications
- Docker deployment
- AWS deployment
- Production environment variables
- Automated testing
- Swagger/OpenAPI API documentation

---

# 📦 GitHub Repository

The repository contains both the backend and frontend:

```text
user-management-system/
│
├── backend/
└── frontend/
```

The project can be cloned from GitHub and run locally by following the installation instructions above.

---

# 👨‍💻 Author

## Amey Pethe

**Full Stack Developer**

### Technologies

`Java` `Spring Boot` `React.js` `JavaScript` `REST API` `JWT` `JPA` `H2` `Git`

---

# 📄 License

This project was created for **educational and skill assessment purposes**.

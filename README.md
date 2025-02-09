# 🚀 Scalable Task Management System  

### **Empowering Teams with Real-Time Collaboration & Efficient Task Management**  

## 📌 **Overview**  
This is a **high-performance backend system** designed for **task management applications**, enabling teams to organize their workflow efficiently. It provides **real-time collaboration**, **notifications**, and **cloud storage**, making it ideal for businesses, project teams, and freelancers.  

## 🎯 **Key Features**  

✅ **Task Management:** Create, update, assign, and track tasks seamlessly.  
✅ **Real-Time Collaboration:** Instant updates across all connected users.  
✅ **File Storage:** Upload and manage files using **AWS S3**.  
✅ **Notifications:** Get alerts via **AWS SNS** or Web Push Notifications.  
✅ **Task Queues:** **Redis-based BullMQ** or **AWS SQS** for background processing.  
✅ **Caching:** **Redis** to optimize performance.  
✅ **Scalable & Cloud-Powered:** Designed for **high traffic** and **growing teams**.  
✅ **Search & Filtering:** PostgreSQL full-text search for fast retrieval.  
✅ **CI/CD Pipeline:** Automated testing and deployment with **GitHub Actions**.  
✅ **Secure API:** Uses JWT authentication and follows best security practices.  
✅ **Automated Deployment:** Hosted on **Railway (Free)** and **AWS EC2 (Free Tier)**.  

## 🛠 **Tech Stack**  

### **Backend Technologies**  
- **Node.js** (Runtime)  
- **Express.js** (Web Framework)  
- **PostgreSQL** (Relational Database)  
- **Redis** (Caching & Task Queues)  
- **Socket.IO** (Real-time communication)  

### **Cloud Services & Integrations**  
- **AWS S3** (File Storage)  
- **AWS SNS** (Notifications)  
- **Redis** (Caching & Task Queues - Hosted on Railway)  
- **Railway** (Backend Hosting & PostgreSQL Database)  
- **GitHub Actions** (CI/CD for Automated Deployment)  

### **Development & Deployment**  
- **GitHub Actions** (CI/CD Pipeline)  
- **Swagger / Postman** (API Documentation)  

## 🔗 **How Api Works?**  
# Task Management System API Documentation

## Authentication
All endpoints require authentication using a Bearer token.

---

## Endpoints

### Users

#### Register a new user
```
POST /users/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login
```
POST /users/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Get all users for a project
```
GET /projects/:projectId/users
```
**Response:**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com"
  }
]
```

#### Get all users for a task
```
GET /tasks/:taskId/users
```
**Response:**
```json
[
  {
    "id": 2,
    "name": "Bob Smith",
    "email": "bob@example.com"
  }
]
```

---

### Projects

#### Get all projects
```
GET /projects
```
**Response:**
```json
[
  {
    "id": 1,
    "name": "Project Alpha",
    "description": "A sample project",
    "createdAt": "2025-02-09T12:00:00Z"
  }
]
```

#### Create a project (Project Manager Only)
```
POST /projects
```
**Request Body:**
```json
{
  "name": "Project Alpha",
  "description": "A sample project"
}
```

#### Invite a member to a project
```
POST /projects/:projectId/invite
```
**Request Body:**
```json
{
  "userId": 2
}
```

---

### Tasks

#### Create a task (Project Manager & Admin Only)
```
POST /tasks
```
**Request Body:**
```json
{
  "projectId": 1,
  "title": "Design UI",
  "description": "Create UI mockups",
  "assignedTo": 3,
  "dependencies": 2,
  "dueDate": "2025-02-15T12:00:00Z"
}
```

#### Assign a task to a member (Project Manager & Admin Only)
```
POST /tasks/:taskId/assign
```
**Request Body:**
```json
{
  "userId": 3
}
```

#### Get all tasks for a project
```
GET /projects/:projectId/tasks
```
**Response:**
```json
[
  {
    "id": 1,
    "title": "Design UI",
    "description": "Create UI mockups",
    "status": "In Progress",
    "assignedTo": 3,
    "dueDate": "2025-02-15T12:00:00Z"
  }
]
```

#### Get task status
```
GET /tasks/:taskId/status
```
**Response:**
```json
{
  "taskId": 1,
  "status": "In Progress"
}
```

---

### Search

#### Advanced search for projects or tasks
```
GET /search
```
**Query Parameters:**
- `query` (string) - Search term
- `type` (string) - Either "project" or "task"

**Example Request:**
```
GET /search?query=Alpha&type=project
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Project Alpha",
    "description": "A sample project",
    "createdAt": "2025-02-09T12:00:00Z"
  }
]
```

---

## Notes
- The `assignedTo` field in tasks refers to a user's ID.
- Only project managers can create projects and invite members.
- Both project managers and admins can create and assign tasks.
- Authentication is required for all requests.

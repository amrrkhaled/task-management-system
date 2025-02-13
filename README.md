# 🚀 Scalable Task Management System  

### **Empowering Teams with Real-Time Collaboration & Efficient Task Management**  

## 📌 **Overview**  
This is a **high-performance backend system** designed for **task management applications**, enabling teams to organize their workflow efficiently. It provides **real-time collaboration**, **notifications**, and **cloud storage**, making it ideal for businesses, project teams, and freelancers.  

## 🎯 **Key Features**  


✅ **Task Management:** Create, update, assign, and track tasks seamlessly.  
✅ **Real-Time Collaboration:** Instant updates across all connected users.  
✅ **File Storage:** Upload and manage files using **AWS S3**.  
✅ **Notifications:** Get alerts via **AWS SNS** or Web Push Notifications.  
✅ **Task Queues:** **AWS SQS** for background processing.  
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
- **AWS SES** (Emails)  
- **Redis** (Caching & Task Queues - Hosted on Railway)  
- **Railway** (Backend Hosting & PostgreSQL Database)  
- **GitHub Actions** (CI/CD for Automated Deployment)  

### **Development & Deployment**  
- **GitHub Actions** (CI/CD Pipeline)  
- **Swagger / Postman** (API Documentation)  

## 🔗 **How Api Works?**  
# Task Management System API Documentation

## Overview
This API allows users to create projects, invite members or admins, manage tasks, and assign tasks to multiple members.

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
GET /projects/:projectId-P/users
```
**Response:**
```json
[
  {
    "id": 1-U,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "member"
  }
]
```

#### Get all users for a task
```
GET /tasks/:taskId-T/users
```
**Response:**
```json
[
  {
    "id": 2-U,
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
    "id": 1-P,
    "name": "Project Alpha",
    "description": "A sample project",
    "managerId": 1-U,
    "admins": [2-U],
    "members": [3-U, 4-U],
    "createdAt": "2025-02-09T12:00:00Z"
  }
]
```

### Create a Project (Any User)

### Endpoint
```http
POST /projects
```

### Request Body
```json
{
  "name": "Project Alpha",
  "description": "A sample project"
}
```

### Response
```json
{
  "id": "1-P",
  "name": "Project Alpha",
  "description": "A sample project",
  "attachments": [],
  "managerId": "1-U",
  "admins": [],
  "members": []
}
```



### Upload Attachments to a Project 

### Endpoint
```http
POST /projects/{projectId}/upload
```

### Request Body
```json
{
  "attachments": [file1.pdf, image.png]
}
```

### Response
```json
{
  "id": "1-P",
  "name": "Project Alpha",
  "description": "A sample project",
  "attachments": [
    "https://your-bucket.s3.amazonaws.com/project-alpha/file1.pdf",
    "https://your-bucket.s3.amazonaws.com/project-alpha/image.png"
  ],
  "managerId": "1-U",
  "admins": [],
  "members": []
}

```


#### Invite a member or admin to a project
```
POST /projects/:projectId-P/invite
```
**Request Body:**
```json
{
  "userId": 2-U,
  "role": "admin" or "member"
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
  "projectId": 1-P,
  "title": "Design UI",
  "description": "Create UI mockups",
  "assignedTo": [3-U, 4-U],
  "prerequisiteTask": 2-T,
  "status": "In Progress",
  "dueDate": "2025-02-15T12:00:00Z"
}
```

#### Assign a task to multiple members (Project Manager & Admin Only)
```
POST /tasks/:taskId-T/assign
```
**Request Body:**
```json
{
  "userIds": [3-U, 4-U]
}
```

#### Get all tasks for a project
```
GET /projects/:projectId-P/tasks
```
**Response:**
```json
[
  {
    "id": 1-T,
    "title": "Design UI",
    "description": "Create UI mockups",
    "status": "In Progress",
    "assignedTo": [3-U, 4-U],
    "prerequisiteTask": 2-T,
    "dueDate": "2025-02-15T12:00:00Z"
  }
]
```

#### Get task status
```
GET /tasks/:taskId-T/status
```
**Response:**
```json
{
  "taskId": 1-T,
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
    "id": 1-P,
    "name": "Project Alpha",
    "description": "A sample project",
    "createdAt": "2025-02-09T12:00:00Z"
  }
]
```

---

## Notes
- Any user can create a project and becomes its manager.
- A project can have a manager, admins, and normal members.
- Only project managers can invite users as members or admins.
- Tasks can have prerequisite tasks and be assigned to multiple members.
- Authentication is required for all requests.


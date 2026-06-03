# Task Manager - MERN Stack

A full-stack Task Manager application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to register, log in securely, and manage their personal tasks with full CRUD functionality.


## Live DEMO
task-manager-smoky-psi.vercel.app

## Features


### Authentication

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT-based Authentication
* Protected Routes

### Task Management

* Create Tasks
* View Personal Tasks
* Update Existing Tasks
* Delete Tasks
* Mark Tasks as Completed

### Security

* Password encryption using bcryptjs
* JWT authentication
* Protected backend routes
* User-specific task access

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

## Project Structure

```bash
Task-Manager/
│
├── client/
│   ├── src/
│   │   ├── Pages/
│   │   ├── Components/
│   │   ├── services/
│   │   └── App.jsx
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── server.js
│
└── README.md
```

## Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=4500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

For frontend:

```env
VITE_API_URL=http://localhost:4500/api
```

## Installation

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```http
GET    /api/task
POST   /api/task
PUT    /api/task/:taskId
DELETE /api/task/:taskId
```

## Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas


## Author

Garvit Goyal

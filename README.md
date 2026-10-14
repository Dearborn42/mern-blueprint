# MERN Blueprint

A Node.js CLI package for quickly generating a full-stack JavaScript application with either **React** or **Next.js** as the frontend and **Express.js + MongoDB** as the backend.

The package automatically creates the project structure, installs dependencies, configures the frontend and backend, and provides authentication scaffolding.

## Features

- React frontend with Create React App
- Next.js frontend with App Router
- Express.js backend
- MongoDB and Mongoose support
- JWT authentication scaffolding
- Login and signup endpoints
- Authentication middleware
- CommonJS or ESM backend support
- React Router
- Bootstrap
- Tailwind CSS
- Nodemon
- Concurrent frontend/backend development
- Automatic project structure generation
- Automatic `.env` configuration
- MongoDB connection configuration

---

## Authors

- [@Dearborn42](https://github.com/Dearborn42)

---

## Prerequisites

Before running the package, make sure you have:

- [Node.js](https://nodejs.org/) installed
- npm installed
- A MongoDB connection string

For the **Next.js** option, use a Node.js and npm version compatible with the version of Next.js installed by the package.

It is recommended that you have your MongoDB connection string available before running the setup.

---

## Installation / Usage

You do not need to install the package globally.

Run:

```bash
npx @dearborn42/mern-blueprint
```

The CLI will guide you through the setup process.

---

## Frontend Options

The CLI currently provides two frontend options:

```text
1. Create-React-App
2. Next.js
```

### Option 1: React

The React option creates a frontend using:

- React
- React Router
- Bootstrap
- Tailwind CSS

The generated React application includes basic pages and components for:

- Home
- About
- Edit
- Navbar

---

### Option 2: Next.js

The Next.js option creates a Next.js application using the **App Router**.

The generated application includes pages for:

- Home
- About
- Contact
- Login
- Signup

It also creates:

- Components
- Server functions
- Middleware
- Authentication pages

The package supports both Next.js projects using:

```text
client/src/app
```

and projects using:

```text
client/app
```

---

## Backend

Both frontend options use an Express.js backend.

The generated backend includes:

- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv
- express-session
- Nodemon

The backend contains directories for:

```text
controllers/
middleware/
models/
routes/
```

---

## Authentication

The generated backend includes authentication scaffolding.

The following endpoints are created:

```text
POST /login
POST /signup
```

JWT authentication is included as a starting point for implementing user authentication.

The package also generates authentication middleware:

```text
server/middleware/auth.js
```

The generated authentication code is intended to be customized for the application's database models and authentication requirements.

---

## Module System

The CLI allows you to choose between **CommonJS** and **ESM** for the backend.

The CLI will ask:

```text
Which type of Nodejs do you prefer:
```

You can select:

```text
CommonJS
```

or:

```text
ESM
```

### CommonJS

The generated backend uses:

```javascript
const express = require('express');
```

and:

```javascript
module.exports = ...
```

### ESM

The generated backend uses:

```javascript
import express from 'express';
```

and:

```javascript
export ...
```

---

## Environment Variables

During setup, the CLI asks for:

```text
MongoDB connection string
Session secret key
Port number
```

These values are automatically written to:

```text
server/.env
```

The generated environment file contains:

```env
MONGO_URI="your-mongodb-connection-string"
SECRET_KEY="your-secret-key"
PORT=5000
```

The `.env` file is automatically added to `.gitignore`.

**Never commit secrets or database credentials to a public repository.**

---

## Project Structure

The generated project has the following general structure:

```text
root/
├── client/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   │   ├── auth.js
│   │   └── login.js
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── package.json
└── .gitignore
```

The exact contents of the `client` directory depend on whether React or Next.js is selected.

---

# React Project Structure

When using the React option, the generated project will have a structure similar to:

```text
root/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── About.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Navbar.jsx
│   │   ├── Styles/
│   │   ├── Utils/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   │   ├── auth.js
│   │   └── login.js
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── package.json
│
└── package.json
```

---

# Next.js Project Structure

When using the Next.js option, the generated project will have a structure similar to:

```text
root/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── about/
│   │   │   │   └── page.jsx
│   │   │   ├── contact/
│   │   │   │   └── page.jsx
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   ├── signup/
│   │   │   │   └── page.jsx
│   │   │   └── page.jsx
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ServerFunctions.js
│   │   └── middleware.js
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   │   ├── auth.js
│   │   └── login.js
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── package.json
│
└── package.json
```

Depending on the version of Next.js and the generated project configuration, the `app` directory may be located directly under `client` rather than `client/src`.

---

## Dependencies

### React Frontend

The React option installs:

```text
react-router-dom
bootstrap
tailwindcss
```

Create React App also installs the standard React dependencies required by the generated application.

### Next.js Frontend

The Next.js option installs the dependencies provided by `create-next-app`, along with the configuration generated by this package.

### Backend

The backend installs:

```text
express
bcrypt
body-parser
cors
dotenv
express-session
mongodb
mongoose
jsonwebtoken
nodemon
```

---

## Development

After the project has been generated, move into the project directory:

```bash
cd your-project
```

Start both the frontend and backend:

```bash
npm start
```

The root project is configured to run the frontend and backend concurrently.

You can also run them separately.

### Frontend

```bash
npm run start:frontend
```

### Backend

```bash
npm run start:backend
```

The backend uses Nodemon so that it automatically restarts when backend files are changed.

---

## Generated npm Scripts

The root `package.json` contains:

```json
{
  "scripts": {
    "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",
    "start:frontend": "cd ./client && npm run dev",
    "start:backend": "cd ./server && npm run start"
  }
}
```

The exact frontend start command may vary depending on whether React or Next.js was selected.

The server package contains:

```json
{
  "scripts": {
    "start": "nodemon app.js"
  }
}
```

---

## Example

Run the CLI:

```bash
npx @dearborn42/mern-blueprint
```

Select your frontend:

```text
Do you want 1.Create-React-App or 2.Next.js
```

Then select your backend module system:

```text
Which type of Nodejs do you prefer:
```

Choose:

```text
CommonJS
```

or:

```text
ESM
```

The CLI will then ask for:

```text
MongoDB connection string
Session secret key
Port number
```

After setup is complete:

```bash
cd your-project
npm start
```

Your frontend and backend will start concurrently.

---

## Technologies

### Frontend

Depending on the selected option:

- React
- Create React App
- Next.js
- React Router
- Tailwind CSS
- Bootstrap

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv
- express-session
- Nodemon

---

## Purpose

MERN Blueprint is designed to reduce the amount of repetitive setup required when starting a full-stack JavaScript application.

Instead of manually creating:

- Frontend directories
- Backend directories
- Express configuration
- MongoDB configuration
- Authentication routes
- Authentication middleware
- Environment files
- Development scripts

the CLI generates the initial application structure automatically.

---

## Important

This package generates a **starting point for development** and is not intended to be a production-ready application without additional configuration.

Before deploying an application, review and customize:

- Authentication
- Authorization
- JWT handling
- Password security
- MongoDB models
- Input validation
- Error handling
- CORS configuration
- Session configuration
- Security headers
- Environment variables
- Database permissions

---

## License

ISC

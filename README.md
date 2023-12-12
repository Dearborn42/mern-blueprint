# MERN Stack Boilerplate

This is a simple Node.js package to kickstart your MERN (MongoDB, Express.js, React, Node.js) stack development. The package provides a script to set up both the server and client sides of your application, install dependencies, and create a basic directory structure. It works exactly like create-react-app.

## Authors

- [@Dearborn42](https://github.com/Dearborn42)

## Prerequisites

Before running the scripts, make sure you have Node.js and npm installed on your machine. It is recommended that you have a mongodb connection string before running deployment.

## Deployment

To deploy this project run

```bash
  npx create-mern-stack
```

## Output

```
root
├── client
│  ├── README.md
│  ├── node_modules
│  ├── package.json
│  ├── package-lock.json
│  ├── .gitignore
│  ├── public
│  │   ├── favicon.ico
│  │   ├── index.html
│  │   ├── robots.txt
│  │   └── manifest.json
│  └── src
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── Styles
│   ├── Utils
│   └── Components
│       ├── about.js
│       ├── edit.js
│       ├── home.js
│       └── navbar.js
├── server
    ├── .env
    ├── .gitignore
    ├── node_moduels
    ├── app.js
    ├── package.json
    ├── package-lock.json
    ├── config
    ├── controllers
    ├── middleware
    ├── models
    └── routes
```

## Dependancies

Installed Dependancies after setup

```
Client
    1. react-router-dom
    2. bootstrap
    3. tailwindcss

Server
    1. express
    2. bcrypt
    3. body-parser
    4. cors
    5. dotenv
    6. express-session
    7. mongodb
    8. mongoose
    9. passport
    10. passport-local
```

## Development

_In root of dir, open two terminals_

```
cd client
```

then

```
npm start
```

_In other terminal_

```
cd server
```

then

```
node app.js
```

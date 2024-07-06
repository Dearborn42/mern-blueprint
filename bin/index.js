#! /usr/bin/env node

const { execSync, spawn } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function displayMenu() {
  console.log('CommonJS ');
  console.log('ESM');
}
const reactApp = `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './Components/About';
import Edit from './Components/Edit';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
      {/* should remove Navbar when you have your login implemented  */}
        <Navbar />
        <Routes>
          <Route path="/" exact Component={App} />
          <Route path="/home" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/edit" Component={Edit} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);`

const nav = `import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router";
export default function Navbar() {
  const navigate = useNavigate();
  const navEnum = {
    "home": () => navigate("/home"),
    "about": () => navigate("/about"),
    "edit": () => navigate("/edit"),
  };

  function nav(route) {
    navEnum[route]();
  }
 return (
    <ul className="flex border-b">
      <li className="mr-1">
        <button className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" onClick={() => nav("home")}>Home</button>
      </li>
      <li className="mr-1">
        <button className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" onClick={() => nav("about")}>About</button>
      </li>
      <li className="mr-1">
        <button className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" onClick={() => nav("edit")}>Edit</button>
      </li>
    </ul>
 );
}`;

const landing = `import './App.css';
import { useState } from "react";
import { useNavigate } from "react-router";

export default function App() {
  const [form, setForm] = useState({email: "", password: ""});
  function updateForm(value) {
      return setForm((prev) => {
          return { ...prev, ...value };
      });
  }
  const navigate = useNavigate();
  async function fetchFunction(e){
    e.preventDefault();
    const getData = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({...form})
    })
    const pass = await getData.json();
    if (pass.success){
      updateForm({email: "", password: ""})
      navigate("/home");
    }else{
        alert("Error");
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="mx-auto w-25 h-50 d-flex flex-column border border-primary p-3">
            <form onSubmit={fetchFunction} className="mt-2">
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={form.email}
                    placeholder="Enter email"
                    onChange={(e) => updateForm({ email: e.target.value })}
                />
                <br />
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={form.password}
                    placeholder="Enter password"
                    onChange={(e) => updateForm({ password: e.target.value })}
                />
                <div className="d-flex justify-content-center w-100 mt-2 flex-col">
                    <button type="submit">Login</button>
                    <br />
                    <button type="button" onClick={() => navigate("/create-account")}>Sign Up</button>
                </div>

            </form>
        </div>
      </header>
    </div>
  );
}`;

const home = `export default function Home(){
    return (
        <div>Home Page</div> 
    )
}`;

const about = `export default function About(){
    return (
        <div>About Page</div>
    )
}`
const index = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}`
const tailwindcss = `@tailwind base;
@tailwind components;
@tailwind utilities;
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`

var getPath = (a, b) => path.join(a, b);
var targtePath = execSync("cd").toString().trim();
var handleOption = (option) => option === "CommonJS" ? true : false;
var scripts = [];
var scripts2 = [];
var ClientOption;
function askForOption(){
  rl.question('Which type of Nodejs do you perfer: ', (choice) => {
    if (choice !== 'CommonJS' && choice !== 'ESM') {
      displayMenu();
      askForOption();
    }else{
        var code;
        var auth;
        var login;
        if(handleOption(choice)){
            code = `const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const { fileURLToPath } = require('url');
const login = require('./middleware/login.js');

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 20 }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(cors());

app.route('/').get((req, res) =>{
    res.send("Welcome");
});
app.post("/login", login);
app.route('/docs').get((req, res) =>{
    // Import your mongoose model
}).post((req, res) =>{
    // Used for creating docs
    // const {id} = req.body;
    // var doc = new Model({id: id});
    // doc.save();
}).put((req, res) =>{
    // Used for updating docs
    // const {id, name} = req.body;
    // var doc = Model.findOneAndUpdate({id: id}, {$set: {name: name}}, {new: true});
});

app.listen(process.env.PORT);`
            login = `const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const model = require('../models/filename'); // Adjust according to the actual model and filename

dotenv.config();

module.exports = async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await model.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "Wrong email or password" });
    if (!user.validPassword(password))
      return res.status(400).json({ success: false, message: "Wrong email or password" });
    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
`
            auth = `function isAuthenticated(req, res, next) {
  if (req.headers.access) {
    return next();
  }
  return res.status(401).json({ success: false, message: "Not logged in" });
}

module.exports = isAuthenticated;
`
        }else{
            code = `import bodyParser from 'body-parser';
import cors from 'cors'
import express from 'express';
import dotenv from "dotenv"
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import login from './middleware/login.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 20}))
app.use(session({secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true,}));
app.use(cors());

app.route('/').get((req, res) =>{
    res.send("Welcome");
})
app.post("/login", login);
app.route('/docs').get((req, res) =>{
    // Import your mongoose model
}).post((req, res) =>{
    // Used for creating docs
    // const {id} = req.body;
    // var doc = new Model({id: id});
    // doc.save();
}).put((req, res) =>{
    // Used for updating docs
    // const {id, name} = req.body;
    // var doc = Model.findOneAndUpdate({id: id}, {$set: {name: name}}, {new: true});
});

app.listen(process.env.PORT);`
            login = `import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import (model) from '../models/(filename).js';
dotenv.config();

export default async function login(req, res) {
  const {email, password} = req.body;
  try {
    const user = await Account.findOne({email});
    if(!user)
      return res.status(400).json({success: false, message: "Wrong email or password"});
    if(!user.validPassword(password))
      return res.status(400).json({success: false, message: "Wrong email or password"});
    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({success: false, message: error.message});
  }
}
` 
          auth = `export default function isAuthenticated(req, res, next) {
  if(req.headers.access){
    return next();
  }
  return res.status(401).json({success: false, message: "Not logged in"});
}`
          const package = require(getPath(targtePath, "./server/package.json"));
          package.type = "module"
          const update = JSON.stringify(package, null, 2);
          fs.writeFileSync(getPath(targtePath, `./server/package.json`), update, 'utf8');
        }
        fs.writeFileSync(getPath(targtePath,`./server/app.js`),  code, 'utf8');
        fs.writeFileSync(getPath(targtePath,`./server/middleware/auth.js`), auth, 'utf8');
        fs.writeFileSync(getPath(targtePath,`./server/middleware/login.js`), login, 'utf8');
    }
    rl.question('Enter your MongoDB connection string: ', (mongoURI) => {
        try {
            fs.writeFileSync(getPath(targtePath,`./server/.env`), `MONGO_URI="${mongoURI}"\n`, 'utf8');
        } catch (err) {
            console.error(err);
            rl.close();
            return;
        }
        rl.question('Enter your session secret key: ', (secretKey) => {
            try {
                fs.appendFileSync(getPath(targtePath,`./server/.env`), `SECRET_KEY="${secretKey}"\n`, 'utf8');
            } catch (err) {
                console.error(err);
            }
            rl.question('Enter your port number: ', (port) => {
                try {
                    portNum = Number(port)
                    const edit = `import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Edit(){
    const [form, setForm] = useState({name: "", age: "", course: ""});
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    async function fetchFunction(e){
        e.preventDefault();
        const update = {...form}
        const getData = await fetch("http://localhost:${portNum}/docs", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        //const postData = await fetch("http://localhost:${portNum}/docs", {
        //    method: "POST",
        //    headers: { "Content-Type": "application/json" },
        //    credentials: 'include',
        //    body: JSON.stringify(update)
        //})
        //const putData = await fetch("http://localhost:${portNum}/docs", {
        //    method: "PUT",
        //    headers: { "Content-Type": "application/json" },
        //    credentials: 'include',
        //    body: JSON.stringify(update)
        //})
        updateForm({name: "",age: "",course: "",})
    }
    return(
        <>
        <div className="mx-auto w-25 h-50 d-flex flex-column border border-primary p-3">
            <form onSubmit={fetchFunction} className="mt-2">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    placeholder="Enter student name"
                    maxLength="15"
                    onChange={(e) => updateForm({ name: e.target.value })}
                />
                <br />
                <input
                    type="text"
                    className="form-control"
                    id="age"
                    value={form.age}
                    placeholder="Enter student age"
                    onChange={(e) => updateForm({ age: e.target.value })}
                />
                <br />
                <input
                    type="text"
                    className="form-control"
                    id="course"
                    value={form.course}
                    placeholder="Enter student course"
                    onChange={(e) => updateForm({ course: e.target.value })}
                />
                <div className="d-flex justify-content-center w-100 mt-2">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
        </>
    );
}`;
                    fs.writeFileSync(getPath(targtePath,`./client/src/Components/Edit.jsx`),  edit, 'utf8');
                    fs.appendFileSync(getPath(targtePath,`./server/.env`), `PORT=${portNum}\n`, 'utf8');
                } catch (err) {
                    console.error(err);
                }
                rl.close();
            });
        });
    });
  });
}

 rl.question("Do you want 1.Create-React-App or 2.Next.js (type 1 or 2 or your choice, if you want 2 you need node version 20.11.1 or higher and npm 9.8.1 or higher, also make sure you use App router)", (choice) => {
    if(choice === "1" || choice === "2") {
      if(choice === "1"){
        ClientOption = 1;
        scripts =[
          "touch .gitignore && echo node_modules >> .gitignore && echo .env >> .gitignore",
          "npm init -y && npm install concurrently",
          "mkdir server && cd server && npm init -y",
          "cd server && touch .gitignore && echo node_modules >> .gitignore && echo .env >> .gitignore",
          "cd server && touch .env .gitignore app.js",
          "cd server && mkdir controllers middleware models routes",
          "cd server/middleware && touch auth.js login.js",
          "npx create-react-app client",
          "cd ./client/src && rm setupTests.js reportWebVitals.js App.test.js logo.svg",
          "cd ./client/public && rm logo192.png logo512.png",
          "cd ./client/src && mkdir Components Styles Utils",
          "cd ./client/src/Components && touch Home.jsx About.jsx Edit.jsx Navbar.jsx",
          "cd ./client && npm install react-router-dom bootstrap tailwindcss && npx tailwindcss init",
          "cd ./server && npm install express bcrypt body-parser cors dotenv express-session mongodb mongoose passport passport-local nodemon",
        ]
      }else{
        ClientOption = 2;
        scripts =[
          "touch .gitignore && echo node_modules >> .gitignore && echo .env >> .gitignore",
          "npm init -y && npm install concurrently",
          "mkdir server && cd server && npm init -y",
          "cd server && touch .gitignore && echo node_modules >> .gitignore && echo .env >> .gitignore",
          "cd server && touch .env .gitignore app.js",
          "cd server && mkdir controllers middleware models routes",
          "cd server/middleware && touch auth.js login.js",
          "npx create-next-app@latest client",
          "cd ./server && npm install express bcrypt body-parser cors dotenv express-session mongodb mongoose passport passport-local nodemon",
        ];
      }
      function runScript(command, type) {
        if(type === 1){
          try {
            console.log(`Running: ${command}`);
            execSync(command, { stdio: 'inherit' });
          } catch (error) {
            console.error(`Error running script: ${error.message}`);
            process.exit(1);
          }
        }else{
          try {
            execSync(command, { stdio: 'inherit' });
            return true;
          } catch (error) {
            return false;
          }
        }
      }

      function runScriptsSequentially(scripts, onComplete) {
        console.log(scripts);
        function runNextScript(index) {
          if (index < scripts.length) {
            runScript(scripts[index], 1);
            runNextScript(index + 1);
          } else {
            onComplete();
          }
        }

        runNextScript(0);
      }

      runScriptsSequentially(scripts, () => {
        if(ClientOption == 1){
          displayMenu();
          askForOption();
          fs.writeFileSync(getPath(targtePath,"./client/src/index.js"),  reactApp, 'utf8');
          fs.writeFileSync(getPath(targtePath,"./client/src/Components/Navbar.jsx"),  nav, 'utf8');
          fs.writeFileSync(getPath(targtePath,"./client/src/Components/Home.jsx"),  home, 'utf8');
          fs.writeFileSync(getPath(targtePath,"./client/src/Components/About.jsx"),  about, 'utf8');
          fs.writeFileSync(getPath(targtePath, "/client/src/App.js"),  landing, 'utf8');
          fs.writeFileSync(getPath(targtePath,"client/tailwind.config.js"), index, 'utf8');
          fs.writeFileSync(getPath(targtePath,"/client/src/index.css"), tailwindcss, 'utf8');
          const globalPackage = require(getPath(targtePath,"./package.json"));
          globalPackage.scripts = {
            "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",
            "start:frontend": "cd ./client && npm run dev",
            "start:backend": "cd ./server && npm run start"
          }
          const updateGlobalPackage = JSON.stringify(globalPackage, null, 2);
          fs.writeFileSync(getPath(targtePath,"./package.json"), updateGlobalPackage, 'utf8');
        }else{
            const srcOrNot = runScript("cd ./client/src/app", 2);
            if(srcOrNot){
              scripts2 = [
                "cd ./client/src && mkdir Components",
                "cd ./client/src/app",
                "cd ./client/src/app && mkdir about contact login",
                "cd ./client/src/app/about && touch page.js",
                "cd ./client/src/app/contact && touch page.js",
                "cd ./client/src/app/login && touch page.js",
                "cd ./client/src/Components && touch Navbar.js",
              ]
              runScriptsSequentially(scripts2, ()=>{
                displayMenu();
                askForOption();
                const globalPackage = require(getPath(targtePath,"./package.json"));
                globalPackage.scripts = {
                  "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",
                  "start:frontend": "cd ./client && npm run dev",
                  "start:backend": "cd ./server && npm run start"
                }
                const updateGlobalPackage = JSON.stringify(globalPackage, null, 2);
                fs.writeFileSync(getPath(targtePath,"./package.json"), updateGlobalPackage, 'utf8');
              })
            }else{
              scripts2 = [
                "cd ./client && mkdir Components",
                "cd ./client/app && mkdir about contact login",
                "cd ./client/app/about && touch page.js",
                "cd ./client/app/contact touch page.js",
                "cd ./client/app/login && touch page.js",
                "cd ./client/Components && touch Navbar.js",
              ],
              runScriptsSequentially(scripts2, ()=>{
                displayMenu();
                askForOption();
                const globalPackage = require(getPath(targtePath,"./package.json"));
                globalPackage.scripts = {
                  "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",
                  "start:frontend": "cd ./client && npm start",
                  "start:backend": "cd ./server && npm run start"
                }
                const updateGlobalPackage = JSON.stringify(globalPackage, null, 2);
                fs.writeFileSync(getPath(targtePath,"./package.json"), updateGlobalPackage, 'utf8');
              })
            }
        }
        const packageServer = require(getPath(targtePath,"./server/package.json"));
        packageServer.scripts = {"start": "nodemon app.js"}
        const updatePackageServer = JSON.stringify(packageServer, null, 2);
        fs.writeFileSync(getPath(targtePath,"./server/package.json"), updatePackageServer, 'utf8');
      });
    }else{
      console.log("1 or 2");
    }
});


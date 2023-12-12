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
function handleOption(option) {
  return option === "CommonJS" ? true : false
}
function askForOption() {
  rl.question('Which type of Nodejs do you perfer: ', (choice) => {
    if (choice !== 'CommonJS' && choice !== 'ESM') {
      displayMenu();
      askForOption();
    }else{
        var code;
        if(handleOption(choice)){
            code = `const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
dotenv.config();
mongoose.connect(process.env.MONGO_URI);


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 20}))
app.use(session({secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true,}));

app.route('/').get((req, res) =>{
    res.send("Welcome");
});
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
        }else{
            code = `import bodyParser from 'body-parser';
import cors from 'cors'
import express from 'express';
import dotenv from "dotenv"
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
mongoose.connect(process.env.MONGO_URI);


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 20}))
app.use(session({secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true,}));

app.route('/').get((req, res) =>{
    res.send("Welcome");
})
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
const package = require('../../../server/package.json');
        package.type = "module"
        const update = JSON.stringify(package, null, 2);
        fs.writeFileSync(path.join(__dirname, '../../../server/package.json'), update, 'utf8');
        }
        fs.writeFileSync(path.join(__dirname, '../../../server/app.js'),  code, 'utf8');
    }
    rl.question('Enter your MongoDB connection string: ', (mongoURI) => {
        try {
            fs.writeFileSync(path.join(__dirname, '../../../server/.env'), `MONGO_URI="${mongoURI}"\n`, 'utf8');
        } catch (err) {
            console.error(err);
            rl.close();
            return;
        }
        rl.question('Enter your session secret key: ', (secretKey) => {
            try {
                fs.appendFileSync(path.join(__dirname, '../../../server/.env'), `SECRET_KEY="${secretKey}"\n`, 'utf8');
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
            headers: { "Content-Type": "application/json" }
        })
        //const postData = await fetch("http://localhost:${portNum}/docs", {
        //    method: "POST",
        //    headers: { "Content-Type": "application/json" },
        //    body: JSON.stringify(update)
        //})
        //const putData = await fetch("http://localhost:${portNum}/docs", {
        //    method: "PUT",
        //    headers: { "Content-Type": "application/json" },
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
                    fs.writeFileSync(path.join(__dirname, '../../../client/src/Components/Edit.jsx'),  edit, 'utf8');
                    fs.appendFileSync(path.join(__dirname, '../../../server/.env'), `PORT=${portNum}\n`, 'utf8');
                } catch (err) {
                    console.error(err);
                }
                rl.close();
            });
        });
    });
});
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
    "landing": () => navigate("/"),
    "about": () => navigate("/about"),
    "edit": () => navigate("/edit"),
  };

  function nav(route) {
    navEnum[route]();
  }
 return (
    <ul className="flex border-b">
      <li className="-mb-px mr-1">
        <button className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" onClick={() => nav("landing")}>Landing</button>
      </li>
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
export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Landing Page</div>
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

function runScript(command) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error running script: ${error.message}`);
    process.exit(1);
  }
}

function runScriptsSequentially(scripts, onComplete) {
  function runNextScript(index) {
    if (index < scripts.length) {
      runScript(scripts[index]);
      runNextScript(index + 1);
    } else {
      onComplete();
    }
  }

  runNextScript(0);
}

const scripts = [
  "mkdir server && cd server && npm init -y",
  "cd server && touch .gitignore && echo node_modules >> .gitignore && echo .env >> .gitignore",
  "cd server && touch .env .gitignore app.js",
  "cd server && mkdir config controllers middleware models routes",
  "npx create-react-app client",
  "cd ./client/src && rm setupTests.js reportWebVitals.js App.test.js logo.svg",
  "cd ./client/public && rm logo192.png logo512.png",
  "cd ./client/src && mkdir Components Styles Utils",
  "cd ./client/src/Components && touch Home.jsx About.jsx Edit.jsx Navbar.jsx",
  "cd ./client && npm install react-router-dom bootstrap tailwindcss && npx tailwindcss init",
  "cd ./server && npm install express bcrypt body-parser cors dotenv express-session mongodb mongoose passport passport-local",
];

runScriptsSequentially(scripts, () => {
  displayMenu();
  askForOption();
    fs.writeFileSync(path.join(__dirname, '../../../client/src/index.js'),  reactApp, 'utf8');
    fs.writeFileSync(path.join(__dirname, '../../../client/src/Components/Navbar.jsx'),  nav, 'utf8');
    fs.writeFileSync(path.join(__dirname, '../../../client/src/Components/Home.jsx'),  home, 'utf8');
    fs.writeFileSync(path.join(__dirname, '../../../client/src/Components/About.jsx'),  about, 'utf8');
    fs.writeFileSync(path.join(__dirname, '../../../client/src/App.js'),  landing, 'utf8');
    fs.writeFileSync(path.join(__dirname, '../../../client/tailwind.config.js'), index, 'utf8');
    fs.writeFileSync(path.join(__dirname, '../../../client/src/index.css'), tailwindcss, 'utf8');
});


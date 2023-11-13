const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
mongoose.connect(process.env.MONGO);


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
mongoose.connect(process.env.MONGO);


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
        }
        fs.writeFileSync(path.join(__dirname, './server/app.js'),  code, 'utf8');
        const package = require('./server/package.json');
        package.type = "module"
        const update = JSON.stringify(package, null, 2);
        fs.writeFileSync(path.join(__dirname, './server/package.json'), update, 'utf8');
        rl.close();
    }
  });
}

// Start the options menu
displayMenu();
askForOption();



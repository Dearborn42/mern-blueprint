const fs = require('fs');
const path = require('path');


let code = `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './components/about';
import Edit from './components/edit';
import Home from './components/home';
import Navbar from './components/navbar';
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

fs.writeFileSync(path.join(__dirname, './client/src/index.js'),  code, 'utf8');
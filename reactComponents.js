const fs = require('fs');
const path = require('path');
const readline = require('readline');
var pathing;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Enter your port number: ', (port) => {
  try {
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
        const getData = await fetch("http://localhost:${port}/docs", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        //const postData = await fetch("http://localhost:${port}/docs", {
        //    method: "POST",
        //    headers: { "Content-Type": "application/json" },
        //    body: JSON.stringify(update)
        //})
        //const putData = await fetch("http://localhost:${port}/docs", {
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

    fs.writeFileSync(path.join(__dirname, './client/src/components/edit.js'),  edit, 'utf8');
  } catch (err) {
    console.error(err);
  }
    rl.close();
})
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
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-dark w-100">
        <button onClick={() => nav("landing")}>Landing</button>
        <button onClick={() => nav("home")}>Home</button>
        <button onClick={() => nav("about")}>About</button>
        <button onClick={() => nav("edit")}>Edit</button>
     </nav>
   </div>
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

fs.writeFileSync(path.join(__dirname, './client/src/components/navbar.js'),  nav, 'utf8');
fs.writeFileSync(path.join(__dirname, './client/src/components/home.js'),  home, 'utf8');
fs.writeFileSync(path.join(__dirname, './client/src/components/about.js'),  about, 'utf8');
fs.writeFileSync(path.join(__dirname, './client/src/App.js'),  landing, 'utf8');
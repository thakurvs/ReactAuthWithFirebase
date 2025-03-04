import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      {/* <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/">Home</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


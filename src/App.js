import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./contexts/NoteState";
import Alert from "./components/Alert";
import AlertState from "./contexts/AlertState";
import Login from "./components/Login";
import Signup from "./components/Signup";


const App = () => {
  return (
    <Router>
      <AlertState>
        <NoteState>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </NoteState>
      </AlertState>
    </Router>
  );
};

export default App;

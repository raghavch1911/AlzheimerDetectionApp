// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Detect from "./components/Detect";
import Info from "./components/Info";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/info" element={<Info />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

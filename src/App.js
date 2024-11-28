import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DriverRoutePage from "./pages/DriverRoutePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/routes" element={<DriverRoutePage />} />
      </Routes>
    </Router>
  );
}

export default App;

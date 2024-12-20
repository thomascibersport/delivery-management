import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DriverRoutePage from "./pages/DriverRoutePage";
import LoginPage from "./pages/LoginPage"; // Импорт страницы Login
import RegisterPage from "./pages/RegisterPage"; // Импорт страницы Register


function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<Dashboard />} />
        {/* Страница маршрутов */}
        <Route path="/routes" element={<DriverRoutePage />} />
        {/* Страница входа */}
        <Route path="/login" element={<LoginPage />} />
        {/* Страница регистрации */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

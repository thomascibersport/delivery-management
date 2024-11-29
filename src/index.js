import React from "react";
import ReactDOM from "react-dom/client";  // Обновленный импорт
import App from "./App";
import "./index.css";

// Используем createRoot для рендеринга
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);

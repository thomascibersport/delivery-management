import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (data) => {
    // Логика регистрации
    console.log("Данные регистрации:", data);
    navigate("/login"); // Перенаправление на страницу входа после успешной регистрации
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Регистрация</h2>
        <AuthForm type="register" onSubmit={handleRegister} />
      </div>
    </div>
  );
}

export default RegisterPage;

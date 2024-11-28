import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    // Логика аутентификации
    console.log("Входные данные:", data);
    navigate("/dashboard"); // Перенаправление на страницу после успешного входа
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Вход</h2>
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
}

export default LoginPage;

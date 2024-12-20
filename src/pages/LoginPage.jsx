import React, { useState } from "react";
import { loginUser } from "../services/authService"; // Импорт функции авторизации

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    try {
      const response = await loginUser(credentials);
      console.log("Успешная авторизация:", response);
      alert("Вы успешно вошли в систему!");
      localStorage.setItem("token", response.token); // Сохраняем токен
    } catch (error) {
      console.error("Ошибка при входе:", error.message);
      alert("Ошибка входа!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Вход
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
              Имя пользователя
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Введите имя пользователя"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white hover:bg-gray-800 rounded-md"
          >
            Войти
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Нет аккаунта?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Зарегистрироваться
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

import React from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

function RegisterPage() {
  const handleRegister = (event) => {
    event.preventDefault();
    console.log("Регистрация выполнена");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Регистрация
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Имя
            </label>
            <Input id="name" type="text" placeholder="Введите ваше имя" required />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Электронная почта
            </label>
            <Input id="email" type="email" placeholder="Введите вашу почту" required />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Пароль
            </label>
            <Input id="password" type="password" placeholder="Введите пароль" required />
          </div>
          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Уже есть аккаунт?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Войти
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

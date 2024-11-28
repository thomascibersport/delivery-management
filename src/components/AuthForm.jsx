import React, { useState } from "react";

function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "register" && (
        <div>
          <label htmlFor="email" className="block text-sm font-semibold">
            Электронная почта
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите вашу почту"
            className="mt-2 w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
      )}
      <div>
        <label htmlFor="username" className="block text-sm font-semibold">
          Имя пользователя
        </label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Введите имя пользователя"
          className="mt-2 w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold">
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Введите пароль"
          className="mt-2 w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md"
      >
        {type === "login" ? "Войти" : "Зарегистрироваться"}
      </button>
    </form>
  );
}

export default AuthForm;

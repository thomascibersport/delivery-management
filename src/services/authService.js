const API_URL = process.env.REACT_APP_API_URL; // URL API из .env

/**
 * Функция для регистрации пользователя
 * @param {Object} userData - Данные пользователя { username, email, password, ... }
 */
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Регистрация успешна:', data);
    return data;
  } else {
    console.error('Ошибка регистрации:', data);
    throw new Error(data.message || 'Ошибка регистрации');
  }
};

/**
 * Функция для авторизации пользователя
 * @param {Object} credentials - Учетные данные { username, password }
 */
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Авторизация успешна:', data);
    return data;
  } else {
    console.error('Ошибка авторизации:', data);
    throw new Error(data.non_field_errors || 'Ошибка авторизации');
  }
};

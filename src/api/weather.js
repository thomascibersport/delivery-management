import axios from "axios";

const API_KEY = "cba05fac32e986f325878b497331cfc8";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: "metric", // Получаем данные в градусах Цельсия
        lang: "ru", // Русский язык
      },
    });

    return {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    };
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
    throw error;
  }
};

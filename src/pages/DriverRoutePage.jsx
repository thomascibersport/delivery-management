import React, { useState } from "react";
import InteractiveMap from "../components/InteractiveMap";
import { fetchWeatherData } from "../api/weather";
import sendToChatGPT from "../api/sendToChatGPT";

function DriverRoutePage() {
  const [currentLocation] = useState([55.7558, 37.6173]); // Москва
  const [selectedPoint, setSelectedPoint] = useState(null); // Данные о выбранной точке
  const [chatGPTResponse, setChatGPTResponse] = useState(null); // Ответ ChatGPT
  const [loading, setLoading] = useState(false); // Индикатор загрузки

  const handlePointSelected = async ({ coords, address }) => {
    const [lat, lon] = coords;

    setLoading(true); // Отображаем индикатор загрузки
    try {
      // Получаем погоду для выбранной точки
      const weatherData = await fetchWeatherData(lat, lon);
      console.log("Получены данные о погоде:", weatherData);

      // Формируем данные для ProxyAPI
      const gptRequestData = {
        location: { lat, lon, address },
        weather: weatherData,
      };

      // Отправляем запрос в ChatGPT через ProxyAPI
      const gptResponse = await sendToChatGPT(gptRequestData);
      console.log("Ответ ChatGPT:", gptResponse);

      // Обновляем состояние
      setSelectedPoint({ coords, address, weather: weatherData });
      setChatGPTResponse(gptResponse);

      // Логика маршрута будет добавлена после обработки данных
    } catch (error) {
      console.error("Ошибка обработки точки доставки:", error);
    } finally {
      setLoading(false); // Скрываем индикатор загрузки
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Выбор точки доставки</h1>

      {/* Карта для выбора точки */}
      <InteractiveMap currentLocation={currentLocation} onPointSelected={handlePointSelected} />

      {/* Показ загрузки */}
      {loading && <p>Загружается...</p>}

      {/* Информация о выбранной точке */}
      {selectedPoint && (
        <div className="bg-white p-4 rounded-md shadow-md mt-6">
          <h2 className="text-xl font-bold mb-2">Информация о точке доставки</h2>
          <p>Адрес: {selectedPoint.address}</p>
          <p>Погода: {selectedPoint.weather.temperature}°C, {selectedPoint.weather.description}</p>
        </div>
      )}

      {/* Ответ от ChatGPT */}
      {chatGPTResponse && (
        <div className="bg-white p-4 rounded-md shadow-md mt-6">
          <h2 className="text-xl font-bold mb-2">Рекомендации ChatGPT</h2>
          <p>{chatGPTResponse}</p>
        </div>
      )}
    </div>
  );
}

export default DriverRoutePage;

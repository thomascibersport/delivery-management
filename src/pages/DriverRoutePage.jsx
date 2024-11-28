import React, { useState } from "react";
import { fetchWeatherData } from "../api/weather";
import InteractiveMap from "../components/InteractiveMap";

function DriverRoutePage() {
  const [currentLocation] = useState([55.7558, 37.6173]); // Москва
  const [deliveryPoint, setDeliveryPoint] = useState(null);
  const [weather, setWeather] = useState(null);
  const [routeOptimized, setRouteOptimized] = useState(false);

  const handlePointSelected = async (point) => {
    setDeliveryPoint(point);

    // Получение погодных данных
    try {
      const weatherData = await fetchWeatherData(point[0], point[1]);
      setWeather(weatherData);
    } catch (error) {
      console.error("Ошибка при получении погодных данных:", error);
    }

    // Симуляция оптимизации маршрута
    optimizeRoute(point);
  };

  const optimizeRoute = (point) => {
    console.log(
      `Оптимизация маршрута: из текущего местоположения до точки ${point}`
    );
    setRouteOptimized(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Выбор точки доставки</h1>

      {/* Карта с выбором точки */}
      <InteractiveMap
        currentLocation={currentLocation}
        onPointSelected={handlePointSelected}
      />

      {/* Погодные условия */}
      {weather && (
        <div className="bg-white p-4 rounded-md shadow-md mt-6">
          <h2 className="text-xl font-bold mb-2">Погодные условия в точке доставки</h2>
          <p>Температура: {weather.temperature}°C</p>
          <p>Описание: {weather.description}</p>
          <img src={weather.icon} alt="Погодная иконка" />
        </div>
      )}

      {/* Статус маршрута */}
      {routeOptimized && deliveryPoint && (
        <div className="bg-white p-4 rounded-md shadow-md mt-6">
          <h2 className="text-xl font-bold mb-2">Оптимизация маршрута завершена</h2>
          <p>
            Построен маршрут от текущего местоположения до точки доставки: [
            {deliveryPoint[0].toFixed(5)}, {deliveryPoint[1].toFixed(5)}].
          </p>
          <p>Маршрут оптимизирован с учетом погодных условий.</p>
        </div>
      )}
    </div>
  );
}

export default DriverRoutePage;

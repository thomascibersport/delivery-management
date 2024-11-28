import React, { useState } from "react";
import { fetchWeatherData } from "../api/weather";
import YandexMap from "../components/YandexMap";

const warehouses = [
  { id: 1, name: "Склад №1", coordinates: [55.751244, 37.618423] }, // Москва
  { id: 2, name: "Склад №2", coordinates: [59.93428, 30.335099] }, // Санкт-Петербург
  { id: 3, name: "Склад №3", coordinates: [56.838926, 60.605702] }, // Екатеринбург
];

function RoutesPage() {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [currentLocation] = useState([55.7558, 37.6173]); // Москва
  const [weather, setWeather] = useState(null);

  const handleWarehouseSelect = async (e) => {
    const warehouseId = e.target.value;
    const warehouse = warehouses.find((w) => w.id === parseInt(warehouseId));
    setSelectedWarehouse(warehouse);

    // Получение погодных данных
    try {
      const weatherData = await fetchWeatherData(...warehouse.coordinates);
      setWeather(weatherData);
    } catch (error) {
      console.error("Ошибка при получении данных о погоде:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Маршруты доставки</h1>

      {/* Выбор склада */}
      <div className="mb-4">
        <label htmlFor="warehouse" className="block text-lg font-semibold mb-2">
          Выберите склад:
        </label>
        <select
          id="warehouse"
          className="w-full p-2 border rounded-md"
          onChange={handleWarehouseSelect}
        >
          <option value="">-- Выберите склад --</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>
      </div>

      {/* Карта */}
      <div className="mb-6">
        {selectedWarehouse && (
          <YandexMap startPoint={currentLocation} endPoint={selectedWarehouse.coordinates} />
        )}
      </div>

      {/* Погодные условия */}
      {weather && (
        <div className="bg-white p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">Погодные условия</h2>
          <p>Температура: {weather.temperature}°C</p>
          <p>Описание: {weather.description}</p>
          <img src={weather.icon} alt="Погодная иконка" />
        </div>
      )}
    </div>
  );
}

export default RoutesPage;

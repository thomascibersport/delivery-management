import React, { useState } from "react";
import InteractiveMap from "../components/InteractiveMap";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "weather-icons-react";

const OPEN_WEATHER_API_KEY = "cba05fac32e986f325878b497331cfc8"; // Вставьте ваш ключ API OpenWeather

function DriverRoutePage() {
  const [currentLocation] = useState([55.7558, 37.6173]); // Москва
  const [selectedPoint, setSelectedPoint] = useState(null); // Точка, выбранная пользователем
  const [weather, setWeather] = useState(null); // Данные о погоде

  // Получение иконки погоды на основе кода OpenWeather
  const getWeatherIcon = (weatherId) => {
    let icon = null;
    let animation = null;

    if (weatherId >= 200 && weatherId < 300) {
      icon = <WiThunderstorm />;
      animation = (
        <div className="rain">
          <div className="rain-drop" style={{ left: "20%" }}></div>
          <div className="rain-drop" style={{ left: "40%" }}></div>
          <div className="rain-drop" style={{ left: "60%" }}></div>
          <div className="rain-drop" style={{ left: "80%" }}></div>
        </div>
      );
    } else if (weatherId >= 300 && weatherId < 500) {
      icon = <WiRain />;
      animation = (
        <div className="rain">
          <div className="rain-drop" style={{ left: "20%" }}></div>
          <div className="rain-drop" style={{ left: "40%" }}></div>
          <div className="rain-drop" style={{ left: "60%" }}></div>
          <div className="rain-drop" style={{ left: "80%" }}></div>
        </div>
      );
    } else if (weatherId >= 500 && weatherId < 600) {
      icon = <WiRain />;
      animation = (
        <div className="rain">
          <div className="rain-drop" style={{ left: "20%" }}></div>
          <div className="rain-drop" style={{ left: "40%" }}></div>
          <div className="rain-drop" style={{ left: "60%" }}></div>
          <div className="rain-drop" style={{ left: "80%" }}></div>
        </div>
      );
    } else if (weatherId >= 600 && weatherId < 700) {
      icon = <WiSnow />;
    } else if (weatherId >= 700 && weatherId < 800) {
      icon = <WiFog />;
    } else if (weatherId === 800) {
      icon = <WiDaySunny />;
      animation = <div className="sunbeams"></div>; // Солнечные лучи
    } else if (weatherId > 800) {
      icon = <WiCloud />;
      animation = <div className="cloud"></div>; // Плывущие облака
    }

    return (
      <div className="weather-icon">
        {icon}
        {animation}
      </div>
    );
  };

  const handlePointSelected = async (coords) => {
    setSelectedPoint(coords); // Сохраняем выбранные координаты

    // Запрашиваем данные о погоде
    try {
      const [lat, lon] = coords;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}&lang=ru`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          id: data.weather[0].id, // Код погоды для отображения иконки
        });
      }
    } catch (error) {
      console.error("Ошибка получения данных о погоде:", error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px", fontSize: "28px", color: "#333" }}>
        Маршруты доставки
      </h1>

      <InteractiveMap
        currentLocation={currentLocation}
        onPointSelected={handlePointSelected}
      />

      {/* Показ выбранной точки */}
      {selectedPoint && (
        <p style={{ marginTop: "20px", fontSize: "18px", color: "#555" }}>
          Вы выбрали точку:{" "}
          <strong>
            {selectedPoint[0].toFixed(5)}, {selectedPoint[1].toFixed(5)}
          </strong>
        </p>
      )}

      {/* Отображение погоды */}
      {weather && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "linear-gradient(145deg, #f5f7fa, #e2e8f0)",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div className="weather-info">
            {getWeatherIcon(weather.id)}
            <div style={{ marginTop: "10px", fontSize: "18px" }}>
              <p style={{ margin: 0 }}>
                Температура: <strong>{weather.temperature}°C</strong>
              </p>
              <p style={{ margin: "5px 0", fontSize: "16px", color: "#666" }}>
                {weather.description.charAt(0).toUpperCase() +
                  weather.description.slice(1)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverRoutePage;

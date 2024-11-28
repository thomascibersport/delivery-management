import React, { useEffect } from "react";

function YandexMapLoader({ onLoad }) {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=f2749db0-14ee-4f82-b043-5bb8082c4aa9";
      script.async = true;
      script.onload = () => {
        console.log("Yandex.Maps API загружен");
        if (onLoad && typeof onLoad === "function") {
          onLoad(); // Вызов функции после загрузки API
        }
      };
      script.onerror = () => {
        console.error("Ошибка загрузки Yandex.Maps API");
      };
      document.body.appendChild(script);
    };

    loadScript();
  }, [onLoad]);

  return null; // Компонент не отображает ничего
}

export default YandexMapLoader;

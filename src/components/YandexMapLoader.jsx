import { useEffect } from "react";

function YandexMapLoader({ onLoad }) {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]'
    );

    if (existingScript) {
      console.log("Yandex Maps API уже загружен");
      if (onLoad) onLoad(); // Если скрипт уже есть, уведомляем
      return;
    }

    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=f2749db0-14ee-4f82-b043-5bb8082c4aa9"; // Замените API-ключ
    script.async = true;
    script.onload = () => {
      console.log("Yandex Maps API загружен");
      if (onLoad) onLoad(); // Уведомляем, что API готово
    };
    script.onerror = () => {
      console.error("Ошибка загрузки Yandex Maps API");
    };

    document.body.appendChild(script);
  }, [onLoad]);

  return null;
}

export default YandexMapLoader;

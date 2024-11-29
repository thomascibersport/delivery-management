import { useEffect } from "react";

function YandexMapLoader({ onLoad }) {
  useEffect(() => {
    // Проверяем, загружен ли скрипт уже
    if (document.querySelector('script[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
      console.log("API уже загружен");
      return; // Скрипт уже загружен
    }

    // Загружаем API Яндекс.Карт
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=f2749db0-14ee-4f82-b043-5bb8082c4aa9"; // Замените на ваш реальный ключ
      script.async = true;
      script.onload = () => {
        console.log("Yandex.Maps API загружен");
        if (onLoad) onLoad(); // Вызовем onLoad, когда API загрузится
      };
      script.onerror = () => {
        console.error("Ошибка загрузки Yandex.Maps API");
      };

      document.body.appendChild(script);
    };

    loadScript();
  }, [onLoad]);

  return null;
}

export default YandexMapLoader;

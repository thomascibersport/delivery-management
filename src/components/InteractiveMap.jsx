import React, { useEffect, useRef, useState } from "react";
import YandexMapLoader from "./YandexMapLoader";

function InteractiveMap({ currentLocation, onPointSelected }) {
  const mapContainerRef = useRef(null); // Контейнер для карты
  const mapInstanceRef = useRef(null); // Экземпляр карты
  const routeRef = useRef(null); // Ссылка на маршрут

  const initializeMap = () => {
    if (!window.ymaps || mapInstanceRef.current) {
      return; // Карта уже инициализирована
    }

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapContainerRef.current, {
        center: currentLocation,
        zoom: 10,
        controls: ["zoomControl", "typeSelector"],
      });

      const currentPlacemark = new window.ymaps.Placemark(
        currentLocation,
        {
          hintContent: "Ваше местоположение",
          balloonContent: "Вы находитесь здесь",
        },
        { preset: "islands#blueDotIcon" }
      );

      map.geoObjects.add(currentPlacemark);

      // Обработка кликов на карте
      map.events.add("click", (e) => {
        const coords = e.get("coords");
        if (coords && Array.isArray(coords)) {
          onPointSelected(coords); // Уведомляем родительский компонент
          buildRoute(map, currentLocation, coords); // Построение маршрута
        }
      });

      mapInstanceRef.current = map;
    });
  };

  const buildRoute = (map, startPoint, endPoint) => {
    if (routeRef.current) {
      map.geoObjects.remove(routeRef.current); // Удаляем предыдущий маршрут
    }

    const multiRoute = new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [startPoint, endPoint],
        params: { results: 1 },
      },
      {
        boundsAutoApply: true,
      }
    );

    map.geoObjects.add(multiRoute); // Добавляем маршрут на карту
    routeRef.current = multiRoute; // Сохраняем ссылку на маршрут
  };

  useEffect(() => {
    if (!mapInstanceRef.current) {
      initializeMap(); // Инициализируем карту только один раз
    }
  }, [currentLocation]);

  return (
    <div>
      <YandexMapLoader onLoad={initializeMap} />
      <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}

export default InteractiveMap;

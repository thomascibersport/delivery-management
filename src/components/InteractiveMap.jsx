import React, { useEffect, useRef } from "react";
import YandexMapLoader from "./YandexMapLoader";

function InteractiveMap({ currentLocation, onPointSelected, onRouteDetails }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pointsRef = useRef([]);
  const routeRef = useRef(null);

  const initializeMap = () => {
    if (!window.ymaps || mapInstanceRef.current) return;

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapContainerRef.current, {
        center: currentLocation,
        zoom: 10,
        controls: ["zoomControl", "typeSelector"],
      });

      map.events.add("click", (e) => {
        const coords = e.get("coords");
        if (coords && Array.isArray(coords)) {
          console.log("Выбранные координаты:", coords);
          onPointSelected(coords);
          addPoint(map, coords);
          buildRoute(map, currentLocation, coords);
        }
      });

      mapInstanceRef.current = map; // Сохраняем экземпляр карты
    });
  };

  const addPoint = (map, coords) => {
    pointsRef.current.forEach((point) => {
      map.geoObjects.remove(point);
    });
    pointsRef.current = [];

    const placemark = new window.ymaps.Placemark(
      coords,
      { hintContent: "Выбранная точка", balloonContent: "Точка маршрута" },
      { preset: "islands#redIcon" }
    );

    map.geoObjects.add(placemark);
    pointsRef.current.push(placemark);
  };

  const buildRoute = (map, startPoint, endPoint) => {
    if (!window.ymaps || !window.ymaps.multiRouter) {
      console.error("Yandex Maps API не загружен или MultiRouter недоступен");
      return;
    }

    if (routeRef.current) {
      map.geoObjects.remove(routeRef.current); // Удаляем предыдущий маршрут
    }

    try {
      const multiRoute = new window.ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [startPoint, endPoint],
          params: { avoidTrafficJams: true },
        },
        { boundsAutoApply: true }
      );

      // Удаляем обработчики перед добавлением новых
      multiRoute.model.events.group().removeAll();

      multiRoute.model.events.add("requestsuccess", () => {
        const activeRoute = multiRoute.getActiveRoute();
        if (activeRoute) {
          const distance = activeRoute.properties.get("distance").text;
          const duration = activeRoute.properties.get("duration").text;
          onRouteDetails({ distance, duration });
        }
      });

      map.geoObjects.add(multiRoute);
      routeRef.current = multiRoute; // Сохраняем маршрут
    } catch (error) {
      console.error("Ошибка при построении маршрута:", error);
    }
  };

  useEffect(() => {
    if (!mapInstanceRef.current) {
      initializeMap();
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

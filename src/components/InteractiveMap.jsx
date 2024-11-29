import React, { useEffect, useRef, useState } from "react";
import YandexMapLoader from "./YandexMapLoader";

function InteractiveMap({ currentLocation, onPointSelected }) {
  const mapContainerRef = useRef(null); // Контейнер для карты
  const mapInstanceRef = useRef(null); // Экземпляр карты
  const routeRef = useRef(null); // Экземпляр маршрута
  const [isMapReady, setIsMapReady] = useState(false); // Индикатор готовности карты

  // Функция для инициализации карты
  const initializeMap = () => {
    if (!window.ymaps || mapInstanceRef.current) {
      return;
    }

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapContainerRef.current, {
        center: currentLocation,
        zoom: 10,
        controls: ["zoomControl", "typeSelector"],
      });

      const currentPlacemark = new window.ymaps.Placemark(
        currentLocation,
        { hintContent: "Ваше местоположение" },
        { preset: "islands#blueDotIcon" }
      );

      map.geoObjects.add(currentPlacemark);

      // Добавляем слой пробок
      const trafficLayer = new window.ymaps.traffic.provider.Actual({}, { infoLayerShown: true });
      const trafficControl = new window.ymaps.control.TrafficControl({ state: { providerKey: "traffic#actual" } });
      map.controls.add(trafficControl);
      trafficLayer.setMap(map);

      // Событие выбора точки
      map.events.add("click", (e) => {
        const coords = e.get("coords");

        if (onPointSelected) {
          onPointSelected(coords);
        }

        // Построение маршрута
        buildRoute(map, currentLocation, coords);
      });

      mapInstanceRef.current = map; // Сохраняем экземпляр карты
      setIsMapReady(true); // Устанавливаем флаг, что карта готова
    });
  };

  // Функция для построения маршрута
  const buildRoute = (map, startPoint, endPoint) => {
    // Если уже есть маршрут, удаляем его
    if (routeRef.current) {
      map.geoObjects.remove(routeRef.current);
    }

    // Создаем новый маршрут
    const multiRoute = new window.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [startPoint, endPoint],
        params: {
          results: 1, // Один оптимальный маршрут
          avoidTrafficJams: true, // Учитывать пробки
        },
      },
      {
        boundsAutoApply: true, // Автоматическое изменение масштаба карты
        wayPointStartIconColor: "blue",
        wayPointFinishIconColor: "red",
      }
    );

    map.geoObjects.add(multiRoute); // Добавляем маршрут на карту
    routeRef.current = multiRoute; // Сохраняем маршрут для будущего удаления
  };

  return (
    <div>
      {/* Загружаем API и инициализируем карту, когда API загружено */}
      <YandexMapLoader onLoad={initializeMap} />
      <div
        ref={mapContainerRef} // Привязываем контейнер карты
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
        }}
      ></div>
    </div>
  );
}

export default InteractiveMap;

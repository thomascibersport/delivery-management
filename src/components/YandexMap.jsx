import React, { useEffect } from "react";

function YandexMap({ startPoint, endPoint }) {
  useEffect(() => {
    if (!window.ymaps) {
      console.error("Yandex.Maps API не загружен");
      return;
    }

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map("yandex-map", {
        center: startPoint || [55.751244, 37.618423],
        zoom: 7,
      });

      // Добавление точек маршрута
      if (startPoint && endPoint) {
        const multiRoute = new window.ymaps.multiRouter.MultiRoute(
          {
            referencePoints: [startPoint, endPoint],
            params: { results: 1 }, // Один оптимальный маршрут
          },
          {
            boundsAutoApply: true,
          }
        );

        map.geoObjects.add(multiRoute);
      }
    });
  }, [startPoint, endPoint]);

  return (
    <div
      id="yandex-map"
      style={{ width: "100%", height: "400px", borderRadius: "8px" }}
    ></div>
  );
}

export default YandexMap;

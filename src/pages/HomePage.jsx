import React from "react";
import Card from "../components/Card";
import OrdersTable from "../components/OrdersTable";
import Footer from "../components/Footer"; // Импортируем Footer
import { orders, stats } from "../data/mockData";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Основное содержимое */}
      <div className="flex-grow p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">
            Система управления доставкой
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Мониторинг и оптимизация маршрутов в реальном времени
          </p>
        </header>

        {/* Карточки статистики */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card
            title="Активные заказы"
            value={stats.ordersCount}
            description="Количество заказов на текущий момент"
            icon="📦"
          />
          <Card
            title="Занятые склады"
            value={stats.busyWarehouses}
            description="Количество складов в работе"
            icon="🏢"
          />
          <Card
            title="Запланированные маршруты"
            value={stats.plannedRoutes}
            description="Количество маршрутов на сегодня"
            icon="🛣️"
          />
        </div>

        {/* Таблица заказов */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Список последних заказов</h2>
          <OrdersTable orders={orders} />
        </section>
      </div>

      {/* Футер */}
      <Footer />
    </div>
  );
}

export default HomePage;

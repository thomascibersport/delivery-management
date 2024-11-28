import React from "react";
import StatCard from "../components/StatCard";
import ActivityChart from "../components/ActivityChart";
import OrdersTable from "../components/OrdersTable";

const orders = [
  { id: "001", client: "Иван Иванов", address: "ул. Ленина, 10", status: "Доставлен" },
  { id: "002", client: "Мария Смирнова", address: "пр. Победы, 5", status: "В процессе" },
  { id: "003", client: "Олег Кузнецов", address: "ул. Чехова, 3", status: "Ожидает" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Панель управления</h1>
        <p className="text-gray-600 mt-1">Обзор статистики и текущих данных</p>
      </header>

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Активные заказы" value="25" icon="📦" description="Всего заказов в процессе" />
        <StatCard title="Запланированные маршруты" value="8" icon="🛣️" description="Сегодняшние маршруты" />
        <StatCard title="Склады в работе" value="3" icon="🏢" description="Занятые склады" />
        <StatCard title="Время доставки" value="45 мин" icon="⏱️" description="Среднее время доставки" />
      </div>

      {/* График активности */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Активность заказов за неделю</h2>
        <ActivityChart />
      </div>

      {/* Таблица заказов */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Последние заказы</h2>
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}

export default Dashboard;

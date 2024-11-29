import axios from "axios";

const sendToChatGPT = async (data) => {
  console.log("Отправляем данные в ProxyAPI:", data);

  try {
    const response = await axios.post(
      "https://api.proxyapi.ru/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Ты помощник, который анализирует погодные данные и место назначения, чтобы оптимизировать маршрут.",
          },
          {
            role: "user",
            content: `Место доставки: ${data.location.address}. Координаты: ${data.location.lat}, ${data.location.lon}. Погода: ${data.weather.temperature}°C, ${data.weather.description}. Создай рекомендации для маршрута.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer YOUR_PROXYAPI_KEY`, // Замените на ваш ключ
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Ответ от ProxyAPI:", response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Ошибка отправки в ProxyAPI:", error);
    return "Не удалось получить ответ от ChatGPT через ProxyAPI.";
  }
};

export default sendToChatGPT;

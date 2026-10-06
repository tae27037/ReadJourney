import { api } from "./api";

// 1. Получение рекомендованных книг
export const getRecommendedBooks = async ({
  page = 1,
  perPage,
  limit,
  title = "",
  author = "",
} = {}) => {
  // Если передан perPage или limit — берем его, иначе по умолчанию 2
  const actualLimit = limit || perPage || 2;

  const { data } = await api.get("/books/recommend", {
    params: {
      page,
      limit: actualLimit, // Отправляем корректный limit на бэкенд (2 для мобилки, 8 для планшета)
      title,
      author,
    },
  });
  return data;
};

// 2. Получение книги по ID (для ReadingPage)
export const getBookById = async (bookId) => {
  const { data } = await api.get(`/books/${bookId}`);
  return data;
};

// 3. Получение личной библиотеки пользователя
export const getOwnBooks = async () => {
  const { data } = await api.get("/books/own");
  return data;
};

// 4. Добавление рекомендованной книги по её ID в библиотеку
export const addBookToLibrary = async (bookId) => {
  const { data } = await api.post(`/books/add/${bookId}`);
  return data;
};

// 5. Добавление своей книги вручную через форму
export const addOwnBook = async (bookData) => {
  const { data } = await api.post("/books/add", bookData);
  return data;
};

// 6. Удаление книги из библиотеки
export const deleteOwnBook = async (bookId) => {
  const { data } = await api.delete(`/books/remove/${bookId}`);
  return data;
};

// 7. Начать чтение ("To start")
export const startReading = async ({ id, page }) => {
  const { data } = await api.post("/books/reading/start", {
    id,
    page: Number(page),
  });
  return data;
};

// 8. Закончить чтение ("To stop")
export const stopReading = async ({ id, page }) => {
  const { data } = await api.post("/books/reading/finish", {
    id,
    page: Number(page),
  });
  return data;
};

// 9. Удалить запись о чтении
export const deleteReadingSession = async ({ bookId, readingId }) => {
  const { data } = await api.delete("/books/reading", {
    params: {
      bookId,
      readingId,
    },
  });
  return data;
};

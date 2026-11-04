import { api } from "./api";

export const getRecommendedBooks = async ({
  page = 1,
  perPage,
  limit,
  title = "",
  author = "",
} = {}) => {
  const actualLimit = limit || perPage || 2;

  const { data } = await api.get("/books/recommend", {
    params: {
      page,
      limit: actualLimit,
      title,
      author,
    },
  });
  return data;
};

export const getBookById = async (bookId) => {
  const { data } = await api.get(`/books/${bookId}`);
  return data;
};

export const getOwnBooks = async () => {
  const { data } = await api.get("/books/own");
  return data;
};

export const addBookToLibrary = async (bookId) => {
  const { data } = await api.post(`/books/add/${bookId}`);
  return data;
};

export const addOwnBook = async (bookData) => {
  const { data } = await api.post("/books/add", bookData);
  return data;
};

export const deleteOwnBook = async (bookId) => {
  const { data } = await api.delete(`/books/remove/${bookId}`);
  return data;
};

export const startReading = async ({ id, page }) => {
  const { data } = await api.post("/books/reading/start", {
    id,
    page: Number(page),
  });
  return data;
};

export const stopReading = async ({ id, page }) => {
  const { data } = await api.post("/books/reading/finish", {
    id,
    page: Number(page),
  });
  return data;
};

export const deleteReadingSession = async ({ bookId, readingId }) => {
  const { data } = await api.delete("/books/reading", {
    params: {
      bookId,
      readingId,
    },
  });
  return data;
};

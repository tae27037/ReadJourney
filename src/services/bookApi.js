import { api } from "./api";

export const getRecommendedBooks = async ({
  page = 1,
  perPage = 2,
  title = "",
  author = "",
} = {}) => {
  const { data } = await api.get("/books/recommend", {
    params: {
      page,
      perPage,
      title,
      author,
    },
  });

  return data;
};

import { api } from "./api";

// Регистрация (POST /users/signup)
export const registerUser = async (credentials) => {
  const { data } = await api.post("/users/signup", credentials);
  return data;
};

// Логин (POST /users/signin)
export const loginUser = async (credentials) => {
  const { data } = await api.post("/users/signin", credentials);
  return data;
};

// Выход из аккаунта (POST /users/signout)
export const logoutUser = async () => {
  const { data } = await api.post("/users/signout");
  return data;
};

// Получение текущего пользователя (GET /users/current)
export const getCurrentUser = async () => {
  const { data } = await api.get("/users/current");
  return data;
};

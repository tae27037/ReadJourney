import { api } from "./api";

export const registerUser = async (credentials) => {
  const { data } = await api.post("/users/signup", credentials);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post("/users/signin", credentials);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/users/signout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/users/current");
  return data;
};

import { api } from "./api";

export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/signup", userData);
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await api.post("/auth/sigin", userData);
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/auth/signout");
  return data;
};

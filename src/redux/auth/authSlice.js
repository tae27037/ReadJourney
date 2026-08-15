import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

const initialState = {
  token,
  refreshToken,
  user: null,
  isLoggedIn: Boolean(token),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials(state, action) {
      const { token, refreshToken, user } = action.payload;

      state.token = token;
      state.refreshToken = refreshToken;
      state.user = user;
      state.isLoggedIn = true;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    },

    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isLoggedIn = false;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

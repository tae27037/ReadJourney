import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../services/authApi";

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return thunkAPI.rejectWithValue("No token");
    }

    try {
      const data = await getCurrentUser();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,
  isLoggedIn: Boolean(localStorage.getItem("token")),
  isRefreshing: true,
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

  extraReducers: (builder) => {
    builder
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        const { token, refreshToken, ...user } = action.payload;

        state.token = token;
        state.refreshToken = refreshToken;
        state.user = user;
        state.isLoggedIn = true;
        state.isRefreshing = false;

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .addCase(refreshUser.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.user = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

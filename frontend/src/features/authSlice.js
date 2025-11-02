import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

// --- REGISTER USER ---
export const registerUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/signup`, { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Registration failed");
    }
  }
);

// --- LOGIN USER ---
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/login`, { email, password });

      if (response.data.token) localStorage.setItem("token", response.data.token);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.message || "Login failed"
      );
    }
  }
);

// --- FORGOT PASSWORD ---
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/forgot-password`, { email });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Failed to send reset email");
    }
  }
);

// --- RESET PASSWORD ---
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/reset-password`, { token, password });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.error || "Password reset failed");
    }
  }
);

// --- LOAD USER PROFILE (protected) ---
export const loadProfile = createAsyncThunk(
  "auth/loadProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.user;
    } catch (error) {
      return rejectWithValue("Unauthorized");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    message: null,
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload;
      })

      // RESET PASSWORD
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload;
      })

      // PROFILE LOAD
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

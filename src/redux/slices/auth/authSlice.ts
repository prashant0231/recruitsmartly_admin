import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginPayload } from "./auth.type";
import axios from "axios";
import { config } from "@/constants/config";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  loginDetails: ApiResponse.LoginResponse | null;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  loginDetails: null,
};

export const login = createAsyncThunk<ApiResponse.LoginResponse, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post<any>(
        `${config.API_URL}/login`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (err: any) {
      console.log("errors", err);
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.loginDetails = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload.access_token;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.loginDetails = null;
    },
  },
});

export const { setUserDetails, logout } = authSlice.actions;
export default authSlice.reducer;

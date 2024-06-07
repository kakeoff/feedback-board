import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { AuthFormData, LoadingStatus, UserWithToken } from "../../types";
import { RootState } from "../store";

interface AuthState {
  data: UserWithToken | null;
  status: LoadingStatus;
}

const initialState: AuthState = {
  data: null,
  status: LoadingStatus.LOADING,
};

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: AuthFormData): Promise<UserWithToken> => {
    const { data } = await axios.post<UserWithToken>("auth/login", params);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = LoadingStatus.LOADING;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = LoadingStatus.LOADED;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = LoadingStatus.ERROR;
      });
  },
});

export const checkIsAuth = (state: RootState) => {
  return !!state.auth.data;
};

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoadingStatus, LoginParams, UserWithToken } from "../../types";

interface AuthState {
  data: UserWithToken | null;
  status: LoadingStatus;
}

const initialState: AuthState = {
  data: null,
  status: LoadingStatus.LOADING,
};

const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: LoginParams): Promise<UserWithToken> => {
    const { data } = await axios.post<UserWithToken>("auth/login", params);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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

export const authReducer = authSlice.reducer;

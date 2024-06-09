import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import {
  AuthFormData,
  LoadingStatus,
  RegisterFormData,
  UpdateMeData,
  UserType,
  UserWithToken,
} from "../../types";
import { RootState } from "../store";

interface AuthState {
  data: UserType | null;
  status: LoadingStatus;
}

const initialState: AuthState = {
  data: null,
  status: LoadingStatus.LOADING,
};

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterFormData): Promise<UserWithToken> => {
    const { data } = await axios.post<UserWithToken>("auth/register", params);
    localStorage.setItem("token", data.token);
    return data;
  }
);

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: AuthFormData): Promise<UserWithToken> => {
    const { data } = await axios.post<UserWithToken>("auth/login", params);
    localStorage.setItem("token", data.token);
    return data;
  }
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (): Promise<UserType> => {
    const { data } = await axios.get<UserType>("auth/me");
    return data;
  }
);

export const updateMe = createAsyncThunk(
  "auth/updateMe",
  async (data: UpdateMeData): Promise<UserType> => {
    const res = await axios.patch<UserType>("user/me", data);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.status = LoadingStatus.LOADING;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = LoadingStatus.LOADED;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.status = LoadingStatus.ERROR;
      })

      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = LoadingStatus.LOADING;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = LoadingStatus.LOADED;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = LoadingStatus.ERROR;
      })

      .addCase(fetchMe.pending, (state) => {
        state.data = null;
        state.status = LoadingStatus.LOADING;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = LoadingStatus.LOADED;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.data = null;
        state.status = LoadingStatus.ERROR;
      })

      .addCase(updateMe.pending, (state) => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = LoadingStatus.LOADED;
      })
      .addCase(updateMe.rejected, (state) => {
        state.status = LoadingStatus.ERROR;
      });
  },
});

export const checkIsAuth = (state: RootState) => {
  return !!state.auth.data;
};

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

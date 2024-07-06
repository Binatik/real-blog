import { Api, ApiError, Profile, ResponseErrorMessage } from "@api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CookieKey } from "@src/app/enums/Cookies";
import Cookies from "js-cookie";

const api = new Api();

type AuthState = {
  loading: boolean;
  error: boolean;
  apiError: ResponseErrorMessage | null;
  isAuthorized: boolean;
};

const initialState: AuthState = {
  loading: true,
  error: false,
  apiError: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logOut: () => {
      Cookies.remove(CookieKey.token);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.isAuthorized = false;
    });
    builder.addCase(registerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isAuthorized = true;
      state.apiError = null;

      if (action.payload && action.payload.user) {
        Cookies.set(CookieKey.token, action.payload.user.token, {
          expires: 120,
        });
      }
    });
    builder.addCase(registerProfile.rejected, (state, action) => {
      state.apiError = action.payload as ResponseErrorMessage;

      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
      Cookies.remove(CookieKey.token);
    });

    builder.addCase(loginProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.isAuthorized = false;
    });
    builder.addCase(loginProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isAuthorized = true;
      state.apiError = null;

      if (action.payload && action.payload.user) {
        Cookies.set(CookieKey.token, action.payload.user.token, {
          expires: 120,
        });
      }
    });
    builder.addCase(loginProfile.rejected, (state, action) => {
      state.apiError = action.payload as ResponseErrorMessage;

      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
      Cookies.remove(CookieKey.token);
    });
  },
});

export const registerProfile = createAsyncThunk(
  "authSlice/registerProfile",
  async (form: EventTarget & HTMLFormElement, { rejectWithValue }) => {
    const registerProfileForm = new FormData(form);
    const fields = Object.fromEntries(registerProfileForm.entries());

    const request = JSON.stringify({ user: fields });

    try {
      const result = await api.post<Profile>("/users", {
        headers: {
          "Content-type": "application/json",
        },
        body: request,
      });

      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.body);
      }
    }
  },
);

export const loginProfile = createAsyncThunk(
  "authSlice/loginProfile",
  async (form: EventTarget & HTMLFormElement, { rejectWithValue }) => {
    const loadingProfileForm = new FormData(form);
    const fields = Object.fromEntries(loadingProfileForm.entries());

    const request = JSON.stringify({ user: fields });

    try {
      const result = await api.post<Profile>("/users/login", {
        headers: {
          "Content-type": "application/json",
        },
        body: request,
      });

      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue(error.body);
      }
    }
  },
);

const auth = authSlice.actions;

export { auth, authSlice };

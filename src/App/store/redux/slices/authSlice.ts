import { Api, Profile } from "@api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CookieKey } from "@src/app/enums/Cookies";
import Cookies from "js-cookie";

const api = new Api();

type AuthState = {
  profile: Profile | null;
  loading: boolean;
  error: boolean;
  isAuth: boolean;
  hasValidCredentials: boolean | null;
};

const initialState: AuthState = {
  profile: null,
  loading: false,
  error: false,
  isAuth: false,
  hasValidCredentials: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      Cookies.remove(CookieKey.token);
      Cookies.remove(CookieKey.username);
      state.isAuth = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(registerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.error = false;
      state.profile = action.payload;
    });
    builder.addCase(registerProfile.rejected, (state) => {
      state.loading = false;
      state.isAuth = false;
      state.error = true;

      Cookies.remove(CookieKey.token);
      Cookies.remove(CookieKey.username);
    });

    builder.addCase(loginProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loginProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.error = false;
      state.hasValidCredentials = true;
      state.profile = action.payload;
    });
    builder.addCase(loginProfile.rejected, (state) => {
      state.loading = false;
      state.isAuth = false;
      state.hasValidCredentials = false;
      state.error = true;

      Cookies.remove(CookieKey.token);
      Cookies.remove(CookieKey.username);
    });

    builder.addCase(fetchCurrentProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCurrentProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.error = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchCurrentProfile.rejected, (state) => {
      state.loading = false;
      state.isAuth = false;
      state.error = true;
    });
  },
});

export const registerProfile = createAsyncThunk(
  "authSlice/registerProfile",
  async (form: EventTarget & HTMLFormElement) => {
    const registerProfileForm = new FormData(form);
    const fields = Object.fromEntries(registerProfileForm.entries());

    const request = JSON.stringify({ user: fields });

    const result = await api.post<Profile>("/users", {
      headers: {
        "Content-type": "application/json",
      },
      body: request,
    });

    Cookies.set(CookieKey.token, result.user.token, { expires: 120 });
    Cookies.set(CookieKey.username, result.user.username, { expires: 120 });

    return result;
  },
);

export const loginProfile = createAsyncThunk(
  "authSlice/loginProfile",
  async (form: EventTarget & HTMLFormElement) => {
    const loadingProfileForm = new FormData(form);
    const fields = Object.fromEntries(loadingProfileForm.entries());

    const request = JSON.stringify({ user: fields });

    const result = await api.post<Profile>("/users/login", {
      headers: {
        "Content-type": "application/json",
      },
      body: request,
    });

    Cookies.set(CookieKey.token, result.user.token, { expires: 120 });
    Cookies.set(CookieKey.username, result.user.username, { expires: 120 });

    return result;
  },
);

export const fetchCurrentProfile = createAsyncThunk(
  "authSlice/fetchCurrentProfile",
  async (token: string) => {
    const result = await api.get<Profile>("/user", {
      headers: {
        authorization: `Token ${token}`,
      },
    });

    return result;
  },
);

const actions = authSlice.actions;
//authSliceReducer
export { actions, authSlice };

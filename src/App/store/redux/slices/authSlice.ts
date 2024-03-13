import { Api, Profile } from "@api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CookieKey } from "@src/app/enums/Cookies";
import Cookies from "js-cookie";

const api = new Api();

type AuthState = {
  profile: Profile | null;
  loading: boolean;
  role: "ghost" | "client";
  loadingProfile: boolean;
  error: boolean;
  isAuthorized: boolean;
  hasValidCredentials: boolean | null;
};

const initialState: AuthState = {
  profile: null,
  loading: true,
  loadingProfile: true,
  error: false,
  isAuthorized: false,
  hasValidCredentials: null,
  role: "ghost",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      Cookies.remove(CookieKey.token);
      state.isAuthorized = false;
      state.role = "ghost";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(registerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isAuthorized = true;
      state.profile = action.payload;
      state.role = "client";
      Cookies.set(CookieKey.token, action.payload.user.token, { expires: 120 });
    });
    builder.addCase(registerProfile.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.isAuthorized = false;
      state.role = "ghost";
      Cookies.remove(CookieKey.token);
    });

    builder.addCase(loginProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loginProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isAuthorized = true;
      state.hasValidCredentials = true;
      state.profile = action.payload;
      state.role = "client";
      Cookies.set(CookieKey.token, action.payload.user.token, { expires: 120 });
    });
    builder.addCase(loginProfile.rejected, (state) => {
      state.loading = false;
      state.isAuthorized = false;
      state.hasValidCredentials = false;
      state.error = true;
      state.role = "ghost";
      Cookies.remove(CookieKey.token);
    });

    builder.addCase(fetchCurrentProfile.pending, (state) => {
      state.loadingProfile = true;
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCurrentProfile.fulfilled, (state, action) => {
      state.loadingProfile = false;
      state.loading = false;
      state.isAuthorized = true;
      state.error = false;
      state.profile = action.payload;
      state.role = "client";
    });
    builder.addCase(fetchCurrentProfile.rejected, (state) => {
      state.loadingProfile = false;
      state.loading = false;
      state.isAuthorized = false;
      state.error = true;
      state.role = "ghost";

      Cookies.remove(CookieKey.token);
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

    return result;
  },
);

export const fetchCurrentProfile = createAsyncThunk(
  "authSlice/fetchCurrentProfile",
  async (token: string | undefined) => {
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

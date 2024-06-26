import { Api, Profile } from "@api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CookieKey } from "@src/app/enums/Cookies";
import Cookies from "js-cookie";

const api = new Api();

type PayloadUpdateProfile = {
  form: HTMLFormElement;
  token: string | undefined;
};

type AuthState = {
  profile: Profile | null;
  status: "pending" | "fulfilled" | "rejected" | null;
  role: "ghost" | "client";
  error: boolean;
};

const initialState: AuthState = {
  profile: null,
  status: null,
  error: false,
  role: "ghost",
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    updateRole: (state) => {
      state.role = "ghost";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCurrentProfile.pending, (state) => {
      state.status = "pending";
      state.error = false;
    });
    builder.addCase(fetchCurrentProfile.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = false;
      state.role = "client";
      state.profile = action.payload;
    });
    builder.addCase(fetchCurrentProfile.rejected, (state) => {
      state.status = "pending";
      state.role = "ghost";
      state.error = true;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.status = "pending";
      state.error = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = false;
      state.profile = action.payload;
      Cookies.set(CookieKey.token, action.payload.user.token, { expires: 120 });
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.status = "pending";
      state.error = true;
    });
  },
});

export const fetchCurrentProfile = createAsyncThunk(
  "profileSlice/fetchCurrentProfile",
  async (token: string | undefined) => {
    const result = await api.get<Profile>("/user", {
      headers: {
        authorization: `Token ${token}`,
      },
    });

    return result;
  },
);

export const updateProfile = createAsyncThunk(
  "profileSlice/updateProfile",
  async (payload: PayloadUpdateProfile) => {
    const { form, token } = payload;

    const formData = new FormData(form);
    formData.append("bio", "I work at State Farm.");

    const fields = Object.fromEntries(formData.entries());
    const request = JSON.stringify({ user: fields });

    const result = await api.put<Profile>("/user", {
      headers: {
        authorization: `Token ${token}`,
        "Content-type": "application/json",
      },
      body: request,
    });

    return result;
  },
);

const profile = profileSlice.actions;

export { profile, profileSlice };

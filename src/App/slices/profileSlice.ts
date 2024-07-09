import { Api, ApiError, Profile } from "@api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CookieKey } from "@src/app/enums/Cookies";
import Cookies from "js-cookie";

const api = new Api();

type PayloadUpdateProfile = {
  form: HTMLFormElement;
  token: string | undefined;
};

type AuthState = {
  profile?: Profile | null;
  status: "pending" | "fulfilled" | "rejected" | null;
  role: "ghost" | "client";
  loading: boolean;
  errorMessage: string;
  error: boolean;
};

const initialState: AuthState = {
  profile: null,
  status: null,
  error: false,
  loading: false,
  errorMessage: "",
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
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = false;
      state.loading = false;
      state.profile = action.payload;

      if (action.payload) {
        Cookies.set(CookieKey.token, action.payload.user.token, {
          expires: 120,
        });
      }
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.status = "fulfilled";
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload as string;
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

export const updateProfile = createAsyncThunk<
  Profile | undefined,
  PayloadUpdateProfile,
  { rejectValue: string }
>(
  "profileSlice/updateProfile",
  async (payload: PayloadUpdateProfile, { rejectWithValue }) => {
    const { form, token } = payload;

    const formData = new FormData(form);
    formData.append("bio", "I work at State Farm.");

    const password = formData.get("password") as string;

    if (password.trim() === "") {
      formData.delete("password");
    }

    const fields = Object.fromEntries(formData.entries());
    const request = JSON.stringify({ user: fields });

    try {
      const result = await api.put<Profile>("/user", {
        headers: {
          authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
        body: request,
      });

      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        const message = Object.values(error.body.errors)[0];
        return rejectWithValue(message);
      }
    }
  },
);

const profile = profileSlice.actions;

export { profile, profileSlice };

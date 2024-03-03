import { Api, Profile } from "@api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new Api();

type AuthState = {
  user: Profile | null;
  loading: boolean;
  error: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(registerProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(registerProfile.fulfilled, (state, action) => {
      state.loading = true;
      state.error = false;
      state.user = action.payload;
    });
    builder.addCase(registerProfile.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const registerProfile = createAsyncThunk(
  "authSlice/fetchRegisterProfile",
  async (payload: Profile) => {
    const result = await api.post<Profile>("/users", {
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return result;
  },
);

const actions = authSlice.actions;
//authSliceReducer
export { actions, authSlice };

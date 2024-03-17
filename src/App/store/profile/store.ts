import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { profileSlice } from "./slices/profileSlice";

export const storeProfile = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    profileSlice: profileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type ProfileState = ReturnType<typeof storeProfile.getState>;
export type ProfileDispatch = typeof storeProfile.dispatch;

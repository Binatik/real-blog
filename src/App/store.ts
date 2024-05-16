import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { profileSlice } from "./slices/profileSlice";
import { blogSlice } from "@module/blog/slices/blogSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    profileSlice: profileSlice.reducer,
    blogSlice: blogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

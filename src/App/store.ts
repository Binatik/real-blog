import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { profileSlice } from "./slices/profileSlice";
import { postsSlice } from "@module/blog/slices/postsSlice";
import { editorSlice } from "@module/blog/slices/editorSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    profileSlice: profileSlice.reducer,
    postsSlice: postsSlice.reducer,
    editorSlice: editorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

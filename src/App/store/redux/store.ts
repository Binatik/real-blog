import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";

export const storeAuth = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof storeAuth.getState>;
export type AppDispatch = typeof storeAuth.dispatch;

import { RouterProvider } from "react-router-dom";
import { router } from "@src/router/router";
import { useEffect } from "react";
import { CookieKey } from "./enums/Cookies";
import { useProfileDispatch } from "./store/profile/hooks/useProfileDispatch";
import { useProfileSelector } from "./store/profile/hooks/useProfileSelector";
import { fetchCurrentProfile } from "./store/profile/slices/profileSlice";
import Cookies from "js-cookie";
import "normalize.css";
import "./global.scss";

export const App = () => {
  const profileDispatch = useProfileDispatch();
  const isAuthorized = useProfileSelector(
    (state) => state.authSlice.isAuthorized,
  );

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);

    if (token && isAuthorized) {
      profileDispatch(fetchCurrentProfile(token));
    }

    if (token && !isAuthorized) {
      profileDispatch(fetchCurrentProfile(token));
    }
  }, [profileDispatch, isAuthorized]);

  return <RouterProvider router={router} />;
};

import { RouterProvider } from "react-router-dom";
import { router } from "@src/router/router";
import { useEffect } from "react";
import { CookieKey } from "./enums/Cookies";
import { fetchCurrentProfile } from "./slices/profileSlice";
import Cookies from "js-cookie";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import "normalize.css";
import "./global.scss";

export const App = () => {
  const dispatch = useRootDispatch();
  const isAuthorized = useRootSelector((state) => state.authSlice.isAuthorized);

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);

    if (token && isAuthorized) {
      dispatch(fetchCurrentProfile(token));
    }

    if (token && !isAuthorized) {
      dispatch(fetchCurrentProfile(token));
    }
  }, [dispatch, isAuthorized]);

  return <RouterProvider router={router} />;
};

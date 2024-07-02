import { RouterProvider } from "react-router-dom";
import { clientRouter, ghostRouter } from "@src/router/router";
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
  const role = useRootSelector((state) => state.profileSlice.role);
  const token = Cookies.get(CookieKey.token);

  useEffect(() => {
    if (token && isAuthorized) {
      dispatch(fetchCurrentProfile(token));
    }

    if (token && !isAuthorized) {
      dispatch(fetchCurrentProfile(token));
    }
  }, [dispatch, isAuthorized, token]);

  const renderProtectedRouter = () => {
    if (role === "ghost" && !token) {
      return <RouterProvider router={ghostRouter} />;
    }

    if (role === "client") {
      return <RouterProvider router={clientRouter} />;
    }
  };

  return <>{renderProtectedRouter()}</>;
};

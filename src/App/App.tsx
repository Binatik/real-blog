import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";
import { CookieKey } from "./enums/Cookies";
import { useAuthDispatch } from "./store/hooks/useAuthDispatch";
import { fetchCurrentProfile } from "./store/redux/slices/authSlice";
import Cookies from "js-cookie";
import "normalize.css";
import "./global.scss";

const App = () => {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);
    const username = Cookies.get(CookieKey.username);

    if (token && username) {
      authDispatch(fetchCurrentProfile(token));
    }
  }, [authDispatch]);

  return <RouterProvider router={router} />;
};

export default App;

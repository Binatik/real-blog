import { LoginAccaunt } from "@module/index";
import { useEffect } from "react";
import { CookieKey } from "@src/app/enums/Cookies";
import Cookies from "js-cookie";
import { fetchCurrentProfile } from "@src/app/store/redux/slices/authSlice";
import { useAuthDispatch } from "@src/app/store/hooks/useAuthDispatch";

function Login() {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);

    if (token) {
      authDispatch(fetchCurrentProfile(token));
    }
  }, [authDispatch]);

  return <LoginAccaunt />;
}

export { Login };

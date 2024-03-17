import { LoginAccaunt } from "@module/index";
import { useEffect } from "react";
import { CookieKey } from "@src/app/enums/Cookies";
import { useProfileDispatch } from "@src/app/store/profile/hooks/useProfileDispatch";
import { fetchCurrentProfile } from "@src/app/store/profile/slices/profileSlice";
import Cookies from "js-cookie";

function Login() {
  const authDispatch = useProfileDispatch();

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);

    if (token) {
      authDispatch(fetchCurrentProfile(token));
    }
  }, [authDispatch]);

  return <LoginAccaunt />;
}

export { Login };

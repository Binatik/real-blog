import { useAuthDispatch } from "@src/app/store/hooks/useAuthDispatch";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { fetchCurrentProfile } from "@src/app/store/redux/slices/authSlice";
import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";

function Feed() {
  const authDispatch = useAuthDispatch();
  const isAuthorized = useAuthSelector((state) => state.authSlice.isAuthorized);

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);

    if (token && !isAuthorized) {
      authDispatch(fetchCurrentProfile(token));
    }
  }, [authDispatch, isAuthorized]);

  return <div>Feed</div>;
}

export { Feed };

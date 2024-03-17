import { useEffect } from "react";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useProfileDispatch } from "@src/app/store/profile/hooks/useProfileDispatch";
import { fetchCurrentProfile } from "@src/app/store/profile/slices/profileSlice";
import { useProfileSelector } from "@src/app/store/profile/hooks/useProfileSelector";

function Feed() {
  const authDispatch = useProfileDispatch();
  const isAuthorized = useProfileSelector(
    (state) => state.profileSlice.isAuthorized,
  );

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);

    if (token && !isAuthorized) {
      authDispatch(fetchCurrentProfile(token));
    }
  }, [authDispatch, isAuthorized]);

  return <div>Feed</div>;
}

export { Feed };

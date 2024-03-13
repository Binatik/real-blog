import { Auth } from "@module/index";
import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";
import { RouterLink } from "@ui/index";
import classNames from "classnames";
import classes from "./Header.module.scss";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";

function Header() {
  const token = Cookies.get(CookieKey.token);
  const isAuthorized = useAuthSelector((state) => state.authSlice.isAuthorized);

  return (
    <header>
      <div
        className={classNames(classes.headerContainer, "container-desktop", {
          [classes.auth]: token,
        })}
      >
        <RouterLink to={isAuthorized ? "/user" : "/"}>Real World</RouterLink>
        <Auth />
      </div>
    </header>
  );
}

export { Header };

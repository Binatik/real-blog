import { Auth } from "@module/index";
import { RouterLink } from "@ui/index";
import classNames from "classnames";
import classes from "./Header.module.scss";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";

function Header() {
  const token = Cookies.get(CookieKey.token);

  return (
    <header>
      <div
        className={classNames(classes.headerContainer, "container-desktop", {
          [classes.auth]: token,
        })}
      >
        <RouterLink to={token ? "/user/0" : "0"}>Real World</RouterLink>
        <Auth />
      </div>
    </header>
  );
}

export { Header };

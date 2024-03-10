import { Button } from "@ui/index";
import classes from "./Auth.module.scss";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useAuthDispatch } from "@src/app/store/hooks/useAuthDispatch";
import { actions } from "@src/app/store/redux/slices/authSlice";

function Auth() {
  const token = Cookies.get(CookieKey.token);

  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function linkSignUp() {
    navigate("/sign-up");
  }

  function linkSignIn() {
    navigate("/sign-in");
  }

  function linkLogOut() {
    authDispatch(actions.logOut());
    navigate("/sign-in");
  }

  const signUpLocation = location.pathname === "/sign-up";
  const signInLocation = location.pathname === "/sign-in";

  function renderProfile() {
    if (!token) {
      return (
        <div className={classes.autorization}>
          <Button type="button" onClick={linkSignIn} disabled={signInLocation}>
            Sign In
          </Button>
          <Button
            type="button"
            size="big"
            onClick={linkSignUp}
            mode="success"
            disabled={signUpLocation}
          >
            Sign Up
          </Button>
        </div>
      );
    }

    return (
      <div className={classes.auth}>
        <Button mode="success" size="small">
          Create article
        </Button>
        <ProfileInfo to="/profile" />
        <Button onClick={linkLogOut} size="big">
          Log Out
        </Button>
      </div>
    );
  }

  return renderProfile();
}

export { Auth };

import { Button, SketonButton } from "@ui/index";
import classes from "./Auth.module.scss";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { auth } from "@src/app/store/profile/slices/authSlice";
import { useProfileDispatch } from "@src/app/store/profile/hooks/useProfileDispatch";
import { useProfileSelector } from "@src/app/store/profile/hooks/useProfileSelector";
import { profile } from "@src/app/store/profile/slices/profileSlice";

function Auth() {
  const token = Cookies.get(CookieKey.token);
  const status = useProfileSelector((state) => state.profileSlice.status);

  const authDispatch = useProfileDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function linkSignUp() {
    navigate("/sign-up");
  }

  function linkSignIn() {
    navigate("/sign-in");
  }

  function linkLogOut() {
    authDispatch(auth.logOut());
    authDispatch(profile.updateRole());
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
        {status === "pending" && <SketonButton />}
        {status === "fulfilled" && (
          <Button mode="success" size="small">
            Create article
          </Button>
        )}
        <ProfileInfo to="/user/profile" />
        <Button onClick={linkLogOut} line size="big">
          Log Out
        </Button>
      </div>
    );
  }

  return renderProfile();
}

export { Auth };

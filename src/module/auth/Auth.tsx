import { Button, SketonButton } from "@ui/index";
import classes from "./Auth.module.scss";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { auth } from "@src/app/slices/authSlice";
import { profile } from "@src/app/slices/profileSlice";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";

function Auth() {
  const token = Cookies.get(CookieKey.token);
  const status = useRootSelector((state) => state.profileSlice.status);

  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function linkSignUp() {
    dispatch(auth.deleteApiError());
    navigate("/sign-up");
  }

  function linkSignIn() {
    dispatch(auth.deleteApiError());
    navigate("/sign-in");
  }

  function linkLogOut() {
    dispatch(auth.deleteApiError());
    dispatch(auth.logOut());
    dispatch(profile.updateRole());
    navigate("/sign-in");
  }

  function linkCreate() {
    navigate("/user/create");
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
          <Button
            mode="success"
            size="small"
            type="button"
            onClick={linkCreate}
          >
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

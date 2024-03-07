import { Button } from "@ui/index";
import classes from "./Auth.module.scss";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";

const isAuth = false;

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  function linkSignUp() {
    navigate("/sign-up");
  }

  function linkSignIn() {
    navigate("/sign-in");
  }

  const signUpLocation = location.pathname === "/sign-up";
  const signInLocation = location.pathname === "/sign-in";

  function renderProfile() {
    if (!isAuth) {
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
        <Button mode="primary" size="small">
          Create article
        </Button>
        <ProfileInfo to="/profile" />
        <Button size="big">Log Out</Button>
      </div>
    );
  }

  return renderProfile();
}

export { Auth };

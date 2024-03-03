import { Button } from "@ui/index";
import classes from "./Auth.module.scss";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useNavigate } from "react-router-dom";

const isAuth = false;

function Auth() {
  const navigate = useNavigate();

  function linkSignUp() {
    navigate("/sign-up");
  }

  function renderProfile() {
    if (!isAuth) {
      return (
        <div className={classes.autorization}>
          <Button mode="default" size="none">
            Sign In
          </Button>
          <Button onClick={linkSignUp}>Sign Up</Button>
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

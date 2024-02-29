import { Button } from "@ui/index";
import classes from "./Auth.module.scss";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useState } from "react";

function Auth() {
  const [isAuth, setIsAuth] = useState(false);
  function renderProfile() {
    if (!isAuth) {
      return (
        <div className={classes.autorization}>
          <Button onClick={() => setIsAuth(true)} mode="default" size="none">
            Sign In
          </Button>
          <Button onClick={() => setIsAuth(true)}>Sign Up</Button>
        </div>
      );
    }

    return (
      <div className={classes.auth}>
        <Button mode="primary" size="small">
          Create article
        </Button>
        <ProfileInfo to="/profile" />
        <Button onClick={() => setIsAuth(false)} size="big">
          Log Out
        </Button>
      </div>
    );
  }
  return renderProfile();
}

export { Auth };

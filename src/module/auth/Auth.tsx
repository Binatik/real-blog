import { Button } from "@ui/index";
import classes from "./Auth.module.scss";

function Auth() {
  return (
    <div className={classes.auth}>
      <Button mode="default" size="none">
        Sign In
      </Button>
      <Button>Sign Up</Button>
    </div>
  );
}

export { Auth };

import {
  Button,
  FormControl,
  Heading,
  InputField,
  RouterLink,
  Text,
} from "@ui/index";
import classes from "./LoginAccaunt.module.scss";

function LoginAccaunt() {
  return (
    <section className={classes.loginAccount}>
      <div className="container-desktop">
        <FormControl method="post" wide className={classes.loginAccountForm}>
          <Heading className={classes.loginAccountHeading} as="h2">
            Create new account
          </Heading>
          <div className={classes.loginAccountFields}>
            <InputField
              autoFocus
              type="email"
              idLabel="email"
              label="Email address"
            />
            <InputField type="password" idLabel="password" label="Password" />
          </div>
          <Button mode="primary">Login</Button>
          <div className={classes.register}>
            <Text>Don’t have an account?</Text>
            <RouterLink to="/sign-up" size="small" mode="primary">
              Sign Up.
            </RouterLink>
          </div>
        </FormControl>
      </div>
    </section>
  );
}

export { LoginAccaunt };

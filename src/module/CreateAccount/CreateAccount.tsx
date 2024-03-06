import {
  Button,
  Checkbox,
  FormControl,
  Heading,
  InputField,
  RouterLink,
  Text,
} from "@ui/index";
import classes from "./CreateAccount.module.scss";

function CreateAccount() {
  return (
    <section className={classes.createAccount}>
      <div className="container-desktop">
        <FormControl method="post" wide className={classes.createAccountForm}>
          <Heading className={classes.createAccountHeading} as="h2">
            Create new account
          </Heading>
          <div className={classes.createAccountFields}>
            <InputField
              autoFocus
              type="text"
              idLabel="username"
              label="Username"
            />
            <InputField type="email" idLabel="email" label="Email address" />
            <InputField type="password" idLabel="password" label="Password" />
            <InputField
              type="password"
              idLabel="repeatPassword"
              label="Repeat Password"
            />
          </div>
          <Checkbox
            className={classes.createAccountCheckbox}
            idLabel="license"
            label="I agree to the processing of my personal information"
          />
          <Button mode="primary">Create</Button>
          <div className={classes.login}>
            <Text as="span">Already have an account?</Text>
            <RouterLink to="/sign-in" size="small" mode="primary">
              Sign In.
            </RouterLink>
          </div>
        </FormControl>
      </div>
    </section>
  );
}

export { CreateAccount };

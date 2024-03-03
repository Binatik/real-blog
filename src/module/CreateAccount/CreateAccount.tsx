import { Button, FormControl, Heading, InputField } from "@ui/index";
import classes from "./CreateAccount.module.scss";

function CreateAccount() {
  return (
    <section className={classes.createAccount}>
      <div className="container-desktop">
        <FormControl
          method="post"
          wide
          autoComplete="false"
          className={classes.createAccountForm}
        >
          <Heading className={classes.createAccountHeading} as="h2">
            Create new account
          </Heading>
          <InputField type="text" idLabel="username" label="Username" />
          <InputField type="email" idLabel="email" label="Email address" />
          <InputField type="password" idLabel="password" label="Password" />
          <InputField
            type="password"
            idLabel="repeatPassword"
            label="Repeat Password"
          />
          <Button mode="secondary">Create</Button>
        </FormControl>
      </div>
    </section>
  );
}

export { CreateAccount };

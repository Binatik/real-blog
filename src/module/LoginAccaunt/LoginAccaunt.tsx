import {
  Button,
  FormControl,
  Heading,
  InputField,
  RouterLink,
  Text,
} from "@ui/index";
import classes from "./LoginAccaunt.module.scss";
import { useValidation } from "@hooks/useValidation/useValidation";
import { validatorGroup } from "@validations/loginAccount";
import { useRef } from "react";
import { loginProfile } from "@src/app/store/profile/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useProfileSelector } from "@src/app/store/profile/hooks/useProfileSelector";
import { useProfileDispatch } from "@src/app/store/profile/hooks/useProfileDispatch";

function LoginAccaunt() {
  const navigate = useNavigate();
  const profileDispatch = useProfileDispatch();
  const hasValidCredentials = useProfileSelector(
    (state) => state.authSlice.hasValidCredentials,
  );

  const fieldRefs = useRef<HTMLInputElement[]>([]);
  const email = useValidation(validatorGroup.email, false);
  const password = useValidation(validatorGroup.password, false);

  const errorsFields = [email.error, password.error];

  const isValidationFailed = errorsFields.some((field) => field);

  async function loginAccountSubmit(
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) {
    event.preventDefault();

    email.changeValidator();
    password.changeValidator();

    errorsFields.some((field, index) => {
      fieldRefs.current[index].focus();
      return field;
    });

    if (isValidationFailed) {
      return;
    }

    await profileDispatch(loginProfile(event.currentTarget));
    navigate("/user");
  }

  function renderErrorText() {
    if (!hasValidCredentials && hasValidCredentials !== null) {
      return <Text mode="danger">Error, email or password is invalid</Text>;
    }
  }

  return (
    <section className={classes.login}>
      <div className="container-desktop">
        <FormControl
          onSubmit={loginAccountSubmit}
          method="post"
          wide
          className={classes.loginForm}
        >
          <Heading className={classes.loginHeading} as="h2">
            Sign In
          </Heading>
          <div className={classes.loginFields}>
            <InputField
              autoFocus
              name="email"
              type="email"
              idLabel="email"
              label="Email address"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[0] = ref)}
              onChange={email.changeValue}
              onBlur={email.changeValidator}
              error={email.error}
              message={email.message}
            />
            <InputField
              type="password"
              idLabel="password"
              label="Password"
              name="password"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[1] = ref)}
              onChange={password.changeValue}
              onBlur={password.changeValidator}
              error={password.error}
              message={password.message}
            />
          </div>
          <Button type="submit" size="medium" mode="primary">
            Login
          </Button>
          <div className={classes.register}>
            <Text>Don’t have an account?</Text>
            <RouterLink to="/sign-up" size="small" mode="primary">
              Sign Up.
            </RouterLink>
          </div>
          {renderErrorText()}
        </FormControl>
      </div>
    </section>
  );
}

export { LoginAccaunt };

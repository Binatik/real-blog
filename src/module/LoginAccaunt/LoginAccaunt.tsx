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
import { useAuthDispatch } from "@src/app/store/hooks/useAuthDispatch";
import { loginProfile } from "@src/app/store/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";

function LoginAccaunt() {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();
  const hasValidCredentials = useAuthSelector(
    (state) => state.authSlice.hasValidCredentials,
  );

  const fieldRefs = useRef<HTMLInputElement[]>([]);
  const email = useValidation(validatorGroup.email, false);
  const password = useValidation(validatorGroup.password, false);

  const errorsFields = [email.error, password.error];

  const isValidationFailed = errorsFields.some((field) => field);

  function loginAccountSubmit(
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

    authDispatch(loginProfile(event.currentTarget));

    if (hasValidCredentials) {
      navigate("/");
    }
  }

  function renderErrorText() {
    if (!hasValidCredentials && hasValidCredentials !== null) {
      return <Text mode="danger">Error, email or password is invalid</Text>;
    }
  }

  return (
    <section className={classes.loginAccount}>
      <div className="container-desktop">
        <FormControl
          onSubmit={loginAccountSubmit}
          method="post"
          wide
          className={classes.loginAccountForm}
        >
          <Heading className={classes.loginAccountHeading} as="h2">
            Sign In
          </Heading>
          <div className={classes.loginAccountFields}>
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

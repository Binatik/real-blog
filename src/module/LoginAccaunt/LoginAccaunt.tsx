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
import { validatorGroup } from "@src/misc/validations/loginAccount";
import { useEffect, useRef } from "react";
import { auth, loginProfile } from "@src/app/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";

function LoginAccaunt() {
  const navigate = useNavigate();
  const dispatch = useRootDispatch();
  const apiError = useRootSelector((state) => state.authSlice.apiError);
  const loading = useRootSelector((state) => state.authSlice.loading);

  const fieldRefs = useRef<HTMLInputElement[]>([]);

  const email = useValidation(validatorGroup.email, true);
  const password = useValidation(validatorGroup.password, true);

  const errorsFields = [email.error, password.error];

  const isValidationFailed = errorsFields.some((field) => field);

  const loginAccountSubmit = async (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (isValidationFailed) {
      errorsFields.some((field, index) => {
        fieldRefs.current[index].focus();
        return field;
      });

      return;
    }

    await dispatch(loginProfile(event.currentTarget));
  };

  useEffect(() => {
    if (!apiError && !loading) {
      location.reload();
      navigate("/");
    }
  }, [loading, apiError, navigate]);

  return (
    <section className={classes.login}>
      <div className="container-desktop">
        <FormControl
          onSubmit={loginAccountSubmit}
          method="post"
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
              onChange={(event) => email.changeValue(event.target.value)}
              onBlur={(event) => email.changeValue(event.target.value)}
              error={email.error}
              message={email.message}
            />
            <InputField
              type="password"
              idLabel="password"
              label="Password"
              name="password"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[1] = ref)}
              onChange={(event) => password.changeValue(event.target.value)}
              onBlur={(event) => password.changeValue(event.target.value)}
              onFocus={(event) => password.changeValue(event.target.value)}
              error={password.error}
              message={password.message}
            />
          </div>
          <Button type="submit" size="medium" mode="primary">
            Login
          </Button>
          <div className={classes.register}>
            <Text>Don’t have an account?</Text>
            <RouterLink
              onClick={() => dispatch(auth.deleteApiError())}
              to="/sign-up"
              size="small"
              mode="primary"
            >
              Sign Up.
            </RouterLink>
          </div>
          <Text
            hidden={!apiError}
            mode="danger"
          >{`email or password ${apiError && apiError.errors["email or password"]}`}</Text>
        </FormControl>
      </div>
    </section>
  );
}

export { LoginAccaunt };

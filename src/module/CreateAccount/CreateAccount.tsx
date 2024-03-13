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
import { useValidation } from "@hooks/useValidation/useValidation";
import { useAuthDispatch } from "@src/app/store/hooks/useAuthDispatch";
import { registerProfile } from "@src/app/store/redux/slices/authSlice";
import { validatorGroup } from "@validations/createAccount";
import { useRef, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const fieldRefs = useRef<HTMLInputElement[]>([]);
  const [userConsent, setUsersConsent] = useState<boolean | null>(null);

  const userName = useValidation(validatorGroup.userName);
  const email = useValidation(validatorGroup.email);
  const password = useValidation(validatorGroup.password);
  const repeatPassword = useValidation(validatorGroup.repeatPassword, false);

  const errorsFields = [
    userName.error,
    email.error,
    password.error,
    repeatPassword.error,
  ];

  const isPasswordConfirmed = password.value === repeatPassword.value;
  const isValidationFailed = errorsFields.some((field) => field);
  const canSubmit = isPasswordConfirmed && !isValidationFailed;
  const message = "Password and repeat password must match!";

  async function createAccountSubmit(
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) {
    event.preventDefault();

    userName.changeValidator();
    email.changeValidator();
    password.changeValidator();
    repeatPassword.changeValidator();

    errorsFields.some((field, index) => {
      fieldRefs.current[index].focus();
      return field;
    });

    if (!userConsent) {
      setUsersConsent(false);
      return;
    }

    if (!canSubmit) {
      return;
    }

    await authDispatch(registerProfile(event.currentTarget));
    navigate("/user");
  }

  return (
    <section className={classes.createAccount}>
      <div className="container-desktop">
        <FormControl
          onSubmit={createAccountSubmit}
          method="post"
          wide
          className={classes.createAccountForm}
        >
          <Heading className={classes.createAccountHeading} as="h2">
            Create new account
          </Heading>
          <div className={classes.createAccountFields}>
            <InputField
              autoFocus
              type="text"
              name="username"
              idLabel="username"
              label="Username"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[0] = ref)}
              onChange={userName.changeValue}
              onBlur={userName.changeValidator}
              error={userName.error}
              message={userName.message}
            />
            <InputField
              name="email"
              type="email"
              idLabel="email"
              label="Email address"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[1] = ref)}
              onChange={email.changeValue}
              onBlur={email.changeValidator}
              error={email.error}
              message={email.message}
            />
            <InputField
              type="password"
              name="password"
              idLabel="password"
              label="Password"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[2] = ref)}
              onChange={password.changeValue}
              onBlur={password.changeValidator}
              message={password.message}
              error={password.error}
            />
            <InputField
              type="password"
              idLabel="repeatPassword"
              label="Repeat Password"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[3] = ref)}
              onChange={repeatPassword.changeValue}
              onBlur={repeatPassword.changeValidator}
              message={isPasswordConfirmed ? repeatPassword.message : message}
              error={!isPasswordConfirmed}
            />
          </div>
          <Checkbox
            className={classNames(classes.createAccountCheckbox, {
              [classes.userConsent]: userConsent === false,
            })}
            idLabel="license"
            label="I agree to the processing of my personal information"
            onChange={(event) => setUsersConsent(event.currentTarget.checked)}
          />
          <Button type="submit" size="medium" mode="primary">
            Create
          </Button>
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

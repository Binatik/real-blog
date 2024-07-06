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
import { registerProfile } from "@src/app/slices/authSlice";
import { validatorGroup } from "@src/misc/validations/createAccount";
import { useRef, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";

function CreateAccount() {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const fieldRefs = useRef<HTMLInputElement[]>([]);
  const [userConsent, setUsersConsent] = useState<boolean | null>(null);

  const apiError = useRootSelector((state) => state.authSlice.apiError);

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
  const message = "Passwords must match!";

  const createAccountSubmit = async (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!userConsent) {
      setUsersConsent(false);
      return;
    }

    if (!canSubmit) {
      errorsFields.some((field, index) => {
        fieldRefs.current[index].focus();
        return field;
      });
      return;
    }

    await dispatch(registerProfile(event.currentTarget));
    navigate("/user");
    location.reload();
  };

  return (
    <section className={classes.create}>
      <div className="container-desktop">
        <FormControl
          onSubmit={createAccountSubmit}
          method="post"
          className={classes.createForm}
        >
          <Heading className={classes.createHeading} as="h2">
            Create new account
          </Heading>
          <div className={classes.createFields}>
            <InputField
              autoFocus
              type="text"
              name="username"
              idLabel="username"
              label="Username"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[0] = ref)}
              onChange={(event) => userName.changeValue(event.target.value)}
              error={userName.error}
              message={userName.message}
            />
            <InputField
              name="email"
              type="email"
              idLabel="email"
              label="Email address"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[1] = ref)}
              onChange={(event) => email.changeValue(event.target.value)}
              error={email.error}
              message={email.message}
            />
            <InputField
              type="password"
              name="password"
              idLabel="password"
              label="Password"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[2] = ref)}
              onChange={(event) => password.changeValue(event.target.value)}
              message={password.message}
              error={password.error}
            />
            <InputField
              type="password"
              idLabel="repeatPassword"
              label="Repeat Password"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[3] = ref)}
              onChange={(event) =>
                repeatPassword.changeValue(event.target.value)
              }
              message={isPasswordConfirmed ? repeatPassword.message : message}
              error={!isPasswordConfirmed}
            />
          </div>
          <Checkbox
            className={classNames(classes.createCheckbox, {
              [classes.userConsent]: userConsent === false,
            })}
            idLabel="license"
            label="I agree to the processing of my personal information"
            error={userConsent}
            messageError="You didn't give consent!"
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
          <Text
            hidden={!apiError}
            mode="danger"
          >{`email or password ${apiError && apiError.errors.email}`}</Text>
        </FormControl>
      </div>
    </section>
  );
}

export { CreateAccount };

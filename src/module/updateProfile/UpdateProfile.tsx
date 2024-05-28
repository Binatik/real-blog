import { Button, FormControl, Heading, InputField } from "@ui/index";
import classes from "./UpdateProfile.module.scss";
import { useValidation } from "@hooks/useValidation/useValidation";
import { useRef } from "react";
import { validatorGroup } from "@src/misc/validations/update";
import { updateProfile } from "@src/app/slices/profileSlice";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";

function UpdateProfile() {
  const dispatch = useRootDispatch();
  const profile = useRootSelector((stete) => stete.profileSlice.profile);
  const fieldRefs = useRef<HTMLInputElement[]>([]);
  const userName = useValidation(
    validatorGroup.userName,
    false,
    profile?.user.username,
  );
  const email = useValidation(validatorGroup.email, false, profile?.user.email);
  const newPassword = useValidation(validatorGroup.newPassword, false);

  const token = Cookies.get(CookieKey.token);

  const errorsFields = [email.error, newPassword.error, userName.error];

  const isValidationFailed = errorsFields.some((field) => field);

  async function updateProfileSubmit(
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) {
    event.preventDefault();

    const payload = {
      form: event.currentTarget,
      token: token,
    };

    userName.changeValidator();
    email.changeValidator();
    newPassword.changeValidator();

    errorsFields.some((field, index) => {
      fieldRefs.current[index].focus();
      return field;
    });

    if (isValidationFailed) {
      return;
    }

    dispatch(updateProfile(payload));
  }

  return (
    <section className={classes.update}>
      <div className="container-desktop">
        <FormControl
          onSubmit={updateProfileSubmit}
          method="post"
          wide
          className={classes.updateForm}
        >
          <Heading className={classes.updateHeading} as="h2">
            Edit Profile
          </Heading>
          <div className={classes.updateFields}>
            <InputField
              autoFocus
              name="username"
              value={userName.value}
              type="text"
              idLabel="Username"
              label="username"
              onChange={userName.changeValue}
              onBlur={userName.changeValidator}
              error={userName.error}
              message={userName.message}
              ref={(ref: HTMLInputElement) => (fieldRefs.current[0] = ref)}
            />
            <InputField
              name="email"
              value={email.value}
              type="email"
              idLabel="email"
              label="Email address"
              onChange={email.changeValue}
              onBlur={email.changeValidator}
              error={email.error}
              message={email.message}
              ref={(ref: HTMLInputElement) => (fieldRefs.current[1] = ref)}
            />
            <InputField
              type="text"
              idLabel="newpassword"
              label="Password"
              name="password"
              onChange={newPassword.changeValue}
              onBlur={newPassword.changeValidator}
              error={newPassword.error}
              message={newPassword.message}
              ref={(ref: HTMLInputElement) => (fieldRefs.current[2] = ref)}
            />
            <InputField
              labelClass={classes.updateAvatar}
              type="text"
              idLabel="file"
              label="Avatar image (url)"
              name="image"
            />
          </div>
          <Button type="submit" size="medium" mode="primary">
            Save
          </Button>
        </FormControl>
      </div>
    </section>
  );
}

export { UpdateProfile };

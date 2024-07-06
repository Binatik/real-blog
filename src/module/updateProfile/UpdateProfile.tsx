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
    true,
    profile?.user.username,
  );
  const email = useValidation(validatorGroup.email, false, profile?.user.email);
  const newPassword = useValidation(validatorGroup.newPassword, false);
  const photo = useValidation(validatorGroup.photo, false);

  const token = Cookies.get(CookieKey.token);

  const errorsFields = [
    userName.error,
    email.error,
    newPassword.error,
    photo.error,
  ];

  const isValidationFailed = errorsFields.some((field) => field);

  async function updateProfileSubmit(
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) {
    event.preventDefault();

    const payload = {
      form: event.currentTarget,
      token: token,
    };

    if (isValidationFailed) {
      errorsFields.some((field, index) => {
        fieldRefs.current[index].focus();
        return field;
      });

      return;
    }

    await dispatch(updateProfile(payload));
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
              idLabel="username"
              label="username"
              onChange={(event) => userName.changeValue(event.target.value)}
              onBlur={(event) => userName.changeValue(event.target.value)}
              onFocus={(event) => userName.changeValue(event.target.value)}
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
              onChange={(event) => email.changeValue(event.target.value)}
              onBlur={(event) => email.changeValue(event.target.value)}
              onFocus={(event) => email.changeValue(event.target.value)}
              error={email.error}
              message={email.message}
              ref={(ref: HTMLInputElement) => (fieldRefs.current[1] = ref)}
            />
            <InputField
              type="text"
              idLabel="newpassword"
              label="Password"
              name="password"
              onChange={(event) => newPassword.changeValue(event.target.value)}
              onBlur={(event) => newPassword.changeValue(event.target.value)}
              onFocus={(event) => newPassword.changeValue(event.target.value)}
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
              ref={(ref: HTMLInputElement) => (fieldRefs.current[3] = ref)}
              onChange={(event) => photo.changeValue(event.target.value)}
              error={photo.error}
              message={photo.message}
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

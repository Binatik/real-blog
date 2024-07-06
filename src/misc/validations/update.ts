const validatorGroup = {
  userName: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern: /^.{6,23}$/,
      message: "Invalid user name!",
    },
  ],

  email: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      message: "The email must be a valid email address!",
    },
  ],

  newPassword: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern: /^.{6,99}$/,
      message: "The new password must be reliable!",
    },
  ],
};

export { validatorGroup };

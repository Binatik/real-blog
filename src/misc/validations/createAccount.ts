const validatorGroup = {
  userName: [
    {
      pattern: /^[\p{L}\d_-]{3,21}$/u,
      message: "Invalid user name!",
    },
  ],

  email: [
    {
      pattern:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      message: "The email must be a valid email address!",
    },
  ],

  password: [
    {
      pattern: /^(?=.*[a-zA-Z0-9]).{6,99}$/,
      message: "Your password needs to be at least 6 characters and 99!",
    },
  ],

  repeatPassword: [
    {
      pattern: /^.{5,399}$/,
      message: "1-399",
    },
  ],
};

export { validatorGroup };

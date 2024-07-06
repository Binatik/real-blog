const validatorGroup = {
  email: [
    {
      pattern:
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      message: "The email must be a valid email address!",
    },
  ],

  password: [
    {
      pattern: /^.{6,399}$/,
      message: "",
    },
  ],
};

export { validatorGroup };

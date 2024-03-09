const validatorGroup = {
  userName: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern: /^[\p{L}\d_-]{3,21}$/u,
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

  password: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern: /^(?=.*[a-zA-Z0-9]).{6,40}$/,
      message: "Password deve essere compreso tra 6 e 40 caratteri!",
    },
  ],

  repeatPassword: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
  ],
};

export { validatorGroup };

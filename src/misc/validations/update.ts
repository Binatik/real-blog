const validatorGroup = {
  userName: [
    {
      pattern: /^.{6,23}$/,
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

  newPassword: [
    {
      pattern: /^.{6,99}$/,
      message: "The new password must be reliable!",
    },
  ],
  photo: [
    {
      pattern: /\.(png|jpg|jpeg|gif|bmp)$/i,
      message: "png | jpg | jpeg | gif | bmp",
    },
  ],
};

export { validatorGroup };

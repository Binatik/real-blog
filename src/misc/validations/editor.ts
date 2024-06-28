const validatorGroup = {
  title: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern: /^.{3,99}$/,
      message: "Title deve essere compreso tra 6 e 99 caratteri!",
    },
  ],

  description: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern: /^.{20,99}$/,
      message: "Description deve essere compreso tra 20 e 199 caratteri!",
    },
  ],

  tag: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern: /^(?=.*[a-zA-Z0-9]).{6,44}$/,
      message: "Tag deve essere compreso tra 6 e 44 caratteri!",
    },
  ],
};

export { validatorGroup };

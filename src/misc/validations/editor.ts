const validatorGroup = {
  title: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern: /^.{9,133}$/,
      message: "The title should have a short title name!",
    },
  ],

  description: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
    {
      pattern: /^.{17,399}$/,
      message: "The article should contain a normal description!",
    },
  ],

  body: [
    {
      pattern: /^(.+)$/,
      message: "The field cannot be empty!",
    },
  ],
};

export { validatorGroup };

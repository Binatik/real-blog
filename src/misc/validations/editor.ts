const validatorGroup = {
  title: [
    {
      pattern: /^.{9,133}$/,
      message: "The title should have a short title name!",
    },
  ],

  description: [
    {
      pattern: /^.{17,399}$/,
      message: "The article should contain a normal description!",
    },
  ],

  body: [
    {
      pattern: /^.{17,399}$/,
      message: "",
    },
  ],
};

export { validatorGroup };

import { useState } from "react";

type ValidationItem = {
  pattern: RegExp;
  message: string;
};

function useValidation(
  validatorGroup: ValidationItem[],
  required: boolean = true,
) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(true);

  function changeValue(ctx: string) {
    setValue((prev) => {
      changeValidator(ctx);
      return prev;
    });
  }

  function changeValidator(value: string) {
    // Добавили аргумент value
    if (value.trim() === "" && required) {
      setError(true);
      setMessage("This field is required");
      return;
    }

    const failedValidator = validatorGroup.find(
      (validator) => !value.match(validator.pattern),
    );

    if (!failedValidator) {
      setError(false);
      setMessage("");
      return;
    }

    setError(true);
    setMessage(failedValidator.message);
    return;
  }

  return {
    value,
    error,
    message,
    changeValue,
  };
}

export { useValidation };

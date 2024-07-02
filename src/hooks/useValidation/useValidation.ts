import { useState } from "react";

type ValidationItem = {
  pattern: RegExp;
  message: string;
  initialStateValue?: string;
};

export type ReturnValidator = {
  value: string;
  error: boolean;
  message: string;
  changeValue: (ctx: string) => void;
};

function useValidation(
  validatorGroup: ValidationItem[],
  required: boolean = true,
  initialStateValue?: string,
): ReturnValidator {
  const state = initialStateValue ? initialStateValue : "";
  const [value, setValue] = useState(state);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(state === "" ? true : false);

  function changeValue(ctx: string) {
    setValue(() => {
      changeValidator(ctx);
      return ctx;
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

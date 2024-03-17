import { ChangeEvent, useState } from "react";

type ValidationItem = {
  pattern: RegExp;
  message: string;
};

function useValidation(
  validatorGroup: ValidationItem[],
  required: boolean = true,
  initialStateValue?: string,
) {
  const state = initialStateValue ? initialStateValue : "";

  const [value, setValue] = useState(state);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(true);

  function changeValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function changeValidator() {
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
    changeValidator,
  };
}

export { useValidation };

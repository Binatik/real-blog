import { InputHTMLAttributes, useEffect, useRef } from "react";
import classes from "./InputField.module.scss";
import classNames from "classnames";

type InputFieldProps = {
  mode?: "default";
  size?: "medium";
  idLabel: string;
  label: string;
  message?: string | false;
  error?: boolean;
  autoFocus?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

function InputField({
  idLabel,
  label,
  error,
  message,
  mode = "default",
  size = "medium",
  autoFocus,
  className,
  ...props
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  function renderErrorField() {
    return (
      <span
        className={classNames({
          [classes.inputError]: error,
        })}
      >
        {message}
      </span>
    );
  }

  return (
    <div className={classes.inputField}>
      <label className={classes.inputFieldLabel} htmlFor={idLabel}>
        {label}
      </label>
      <input
        className={classNames(className, classes.inputFieldElement, {
          [classes.defaultMode]: mode === "default",
          [classes.mediumSize]: size === "medium",
          [classes.inputFieldElementError]: error,
        })}
        ref={inputRef}
        placeholder={label}
        id={idLabel}
        {...props}
      />
      {error && renderErrorField()}
    </div>
  );
}

export { InputField };

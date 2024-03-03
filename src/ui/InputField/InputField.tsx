import { InputHTMLAttributes } from "react";
import classes from "./InputField.module.scss";
import classNames from "classnames";

type InputFieldProps = {
  mode?: "primary";
  size?: "medium";
  idLabel: string;
  label: string;
  error?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

function InputField({
  idLabel,
  label,
  error,
  mode = "primary",
  size = "medium",
  className,
  ...props
}: InputFieldProps) {
  function renderErrorField() {
    return (
      <span
        className={classNames({
          [classes.inputError]: error,
        })}
      >
        Incorrect {label}
      </span>
    );
  }

  return (
    <div className={classes.inputField}>
      <label className={classes.inputFieldLabel} htmlFor={idLabel}>
        {label}
      </label>
      <input
        placeholder={label}
        className={classNames(className, classes.inputFieldElement, {
          [classes.primaryMode]: mode === "primary",
          [classes.mediumSize]: size === "medium",
          [classes.inputFieldElementError]: error,
        })}
        id={idLabel}
        {...props}
      />
      {error && renderErrorField()}
    </div>
  );
}

export { InputField };

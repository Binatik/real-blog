import { InputHTMLAttributes, forwardRef } from "react";
import classes from "./InputField.module.scss";
import classNames from "classnames";

type InputFieldProps = {
  mode?: "default";
  size?: "medium";
  idLabel: string;
  labelHidden?: boolean;
  label: string;
  labelClass?: string;
  message?: string | false;
  error?: boolean;
  autoFocus?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      idLabel,
      label,
      error,
      message,
      labelHidden,
      mode = "default",
      size = "medium",
      className,
      labelClass,
      ...props
    }: InputFieldProps,
    forwardedRef,
  ) {
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
        <label
          className={classNames(labelClass, classes.inputFieldLabel, {
            [classes.labelHidden]: labelHidden,
          })}
          htmlFor={idLabel}
        >
          {label}
        </label>
        <input
          className={classNames(className, classes.inputFieldElement, {
            [classes.defaultMode]: mode === "default",
            [classes.mediumSize]: size === "medium",
            [classes.inputFieldElementError]: error && message,
          })}
          ref={forwardedRef}
          placeholder={label}
          id={idLabel}
          {...props}
        />
        {error && renderErrorField()}
      </div>
    );
  },
);

export { InputField };

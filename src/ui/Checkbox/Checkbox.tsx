import { InputHTMLAttributes } from "react";
import { Text } from "@ui/Text/Text";
import classes from "./Checkbox.module.scss";
import classNames from "classnames";

type CheckboxProps = {
  label: string;
  idLabel: string;
  space?: "middle";
  type?: "checkbox";
  messageError: string;
  error: boolean | null;
} & InputHTMLAttributes<HTMLInputElement>;

function Checkbox({
  label,
  type = "checkbox",
  space = "middle",
  messageError,
  error,
  idLabel,
  className,
  ...props
}: CheckboxProps) {
  function renderErrorMessage() {
    return (
      <Text
        mode="danger"
        size="small"
        className={classNames({
          [classes.inputError]: error,
        })}
      >
        {messageError}
      </Text>
    );
  }

  return (
    <>
      <input
        className={classes.checkboxElement}
        type={type}
        placeholder={label}
        id={idLabel}
        {...props}
      />
      <label
        className={classNames(className, classes.checkboxLabel, {
          [classes.middleSpace]: space === "middle",
        })}
        htmlFor={idLabel}
      >
        {label}
      </label>
      {error === false && renderErrorMessage()}
    </>
  );
}

export { Checkbox };

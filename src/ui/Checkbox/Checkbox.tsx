import { InputHTMLAttributes } from "react";
import classes from "./Checkbox.module.scss";
import classNames from "classnames";

type CheckboxProps = {
  label: string;
  idLabel: string;
  space?: "middle";
  type?: "checkbox";
} & InputHTMLAttributes<HTMLInputElement>;

function Checkbox({
  label,
  type = "checkbox",
  space = "middle",
  idLabel,
  className,
  ...props
}: CheckboxProps) {
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
    </>
  );
}

export { Checkbox };

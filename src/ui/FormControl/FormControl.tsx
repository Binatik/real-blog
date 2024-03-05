import { FormHTMLAttributes, ReactNode } from "react";
import classes from "./FormControl.module.scss";
import classNames from "classnames";

type FormControlProps = {
  children: ReactNode;
  size?: "default";
  wide?: boolean;
} & FormHTMLAttributes<HTMLFormElement>;

function FormControl({
  children,
  size = "default",
  wide,
  className,
  ...props
}: FormControlProps) {
  return (
    <form
      className={classNames(className, classes.formControl, {
        [classes.defaultSize]: size === "default",
        [classes.formControlWide]: wide,
      })}
      {...props}
    >
      {children}
    </form>
  );
}

export { FormControl };

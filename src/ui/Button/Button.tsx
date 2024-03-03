import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";
import classNames from "classnames";

type ButtonProps = {
  children: ReactNode;
  mode?: "primary" | "secondary" | "default";
  size?: "big" | "small" | "none";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  size = "big",
  mode = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(className, classes.button, {
        [classes.primaryMode]: mode === "primary",
        [classes.secondaryMode]: mode === "secondary",
        [classes.defaultMode]: mode === "default",
        [classes.noneSize]: size === "none",
        [classes.smallSize]: size === "small",
        [classes.bigSize]: size === "big",
      })}
      type="button"
    >
      {children}
    </button>
  );
}

export { Button };

import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";
import classNames from "classnames";

type ButtonProps = {
  children: ReactNode;
  mode?: "primary" | "success" | "default";
  size?: "big" | "small" | "none";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  size = "big",
  mode = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(className, classes.button, {
        [classes.primaryMode]: mode === "primary",
        [classes.successMode]: mode === "success",
        [classes.defaultMode]: mode === "default",
        [classes.noneSize]: size === "none",
        [classes.smallSize]: size === "small",
        [classes.bigSize]: size === "big",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };

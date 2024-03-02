import { HTMLAttributes } from "react";
import classes from "./Button.module.scss";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  mode?: "primary" | "default";
  size?: "big" | "small" | "none";
} & HTMLAttributes<HTMLButtonElement>;

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

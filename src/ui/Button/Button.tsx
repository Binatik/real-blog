import { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.scss";
import classNames from "classnames";

type ButtonProps = {
  children: ReactNode;
  mode?: "primary" | "success" | "default";
  line?: boolean;
  size?: "big" | "medium" | "small";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  mode = "default",
  line,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(className, classes.button, {
        [classes.primaryMode]: mode === "primary",
        [classes.successMode]: mode === "success",
        [classes.defaultMode]: mode === "default",
        [classes.smallSize]: size === "small",
        [classes.mediumSize]: size === "medium",
        [classes.bigSize]: size === "big",
        [classes.line]: line,
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };

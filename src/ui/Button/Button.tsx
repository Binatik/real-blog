import { HTMLAttributes } from "react";
import classes from "./Button.module.scss";
import classNames from "classnames";

type IButtonProps = {
  children: React.ReactNode;
  mode?: "primary";
  size?: "big" | "small";
} & HTMLAttributes<HTMLButtonElement>;

function Button({ children, size, mode, className }: IButtonProps) {
  return (
    <button
      className={classNames(className, classes.button, {
        [classes.primaryMode]: mode === "primary" || !mode,
        [classes.smallSize]: size === "small",
        [classes.bigSize]: size === "big" || !size,
      })}
      type="button"
    >
      {children}
    </button>
  );
}

export { Button };

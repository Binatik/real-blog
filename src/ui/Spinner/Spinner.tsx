import { HTMLAttributes } from "react";
import classes from "./Spinner.module.scss";
import classNames from "classnames";

type SpinnerProps = {
  position?: "bottom" | "center";
} & HTMLAttributes<HTMLDivElement>;

function Spinner({ className, position, ...props }: SpinnerProps) {
  return (
    <span
      className={classNames(className, classes.spinner, {
        [classes.spinnerBottom]: position === "bottom",
        [classes.spinnerCenter]: position === "center",
      })}
      {...props}
    ></span>
  );
}

export { Spinner };

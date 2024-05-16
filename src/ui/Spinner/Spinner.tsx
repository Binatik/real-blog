import { HTMLAttributes } from "react";
import classes from "./Spinner.module.scss";
import classNames from "classnames";

type SpinnerProps = {} & HTMLAttributes<HTMLDivElement>;

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <span
      className={classNames(className, classes.spinner, {})}
      {...props}
    ></span>
  );
}

export { Spinner };

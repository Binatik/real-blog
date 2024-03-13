import { HTMLAttributes } from "react";
import classes from "./SketonButton.module.scss";
import classNames from "classnames";

type SketonButtonProps = {
  size?: "small";
  wide?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function SketonButton({
  className,
  size = "small",
  wide,
  ...props
}: SketonButtonProps) {
  return (
    <div
      className={classNames(className, classes.skeleton, "skeleton-animation", {
        [classes.smallSize]: size === "small",
        [classes.wideSketonButton]: wide,
      })}
      {...props}
    ></div>
  );
}

export { SketonButton };

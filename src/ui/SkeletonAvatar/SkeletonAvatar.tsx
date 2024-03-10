import { HTMLAttributes } from "react";
import classes from "./SkeletonAvatar.module.scss";
import classNames from "classnames";

type SkeletonTextProps = {
  size?: "default";
  wide?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function SkeletonAvatar({
  className,
  size = "default",
  ...props
}: SkeletonTextProps) {
  return (
    <div
      className={classNames(className, classes.skeleton, "skeleton-animation", {
        [classes.defaultSize]: size === "default",
      })}
      {...props}
    ></div>
  );
}

export { SkeletonAvatar };

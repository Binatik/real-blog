import { HTMLAttributes } from "react";
import classes from "./SkeletonText.module.scss";
import classNames from "classnames";

type SkeletonTextProps = {
  size?: "small";
  wide?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function SkeletonText({
  className,
  size = "small",
  wide,
  ...props
}: SkeletonTextProps) {
  return (
    <div
      className={classNames(className, classes.skeleton, "skeleton-animation", {
        [classes.smallSize]: size === "small",
        [classes.wideSkeleton]: wide,
      })}
      {...props}
    ></div>
  );
}

export { SkeletonText };

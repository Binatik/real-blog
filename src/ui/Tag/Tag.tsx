import { HTMLAttributes, ReactNode } from "react";
import classes from "./Tag.module.scss";
import classNames from "classnames";

type TagProps = {
  children: ReactNode;
  mode?: "defaultAlpha50";
  size?: "small";
} & HTMLAttributes<HTMLDivElement>;

export const Tag = ({
  className,
  children,
  mode = "defaultAlpha50",
  size = "small",
  ...props
}: TagProps) => {
  return (
    <div
      className={classNames(className, classes.tag, {
        [classes.defaultModeAlpha50]: mode === "defaultAlpha50",
        [classes.smallSize]: size === "small",
      })}
      {...props}
    >
      {children}
    </div>
  );
};

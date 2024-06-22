import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";
import classes from "./Text.module.scss";

type TextProps = {
  mode?: "default" | "defaultAlpha50" | "defaultAlpha75" | "danger" | "off";
  size?: "small" | "medium" | "big";
  as?: "p" | "span";
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

function Text({
  as = "span",
  mode = "default",
  size = "small",
  children,
  className,
  ...props
}: TextProps) {
  const Tag = as;

  return (
    <Tag
      className={classNames(className, classes.text, {
        [classes.defaultMode]: mode === "default",
        [classes.defaultModeAlpha50]: mode === "defaultAlpha50",
        [classes.defaultModeAlpha75]: mode === "defaultAlpha75",
        [classes.dangerMode]: mode === "danger",
        [classes.smallSize]: size === "small",
        [classes.mediumSize]: size === "medium",
        [classes.bigSize]: size === "big",
      })}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Text };

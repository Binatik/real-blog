import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";
import classes from "./Text.module.scss";

type TextProps = {
  mode?: "default" | "danger" | "off";
  size?: "small" | "big";
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
        [classes.dangerMode]: mode === "danger",
        [classes.smallSize]: size === "small",
        [classes.bigSize]: size === "big",
      })}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Text };

import { HTMLAttributes, ReactNode } from "react";
import classes from "./Heading.module.scss";
import classNames from "classnames";

type HeadingProps = {
  mode?: "default" | "defaultAlpha85" | "primary";
  size?: "level7" | "level6" | "level4";
  weight?: "medium" | "bold";
  as: "h2" | "h3";
  children: ReactNode;
} & Partial<HTMLAttributes<HTMLHeadingElement>>;

function Heading({
  as,
  size = "level7",
  weight = "bold",
  mode = "default",
  children,
  className,
  ...props
}: HeadingProps) {
  const Tag = as;

  return (
    <Tag
      className={classNames(className, classes.heading, {
        [classes.defaultMode]: mode === "default",
        [classes.defaultModeAlpha85]: mode === "defaultAlpha85",
        [classes.primaryMode]: mode === "primary",
        [classes.mediumWeight]: weight === "medium",
        [classes.boldWeight]: weight === "bold",
        [classes.level7Size]: size === "level7",
        [classes.level6Size]: size === "level6",
        [classes.level4Size]: size === "level4",
      })}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Heading };

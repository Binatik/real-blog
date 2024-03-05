import { HTMLAttributes, ReactNode } from "react";
import classes from "./Heading.module.scss";
import classNames from "classnames";

type HeadingProps = {
  size?: "level7" | "level4";
  weight?: "medium" | "bold";
  as: "h2" | "h3";
  children: ReactNode;
} & Partial<HTMLAttributes<HTMLHeadingElement>>;

function Heading({
  as,
  size = "level7",
  weight = "bold",
  children,
  className,
  ...props
}: HeadingProps) {
  const Tag = as;

  return (
    <Tag
      className={classNames(className, classes.heading, {
        [classes.level7Size]: size === "level7",
        [classes.level4Size]: size === "level4",
        [classes.mediumWeight]: weight === "medium",
        [classes.boldWeight]: weight === "bold",
      })}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Heading };

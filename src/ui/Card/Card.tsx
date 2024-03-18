import { HTMLAttributes, ReactNode } from "react";
import classes from "./Card.module.scss";
import classNames from "classnames";

type CardProps = {
  children: ReactNode;
  mode?: "main";
  size?: "small";
} & HTMLAttributes<HTMLDivElement>;

function Card({
  className,
  children,
  mode = "main",
  size = "small",
  ...props
}: CardProps) {
  return (
    <article
      className={classNames(className, classes.card, {
        [classes.mainMode]: mode === "main",
        [classes.smallSize]: size === "small",
      })}
      {...props}
    >
      {children}
    </article>
  );
}

export { Card };

import classNames from "classnames";
import classes from "./RouterLink.module.scss";
import { Link, LinkProps } from "react-router-dom";

type RouterLinkProps = {
  mode?: "default" | "primary";
  size?: "small" | "medium";
  children: React.ReactNode;
} & LinkProps;

function RouterLink({
  children,
  mode = "default",
  size = "medium",
  className,
  ...props
}: RouterLinkProps) {
  return (
    <Link
      {...props}
      className={classNames(className, classes.routerLink, {
        [classes.defaultMode]: mode === "default",
        [classes.primaryMode]: mode === "primary",
        [classes.smallSize]: size === "small",
        [classes.mediumSize]: size === "medium",
      })}
    >
      {children}
    </Link>
  );
}

export { RouterLink };

import classNames from "classnames";
import classes from "./RouterLink.module.scss";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { AnchorHTMLAttributes } from "react";

type RouterLinkProps = {
  mode?: "default" | "primary";
  size?: "small" | "medium";
  shine?: boolean;
  children: React.ReactNode;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

function RouterLink({
  children,
  mode = "default",
  size = "medium",
  shine,
  className,
  ...props
}: RouterLinkProps) {
  const location = useLocation();
  const isActiveLink = location.pathname === props.to && shine;

  return (
    <Link
      className={classNames(className, classes.routerLink, {
        [classes.defaultMode]: mode === "default",
        [classes.primaryMode]: mode === "primary",
        [classes.smallSize]: size === "small",
        [classes.mediumSize]: size === "medium",
        [classes.active]: isActiveLink,
      })}
      {...props}
    >
      {children}
    </Link>
  );
}

export { RouterLink };

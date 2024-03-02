import classNames from "classnames";
import classes from "./RouterLink.module.scss";
import { Link, LinkProps } from "react-router-dom";

type RouterLinkProps = {
  mode?: "default";
  children: React.ReactNode;
} & LinkProps;

function RouterLink({
  children,
  mode = "default",
  className,
  ...props
}: RouterLinkProps) {
  return (
    <Link
      {...props}
      className={classNames(className, classes.RouterLink, {
        [classes.defaultMode]: mode === "default",
      })}
    >
      {children}
    </Link>
  );
}

export { RouterLink };

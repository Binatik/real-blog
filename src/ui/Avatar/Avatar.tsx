import { ImgHTMLAttributes } from "react";
import classes from "./Avatar.module.css";
import classNames from "classnames";

type AvatarProps = {
  alternative: string;
  photo?: string;
  size?: "small";
} & ImgHTMLAttributes<HTMLImageElement>;

function Avatar({
  photo,
  size = "small",
  alternative,
  className,
  ...props
}: AvatarProps) {
  function renderAvatar() {
    if (!photo) {
      return <span className={classes.avatarName}>{alternative}</span>;
    }

    return <img src={photo} loading="lazy" alt="Avatar" {...props} />;
  }

  return (
    <div
      className={classNames(className, classes.avatar, {
        [classes.sizeSmall]: size === "small",
      })}
    >
      {renderAvatar()}
    </div>
  );
}

export { Avatar };

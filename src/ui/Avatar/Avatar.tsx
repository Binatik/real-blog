import { HTMLAttributes } from "react";
import classes from "./Avatar.module.css";
import classNames from "classnames";

type AvatarProps = {
  photo?: string;
  size?: "small";
} & HTMLAttributes<HTMLDivElement>;

function Avatar({ photo, size = "small", className }: AvatarProps) {
  function renderAvatar() {
    if (!photo) {
      return <span>S</span>;
    }

    return <img src={photo} alt="Avatar" />;
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

import { HTMLAttributes } from "react";
import classes from "./Avatar.module.css";
import classNames from "classnames";

type AvatarProps = {
  photo?: string;
  size?: "small";
} & Partial<HTMLAttributes<HTMLDivElement>>;

function Avatar({ photo, size = "small", className }: AvatarProps) {
  function renderAvatar() {
    if (!photo) {
      return <span>S</span>;
    }

    return (
      <img src={photo} width={46} height={46} loading="lazy" alt="Avatar" />
    );
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

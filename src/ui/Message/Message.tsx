type MessageProps = {
  label: string;
  idLabel: string;
  size?: "medium";
  mode?: "default";
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

import { TextareaHTMLAttributes } from "react";
import classes from "./Message.module.scss";
import classNames from "classnames";

export const Message = ({
  label,
  idLabel,
  mode = "default",
  size = "medium",
  ...props
}: MessageProps) => {
  return (
    <>
      <div className={classes.messageTextarea}>
        <label className={classes.messageLabel} htmlFor={idLabel}>
          {label}
        </label>
        <textarea
          className={classNames(classes.messageElement, {
            [classes.defaultMode]: mode === "default",
            [classes.mediumSize]: size === "medium",
          })}
          id={idLabel}
          placeholder={label}
          name="message"
          {...props}
        ></textarea>
      </div>
    </>
  );
};

import { HTMLAttributes, ReactNode } from "react";
import classes from "./Alert.module.scss";
import classNames from "classnames";
import { Text } from "@ui/Text/Text";
import { Button } from "@ui/Button/Button";

type AlertProps = {
  children: ReactNode;
  mode?: "default";
  onChangeAlertNo: () => void;
  onChangeAlertYes: () => void;
} & HTMLAttributes<HTMLDivElement>;

function Alert({
  className,
  children,
  mode = "default",
  onChangeAlertNo,
  onChangeAlertYes,
  ...props
}: AlertProps) {
  return (
    <div
      className={classNames(className, classes.alert, {
        [classes.defaultMode]: mode === "default",
      })}
      {...props}
    >
      <Text mode="defaultAlpha75" size="medium" as="span">
        {children}
      </Text>
      <div className={classes.alertButtons}>
        <Button onClick={onChangeAlertNo} mode="primaryOutline" size="medium">
          No
        </Button>
        <Button onClick={onChangeAlertYes} mode="primary" size="medium">
          Yes
        </Button>
      </div>
    </div>
  );
}

export { Alert };

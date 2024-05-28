import { ButtonHTMLAttributes } from "react";
import { Button, Text } from "..";
import classes from "./Like.module.scss";

type LikeProps = {
  count: number;
  innerClass?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Like = ({ count, innerClass, ...props }: LikeProps) => {
  return (
    <Button type="button" className={classes.like} {...props}>
      <span className={innerClass}></span>
      <Text as="span" mode="defaultAlpha75">
        {count}
      </Text>
    </Button>
  );
};

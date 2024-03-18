import { Button, Text } from "@ui/index";
import classes from "./Reaction.module.scss";
import classNames from "classnames";
import { useState } from "react";

type ReactionProps = {
  updateReaction: () => void;
};

export const Reaction = ({ updateReaction }: ReactionProps) => {
  const [hasReaction, setHasReaction] = useState(false);

  function addReaction() {
    setHasReaction((prev) => (prev = !prev));
    updateReaction();
  }

  return (
    <Button
      onClick={addReaction}
      type="button"
      className={classes.reactionButton}
    >
      <span
        className={classNames(classes.reaction, {
          [classes.on]: hasReaction,
          [classes.off]: !hasReaction,
        })}
      ></span>
      <Text as="span" mode="defaultAlpha75">
        11
      </Text>
    </Button>
  );
};

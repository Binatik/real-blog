import { Button, Text } from "@ui/index";
import classes from "./Reaction.module.scss";
import classNames from "classnames";

type ReactionProps = {
  updateReaction: (id: string | number) => void;
  favoritesCount: number;
  favorited: boolean;
  id: string | number;
};

export const Reaction = ({
  id,
  favorited,
  favoritesCount,
  updateReaction,
}: ReactionProps) => {
  function addReaction() {
    // setHasReaction((prev) => (prev = !prev));
    updateReaction(id);
  }

  return (
    <Button
      onClick={addReaction}
      type="button"
      className={classes.reactionButton}
    >
      <span
        className={classNames(classes.reaction, {
          [classes.on]: favorited,
          [classes.off]: !favorited,
        })}
      ></span>
      <Text as="span" mode="defaultAlpha75">
        {favoritesCount}
      </Text>
    </Button>
  );
};

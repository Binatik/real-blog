import { Avatar, Card, Heading, RouterLink, Tag, Text } from "@ui/index";
import classes from "./Blog.module.scss";
import { Reaction } from "@src/feature";
import { shortenDescription } from "@src/utils";

export const Blog = () => {
  function updateReaction() {
    //обращение к серверу
  }
  return (
    <div className={classes.blog}>
      <div className="container-mini-desktop">
        <div className={classes.blogItems}>
          <Card>
            <div className={classes.authorContainer}>
              <div className={classes.author}>
                <div className={classes.authorInfo}>
                  <Heading
                    as="h2"
                    weight="medium"
                    size="level6"
                    mode="defaultAlpha85"
                  >
                    John Doe
                  </Heading>
                  <Text as="span" mode="defaultAlpha50">
                    March 5, 2020
                  </Text>
                </div>
                <Avatar
                  className={classes.authorAvatar}
                  width={46}
                  height={46}
                  alternative="J"
                />
              </div>
            </div>
            <div className={classes.blogItem}>
              <div className={classes.blogTop}>
                <RouterLink
                  className={classes.blogLink}
                  to="/"
                  mode="primary"
                  size="medium"
                >
                  {shortenDescription("Some article title", 100)}
                </RouterLink>
                <Reaction updateReaction={updateReaction} />
              </div>
              <Tag className={classes.blogTag}>
                <Text as="span" mode="off" size="small">
                  Tag1
                </Text>
              </Tag>
              <Text
                as="p"
                mode="defaultAlpha75"
                size="small"
                className={classes.blogDescription}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

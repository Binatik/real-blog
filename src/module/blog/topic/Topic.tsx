import { Article } from "@api/api.types";
import { shortenDescription } from "@src/utils";
import { splitLongWords } from "@src/utils/splitLongWords";
import { Avatar, Card, Heading, RouterLink, Tag, Text } from "@ui/index";
import classes from "./Topic.module.scss";
import { useLocation } from "react-router-dom";

type TopicProps = {
  article: Article;
};

export const Topic = ({ article }: TopicProps) => {
  const location = useLocation();
  const redirect = location.pathname === "/";

  // function updateReaction(id: string | number) {
  // }

  return (
    <Card key={article.createdAt}>
      <div className={classes.authorContainer}>
        <div className={classes.author}>
          <div className={classes.authorInfo}>
            <Heading
              as="h2"
              weight="medium"
              size="level6"
              mode="defaultAlpha85"
            >
              {article.author.username}
            </Heading>
            <Text as="span" mode="defaultAlpha50">
              March 5, 2020
            </Text>
          </div>
          <Avatar
            className={classes.authorAvatar}
            photo={article.author.image}
            width={46}
            height={46}
            alternative={article.author.username[0]}
          />
        </div>
      </div>
      <div className={classes.topicContainer}>
        <div className={classes.topicTop}>
          <RouterLink
            className={classes.topicLink}
            to={redirect ? "/sign-up" : `${article.slug}`}
            mode="primary"
            size="medium"
          >
            {shortenDescription(splitLongWords(article.title, 24), 100)}
          </RouterLink>
          {/* <Reaction
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
            id={article.slug}
            updateReaction={updateReaction}
          /> */}
        </div>

        <div className={classes.tagContainer}>
          {article.tagList &&
            article.tagList.map((tag) => (
              <Tag className={classes.topicTag}>
                <Text as="span" mode="off" size="small">
                  {tag}
                </Text>
              </Tag>
            ))}
        </div>
        <Text
          as="p"
          mode="defaultAlpha75"
          size="small"
          className={classes.topicDescription}
        >
          {splitLongWords(article.description, 55)}
        </Text>
      </div>
    </Card>
  );
};

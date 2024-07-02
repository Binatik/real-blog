import { Article } from "@api/api.types";
import { shortenDescription } from "@src/misc/utils";
import { splitLongWords } from "@src/misc/utils/splitLongWords";
import {
  Avatar,
  Button,
  Card,
  Heading,
  Like,
  RouterLink,
  Tag,
  Text,
} from "@ui/index";
import classes from "./Topic.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import {
  fetchDeleteReaction,
  fetchDeleteTopic,
  fetchSetReaction,
} from "../slices/postsSlice";
import classNames from "classnames";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import ReactMarkdown from "react-markdown";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { params } from "../Blog";
import { getTime } from "@src/misc/utils/getTime";

type TopicProps = {
  article: Article;
  expanded: boolean;
};

export const Topic = ({ article, expanded }: TopicProps) => {
  const dispatch = useRootDispatch();
  const params = useParams<params>();
  const navigate = useNavigate();
  const profile = useRootSelector((state) => state.profileSlice.profile);
  const token = Cookies.get(CookieKey.token);
  const location = useLocation();
  const redirect = location.pathname === "/";
  const defautPhoto =
    "https://static.productionready.io/images/smiley-cyrus.jpg";
  const canPhoto = article.author.image !== defautPhoto;

  const payload = {
    slug: article.slug,
    token: token,
  };

  const deleteTopic = async () => {
    await dispatch(fetchDeleteTopic(payload));
    navigate(`/user`);
  };

  const getReaction = async (reaction: boolean) => {
    if (!reaction) {
      dispatch(fetchSetReaction(payload));
      return;
    }

    await dispatch(fetchDeleteReaction(payload));
    return;
  };

  const renderTitle = () => {
    if (expanded) {
      return (
        <Heading className={classes.topicHeader} as="h2" mode="primary">
          {shortenDescription(splitLongWords(article.title, 24), 100)}
        </Heading>
      );
    }

    return (
      <RouterLink
        className={classes.topicLink}
        to={redirect ? "/sign-up" : `${article.slug}`}
        mode="primary"
        size="medium"
      >
        {shortenDescription(splitLongWords(article.title, 24), 100)}
      </RouterLink>
    );
  };

  const renderButtons = () => {
    if (profile?.user.username === article.author.username && token) {
      return (
        <>
          <Button
            onClick={deleteTopic}
            type="button"
            mode="danger"
            size="small"
          >
            Delete
          </Button>
          <Button
            onClick={() =>
              navigate(`/user/${params.pageCount}/updateTopic/${article.slug}`)
            }
            type="button"
            mode="success"
            size="small"
          >
            Edit
          </Button>
        </>
      );
    }
  };

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
              {getTime(article.createdAt)}
            </Text>
          </div>
          <Avatar
            className={classes.authorAvatar}
            photo={canPhoto ? article.author.image : ""}
            width={46}
            height={46}
            alternative={article.author.username[0]}
          />
        </div>
      </div>
      <div className={classes.topicContainer}>
        <div className={classes.topicTop}>
          {renderTitle()}
          <div className={classes.reactionContainer}>
            <Like
              onClick={() => getReaction(article.favorited)}
              count={article.favoritesCount}
              innerClass={classNames(classes.reaction, {
                [classes.on]: article.favorited,
                [classes.off]: !article.favorited,
              })}
            />
          </div>
        </div>

        <div className={classes.tagContainer}>
          {article.tagList &&
            article.tagList.map((tag) => (
              <Tag key={self.crypto.randomUUID()} className={classes.topicTag}>
                <Text as="span" mode="off" size="small">
                  {tag}
                </Text>
              </Tag>
            ))}
        </div>
        <div className={classes.descriptionContainer}>
          <Text
            as="p"
            mode="defaultAlpha75"
            size="small"
            className={classes.topicDescription}
          >
            {splitLongWords(article.description, 55)}
          </Text>
          {expanded && (
            <div className={classes.buttonsRight}>{renderButtons()}</div>
          )}
        </div>
        {expanded && <ReactMarkdown>{article.body}</ReactMarkdown>}
      </div>
    </Card>
  );
};

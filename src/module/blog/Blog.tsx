import {
  Avatar,
  Card,
  Heading,
  Paginate,
  RouterLink,
  Spinner,
  Tag,
  Text,
} from "@ui/index";
import classes from "./Blog.module.scss";
import { Reaction } from "@src/feature";
import { shortenDescription } from "@src/utils";
import { Article } from "@api/api.types";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { useEffect, useState } from "react";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { fetchArticles } from "./slices/blogSlice";
import { splitLongWords } from "@src/utils/splitLongWords";
import Arrow from "@assets/arrow.svg?react";

export const Blog = () => {
  const dispatch = useRootDispatch();
  const articles = useRootSelector((state) => state.blogSlice.articles);
  const articlesCount = useRootSelector(
    (state) => state.blogSlice.articlesCount,
  );
  const loading = !articles;
  const [currentPage, setCurrentPage] = useState(0);

  function updateReaction(id: string | number) {
    console.log(id);
    //обращение к серверу
  }

  useEffect(() => {
    dispatch(fetchArticles(19 * currentPage));
  }, [currentPage, dispatch]);

  function renderArticle(article: Article) {
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
        <div className={classes.blogItem}>
          <div className={classes.blogTop}>
            <RouterLink
              className={classes.blogLink}
              to="/"
              mode="primary"
              size="medium"
            >
              {shortenDescription(splitLongWords(article.title, 24), 100)}
            </RouterLink>
            <Reaction
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
              id={article.slug}
              updateReaction={updateReaction}
            />
          </div>

          {article.tags &&
            article.tags.map((tag) => (
              <Tag className={classes.blogTag}>
                <Text as="span" mode="off" size="small">
                  {tag}
                </Text>
              </Tag>
            ))}
          <Text
            as="p"
            mode="defaultAlpha75"
            size="small"
            className={classes.blogDescription}
          >
            {splitLongWords(article.description, 55)}
          </Text>
        </div>
      </Card>
    );
  }
  return (
    <div className={classes.blog}>
      <div className="container-mini-desktop">
        <div className={classes.blogItems}>
          {loading ? (
            <div className={classes.blogSpinner}>
              <Spinner />
            </div>
          ) : (
            articles.map((article) => renderArticle(article))
          )}
        </div>
        {!loading && (
          <Paginate
            pageRangeDisplayed={3}
            pageCount={Math.ceil(articlesCount / 19)}
            initialPage={currentPage}
            marginPagesDisplayed={1}
            onPageChange={(ctx) => setCurrentPage(ctx.selected)}
            previousLabel={<Arrow className={classes.arrowLeft} />}
            nextLabel={<Arrow className={classes.arrowRight} />}
          />
        )}
      </div>
    </div>
  );
};

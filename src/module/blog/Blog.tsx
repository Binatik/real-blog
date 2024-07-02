import { Paginate, Spinner, Text } from "@ui/index";
import classes from "./Blog.module.scss";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { useEffect, useState } from "react";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { fetchArticles } from "./slices/postsSlice";
import Arrow from "@assets/arrow.svg?react";
import { Topic } from "./topic/Topic";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useNavigate, useParams } from "react-router-dom";

type Ctx = {
  selected: number;
};

export type params = {
  pageCount?: string | undefined;
};

export const Blog = () => {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const params = useParams<params>();
  const articles = useRootSelector((state) => state.postsSlice.articles);
  const articlesCount = useRootSelector(
    (state) => state.postsSlice.articlesCount,
  );
  const loading = !articles;

  const initPage = params.pageCount ? params.pageCount : "0";

  const [currentPage, setCurrentPage] = useState(Number(initPage));

  const saveCurrentPage = (ctx: Ctx) => {
    setCurrentPage(ctx.selected);
  };

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);
    const payload = {
      token,
      offset: 19 * currentPage,
    };

    if (token) {
      navigate(`/user/${currentPage}`);
    }

    if (!token) {
      navigate(`/${currentPage}`);
    }

    dispatch(fetchArticles(payload));
  }, [currentPage, dispatch]);

  return (
    <div className={classes.blog}>
      <div className="container-mini-desktop">
        <div className={classes.blogItems}>
          {loading ? (
            <div className={classes.blogSpinner}>
              <Spinner />
            </div>
          ) : (
            articles.map(
              (article) =>
                article.title.length !== 0 && (
                  <Topic
                    article={article}
                    expanded={false}
                    key={article.title + article.slug}
                  />
                ),
            )
          )}
        </div>
        {articles?.length === 0 && (
          <Text size="big" mode="defaultAlpha50" as="p">
            The page you are looking for has not been added yet!
          </Text>
        )}
        {!loading && (
          <Paginate
            pageRangeDisplayed={3}
            pageCount={Math.ceil(articlesCount / 19)}
            initialPage={currentPage}
            marginPagesDisplayed={1}
            onPageChange={(ctx) => saveCurrentPage(ctx)}
            previousLabel={<Arrow className={classes.arrowLeft} />}
            nextLabel={<Arrow className={classes.arrowRight} />}
          />
        )}
      </div>
    </div>
  );
};

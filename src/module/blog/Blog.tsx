import { Paginate, Spinner } from "@ui/index";
import classes from "./Blog.module.scss";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { useEffect, useState } from "react";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { fetchArticles } from "./slices/blogSlice";
import Arrow from "@assets/arrow.svg?react";
import { Topic } from "./topic/Topic";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";

export const Blog = () => {
  const dispatch = useRootDispatch();
  const articles = useRootSelector((state) => state.blogSlice.articles);
  const articlesCount = useRootSelector(
    (state) => state.blogSlice.articlesCount,
  );
  const loading = !articles;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const payload = {
      token: Cookies.get(CookieKey.token),
      offset: 19 * currentPage,
    };

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
            articles.map((article) => (
              <Topic
                article={article}
                expanded={false}
                key={article.title + article.slug}
              />
            ))
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

import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { fetchTopic } from "@module/blog/slices/blogSlice";
import { Topic } from "@module/index";
import { Spinner } from "@ui/index";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";

export type params = {
  slug?: string | undefined;
};

export const CurrentTopic = () => {
  const dispatch = useRootDispatch();
  const params = useParams<params>();
  const topic = useRootSelector((state) => state.blogSlice.topic);
  const isExpandedArticle = useRootSelector(
    (state) => state.blogSlice.isExpandedArticle,
  );

  const loading = !topic;

  useEffect(() => {
    const payload = {
      path: params.slug,
      token: Cookies.get(CookieKey.token),
    };

    dispatch(fetchTopic(payload));
  }, [dispatch, params.slug]);

  const renderTopic = () => {
    if (loading) {
      return <Spinner />;
    }

    return <Topic article={topic} expanded={isExpandedArticle} />;
  };

  return <div className="container-mini-desktop">{renderTopic()}</div>;
};

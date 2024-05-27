import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { fetchTopic } from "@module/blog/slices/blogSlice";
import { Topic } from "@module/index";
import { Spinner } from "@ui/index";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export type params = {
  slug?: string | undefined;
};

export const CurrentTopic = () => {
  const dispatch = useRootDispatch();
  const params = useParams<params>();
  const topic = useRootSelector((state) => state.blogSlice.topic);

  const loading = !topic;

  useEffect(() => {
    dispatch(fetchTopic(params.slug));
  }, [dispatch]);

  const renderTopic = () => {
    if (loading) {
      return <Spinner />;
    }

    return <Topic article={topic} />;
  };

  return <div className="container-mini-desktop">{renderTopic()}</div>;
};

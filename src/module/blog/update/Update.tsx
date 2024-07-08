import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { useValidation } from "@hooks/useValidation/useValidation";
import { validatorGroup } from "@validations/editor";
import { Editor, Spinner } from "@ui/index";
import { fetchTopic } from "../slices/postsSlice";
import { editor, updatePost } from "../slices/editorSlice";

export type params = {
  slug?: string | undefined;
};

export const Update = () => {
  const params = useParams<params>();
  const dispatch = useRootDispatch();
  const navigate = useNavigate();

  const topic = useRootSelector((state) => state.postsSlice.topic);
  const tags = useRootSelector((state) => state.postsSlice.topic?.tagList);

  const topicLoading = !topic;

  useEffect(() => {
    dispatch(editor.getTags(tags));
  }, [dispatch, tags]);

  const validate = {
    title: useValidation(validatorGroup.title, true, topic?.title),
    description: useValidation(
      validatorGroup.description,
      true,
      topic?.description,
    ),
    body: useValidation(validatorGroup.body, true, topic?.body),
  };

  const fieldRefs = useRef<HTMLInputElement[]>([]);
  const errorsFields = [validate.title.error, validate.description.error];
  const isValidationFailed = errorsFields.some((field) => field);

  const token = Cookies.get(CookieKey.token);

  useEffect(() => {
    const payload = {
      path: params.slug,
      token: Cookies.get(CookieKey.token),
    };

    dispatch(fetchTopic(payload));
  }, [dispatch, params.slug]);

  const updatePostSubmit = async (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const payload = {
      form: event.currentTarget,
      token: token,
      slug: params.slug,
    };

    if (isValidationFailed) {
      errorsFields.some((field, index) => {
        fieldRefs.current[index].focus();
        return field;
      });

      return;
    }

    await dispatch(updatePost(payload));
    navigate("/");
  };

  const renderEditTopic = () => {
    return (
      <Editor
        onSubmit={updatePostSubmit}
        fieldRefs={fieldRefs}
        field={{ ...validate }}
      >
        Edit article
      </Editor>
    );
  };

  return topicLoading ? <Spinner position="center" /> : renderEditTopic();
};

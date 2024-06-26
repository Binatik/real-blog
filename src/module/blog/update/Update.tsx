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

export type params = {
  slug?: string | undefined;
};

export const Update = () => {
  const params = useParams<params>();
  const dispatch = useRootDispatch();
  const navigate = useNavigate();

  const topic = useRootSelector((state) => state.postsSlice.topic);
  const loadingTopic = !topic;

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

  const sendLoading = useRootSelector((state) => state.editorSlice.loading);
  const error = useRootSelector((state) => state.editorSlice.error);

  // const token = Cookies.get(CookieKey.token);

  useEffect(() => {
    const payload = {
      path: params.slug,
      token: Cookies.get(CookieKey.token),
    };

    dispatch(fetchTopic(payload));
  }, [dispatch, params.slug]);

  const createPostSubmit = async (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    event.preventDefault();

    // const payload = {
    //   form: event.currentTarget,
    //   token: token,
    //   slug: params
    // };

    errorsFields.some((field, index) => {
      fieldRefs.current[index].focus();
      return field;
    });

    if (isValidationFailed) {
      return;
    }

    // await dispatch(createPost(payload));
  };

  useEffect(() => {
    if (!sendLoading && !error) {
      navigate("/user/0");
      location.reload();
    }
  }, [error, sendLoading, navigate]);

  const renderEditTopic = () => {
    if (loadingTopic) return <Spinner position="center" />;

    return (
      <Editor
        onSubmit={createPostSubmit}
        fieldRefs={fieldRefs}
        field={{ ...validate }}
      >
        Edit article
      </Editor>
    );
  };

  return (
    <>
      {renderEditTopic()}
      {!sendLoading && <Spinner />}
    </>
  );
};

import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { useValidation } from "@hooks/useValidation/useValidation";
import { validatorGroup } from "@validations/editor";
import { createPost } from "../slices/editorSlice";
import { Editor, Spinner } from "@ui/index";

export const Create = () => {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();

  const validate = {
    title: useValidation(validatorGroup.title, true),
    description: useValidation(validatorGroup.description, true),
  };

  const fieldRefs = useRef<HTMLInputElement[]>([]);
  const errorsFields = [validate.title.error, validate.description.error];
  const isValidationFailed = errorsFields.some((field) => field);

  const sendLoading = useRootSelector((state) => state.editorSlice.loading);
  const error = useRootSelector((state) => state.editorSlice.error);

  const token = Cookies.get(CookieKey.token);

  const createPostSubmit = async (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const payload = {
      form: event.currentTarget,
      token: token,
    };

    if (isValidationFailed) {
      errorsFields.some((field, index) => {
        fieldRefs.current[index].focus();
        return field;
      });
      return;
    }

    await dispatch(createPost(payload));
  };

  useEffect(() => {
    if (!sendLoading && !error) {
      navigate("/user/0");
      location.reload();
    }
  }, [error, sendLoading, navigate]);

  return (
    <>
      <Editor
        onSubmit={createPostSubmit}
        fieldRefs={fieldRefs}
        field={{ ...validate }}
      >
        Create new article
      </Editor>
      {!sendLoading && <Spinner />}
    </>
  );
};

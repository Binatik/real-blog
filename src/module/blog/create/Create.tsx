import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useValidation } from "@hooks/useValidation/useValidation";
import { validatorGroup } from "@validations/editor";
import { createPost } from "../slices/editorSlice";
import { Editor } from "@ui/index";

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
    navigate("/");
  };

  return (
    <>
      <Editor
        onSubmit={createPostSubmit}
        fieldRefs={fieldRefs}
        field={{ ...validate }}
      >
        Create new article
      </Editor>
    </>
  );
};

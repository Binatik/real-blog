import {
  Button,
  FormControl,
  Heading,
  InputField,
  Message,
  Text,
} from "@ui/index";
import classes from "./Editor.module.scss";
import classNames from "classnames";
import { validatorGroup } from "@validations/editor";
import { useValidation } from "@hooks/useValidation/useValidation";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { createPost, editor } from "../slices/editorSlice";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import Cookies from "js-cookie";
import React from "react";
import { CookieKey } from "@src/app/enums/Cookies";
import { useNavigate } from "react-router-dom";

type EditorProps = {
  title: string;
};

export const Editor = ({ title }: EditorProps) => {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const titleValidator = useValidation(validatorGroup.title, true);
  const descriptionValidator = useValidation(validatorGroup.description, true);
  const tags = useRootSelector((state) => state.editorSlice.tagsObject);

  const token = Cookies.get(CookieKey.token);

  const createPostSubmit = (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const payload = {
      form: event.currentTarget,
      token: token,
    };
    dispatch(createPost(payload));
    navigate("/user/");
  };

  const renderTags = () => {
    if (tags.length === 0) {
      return (
        <Button
          onClick={() => dispatch(editor.addTags())}
          type="button"
          size="medium"
          mode="primaryOutline"
        >
          Add tag
        </Button>
      );
    }

    return tags.map((tag, index) => (
      <div key={tag.id} className={classes.editorTagItem}>
        <InputField
          className={classes.editorPlaceholder}
          labelHidden
          name={tag.id}
          type="tag"
          idLabel={tag.id}
          label="Tag"
        />
        <Button
          onClick={() => dispatch(editor.removeTag(tag.id))}
          type="button"
          size="medium"
          mode="danger"
        >
          Delete
        </Button>
        {index === tags.length - 1 && (
          <Button
            onClick={() => dispatch(editor.addTags())}
            className={classes.addTagEditor}
            type="button"
            size="medium"
            mode="primaryOutline"
          >
            Add tag
          </Button>
        )}
      </div>
    ));
  };

  return (
    <section className={classes.editorContainer}>
      <div className={classNames("container-desktop", classes.desktopSpace)}>
        <FormControl wide onSubmit={createPostSubmit}>
          <Heading className={classes.editorTitle} as="h2">
            {title}
          </Heading>
          <div className={classes.editorFields}>
            <InputField
              name="title"
              type="title"
              idLabel="Title"
              label="Title"
              value={titleValidator.value}
              onChange={titleValidator.changeValue}
            />
            <InputField
              name="description"
              type="description"
              idLabel="description"
              label="Short description"
              value={descriptionValidator.value}
              onChange={descriptionValidator.changeValue}
            />
            <Message idLabel="Message" label="Text" />
          </div>
          <Text size="medium" mode="defaultAlpha75">
            Tags
          </Text>
          <div className={classes.editorFields}>{renderTags()}</div>
          <Button
            className={classes.buttonSubmit}
            size="medium"
            mode="primary"
            type="submit"
          >
            Send
          </Button>
        </FormControl>
      </div>
    </section>
  );
};

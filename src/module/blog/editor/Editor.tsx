import {
  Button,
  FormControl,
  Heading,
  InputField,
  Message,
  Spinner,
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
import React, { useEffect } from "react";
import { CookieKey } from "@src/app/enums/Cookies";
import { useNavigate } from "react-router-dom";

type EditorProps = {
  title: string;
};

export const Editor = ({ title }: EditorProps) => {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const titleValidator = useValidation(validatorGroup.title, true);
  const tags = useRootSelector((state) => state.editorSlice.tagsObject);
  const topic = useRootSelector((state) => state.editorSlice.topic);
  const error = useRootSelector((state) => state.editorSlice.error);

  const loading = !topic;

  const token = Cookies.get(CookieKey.token);

  const createPostSubmit = async (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const payload = {
      form: event.currentTarget,
      token: token,
    };

    titleValidator.changeValidator();

    if (titleValidator.error) {
      return;
    }

    await dispatch(createPost(payload));
  };

  useEffect(() => {
    if (topic && !error) {
      navigate("/user");
      location.reload();
    }
  }, [error, topic]);

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
          {error && (
            <Text as="span" size="medium" mode="danger">
              An error occurred when formatting the article..
            </Text>
          )}
          <div className={classes.editorFields}>
            <InputField
              name="title"
              type="title"
              idLabel="Title"
              label="Title"
              value={titleValidator.value}
              onChange={titleValidator.changeValue}
              onBlur={titleValidator.changeValidator}
              error={titleValidator.error}
              message={titleValidator.message}
            />
            <InputField
              name="description"
              type="description"
              idLabel="description"
              label="Short description"
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
        {!loading && <Spinner />}
      </div>
    </section>
  );
};

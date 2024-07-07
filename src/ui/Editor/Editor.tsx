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
import { ReturnValidator } from "@hooks/useValidation/useValidation";
import { useRootDispatch } from "@hooks/useRootDispatch/useRootDispatch";
import { useRootSelector } from "@hooks/useRootSelector/useRootSelector";
import { FormHTMLAttributes } from "react";
import { editor } from "@module/blog/slices/editorSlice";

type EditorProps = {
  children: React.ReactNode;
  fieldRefs: React.MutableRefObject<HTMLInputElement[]>;
  field: {
    title: ReturnValidator;
    description: ReturnValidator;
    body?: ReturnValidator;
  };
} & FormHTMLAttributes<HTMLFormElement>;

export const Editor = ({
  children,
  fieldRefs,
  field,
  ...props
}: EditorProps) => {
  const dispatch = useRootDispatch();

  const tags = useRootSelector((state) => state.editorSlice.tagsObject);
  const error = useRootSelector((state) => state.editorSlice.error);

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
          wide={false}
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
        <FormControl wide {...props}>
          <Heading className={classes.editorTitle} as="h2">
            {children}
          </Heading>
          {error && (
            <Text as="span" size="medium" mode="danger">
              An error occurred when formatting the article..
            </Text>
          )}
          <div className={classes.editorFields}>
            <InputField
              autoFocus
              name="title"
              type="title"
              idLabel="Title"
              label="Title"
              ref={(ref: HTMLInputElement) => (fieldRefs.current[0] = ref)}
              value={field.title.value}
              onChange={(event) => field.title.changeValue(event.target.value)}
              onBlur={(event) => field.title.changeValue(event.target.value)}
              error={field.title.error}
              message={field.title.message}
            />
            <InputField
              name="description"
              type="description"
              idLabel="description"
              label="Short description"
              onBlur={(event) =>
                field.description.changeValue(event.target.value)
              }
              ref={(ref: HTMLInputElement) => (fieldRefs.current[1] = ref)}
              value={field.description.value}
              onChange={(event) =>
                field.description.changeValue(event.target.value)
              }
              error={field.description.error}
              message={field.description.message}
            />
            <Message
              onChange={(event) => field.body?.changeValue(event.target.value)}
              value={field.body?.value}
              idLabel="Message"
              label="Text"
            />
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

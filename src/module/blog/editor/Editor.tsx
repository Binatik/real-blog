import { FormControl, Heading, InputField, Message } from "@ui/index";
import classes from "./Editor.module.scss";
import classNames from "classnames";

type EditorProps = {
  title: string;
  description: string;
  text: string;
};

export const Editor = ({ title }: EditorProps) => {
  return (
    <section className={classes.editorContainer}>
      <div className={classNames("container-desktop", classes.desktopSpace)}>
        <FormControl wide>
          <Heading className={classes.editorTitle} as="h2">
            {title}
          </Heading>
          <div className={classes.editorFields}>
            <InputField
              name="Title"
              type="Title"
              idLabel="Title"
              label="Title"
            />
            <InputField
              name="description"
              type="description"
              idLabel="description"
              label="Short description"
            />
            <Message idLabel="Message" label="Text" />
          </div>
        </FormControl>
      </div>
    </section>
  );
};

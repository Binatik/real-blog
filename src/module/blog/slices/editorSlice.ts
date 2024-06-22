import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type tag = {
  id: string;
};

type EditorState = {
  editor: {
    tags: tag[];
  };
};

const initialState: EditorState = {
  editor: {
    tags: [],
  },
};

const editorSlice = createSlice({
  name: "editorSlice",
  initialState,
  reducers: {
    addTags: (state) => {
      state.editor.tags.push({ id: self.crypto.randomUUID() });
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.editor.tags = state.editor.tags.filter(
        (tag) => tag.id !== action.payload,
      );
    },
  },
});

const editor = editorSlice.actions;

export { editor, editorSlice };

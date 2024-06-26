import { PostTopic } from "@api/api.types";
import { Api } from "@api/index";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new Api();

type PayloadCreatePost = {
  form: HTMLFormElement;
  token: string | undefined;
};

type tagsObject = {
  tagsObject: {
    tag: string;
    id: string;
  }[];
};

const initialState: PostTopic & tagsObject = {
  title: "",
  description: "",
  body: null,
  tagList: [],
  tagsObject: [],
};

const editorSlice = createSlice({
  name: "editorSlice",
  initialState,
  reducers: {
    addTags: (state) => {
      state.tagsObject.push({ tag: "", id: self.crypto.randomUUID() });
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.tagsObject = state.tagsObject.filter(
        (tag) => tag.id !== action.payload,
      );
    },
  },
});

export const createPost = createAsyncThunk(
  "editorSlice/createPost",
  async (payload: PayloadCreatePost) => {
    const { form, token } = payload;
    const formData = new FormData(form);

    const formFields = Object.fromEntries(formData.entries());

    const tmpData: PostTopic = {
      title: "",
      description: "",
      body: null,
      tagList: [],
    };

    for (const key in formFields) {
      if (key === "title") {
        tmpData.title = formFields[key] as string;
        continue;
      }

      if (key === "description") {
        tmpData.description = formFields[key] as string;
        continue;
      }

      if (key === "message") {
        tmpData.body = formFields[key] as string;
        continue;
      }

      tmpData.tagList = [...tmpData.tagList, formFields[key] as string];
    }

    const request = JSON.stringify({ article: tmpData });

    const result = await api.post<PostTopic>("/articles", {
      headers: {
        authorization: `Token ${token}`,
        "Content-type": "application/json",
      },
      body: request,
    });

    return result;
  },
);

const editor = editorSlice.actions;

export { editor, editorSlice };

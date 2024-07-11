import { PostTopic, RootTopic, TagList } from "@api/api.types";
import { Api, ApiError } from "@api/index";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { params } from "../update/Update";
import { EditorFieldKey } from "@src/app/enums/Field";

const api = new Api();

type PayloadUpdateTag = {
  id?: string;
  updateTag: string;
};

type PayloadTopic = {
  form?: HTMLFormElement;
  slug?: params["slug"];
  token: string | undefined;
};

type EditorState = {
  status: "pending" | "fulfilled" | "rejected" | null;
  loading: boolean;
  rejected: boolean;
  error: {
    message?: string;
  };

  tagList: TagList[];
  article?: PostTopic | null;
};

const initialState: EditorState = {
  status: null,
  loading: false,
  rejected: false,
  error: {
    message: "",
  },

  tagList: [],
  article: null,
};

const editorSlice = createSlice({
  name: "editorSlice",
  initialState,
  reducers: {
    updateTag: (state, action: PayloadAction<PayloadUpdateTag>) => {
      const { id, updateTag } = action.payload;
      state.tagList = state.tagList.map((item) => {
        if (item.id === id) {
          const newItem: TagList = {
            id: item.id,
            tag: updateTag,
          };
          return newItem;
        }
        return item;
      });
    },
    getTags: (state, action: PayloadAction<string[] | undefined>) => {
      if (action.payload) {
        state.tagList = action.payload
          .map((item) => ({ id: self.crypto.randomUUID(), tag: item }))
          .filter((item) => item.tag.trim() !== "");
      }
    },
    addTags: (state) => {
      state.tagList.push({ tag: "", id: self.crypto.randomUUID() });
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.tagList = state.tagList.filter((tag) => tag.id !== action.payload);
    },
    resetTags: (state) => {
      state.tagList = state.tagList = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.status = "pending";
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.rejected = false;
      state.loading = false;
      state.article = action.payload;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
      state.rejected = true;
      state.error.message = action.payload;
    });

    builder.addCase(updatePost.pending, (state) => {
      state.status = "pending";
      state.loading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.rejected = false;
      state.loading = false;
      state.article = action.payload;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.status = "rejected";
      state.loading = false;
      state.rejected = true;
      state.error.message = action.payload;
    });
  },
});

export const createPost = createAsyncThunk<
  PostTopic | undefined,
  PayloadTopic,
  { rejectValue: string }
>(
  "editorSlice/createPost",
  async (payload: PayloadTopic, { rejectWithValue }) => {
    const { form, token } = payload;
    const formData = new FormData(form);

    const title = formData.get(EditorFieldKey.title);
    const description = formData.get(EditorFieldKey.description);
    const message = formData.get(EditorFieldKey.message);
    const tagList: string[] = [];

    //Чистим все что бы оставить только теги.
    formData.delete(EditorFieldKey.title);
    formData.delete(EditorFieldKey.description);
    formData.delete(EditorFieldKey.message);

    const formFields = Object.fromEntries(formData.entries());

    for (const key in formFields) {
      tagList.push(formFields[key] as string);
    }

    const request = JSON.stringify({
      article: {
        title,
        description,
        body: message,
        tagList,
      },
    });

    try {
      await api.post<RootTopic>("/articles", {
        headers: {
          authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
        body: request,
      });

      return JSON.parse(request);
    } catch (error) {
      if (error instanceof ApiError) {
        const message = Object.values(error.body.errors)[0];
        return rejectWithValue(message);
      }
    }
  },
);

export const updatePost = createAsyncThunk<
  PostTopic | undefined,
  PayloadTopic,
  { rejectValue: string }
>(
  "editorSlice/updatePost",
  async (payload: PayloadTopic, { rejectWithValue }) => {
    const { form, token, slug } = payload;
    const formData = new FormData(form);

    const title = formData.get(EditorFieldKey.title);
    const description = formData.get(EditorFieldKey.description);
    const message = formData.get(EditorFieldKey.message);
    const tagList: string[] = [];

    //Чистим все что бы оставить только теги.
    formData.delete(EditorFieldKey.title);
    formData.delete(EditorFieldKey.description);
    formData.delete(EditorFieldKey.message);

    const formFields = Object.fromEntries(formData.entries());

    for (const key in formFields) {
      tagList.push(formFields[key] as string);
    }

    const request = JSON.stringify({
      article: {
        title,
        description,
        body: message,
        tagList,
      },
    });

    try {
      await api.put<RootTopic>(`/articles/${slug}`, {
        headers: {
          authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
        body: request,
      });

      return JSON.parse(request);
    } catch (error) {
      if (error instanceof ApiError) {
        const message = Object.values(error.body.errors)[0];
        return rejectWithValue(message);
      }
    }
  },
);

const editor = editorSlice.actions;

export { editor, editorSlice };

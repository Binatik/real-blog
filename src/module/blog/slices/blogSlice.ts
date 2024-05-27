import { Api, RootArticles, RootTopic } from "@api/index";
import { params } from "@page/CurrentTopic/CurrentTopic";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new Api();

type BlogState = {
  articles: RootArticles["articles"] | null;
  articlesCount: RootArticles["articlesCount"];
  topic: RootTopic["article"] | null;
  error: boolean;
};

const initialState: BlogState = {
  articles: null,
  articlesCount: 0,
  topic: null,
  error: false,
};

const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.articles = null;
      state.error = false;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.error = false;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    });
    builder.addCase(fetchArticles.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(fetchTopic.pending, (state) => {
      state.topic = null;
      state.error = false;
    });
    builder.addCase(fetchTopic.fulfilled, (state, action) => {
      state.error = false;
      state.topic = action.payload.article;
    });
    builder.addCase(fetchTopic.rejected, (state) => {
      state.error = true;
    });
  },
});

export const fetchArticles = createAsyncThunk(
  "blogSlice/fetchArticles",
  async (offset: number) => {
    const result = await api.get<RootArticles>(
      `/articles?offset=${offset}`,
      {},
    );

    return result;
  },
);

export const fetchTopic = createAsyncThunk<RootTopic, params["slug"]>(
  "blogSlice/fetchTopic",
  async (slug: params["slug"]) => {
    const result = await api.get<RootTopic>(`/articles/${slug}`, {});

    return result;
  },
);

const blog = blogSlice.actions;

export { blog, blogSlice };

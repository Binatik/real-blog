import { Api, RootArticles, RootTopic } from "@api/index";
import { params } from "@page/CurrentTopic/CurrentTopic";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new Api();

type PayloadArticles = {
  token: string | undefined;
  offset: number;
};

type PayloadTopic = {
  token: string | undefined;
  path: params["slug"];
};

type PayloadReaction = {
  slug: params["slug"];
  token: string | undefined;
};

type PayloadDeleteTopic = {
  slug: params["slug"];
  token: string | undefined;
};

type PostsState = {
  articles: RootArticles["articles"] | null;
  articlesCount: RootArticles["articlesCount"];
  topic: RootTopic["article"] | null;
  isExpandedArticle: boolean;
  error: boolean;
};

const initialState: PostsState = {
  articles: null,
  articlesCount: 0,
  topic: null,
  isExpandedArticle: false,
  error: false,
};

const postsSlice = createSlice({
  name: "postsSlice",
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
      state.isExpandedArticle = false;
      state.topic = null;
      state.error = false;
    });
    builder.addCase(fetchTopic.fulfilled, (state, action) => {
      state.isExpandedArticle = true;
      state.error = false;
      state.topic = action.payload.article;
    });
    builder.addCase(fetchTopic.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(fetchSetReaction.pending, (state) => {
      state.error = false;
    });
    builder.addCase(fetchSetReaction.fulfilled, (state, action) => {
      state.error = false;
      state.topic = action.payload.article;

      state.articles = state.articles?.map((article) => {
        if (article.slug === action.payload.article?.slug) {
          return action.payload.article;
        }

        return article;
      });
    });
    builder.addCase(fetchSetReaction.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(fetchDeleteReaction.pending, (state) => {
      state.error = false;
    });

    builder.addCase(fetchDeleteReaction.fulfilled, (state, action) => {
      state.error = false;
      state.topic = action.payload.article;

      state.articles = state.articles?.map((article) => {
        if (article.slug === action.payload.article?.slug) {
          return action.payload.article;
        }

        return article;
      });
    });

    builder.addCase(fetchDeleteReaction.rejected, (state) => {
      state.error = true;
    });
  },
});

export const fetchArticles = createAsyncThunk(
  "postsSlice/fetchArticles",
  async (payload: PayloadArticles) => {
    const { offset, token } = payload;
    const result = await api.get<RootArticles>(`/articles?offset=${offset}`, {
      headers: {
        authorization: `Token ${token}`,
      },
    });

    return result;
  },
);

export const fetchTopic = createAsyncThunk(
  "postsSlice/fetchTopic",
  async (payload: PayloadTopic) => {
    const { path, token } = payload;

    const result = await api.get<RootTopic>(`/articles/${path}`, {
      headers: {
        authorization: `Token ${token}`,
      },
    });

    return result;
  },
);

export const fetchSetReaction = createAsyncThunk(
  "postsSlice/fetchSetReaction",
  async (payload: PayloadReaction) => {
    const { slug, token } = payload;
    const result = await api.post<RootTopic>(`/articles/${slug}/favorite`, {
      headers: {
        authorization: `Token ${token}`,
      },
    });

    return result;
  },
);

export const fetchDeleteReaction = createAsyncThunk(
  "postsSlice/fetchDeleteReaction",
  async (payload: PayloadReaction) => {
    const { slug, token } = payload;
    const result = await api.delete<RootTopic>(`/articles/${slug}/favorite`, {
      headers: {
        authorization: `Token ${token}`,
      },
    });

    return result;
  },
);

export const fetchDeleteTopic = createAsyncThunk(
  "postsSlice/deleteTopic",
  async (payload: PayloadDeleteTopic) => {
    const { slug, token } = payload;
    const result = await api.delete(`/articles/${slug}`, {
      headers: {
        authorization: `Token ${token}`,
      },
    });

    return result;
  },
);

const posts = postsSlice.actions;

export { posts, postsSlice };

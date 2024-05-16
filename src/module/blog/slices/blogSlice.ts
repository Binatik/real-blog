import { Api, RootArticles } from "@api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = new Api();

type BlogState = {
  articles: RootArticles["articles"] | null;
  articlesCount: RootArticles["articlesCount"];
  error: boolean;
};

const initialState: BlogState = {
  articles: null,
  articlesCount: 0,
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

const blog = blogSlice.actions;

export { blog, blogSlice };

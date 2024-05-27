export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type Profile = {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: null | string;
  };
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
};
export type Author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type RootArticles = {
  articles?: Article[] | null;
  articlesCount: number;
};

export type RootTopic = {
  article?: Article;
};

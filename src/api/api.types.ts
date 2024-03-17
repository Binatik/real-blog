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

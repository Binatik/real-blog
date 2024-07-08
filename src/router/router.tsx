import { Login } from "@page/Login/Login";
import { Register } from "@page/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import { Layout } from "@layout/Layout";
import { Home } from "@page/Home/Home";
import { Feed } from "@page/Feed/Feed";
import { UpdateProfile } from "@module/updateProfile/UpdateProfile";
import { CurrentTopic } from "@page/CurrentTopic/CurrentTopic";
import { CreateTopic } from "@page/CreateTopic/CreateTopic";
import { UpdateTopic } from "@page/UpdateTopic/UpdateTopic";

const ghostRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <ProtectedRoute to="/" protectedRole="ghost" />,
        children: [
          {
            path: "/:pageCount",
            element: <Home />,
          },
          {
            path: "sign-up",
            element: <Register />,
          },
          {
            path: "sign-in",
            element: <Login />,
          },
          {
            path: "/:pageCount/:slug",
            element: <CurrentTopic />,
          },
        ],
      },
      {
        //приватные children если ghostRouter но не clientRouter
        element: <ProtectedRoute to="/" protectedRole="private" />,
        children: [
          {
            path: "user",
            element: <Feed />,
          },
          {
            path: "user/create",
            element: <CreateTopic />,
          },
          {
            path: "user/:pageCount/updateTopic/:slug",
            element: <UpdateTopic />,
          },
          {
            path: "user/profile",
            element: <UpdateProfile />,
          },
          {
            path: "user/:pageCount",
            element: <CurrentTopic />,
          },
          {
            path: "user/:pageCount/:slug",
            element: <CurrentTopic />,
          },
        ],
      },
    ],
  },
]);

const clientRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        element: <ProtectedRoute to="/" protectedRole="client" />,
        children: [
          {
            path: "user",
            element: <Feed />,
          },
          {
            path: "user/:pageCount",
            element: <Feed />,
          },
          {
            path: "user/profile",
            element: <UpdateProfile />,
          },
          {
            path: "user/:pageCount/:slug",
            element: <CurrentTopic />,
          },
          {
            path: "user/create",
            element: <CreateTopic />,
          },
          {
            path: "user/:pageCount/updateTopic/:slug",
            element: <UpdateTopic />,
          },
        ],
      },
      {
        //приватные children если clientRouter но не ghostRouter
        element: <ProtectedRoute to="/" protectedRole="private" />,
        children: [
          {
            path: "sign-up",
            element: <Register />,
          },
          {
            path: "sign-in",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export { clientRouter, ghostRouter };

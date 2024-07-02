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

const router = createBrowserRouter([
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
        element: <ProtectedRoute to="/" protectedRole="client" />,
        children: [
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
            path: "user/updateTopic/:slug",
            element: <UpdateTopic />,
          },
        ],
      },
    ],
  },
]);

export { router };

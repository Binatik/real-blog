import { Login } from "@page/Login/Login";
import { Register } from "@page/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import { Layout } from "@layout/Layout";
import { Home } from "@page/Home/Home";
import { Feed } from "@page/Feed/Feed";
import { UpdateProfile } from "@module/updateProfile/UpdateProfile";

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
            path: "sign-up",
            element: <Register />,
          },
          {
            path: "sign-in",
            element: <Login />,
          },
        ],
      },
      {
        element: <ProtectedRoute to="/" protectedRole="client" />,
        children: [
          {
            path: "user",
            element: <Feed />,
          },
          {
            path: "user/profile",
            element: <UpdateProfile />,
          },
        ],
      },
    ],
  },
]);

export { router };

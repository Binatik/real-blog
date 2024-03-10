import { Login } from "@page/Login/Login";
import { Register } from "@page/Register/Register";
import { Root } from "@page/Root/Root";
import { createBrowserRouter } from "react-router-dom";
import { RedirectAuth } from "./RedirectAuth.tsx/RedirectAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/sign-up",
    element: (
      <RedirectAuth to="/">
        <Register />
      </RedirectAuth>
    ),
  },

  {
    path: "/sign-in",
    element: (
      <RedirectAuth to="/">
        <Login />
      </RedirectAuth>
    ),
  },
]);

export { router };

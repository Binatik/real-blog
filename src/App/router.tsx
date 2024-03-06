import { Login } from "@page/Login/Login";
import { Register } from "@page/Register/Register";
import { Root } from "@page/Root/Root";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "sign-up",
    element: <Register />,
  },

  {
    path: "sign-in",
    element: <Login />,
  },
]);

export { router };

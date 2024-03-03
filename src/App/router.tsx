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
]);

export { router };

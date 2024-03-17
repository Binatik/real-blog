import { RouterProvider } from "react-router-dom";
import { router } from "@src/router/router";
import { Provider } from "react-redux";
import { storeProfile } from "./store/profile/store";
import "normalize.css";
import "./global.scss";

const App = () => {
  return (
    <Provider store={storeProfile}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;

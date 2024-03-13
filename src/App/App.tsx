import { RouterProvider } from "react-router-dom";
import { router } from "@src/router/router";
import { Provider } from "react-redux";
import { storeAuth } from "./store/redux/store";
import "normalize.css";
import "./global.scss";

const App = () => {
  return (
    <Provider store={storeAuth}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;

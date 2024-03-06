import { Provider } from "react-redux";
import { storeAuth } from "./store/redux/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
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

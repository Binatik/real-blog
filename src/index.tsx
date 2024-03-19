import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { storeProfile } from "./app/store/profile/store";
import { App } from "./app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={storeProfile}>
    <App />
  </Provider>,
);

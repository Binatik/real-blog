import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { Provider } from "react-redux";
import { storeAuth } from "./app/store/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={storeAuth}>
      <App />
    </Provider>
  </React.StrictMode>,
);

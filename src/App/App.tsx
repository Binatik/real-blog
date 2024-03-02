import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { storeAuth } from "./store/redux/store";
import Layout from "../layout/Layout";
import "normalize.css";
import "./Global.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={storeAuth}>
        <Layout>
          <div></div>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;

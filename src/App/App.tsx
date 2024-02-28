import "normalize.css";
import "./Global.scss";
import { BrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <div>Content</div>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

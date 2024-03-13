import { Header } from "./header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
};

export { Layout };

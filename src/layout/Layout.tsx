import React from "react";
import { Header } from "./header/Header";

type ILayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
};

export default Layout;

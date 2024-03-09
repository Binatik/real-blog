import React from "react";
import { Header } from "./header/Header";
import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";
import classNames from "classnames";

type ILayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ILayoutProps) => {
  const loading = useAuthSelector((state) => state.authSlice.loading);
  return (
    <>
      <div
        className={classNames({
          ["loading-page"]: loading,
        })}
      >
        <Header></Header>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;

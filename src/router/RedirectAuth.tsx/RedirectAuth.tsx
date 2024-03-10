import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";
import { ReactNode } from "react";
import { Navigate, NavigateProps } from "react-router-dom";

type RedirectAuthProps = {
  children: ReactNode;
} & NavigateProps;

function RedirectAuth({ children, ...props }: RedirectAuthProps) {
  const isAuth = useAuthSelector((state) => state.authSlice.isAuth);
  return !isAuth ? children : <Navigate {...props} />;
}

export { RedirectAuth };

import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuth = useAuthSelector((state) => state.authSlice.isAuth);

  return isAuth ? children : <Navigate to="/sign-in" />;
}

export { PrivateRoute };

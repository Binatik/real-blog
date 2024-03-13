import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";
import { Navigate, NavigateProps, Outlet } from "react-router-dom";
import { CookieKey } from "@src/app/enums/Cookies";
import Cookies from "js-cookie";

type ProtectedRouteProps = {
  protectedRole: "ghost" | "client";
} & NavigateProps;

function ProtectedRoute({ protectedRole, ...props }: ProtectedRouteProps) {
  const token = Cookies.get(CookieKey.token);
  const loading = useAuthSelector((state) => state.authSlice.loading);
  const role = useAuthSelector((state) => state.authSlice.role);

  if (!loading && token) {
    return;
  }

  // role === 'ghost' && token проверяет что пользователь был уже авторизован за счет токена.

  const canGuestVisit = !!(role === protectedRole && !token);
  const canUserVisit = !!(
    (role === protectedRole && token) ||
    (role === "ghost" && token)
  );

  console.log("изменение состояние за счет того что меняется loading");

  if ((!canUserVisit && token) || (!canGuestVisit && !token)) {
    return <Navigate {...props} replace />;
  }

  return <Outlet />;
}

export { ProtectedRoute };

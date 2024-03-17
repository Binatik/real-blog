import { useProfileSelector } from "@src/app/store/profile/hooks/useProfileSelector";
import { Navigate, NavigateProps, Outlet } from "react-router-dom";
import { CookieKey } from "@src/app/enums/Cookies";
import Cookies from "js-cookie";

type ProtectedRouteProps = {
  protectedRole: "ghost" | "client";
} & NavigateProps;

function ProtectedRoute({ protectedRole, ...props }: ProtectedRouteProps) {
  const token = Cookies.get(CookieKey.token);

  const status = useProfileSelector((state) => state.profileSlice.status);
  const role = useProfileSelector((state) => state.profileSlice.role);

  if (status === "pending") {
    return;
  }

  // role === 'ghost' && token проверяет что пользователь был уже авторизован за счет токена.

  const canGuestVisit = Boolean(role === protectedRole && !token);
  const canUserVisit = Boolean(
    (role === protectedRole && token) || (role === "ghost" && token),
  );

  if ((!canUserVisit && token) || (!canGuestVisit && !token)) {
    return <Navigate {...props} replace />;
  }

  return <Outlet />;
}

export { ProtectedRoute };

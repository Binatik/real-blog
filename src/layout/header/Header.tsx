import { Auth } from "@module/index";
import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";
import { RouterLink } from "@ui/index";

function Header() {
  const isAuthorized = useAuthSelector((state) => state.authSlice.isAuthorized);

  return (
    <header>
      <div className="container-desktop header-container">
        <RouterLink to={isAuthorized ? "/user" : "/"}>Real World</RouterLink>
        <Auth />
      </div>
    </header>
  );
}

export { Header };

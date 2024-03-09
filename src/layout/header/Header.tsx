import { Auth } from "@module/index";
import { useAuthSelector } from "@src/app/store/hooks/useAuthSelector";
import { RouterLink } from "@ui/index";

function Header() {
  const loading = useAuthSelector((state) => state.authSlice.loading);
  return (
    <header hidden={loading}>
      <div className="container-desktop header-container">
        <RouterLink to="/">Real World</RouterLink>
        <Auth />
      </div>
    </header>
  );
}

export { Header };

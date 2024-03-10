import { Auth } from "@module/index";
import { RouterLink } from "@ui/index";

function Header() {
  return (
    <header>
      <div className="container-desktop header-container">
        <RouterLink to="/">Real World</RouterLink>
        <Auth />
      </div>
    </header>
  );
}

export { Header };

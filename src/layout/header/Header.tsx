import { Auth } from "@module/index";
import { RouterLink } from "@ui/index";

function Header() {
  return (
    <header>
      <div className="container-desktop">
        <div className="header-container">
          <RouterLink to="/test">Realworld Blog</RouterLink>
          <Auth />
        </div>
      </div>
    </header>
  );
}

export { Header };

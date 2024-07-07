import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Blog } from "@module/blog/Blog";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);

    if (token) {
      navigate("/user");
    }
  }, [navigate]);

  // const navItemActive = 1
  return (
    <div className="container-mini-desktop">
      <Blog />
    </div>
  );
}

export { Home };

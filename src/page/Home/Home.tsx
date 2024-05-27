import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Text } from "@ui/index";
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
      <Text style={{ paddingInline: "12px" }} as="span" mode="danger">
        You are not logged in, please log in!
      </Text>
      <Blog />
    </div>
  );
}

export { Home };

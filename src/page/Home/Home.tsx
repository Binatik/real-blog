import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);

    if (token) {
      navigate("/user");
    }
  }, [navigate]);

  return <div>Home</div>;
}

export { Home };

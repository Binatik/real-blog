import Cookies from "js-cookie";
import { CookieKey } from "@src/app/enums/Cookies";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type CatalogDataType = {
  id: string;
  title: string;
  subtitles: [];
  searchUid: string;
  url: string;
  imageUrl: string;
  imageMenuUrl: string | null;
  count: number;
  childs: CatalogDataType[] | null;
  onlyVirtualChildren: boolean | null;
};

const catalogData: CatalogDataType[] = [
  {
    id: "111",
    title: "11111",
    subtitles: [],
    searchUid: "",
    url: "",
    imageUrl: "",
    imageMenuUrl: "",
    count: 1,
    onlyVirtualChildren: true,
    childs: [
      {
        id: "1111",
        title: "11111",
        subtitles: [],
        searchUid: "",
        url: "",
        imageUrl: "",
        imageMenuUrl: "",
        count: 1,
        onlyVirtualChildren: true,
        childs: null,
      },
    ],
  },
];

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get(CookieKey.token);

    if (token) {
      navigate("/user");
    }
  }, [navigate]);

  // const navItemActive = 1
  const renderCardProducts = (data: CatalogDataType[]) => {
    if (!data) {
      return null;
    }

    return data.map((item) => (
      <span key={item.id}>
        {item.title}
        {Array.isArray(item.childs) && renderCardProducts(item.childs)}
      </span>
    ));
  };

  return <div>{renderCardProducts(catalogData)}</div>;
}

export { Home };

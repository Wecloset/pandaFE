import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { apiGet } from "../utils/request";
import { ProductData, UserData } from "../types/data-type";
import { useSession } from "next-auth/react";

const useKeyword = ({
  userData,
}: {
  userData?: { message: string; user: UserData };
}) => {
  const { status: session } = useSession();

  const { data: products, status } = useQuery<ProductData[]>({
    queryKey: ["products"],
    queryFn: apiGet.GET_ITEMS,
  });

  const [clickedKeyword, setClickedKeyword] = useState<string>("");
  const [keywordItemList, setKeywordItemList] = useState<{
    [key: string]: ProductData[];
  }>({});

  const setKeyword = (tagName: string) => setClickedKeyword(tagName);

  const setKeywordItems = (
    keywords: { id: number; tag: string }[],
    products: ProductData[],
  ) => {
    if (keywords.length === 0) return;

    const mappingItems = (tag: string) => {
      return products.filter(product => product.style === tag);
    };

    const keywordItems: { [key: string]: ProductData[] } = {};
    keywords.forEach(({ tag }) => {
      keywordItems[tag] = mappingItems(tag);
    });

    setKeywordItemList(keywordItems);
  };

  useEffect(() => {
    if (!userData || status !== "success") return;

    setKeyword(userData.user.keywords[0]?.tag);
    setKeywordItems(userData.user.keywords, products);
  }, [userData, status]);

  useEffect(() => {
    if (session === "unauthenticated" && status === "success") {
      setKeywordItemList({ 추천아이템: products });
    }
  }, [session, status]);

  return {
    clickedKeyword,
    keywordItemList,
    setKeyword,
  };
};

export default useKeyword;

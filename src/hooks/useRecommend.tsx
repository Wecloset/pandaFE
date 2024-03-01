import { useEffect, useState } from "react";
import { ProductData } from "../types/data-type";
import { random } from "../utils/random";
import { useSession } from "next-auth/react";

const useRecommend = ({ keyword }: { keyword: string }) => {
  const { status: session } = useSession();

  const [randomItems, setRandomItems] = useState<{
    [key: string]: ProductData[]; // 랜덤하게 뽑은 아이템 리스트 (모든 키워드에 해당하는)
  }>({});
  const [recommendList, setRecommendList] = useState<ProductData[]>([]); // 선택한 키워드에 해당하는 아이템 리스트

  const setRecommendItems = (keywordItemList: {
    [key: string]: ProductData[];
  }) => {
    const randomItems: { [key: string]: ProductData[] } = {};
    Object.entries(keywordItemList).forEach(([key, value]) => {
      randomItems[key] = random(value);
    });

    setRandomItems(randomItems);
  };

  useEffect(() => {
    if (session === "unauthenticated") {
      setRecommendList(randomItems["추천아이템"]);
      return;
    }
    setRecommendList(randomItems[keyword]);
  }, [randomItems]);

  return {
    recommendList,
    setRecommendItems,
  };
};

export default useRecommend;

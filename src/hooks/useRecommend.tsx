import { useState } from "react";

import { random } from "../utils/random";
import { ProductData } from "../types/data-type";

const useRecommend = () => {
  const [keywords, setKeywords] = useState<{ id: number; tag: string }[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [keywordItems, setKeywordItems] = useState<{
    [key: string]: ProductData[];
  }>({});
  const [recommendList, setRecommendList] = useState<{
    [key: string]: ProductData[];
  }>({});

  const refresh = () => {
    const key = keyword !== "" ? keyword : "추천아이템";
    const newRandomItems = random(keywordItems[key]);
    setRecommendList((prev: { [key: string]: ProductData[] }) => ({
      ...prev,
      [key]: newRandomItems,
    }));
  };

  return {
    keyword,
    keywords,
    recommendList,
    setKeyword,
    setKeywords,
    setKeywordItems,
    setRecommendList,
    refresh,
  };
};

export default useRecommend;

import { useEffect, useState } from "react";

import { random } from "../utils/random";
import { ProductData, UserData } from "../types/data-type";

const useRecommend = ({
  userData,
}: {
  userData?: { message: string; user: UserData };
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [keywords, setKeywords] = useState<{ id: number; tag: string }[]>([]);
  const [keywordItems, setKeywordItems] = useState<{
    [key: string]: ProductData[];
  }>({});
  const [recommendList, setRecommendList] = useState<{
    [key: string]: ProductData[];
  }>({});

  const setKeywordHandler = (tagName: string) => setKeyword(tagName);

  const setKeywordItemsHandler = (items: { [key: string]: ProductData[] }) =>
    setKeywordItems(items);

  const setRecommendHandler = (list: { [key: string]: ProductData[] }) =>
    setRecommendList(list);

  const refreshKeywords = () => {
    const key = keyword !== "" ? keyword : "추천아이템";
    const newRandomItems = random(keywordItems[key]);
    setRecommendList((prev: { [key: string]: ProductData[] }) => ({
      ...prev,
      [key]: newRandomItems,
    }));
  };

  useEffect(() => {
    if (!userData) return;

    const { user } = userData;
    setKeyword(user.keywords[0]?.tag);
    setKeywords(user.keywords);
  }, [userData]);

  return {
    keyword,
    keywords,
    recommendList,
    setKeyword: setKeywordHandler,
    setKeywordItems: setKeywordItemsHandler,
    setRecommendList: setRecommendHandler,
    refreshKeywords,
  };
};

export default useRecommend;

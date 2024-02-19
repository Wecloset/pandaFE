import { useEffect, useState } from "react";

import { random } from "../utils/random";
import { ProductData, UserData } from "../types/data-type";

const useRecommend = (user: { userState: string; userData: UserData }) => {
  const { userState, userData } = user;

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
    if (userState !== "hasValue" || !userData) return;

    setKeyword(userData.keywords[0]?.tag);
    setKeywords(userData.keywords);
  }, [userState]);

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

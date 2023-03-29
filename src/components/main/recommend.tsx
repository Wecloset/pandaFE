import { Icon } from "@iconify/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";
import { ProductData } from "../../types/data-type";
import { cls } from "../../utils/class";
import MainProduct from "./product-item";
import RecommendSkeleton from "../ui/recommend-skeleton";

interface RecommendProps {
  keywords?: { id: number; tag: string }[];
  nickname?: string;
  productsData: ProductData[];
}

interface Recommends {
  [key: string]: ProductData[];
}

const RecommendList: NextPage<RecommendProps> = ({ productsData }) => {
  const userData = useRecoilValueLoadable(currentUserInfoQuery);
  const { state, contents: userContents } = userData;

  const initialArray = ["1", "2", "3", "4"];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keywords, setKeywords] = useState<{ id: number; tag: string }[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [keywordItems, setKeywordItems] = useState<Recommends>({});
  const [recommendList, setRecommendList] = useState<Recommends>({});

  const random = (productData: ProductData[]) => {
    const items = productData.slice();
    const itemList = [];
    const LIMIT = 4;
    let randomIdx, randomItem;
    for (let i = 0; i < LIMIT; i++) {
      randomIdx = Math.floor(Math.random() * items.length);
      randomItem = items.splice(randomIdx, 1);
      itemList.push(...randomItem);
    }
    return itemList;
  };

  const setRecommends = (products: ProductData[]) => {
    const recommends: Recommends = {};
    const randoms: Recommends = {};

    if (userContents.keywords.length > 0)
      userContents.keywords.forEach(({ tag }: { tag: string }) => {
        const recommendItems = products.filter(
          product => product.style === tag,
        );
        recommends[tag] = recommendItems;
      });

    setKeywordItems(recommends);

    Object.entries(recommends).forEach(
      ([key, value]: [key: string, value: ProductData[]]) => {
        const randomItems = random(value);
        randoms[key] = randomItems;
      },
    );

    setRecommendList(randoms);
  };

  const clickKeyword = (tagName: string) => {
    setKeyword(tagName);
  };

  const refresh = () => {
    const key = keyword !== "" ? keyword : "추천아이템";
    const newRandomItems = random(keywordItems[key]);
    setRecommendList((prev: Recommends) => ({
      ...prev,
      [key]: newRandomItems,
    }));
  };

  const setContents = (products: ProductData[]) => {
    if (!userContents) {
      const randomList = random(products);
      setKeywordItems({ 추천아이템: products });
      setRecommendList({ 추천아이템: randomList });
    } else {
      setRecommends(products);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!userContents || Object.entries(userContents).length === 0) return;

    const { keywords, nickname } = userContents;
    setKeyword(keywords[0].tag);
    setKeywords(keywords);
    setNickname(nickname);
  }, [state]);

  useEffect(() => {
    if (productsData?.length > 0 && state !== "loading")
      setContents(productsData);
  }, [productsData, state]);

  let content, recommendTitle, buttonText;

  if (keyword && recommendList[keyword]?.length > 0)
    content = recommendList[keyword];
  else content = recommendList["추천아이템"];

  if (keyword && nickname)
    recommendTitle = `${nickname}님의 키워드에 적합한 아이템`;
  else recommendTitle = "지금 핫한 아이템";

  if (keyword !== "") buttonText = `${keyword} 아이템`;
  else buttonText = "추천 아이템";

  return (
    <div className="space-y-5 px-5">
      <div>
        <h2 className="text-xl">Style for You</h2>
        <p className="mt-1 text-textColor-gray-100">{recommendTitle}</p>
      </div>
      {keywords.length > 0 && (
        <div className="flex w-full items-center gap-[6px] overflow-hidden overflow-x-scroll font-bold text-common-gray scrollbar-hide">
          {keywords.map(({ tag, id }: { tag: string; id: number }) => (
            <button
              key={id}
              className={cls(
                "h-9 rounded-lg border-2 px-3",
                keyword === tag
                  ? "border-common-black bg-common-black text-white"
                  : "border-common-gray",
              )}
              onClick={() => clickKeyword(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      {isLoading && (
        <div className="grid min-h-[540px] grid-cols-2 gap-3 bg-white">
          {initialArray.map((_, i) => (
            <RecommendSkeleton key={i} />
          ))}
        </div>
      )}
      {!isLoading && content && (
        <div className="grid min-h-[540px] grid-cols-2 gap-3">
          {content?.map(data => (
            <MainProduct {...data} key={data.id} imgh="h-[190px]" />
          ))}
        </div>
      )}
      <button
        className="flex h-10 w-full items-center justify-center border-2 border-textColor-gray-50"
        onClick={refresh}
      >
        <Icon icon="ic:baseline-refresh" className="mr-1 -mt-1 text-lg" />
        {buttonText}
      </button>
    </div>
  );
};

export default RecommendList;

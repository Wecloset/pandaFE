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
      // console.log(userContents);
      setRecommends(products);
    }
    setIsLoading(false);
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

  useEffect(() => {
    if (!userContents || Object.entries(userContents).length === 0) return;
    const { keywords, nickname } = userContents;
    setKeyword(keywords[0]?.tag);
    setKeywords(keywords);
    setNickname(nickname);
  }, [state]);

  useEffect(() => {
    if (productsData?.length > 0 && state === "hasValue")
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
        <div className="flex h-11 w-full items-center gap-2 overflow-hidden overflow-x-scroll font-bold text-common-gray scrollbar-hide">
          {keywords.map(({ tag, id }: { tag: string; id: number }) => (
            <div key={id} className="relative h-9 min-w-[65px] rounded-lg px-3">
              <button
                className={cls(
                  "absolute top-0 left-0 z-10 h-full w-full rounded-lg border border-common-black",
                  keyword === tag
                    ? "border-common-black bg-common-black text-white"
                    : "border-common-black bg-white",
                )}
                onClick={() => clickKeyword(tag)}
              >
                {tag}
              </button>
              <span className="absolute top-[2px] left-[2px] h-full w-full rounded-lg bg-common-black" />
            </div>
          ))}
        </div>
      )}
      {!isLoading && content ? (
        <div className="grid min-h-[540px] grid-cols-2 gap-3">
          {content?.map(data => (
            <MainProduct {...data} key={data.id} imgh="h-[190px]" />
          ))}
        </div>
      ) : (
        <div className="grid min-h-[540px] grid-cols-2 gap-3 bg-white">
          {initialArray.map((_, i) => (
            <RecommendSkeleton key={i} />
          ))}
        </div>
      )}
      <div className="relative h-10">
        <button
          className="absolute top-0 left-0 z-10 flex h-10 w-full items-center justify-center border border-black bg-white"
          onClick={refresh}
        >
          <Icon icon="ic:baseline-refresh" className="mr-1 -mt-1 text-lg" />
          {buttonText}
        </button>
        <span className="absolute top-1 left-1 h-full w-full bg-common-black" />
        <span className="absolute top-[2px] -right-[4px] h-[3px] w-[6px] rotate-45 bg-common-black" />
        <span className="absolute -bottom-[2px] left-0 h-[3px] w-[6px] rotate-45 bg-common-black" />
      </div>
    </div>
  );
};

export default RecommendList;

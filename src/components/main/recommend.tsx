import { Icon } from "@iconify/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";
import { ProductData, UserData } from "../../types/data-type";
import { cls } from "../../utils/class";
import RecommendList from "./recommend-list";
import { random } from "../../utils/random";
import NextSuspense from "../../hooks/suspense";
import RecommendSkeleton from "../ui/recommend-skeleton";

interface Recommends {
  [key: string]: ProductData[];
}

const Recommend: NextPage = () => {
  const { state: userState, contents: userData } =
    useRecoilValueLoadable<UserData>(currentUserInfoQuery);

  const [keywords, setKeywords] = useState<{ id: number; tag: string }[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [keywordItems, setKeywordItems] = useState<Recommends>({});
  const [recommendList, setRecommendList] = useState<Recommends>({});

  const refresh = () => {
    const key = keyword !== "" ? keyword : "추천아이템";
    const newRandomItems = random(keywordItems[key]);
    setRecommendList((prev: Recommends) => ({
      ...prev,
      [key]: newRandomItems,
    }));
  };

  const clickKeyword = (tagName: string) => setKeyword(tagName);

  const setKeywordHandler = (items: Recommends) => setKeywordItems(items);

  const setRecommendHandler = (list: Recommends) => setRecommendList(list);

  useEffect(() => {
    if (userState !== "hasValue" || !userData) return;
    const { keywords, nickname } = userData;
    setKeyword(keywords[0]?.tag);
    setKeywords(keywords);
    setNickname(nickname);
  }, [userState]);

  const content =
    keyword && recommendList[keyword]?.length > 0
      ? recommendList[keyword]
      : recommendList["추천아이템"];

  const recommendTitle = nickname
    ? `${nickname}님의 키워드에 적합한 아이템`
    : "지금 핫한 아이템";

  const buttonText = keyword !== "" ? `${keyword} 아이템` : "추천 아이템";

  const loadingfallback = (
    <div className="grid min-h-[540px] grid-cols-2 gap-3 transition">
      {Array(4)
        .fill("")
        .map((_, i) => (
          <RecommendSkeleton key={i} />
        ))}
    </div>
  );

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
      <NextSuspense fallback={loadingfallback}>
        <RecommendList
          content={content}
          onSetKeywords={setKeywordHandler}
          onSetRecommends={setRecommendHandler}
        />
      </NextSuspense>
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

export default Recommend;

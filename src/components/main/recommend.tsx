import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { useRecoilValueLoadable } from "recoil";

import RecommendList from "./recommend-list";
import RecommendSkeleton from "../ui/recommend-skeleton";

import NextSuspense from "../../hooks/suspense";
import { currentUserInfoQuery } from "../../recoil/user";
import { ProductData, UserData } from "../../types/data-type";
import Keywords from "./keywords";
import useRecommend from "../../hooks/useRecommend";

const Recommend: NextPage = () => {
  const { state: userState, contents: userData } =
    useRecoilValueLoadable<UserData>(currentUserInfoQuery);

  const [nickname, setNickname] = useState<string>("");

  const {
    keyword,
    keywords,
    recommendList,
    setKeyword,
    setKeywordItems,
    setRecommendList,
    setKeywords,
    refresh,
  } = useRecommend();

  const clickKeywordHandler = (tagName: string) => setKeyword(tagName);

  const setKeywordHandler = (items: { [key: string]: ProductData[] }) =>
    setKeywordItems(items);

  const setRecommendHandler = (list: { [key: string]: ProductData[] }) =>
    setRecommendList(list);

  useEffect(() => {
    if (userState !== "hasValue" || !userData) return;
    const { keywords, nickname } = userData;
    setKeyword(keywords[0]?.tag);
    setKeywords(keywords);
    setNickname(nickname);
  }, [userState]);

  const recommendContents =
    keyword && recommendList[keyword]?.length > 0
      ? recommendList[keyword]
      : recommendList["추천아이템"];

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
        <p className="mt-1 text-textColor-gray-100">
          {nickname
            ? `${nickname}님의 키워드에 적합한 아이템`
            : "지금 핫한 아이템"}
        </p>
      </div>
      {keywords.length > 0 && (
        <Keywords
          keywords={keywords}
          keyword={keyword}
          onClickKeyword={clickKeywordHandler}
        />
      )}
      <NextSuspense fallback={loadingfallback}>
        <RecommendList
          content={recommendContents}
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
          {keyword !== "" ? `${keyword} 아이템` : "추천 아이템"}
        </button>
        <span className="absolute top-1 left-1 h-full w-full bg-common-black" />
        <span className="absolute top-[2px] -right-[4px] h-[3px] w-[6px] rotate-45 bg-common-black" />
        <span className="absolute -bottom-[2px] left-0 h-[3px] w-[6px] rotate-45 bg-common-black" />
      </div>
    </div>
  );
};

export default Recommend;

import { NextPage } from "next";
import React, { useEffect } from "react";

import { useMutation } from "react-query";

import RecommendList from "./recommend-list";
import RecommendSkeleton from "./recommend-skeleton";
import Keywords from "./keywords";

import useRecommend from "../../hooks/useRecommend";
import NextSuspense from "../../hooks/suspense";
import { apiGet } from "../../utils/request";
import RecommendButton from "./recommend-button";

const Recommend: NextPage<{ email?: string }> = ({ email }) => {
  const { data: userData, mutate } = useMutation({
    mutationFn: (key: string) => apiGet.GET_USER(key),
  });

  const {
    keyword,
    keywords,
    recommendList,
    setKeyword,
    setKeywordItems,
    setRecommendList,
    refreshKeywords,
  } = useRecommend({ userData });

  useEffect(() => {
    if (!email) return;
    mutate(email);
  }, [email]);

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
          {userData
            ? `${userData.user.nickname}님의 키워드에 적합한 아이템`
            : "지금 핫한 아이템"}
        </p>
      </div>
      {keywords.length > 0 && (
        <Keywords
          keywords={keywords}
          keyword={keyword}
          onClickKeyword={setKeyword}
        />
      )}
      <NextSuspense fallback={loadingfallback}>
        <RecommendList
          content={recommendContents}
          onSetKeywords={setKeywordItems}
          onSetRecommends={setRecommendList}
        />
      </NextSuspense>
      {recommendContents && (
        <RecommendButton refresh={refreshKeywords} keyword={keyword} />
      )}
    </div>
  );
};

export default Recommend;

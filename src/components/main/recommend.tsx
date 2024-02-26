import { NextPage } from "next";
import React, { useEffect } from "react";

import { useMutation } from "react-query";

import RecommendList from "./recommend-list";
import Keywords from "./keywords";
import LoadingFallback from "./ui/loading-fallback";

import NextSuspense from "../../hooks/suspense";
import useKeyword from "../../hooks/useKeyword";
import { apiGet } from "../../utils/request";

const Recommend: NextPage<{ email?: string }> = ({ email }) => {
  const {
    data: userData,
    mutate,
    status,
  } = useMutation({
    mutationFn: (key: string) => apiGet.GET_USER(key),
  });

  const { clickedKeyword, keywordItemList, setKeyword } = useKeyword({
    userData,
  });

  useEffect(() => {
    if (!email) return;
    mutate(email);
  }, [email]);

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
      <NextSuspense fallback={<LoadingFallback />}>
        {status === "success" && (
          <>
            <Keywords
              keywords={userData.user.keywords}
              keyword={clickedKeyword}
              onClickKeyword={setKeyword}
            />
            <RecommendList
              clickedKeyword={clickedKeyword}
              keywordItemList={keywordItemList}
            />
          </>
        )}
      </NextSuspense>
    </div>
  );
};

export default Recommend;

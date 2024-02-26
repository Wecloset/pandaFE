import { NextPage } from "next";

import RecommendList from "./recommend-list";
import Keywords from "./keywords";
import LoadingFallback from "./ui/loading-fallback";

import NextSuspense from "../../hooks/suspense";
import useKeyword from "../../hooks/useKeyword";
import { UserData } from "../../types/data-type";

const Recommend: NextPage<{
  userData: UserData;
}> = ({ userData }) => {
  const { selectedKeyword, keywordItemList, setKeyword } = useKeyword({
    userData,
  });

  return (
    <div className="space-y-5 px-5">
      <div>
        <h2 className="text-xl">Style for You</h2>
        <p className="mt-1 text-textColor-gray-100">
          {userData
            ? `${userData.nickname}님의 키워드에 적합한 아이템`
            : "지금 핫한 아이템"}
        </p>
      </div>
      <NextSuspense fallback={<LoadingFallback />}>
        <>
          <Keywords
            keywords={userData.keywords}
            keyword={selectedKeyword}
            onClickKeyword={setKeyword}
          />
          <RecommendList
            selectedKeyword={selectedKeyword}
            keywordItemList={keywordItemList}
          />
        </>
      </NextSuspense>
    </div>
  );
};

export default Recommend;

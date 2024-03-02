import { NextPage } from "next";
import Image from "next/image";
import React, { useEffect } from "react";
import emptybox from "../../../public/asset/image/emptybox.svg";

import MainProduct from "./product-item";
import RecommendButton from "./ui/recommend-button";

import useRecommend from "../../hooks/useRecommend";
import { ProductData } from "../../types/data-type";

interface RecommendListProps {
  selectedKeyword: string;
  keywordItemList: { [key: string]: ProductData[] };
}

const RecommendList: NextPage<RecommendListProps> = ({
  selectedKeyword,
  keywordItemList,
}) => {
  const { recommendList, setRecommendItems } = useRecommend({
    keyword: selectedKeyword,
  });

  useEffect(() => {
    if (selectedKeyword) setRecommendItems(keywordItemList);
  }, [selectedKeyword, keywordItemList]);

  return (
    <>
      {recommendList && recommendList.length === 0 && (
        <div className="flex min-h-[540px] items-center justify-center text-center">
          <div>
            <div className="mx-auto mb-4 h-20 w-20">
              <Image src={emptybox} alt="" width={80} height={80} />
            </div>
            <p>해당 키워드에 준비된 상품이 없습니다.</p>
          </div>
        </div>
      )}
      <div className="grid min-h-[540px] grid-cols-2 gap-3 transition">
        {recommendList?.map(data => (
          <MainProduct {...data} key={data.id} imgh="h-[190px]" />
        ))}
      </div>
      {keywordItemList[selectedKeyword] && (
        <RecommendButton
          refreshRecommends={setRecommendItems}
          keywordItemList={keywordItemList}
          keyword={selectedKeyword}
        />
      )}
    </>
  );
};

export default RecommendList;

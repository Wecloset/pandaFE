import { Icon } from "@iconify/react";
import { NextPage } from "next";

import { ProductData } from "../../../types/data-type";

const RecommendButton: NextPage<{
  refreshRecommends: (keywordItemList: {
    [key: string]: ProductData[];
  }) => void;
  keywordItemList: {
    [key: string]: ProductData[];
  };
  keyword: string;
}> = ({ refreshRecommends, keywordItemList, keyword }) => {
  return (
    <div className="relative h-10">
      <button
        className="absolute top-0 left-0 z-10 flex h-10 w-full items-center justify-center border border-black bg-white"
        onClick={() => refreshRecommends(keywordItemList)}
      >
        <Icon icon="ic:baseline-refresh" className="mr-1 -mt-1 text-lg" />
        {keyword !== "" ? `${keyword} 아이템` : "추천 아이템"}
      </button>
      <span className="absolute top-1 left-1 h-full w-full bg-common-black" />
      <span className="absolute top-[2px] -right-[4px] h-[3px] w-[6px] rotate-45 bg-common-black" />
      <span className="absolute -bottom-[2px] left-0 h-[3px] w-[6px] rotate-45 bg-common-black" />
    </div>
  );
};

export default RecommendButton;

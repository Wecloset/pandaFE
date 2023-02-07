import { NextPage } from "next";
import { Icon } from "@iconify/react";

const ViewBox: NextPage<{ view: number; like: number }> = ({ view, like }) => {
  return (
    <div className="absolute right-3 bottom-3 flex text-xs text-commom-gray">
      <span className="mr-3 flex items-center [&>svg]:-mt-[1px] [&>svg]:mr-0.5">
        <Icon icon="ic:outline-remove-red-eye" /> <span>조회 {view}</span>
      </span>
      <span className="flex items-center [&>svg]:-mt-[1px] [&>svg]:mr-0.5">
        <Icon icon="mdi:cards-heart-outline" /> <span>찜 {like}</span>
      </span>
    </div>
  );
};

export default ViewBox;

import { NextPage } from "next";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Button from "../button";
import FilterTab from "./filter-tab";

const FilterOverlay: NextPage<{
  closeOverlay: (event: React.MouseEvent) => void;
}> = ({ closeOverlay }) => {
  const [isOpen, setIsOpen] = useState<string | null>("STYLE");

  const detailsClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setIsOpen(target.textContent);
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex h-[60px] items-center border-b border-common-black bg-white px-3">
        <button type="button" className="text-2xl">
          <Icon
            icon="ic:baseline-arrow-forward-ios"
            aria-label="뒤로가기"
            onClick={closeOverlay}
          />
        </button>
      </div>
      <div>
        <FilterTab onClick={detailsClick} isOpen={isOpen} name="STYLE" />
        <FilterTab onClick={detailsClick} isOpen={isOpen} name="CATEGORY" />
        <FilterTab onClick={detailsClick} isOpen={isOpen} name="PRICE" />
        <Button
          text="검색"
          color="bg-black"
          fontColor="text-white"
          position="absolute bottom-2"
        />
      </div>
    </>
  );
};

export default FilterOverlay;

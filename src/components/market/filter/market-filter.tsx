import { NextPage } from "next";
import React, { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import Button from "../../button";
import FilterTab from "./filter-tab";
import { priceList, tabData } from "../../../lib/fake-data";
import { FilterContext } from "../../../store/filter-context";

const FilterOverlay: NextPage<{
  closeOverlay: () => void;
}> = ({ closeOverlay }) => {
  const [isOpen, setIsOpen] = useState<string | null>("STYLE");
  const [filterWords, setFilterWords] = useState<string[]>([]);

  const { updateList } = useContext(FilterContext);

  const openTab = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setIsOpen(target.textContent);
  };

  const updateTemporaryList = (word: string) => {
    if (filterWords.includes(word))
      setFilterWords(prev => prev.filter(item => item !== word));
    else setFilterWords(prev => [...prev, word]);
  };

  const updateFilterList = () => {
    updateList(filterWords);
    setTimeout(() => {
      closeOverlay();
    }, 100);
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
        <FilterTab
          onClick={openTab}
          name="STYLE"
          data={tabData.style.slice(0, 20)}
          isOpen={isOpen}
          setList={updateTemporaryList}
          wordList={filterWords}
        />
        <FilterTab
          onClick={openTab}
          isOpen={isOpen}
          name="PRICE"
          data={priceList}
          setList={updateTemporaryList}
          wordList={filterWords}
        />
        <Button
          type="button"
          text="검색"
          classes="bg-black"
          btnWrapClasses="p-5"
          fontColor="text-white"
          position="absolute bottom-2"
          onClick={updateFilterList}
        />
      </div>
    </>
  );
};

export default FilterOverlay;

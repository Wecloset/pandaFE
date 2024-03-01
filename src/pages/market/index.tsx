import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Header from "../../components/ui/header";
import FilterOverlay from "../../components/market/filter/market-filter";
import Navigation from "../../components/ui/navigation";
import FloatingButton from "../../components/ui/floating-button";
import FilterList from "../../components/market/filter-list";
import MarketList from "../../components/market/market-list";
import CategoryNavigation from "../../components/market/category-nav";
import RentButtons from "../../components/market/rent-buttons";
import { cls } from "../../utils/class";
import LoadingSpinner from "../../components/ui/loading-spinner";
import { useRecoilValueLoadable } from "recoil";
import { filteredMarketListState } from "../../recoil/filter";
import { MainProductData } from "../../types/data-type";
import useModal from "../../hooks/useModal";

const Market: NextPage = () => {
  const marketList = useRecoilValueLoadable(filteredMarketListState);
  const { state, contents } = marketList;

  const { ModalUI } = useModal();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [filteredList, setFilteredList] = useState<MainProductData[]>([]);

  useEffect(() => {
    if (state === "hasValue") setIsLoading(false);
  }, [state]);

  useEffect(() => {
    setFilteredList(contents);
  }, [contents]);

  const openFilterOverlay = () => setFilterOpen(true);
  const closeFilterOverlay = () => setFilterOpen(false);

  return (
    <div>
      {isFilterOpen && (
        <div
          className={cls(
            "fixed z-50 h-screen w-[390px] translate-x-[390px] bg-white",
            isFilterOpen ? "translate-x-0" : "",
          )}
        >
          <FilterOverlay closeOverlay={closeFilterOverlay} />
        </div>
      )}
      <Header />
      <ModalUI />
      <CategoryNavigation />
      <div>
        <div className="mb-3 px-5 py-4">
          <div className="flex items-center justify-between">
            <RentButtons />
            <div className="relative h-8 w-8 transition duration-150 hover:scale-105">
              <Icon
                icon="akar-icons:settings-horizontal"
                aria-label="옵션 필터링 목록"
                className="absolute z-10 h-7 w-7 cursor-pointer rounded-md border border-common-black bg-white p-1 text-xl transition duration-150 hover:bg-primary-green"
                onClick={openFilterOverlay}
              />
              <span className="absolute top-[2px] left-[2px] h-7 w-7 rounded-md bg-common-black" />
            </div>
          </div>
          <FilterList />
        </div>
      </div>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      <MarketList marketData={filteredList} isLoading={isLoading} />
      <Navigation />
      <FloatingButton path="/create" />
    </div>
  );
};

export default Market;

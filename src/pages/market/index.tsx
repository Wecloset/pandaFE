import { NextPage } from "next";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { cls } from "../../utils/class";
import { FilterProvider } from "../../store/filter-context";
import Header from "../../components/header";
import FilterOverlay from "../../components/market/filter/market-filter";
import Navigation from "../../components/navigation";
import FloatingButton from "../../components/floating-button";
import FilterList from "../../components/market/filter-list";
import MarketList from "../../components/market/market-list";
import CategoryNavigation from "../../components/market/category-nav";
import { useQuery } from "react-query";
import RentButtons from "../../components/market/rent-buttons";
import { axiosGet } from "../../utils/services";
import LoadingSpinner from "../../components/loading-spinner";

const Market: NextPage = () => {
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  const getAllProducts = async () => {
    const { data } = await axiosGet("/api/products");
    return data;
  };

  const { data, isLoading } = useQuery("products", getAllProducts);

  const openFilterOverlay = () => setFilterOpen(true);
  const closeFilterOverlay = () => setFilterOpen(false);

  return (
    <FilterProvider>
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
        <CategoryNavigation />
        <div>
          <div className="px-5 py-4">
            <div className="flex items-center justify-between">
              <RentButtons />
              <Icon
                icon="akar-icons:settings-horizontal"
                aria-label="옵션 필터링 목록"
                className="cursor-pointer text-xl"
                onClick={openFilterOverlay}
              />
            </div>
            <FilterList />
          </div>
        </div>
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner />
          </div>
        )}
        <MarketList allData={data} isLoading={isLoading} />
        <Navigation />
        <FloatingButton path="/create" />
      </div>
    </FilterProvider>
  );
};

export default Market;

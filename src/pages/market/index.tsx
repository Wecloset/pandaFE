import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cls } from "../../lib/class";
import { FilterProvider } from "../../store/filter-context";
import Header from "../../components/header";
import FilterOverlay from "../../components/market/market-filter";
import Navigation from "../../components/navigation";
import FloatingButton from "../../components/floating-button";
import FilterList from "../../components/market/filter-list";
import MarketList from "../../components/market/market-list";
import CategoryNavigation from "../../components/market/category-nav";
import axios from "axios";
import { useQuery } from "react-query";

const Market: NextPage = () => {
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  const getAllProducts = async () => {
    const { data } = await axios.get("/api/products");
    return data;
  };

  const { data } = useQuery("products", getAllProducts);

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
              <div>
                <button className="mr-2 rounded-full border border-common-black py-0.5 px-2">
                  대여상품
                </button>
                <button className="rounded-full border border-common-black py-0.5 px-2">
                  판매상품
                </button>
              </div>
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
        {/* {isLoading && <p>로딩중...</p>} */}
        <MarketList allData={data} />
        <Navigation />
        <FloatingButton />
      </div>
    </FilterProvider>
  );
};

export default Market;

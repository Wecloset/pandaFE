import { NextPage } from "next";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { cls } from "../../lib/class";
import { MainData } from "../../types/data-type";

import Header from "../../components/header";
import productData from "../../lib/fake-data";
import FilterOverlay from "../../components/market/market-filter";
import MarketItem from "../../components/market/market-item";
import Navigation from "../../components/navigation";
import FloatingButton from "../../components/floating-button";

const Market: NextPage = () => {
  const [category, setCategory] = useState<string>("all");
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  const categoryClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    setCategory(target.name);
  };
  const openFilterOverlay = (event: React.MouseEvent) => {
    setFilterOpen(true);
  };

  const closeFilterOverlay = (event: React.MouseEvent) => {
    setFilterOpen(false);
  };

  return (
    <div>
      {isFilterOpen && (
        <div
          className={cls(
            "fixed z-50 h-screen  w-[390px] translate-x-[390px] bg-white",
            isFilterOpen ? "translate-x-0" : "",
          )}
        >
          <FilterOverlay closeOverlay={closeFilterOverlay} />
        </div>
      )}
      <Header />
      <div>
        <div className="text-common-gray grid h-[45px] grid-cols-4 border-b border-common-black bg-white text-base text-textColor-gray-100">
          <button
            className={cls(
              " border-r  border-r-common-black",
              category === "all"
                ? "border-b-2 border-common-black font-bold text-common-black"
                : "",
            )}
            name="all"
            onClick={categoryClick}
          >
            전체
          </button>
          <button
            className={cls(
              " border-r  border-r-common-black ",
              category === "top"
                ? "border-b-2 border-common-black font-bold text-common-black"
                : "",
            )}
            name="top"
            onClick={categoryClick}
          >
            상의
          </button>
          <button
            className={cls(
              " border-r border-r-common-black",
              category === "bottom"
                ? "border-b-2 border-common-black font-bold text-common-black"
                : "",
            )}
            name="bottom"
            onClick={categoryClick}
          >
            하의
          </button>
          <button
            className={cls(
              "",
              category === "other"
                ? "border-b-2 border-common-black font-bold text-common-black"
                : "",
            )}
            name="other"
            onClick={categoryClick}
          >
            기타
          </button>
        </div>
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
          <ul className="pt-[18px] [&_svg]:ml-1 [&_svg]:-mt-0.5 [&_svg]:cursor-pointer [&_svg]:text-textColor-gray-50">
            <li className="flex items-center">
              여성 국내 브랜드
              <Icon icon="ic:baseline-clear" aria-label="검색어 삭제" />
            </li>
          </ul>
        </div>
      </div>
      <ul className="flex flex-col gap-3 px-5 py-3">
        {productData.map((item: MainData) => (
          <MarketItem key={item.id} data={item} />
        ))}
      </ul>
      <Navigation />
      <FloatingButton />
    </div>
  );
};

export default Market;

import { NextPage } from "next";
import { Icon } from "@iconify/react";
import { cls } from "../../lib/class";
import Link from "next/link";
import React from "react";
import Nav from "../../components/ui/nav";
import FilterOverlay from "../../components/market/filter";
interface MarketProps {
  category: string;
  categoryClick: (event: React.MouseEvent) => void;
  isFilterOpen: boolean;
  openFilterOverlay: (event: React.MouseEvent) => void;
}

const MarketPage: NextPage<MarketProps> = ({
  category,
  categoryClick,
  isFilterOpen,
  openFilterOverlay,
}) => {
  return (
    <div>
      <Nav />
      <div>
        {/* filterOverlay */}
        <div
          className={cls(
            "absolute left-0 z-20 h-screen w-full translate-x-[390px] bg-white transition",
            isFilterOpen ? "translate-x-0" : "",
          )}
        >
          <FilterOverlay />
        </div>
        <div className="text-common-gray grid h-[45px] grid-cols-4 border-b border-common-black bg-white text-base text-textColor-gray-100">
          <button
            className={cls(
              "border-b-2 border-r border-r-common-black",
              category === "all"
                ? "border-common-black font-bold text-common-black"
                : "",
            )}
            name="all"
            onClick={categoryClick}
          >
            전체
          </button>
          <button
            className={cls(
              " border-r border-b-2 border-r-common-black ",
              category === "top"
                ? "border-common-black font-bold text-common-black"
                : "",
            )}
            name="top"
            onClick={categoryClick}
          >
            상의
          </button>
          <button
            className={cls(
              "border-b-2 border-r border-r-common-black",
              category === "bottom"
                ? "border-common-black font-bold text-common-black"
                : "",
            )}
            name="bottom"
            onClick={categoryClick}
          >
            하의
          </button>
          <button
            className={cls(
              "border-b-2",
              category === "other"
                ? "border-common-black font-bold text-common-black"
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
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <li
              key={idx}
              className="relative flex gap-[14px] border border-common-black p-3"
            >
              <Link href="">
                <div
                  role="img"
                  className="h-[100px] w-[100px] border border-common-black bg-borderColor-gray"
                >
                  <div className="h-full w-full" />
                </div>
              </Link>
              <dl>
                <dt>Vivienne Westwood</dt>
                <dd className="mb-2 text-textColor-gray-100">
                  <Link href="">비비안 웨스트우드 카드지갑</Link>
                </dd>
                <dd aria-label="가격" className="mb-[10px] text-base font-bold">
                  185,000
                </dd>
                <div className="flex justify-between">
                  <div
                    role="definition"
                    aria-label="판매상품"
                    className="h-[18px] border border-primary-green px-1 text-xs text-primary-green"
                  >
                    판매
                  </div>
                  <div className="absolute right-3 bottom-3 flex text-xs text-commom-gray">
                    <span className="mr-3 flex items-center [&>svg]:-mt-[1px] [&>svg]:mr-0.5">
                      <Icon icon="ic:outline-remove-red-eye" />{" "}
                      <span>조회 22</span>
                    </span>
                    <span className="flex items-center [&>svg]:-mt-[1px] [&>svg]:mr-0.5">
                      <Icon icon="mdi:cards-heart-outline" /> <span>찜 1</span>
                    </span>
                  </div>
                </div>
              </dl>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MarketPage;

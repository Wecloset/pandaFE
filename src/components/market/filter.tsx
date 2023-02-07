import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { cls } from "../../lib/class";
import { Icon } from "@iconify/react";
import ButtonItem from "../ui/buttonitem";

const fakeList = [
  "하이엔드",
  "여성 국내 브랜드",
  "남성 국내 브랜드",
  "빈티지",
  "스트릿웨어",
  "미니멀",
  "Neo Y2K",
  "SPA",
];

const FilterOverlay: NextPage = () => {
  const [isOpen, setIsOpen] = useState<string | null>("STYLE");

  const detailsClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setIsOpen(target.textContent);
  };

  // TODO: add transition
  return (
    <>
      <div>
        <div>
          <div
            onClick={detailsClick}
            className={cls(
              "peer h-[50px] select-none border-b border-common-black px-5 py-3 pt-3 text-lg",
              isOpen === "STYLE" ? "is-active" : "",
            )}
          >
            STYLE
          </div>
          <ul className="invisible select-none border-b border-common-black peer-[.is-active]:visible peer-[.is-active]:p-5 [&>li]:flex [&>li]:h-7 [&>li]:justify-between [&_svg]:-mt-[3px] [&_svg]:text-2xl">
            {isOpen === "STYLE" &&
              fakeList.map((item, idx) => (
                <li key={idx}>
                  <label htmlFor={`style${idx}`} className="peer">
                    {item}
                  </label>
                  <input
                    type="checkbox"
                    id={`style${idx}`}
                    className="peer hidden"
                  />
                  <Icon
                    icon="material-symbols:check-small"
                    className="hidden peer-checked:block"
                  />
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div
            onClick={detailsClick}
            className={cls(
              "peer h-[50px] select-none border-b border-common-black py-3 px-5 text-lg",
              isOpen === "CATEGORY" ? "is-active" : "",
            )}
          >
            CATEGORY
          </div>
          <ul className="invisible select-none border-b border-common-black peer-[.is-active]:visible peer-[.is-active]:p-5 [&>li]:flex [&>li]:h-7 [&>li]:justify-between [&_svg]:-mt-[3px] [&_svg]:text-2xl">
            {isOpen === "CATEGORY" &&
              fakeList.map((item, idx) => (
                <li key={idx}>
                  <label htmlFor={`category${idx}`} className="peer">
                    {item}
                  </label>
                  <input
                    type="checkbox"
                    id={`category${idx}`}
                    className="peer hidden"
                  />
                  <Icon
                    icon="material-symbols:check-small"
                    className="hidden peer-checked:block"
                  />
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div
            onClick={detailsClick}
            className={cls(
              "peer h-[50px] select-none border-b border-common-black py-3 px-5 text-lg",
              isOpen === "PRICE" ? "is-active" : "",
            )}
          >
            PRICE
          </div>
          <ul className="invisible select-none border-b border-common-black peer-[.is-active]:visible peer-[.is-active]:p-5 [&>li]:flex [&>li]:h-7 [&>li]:justify-between [&_svg]:-mt-[3px] [&_svg]:text-2xl">
            <li>
              <label htmlFor="price1" className="peer">
                30,000 이하
              </label>
              <input
                type="radio"
                id="price1"
                name="price"
                className="peer hidden"
              />
              <Icon
                icon="material-symbols:check-small"
                className="hidden peer-checked:block"
              />
            </li>
            <li>
              <label htmlFor="price2" className="peer">
                30,000 ~ 100,000
              </label>
              <input
                type="radio"
                id="price2"
                name="price"
                className="peer hidden"
              />
              <Icon
                icon="material-symbols:check-small"
                className="hidden peer-checked:block"
              />
            </li>
          </ul>
        </div>
        <ButtonItem text="검색" color="bg-black" fontColor="text-white" />
      </div>
    </>
  );
};

export default FilterOverlay;

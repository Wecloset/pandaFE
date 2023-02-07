import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { cls } from "../../lib/class";

interface FilterTabProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  isOpen: string | null;
  name: string;
}

const priceList = ["30,000 이하", "30,000 ~ 100,000"];

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

const FilterTab: NextPage<FilterTabProps> = ({ onClick, isOpen, name }) => {
  return (
    <div className="transition duration-150 ease-out">
      <div
        onClick={onClick}
        className={cls(
          "peer h-[50px] select-none border-b border-common-black py-3 px-5 text-lg",
          isOpen === name ? "is-active" : "",
        )}
      >
        {name.toUpperCase()}
      </div>
      {isOpen === name && (
        <ul className="h-0 select-none border-b border-common-black peer-[.is-active]:h-auto peer-[.is-active]:p-5 [&_svg]:-mt-[3px] [&_svg]:text-2xl [&>li]:flex [&>li]:h-7 [&>li]:justify-between">
          {name === "PRICE"
            ? priceList.map((price, idx) => (
                <li key={idx}>
                  <label htmlFor="price1" className="peer">
                    {price}
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
              ))
            : fakeList.map((item, idx) => (
                <li key={idx}>
                  <label htmlFor={`${name}${idx}`} className="peer">
                    {item}
                  </label>
                  <input
                    type="checkbox"
                    id={`${name}${idx}`}
                    className="peer hidden"
                  />
                  <Icon
                    icon="material-symbols:check-small"
                    className="hidden peer-checked:block"
                  />
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};

export default FilterTab;

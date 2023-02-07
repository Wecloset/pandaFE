import { NextPage } from "next";
import { MainData } from "../../types/data-type";
import Link from "next/link";
import ViewBox from "./viewbox";

const MarketItem: NextPage<{ data: MainData }> = ({ data }) => {
  const { title, subtitle, price, rental, view, like } = data;
  return (
    <li className="relative flex gap-[14px] border border-common-black p-3">
      <Link href="">
        <div
          role="img"
          className="h-[100px] w-[100px] border border-common-black bg-borderColor-gray"
        ></div>
      </Link>
      <dl>
        <dt>{subtitle}</dt>
        <dd className="mb-2 text-textColor-gray-100">
          <Link href="">{title}</Link>
        </dd>
        <dd aria-label="가격" className="mb-[10px] text-base font-bold">
          {price}
        </dd>
        <div className="flex justify-between">
          <div
            role="definition"
            aria-label="판매상품"
            className="h-[18px] border border-primary-green px-1 text-xs text-primary-green"
          >
            {rental}
          </div>
          {view && like && <ViewBox view={view} like={like} />}
        </div>
      </dl>
    </li>
  );
};

export default MarketItem;

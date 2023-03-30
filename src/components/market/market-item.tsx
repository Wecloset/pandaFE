import { NextPage } from "next";
import { MainProductData } from "../../types/data-type";
import Link from "next/link";
import ViewBox from "./viewbox";
import Image from "next/image";

const MarketItem: NextPage<{ data: MainProductData }> = ({ data }) => {
  const {
    id: productId,
    imgurl,
    title,
    brand,
    price,
    rental,
    fav,
    view = 0,
  } = data;

  return (
    <li className="relative flex gap-[14px] border border-common-black p-3">
      <Link href={`market/${productId}`} className="h-[100px] w-[100px]">
        <Image
          width={100}
          height={100}
          alt={`상품리스트이미지${productId}`}
          src={imgurl[0].img}
          className="h-[100px] w-[100px] border border-common-black bg-borderColor-gray object-cover"
          priority
        />
      </Link>
      <dl>
        <dt className="text-base font-bold">{brand}</dt>
        <dd className="mb-2 w-52 truncate text-textColor-gray-100">
          <Link href={`market/${productId}`}>{title}</Link>
        </dd>
        <dd aria-label="가격" className="mb-1 text-base font-bold">
          <span>{price.toLocaleString()}</span>원
        </dd>
        <div className="flex justify-between">
          <div
            role="definition"
            aria-label="판매상품"
            className="h-[18px] border border-common-black bg-primary-green px-1 text-xs text-common-black"
          >
            {rental ? "대여" : "판매"}
          </div>
          <ViewBox view={view} likes={fav} />
        </div>
      </dl>
    </li>
  );
};

export default MarketItem;

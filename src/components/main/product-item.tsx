import { NextPage } from "next";
import Link from "next/link";
import { ProductDataMin } from "../../types/data-type";

interface MainListProps extends ProductDataMin {
  imgw?: string;
  imgh?: string;
}

const MainProduct: NextPage<MainListProps> = ({
  id,
  imgurl,
  title,
  brand,
  rental,
  price,
  imgw,
  imgh,
}) => {
  return (
    <div>
      <Link href={`/market/${id}`}>
        <div className="mb-2 border border-common-black bg-borderColor-gray">
          {imgurl && (
            <img
              src={imgurl[0]?.img}
              alt={title}
              className={`w-full ${imgh} object-cover`}
            />
          )}
        </div>
      </Link>
      <dl className={imgw}>
        <dt className="truncate">{brand}</dt>
        <dd className="truncate text-xs text-textColor-gray-100">{title}</dd>
        <dd className="mt-1 flex items-center">
          <span
            aria-label="판매상품"
            className="mr-[6px] -mt-1 border border-common-black bg-primary-green px-1 text-xs text-common-black"
          >
            {rental ? "대여" : "판매"}
          </span>
          <span aria-label="가격" className="text-base font-bold">
            {price}
          </span>
        </dd>
      </dl>
    </div>
  );
};

export default MainProduct;

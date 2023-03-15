import { NextPage } from "next";
import Link from "next/link";

interface MainDataProps {
  id: number;
  title: string;
  subtitle: string;
  rental: string;
  price: string;
  view?: number;
  like?: number;
}

interface MainListProps extends MainDataProps {
  imgw?: string;
  imgh?: string;
}

const MainProduct: NextPage<MainListProps> = ({
  id,
  title,
  subtitle,
  rental,
  price,
  imgw,
  imgh,
}) => {
  return (
    <li>
      <Link href="">
        <div className="mb-2 border border-common-black bg-borderColor-gray ">
          <div className={`${imgw} ${imgh}`} />
        </div>
      </Link>
      <dl className="w-40">
        <dt className="truncate">{subtitle}</dt>
        <dd className="truncate text-xs text-textColor-gray-100">{title}</dd>
        <dd className="mt-1 flex items-center">
          <span
            aria-label="판매상품"
            className="mr-[6px] -mt-1 bg-primary-green px-1 pt-0.5 text-xs text-white"
          >
            {rental}
          </span>
          <span aria-label="가격" className="text-base font-bold">
            {price}
          </span>
        </dd>
      </dl>
    </li>
  );
};

export default MainProduct;

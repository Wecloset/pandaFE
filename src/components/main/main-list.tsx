import { NextPage } from "next";
import Link from "next/link";

interface MainDataProps {
  data: {
    id: number;
    title: string;
    subtitle: string;
    rental: string;
    price: string;
    view: number;
    like: number;
  }[];
}

const MainList: NextPage<MainDataProps> = ({ data }) => {
  return (
    <ul className="flex items-center gap-[10px] ">
      {data.map(item => (
        <li key={item.id}>
          <Link href="">
            <div className="mb-2 h-44 w-40 border border-common-black bg-borderColor-gray " />
          </Link>
          <dl className="w-40">
            <dt className="truncate">{item.subtitle}</dt>
            <dd className="truncate text-textColor-gray-100">{item.title}</dd>
            <dd className="mt-2 flex items-center">
              <span
                aria-label="판매상품"
                className="mr-[6px] -mt-1 border border-primary-green px-1 text-xs text-primary-green"
              >
                {item.rental}
              </span>
              <span aria-label="가격" className="text-base font-bold">
                {item.price}
              </span>
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  );
};

export default MainList;

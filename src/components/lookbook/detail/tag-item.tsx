import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { ProductDataMin } from "../../../types/data-type";
import { priceAddComma } from "../../../utils/markets";

const TagItem: NextPage<ProductDataMin[]> = product => {
  return (
    <>
      {Object.values(product).map(({ id, imgurl, title, brand, price }) => (
        <li
          key={id}
          className="flex min-w-[200px] items-center justify-between"
        >
          <Link href={`/market/${id}`} className="flex">
            <img
              src={imgurl[0]?.img}
              alt={title}
              className="mr-3 h-[62px] w-[62px] flex-shrink-0 border border-common-black object-cover"
            />
            <div className="text-common-black">
              <p className="text-sm">{brand}</p>
              <p className="mb-2 w-32 truncate text-xs text-textColor-gray-100">
                {title}
              </p>
              <p className="font-bold">{priceAddComma(price)}</p>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
};

export default TagItem;

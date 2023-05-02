import { Icon } from "@iconify/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useSlide from "../../hooks/useSlide";
import { translateClasses } from "../../lib/translate-class";
import { ProductData } from "../../types/data-type";
import { cls } from "../../utils/class";
import { apiGet } from "../../utils/request";
import MainProduct from "./product-item";

const RecentStyle: NextPage = () => {
  const { data: products } = useQuery("products", apiGet.GET_ITEMS, {
    suspense: true,
  });
  const [recentItems, setRecentItems] = useState<ProductData[]>([]);

  const { next, prev, transitionEnd, translateX, isMoving } = useSlide({
    list: recentItems,
    classes: translateClasses.recentStyle,
  });

  useEffect(() => {
    const recents = products.slice(-10);
    setRecentItems(recents.reverse());
  }, []);

  return (
    <div className="px-5">
      <div className="mb-5">
        <h2 className="text-xl">Recent Style</h2>
        <div className="flex items-center justify-between">
          <p className="mt-1 text-textColor-gray-100">최근 올라온 아이템</p>
          <div className="flex h-5 w-10 justify-between text-lg">
            <button onClick={prev}>
              <Icon icon="material-symbols:arrow-back-ios" />
            </button>
            <button onClick={next}>
              <Icon
                icon="material-symbols:arrow-back-ios"
                className="rotate-180"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-[350px] overflow-hidden">
        <ul
          onTransitionEnd={transitionEnd}
          className={cls(
            `flex [&>li]:w-[140px] [&>li]:flex-shrink-0 ${translateX} [&>li]:last: mr-0
            [&>li]:mr-3`,
            isMoving ? "transition duration-700 ease-in-out" : "",
          )}
        >
          <li>
            <MainProduct
              {...(recentItems[recentItems.length - 1] as ProductData)}
              imgw="w-[140px]"
              imgh="h-[160px]"
            />
          </li>
          {recentItems.map(data => (
            <li key={data.id}>
              <MainProduct {...data} imgw="w-[140px]" imgh="h-[160px]" />
            </li>
          ))}
          <li>
            <MainProduct
              {...(recentItems[0] as ProductData)}
              imgw="w-[140px]"
              imgh="h-[160px]"
            />
          </li>
          <li>
            <MainProduct
              {...(recentItems[1] as ProductData)}
              imgw="w-[140px]"
              imgh="h-[160px]"
            />
          </li>
          <li>
            <MainProduct
              {...(recentItems[2] as ProductData)}
              imgw="w-[140px]"
              imgh="h-[160px]"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecentStyle;

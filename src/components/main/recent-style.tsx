import { Icon } from "@iconify/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import useSlide from "../../hooks/useSlide";
import { translateClasses } from "../../lib/translate-class";
import { ProductData } from "../../types/data-type";
import { cls } from "../../utils/class";
import MainProduct from "./product-item";

const RecentStyle: NextPage<{ productsData: ProductData[] }> = ({
  productsData,
}) => {
  const [recentItems, setRecentItems] = useState<ProductData[]>([]);

  const { next, prev, transitionEnd, translateX, isMoving } = useSlide({
    list: recentItems,
    classes: translateClasses.recentStyle,
  });

  useEffect(() => {
    if (productsData) {
      const recents = productsData.slice(productsData.length - 10);
      setRecentItems(recents.reverse());
    }
  }, [productsData]);

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
            `flex gap-3 [&>li]:w-[140px] [&>li]:flex-shrink-0 ${translateX}`,
            isMoving ? "transition duration-300 ease-out" : "",
          )}
        >
          <li>
            <MainProduct
              {...(recentItems.at(-1) as ProductData)}
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
              {...(recentItems.at(0) as ProductData)}
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

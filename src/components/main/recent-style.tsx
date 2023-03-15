import React from "react";
import productData from "../../lib/fake-data";
import MainList from "./product-item";

const RecentStyle = () => {
  return (
    <div className="px-5">
      <div className="mb-5">
        <h2 className="text-xl">Recent Style</h2>
        <p className="text-textColor-gray-100">최근 올라온 아이템</p>
      </div>
      <ul className="flex gap-3">
        {productData.map(data => (
          <MainList key={data.id} {...data} imgw="w-[150]" imgh="h-[160px]" />
        ))}
      </ul>
    </div>
  );
};

export default RecentStyle;

import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { FilterContext } from "../../store/filter-context";
import { MainProductData } from "../../types/data-type";
import MarketItem from "./market-item";

const MarketList: NextPage<{ allData: MainProductData[] }> = ({ allData }) => {
  const { filterList, setProducts } = useContext(FilterContext);

  useEffect(() => {
    setProducts(allData);
  }, [allData]);

  let list;

  if (filterList.length > 0) {
    list = filterList.map((product: MainProductData, i) => {
      const key = `${product.id}-${i}`;
      return <MarketItem key={key} data={product} />;
    });
  } else if (filterList.length === 0) {
    list = <p>상품이 존재하지 않습니다 :p</p>;
  }
  return <ul className="flex flex-col gap-3 px-5">{list}</ul>;
};

export default MarketList;

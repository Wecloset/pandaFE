import { NextPage } from "next";
import { MainProductData } from "../../types/data-type";
import MarketItem from "./market-item";

const MarketList: NextPage<{
  marketData: MainProductData[];
  isLoading: boolean;
}> = ({ marketData, isLoading }) => {
  let list;

  if (marketData.length > 0) {
    list = marketData.map((product: MainProductData, i) => {
      const key = `${product.id}-${i}`;
      return <MarketItem key={key} data={product} />;
    });
  } else if (marketData.length === 0 && !isLoading) {
    list = <p>상품이 존재하지 않습니다 :p</p>;
  }

  return <ul className="flex flex-col gap-3 px-5 pb-16">{list}</ul>;
};

export default MarketList;

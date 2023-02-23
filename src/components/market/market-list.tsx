import axios from "axios";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../store/filter-context";
import { MainProductData } from "../../types/data-type";
import MarketItem from "./market-item";
import { useQuery } from "react-query";

const MarketList: NextPage = () => {
  const [productList, setProductList] = useState<MainProductData[] | void>([]);

  const getAllProducts = async () => {
    const { data } = await axios.get("/api/products");
    return data;
  };

  const { isLoading, isError, data, error } = useQuery("products", getAllProducts);

  const { filtering, wordList } = useContext(FilterContext);

  useEffect(() => {
    if (data) {
      setProductList(filtering(data));
    }
  }, [data, wordList]);

  return (
    <ul className="flex flex-col gap-3 px-5">
      {productList?.map((product: MainProductData) => (
        <MarketItem key={product.id} data={product} />
      ))}
    </ul>
  );
};

export default MarketList;

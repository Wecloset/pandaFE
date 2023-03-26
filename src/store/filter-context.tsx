import React, { createContext, useEffect, useState } from "react";
import { MainProductData } from "../types/data-type";

const FilterContext = createContext<{
  allList: MainProductData[];
  filterList: MainProductData[];
  wordList: string[];
  categoryName: string;
  isRent: boolean | "";
  setProducts: (data: MainProductData[]) => void;
  setCategory: (name: string) => void;
  setRentStatus: (rent: boolean | "") => void;
  removeWord: (word: string) => void;
  updateList: (words: string[]) => void;
  categoryFiltering: (value: any) => MainProductData[] | void;
  filtering: (value: any) => MainProductData[] | void;
}>({
  allList: [],
  filterList: [],
  wordList: [],
  categoryName: "",
  isRent: "",
  setProducts: () => {},
  setCategory: () => {},
  setRentStatus: () => {},
  removeWord: () => {},
  updateList: () => {},
  categoryFiltering: () => {},
  filtering: () => {
    [{}];
  },
});

const LOW = "30,000 이하";
const MEDIUM = "30,000 ~ 100,000";
const HIGH = "100,000 이상";
const priceMapping = (price: number, word: string) => {
  switch (word) {
    case LOW:
      return price <= 30000;
    case MEDIUM:
      return price >= 30000 && price <= 100000;
    case HIGH:
      return price >= 100000;
    default:
      return;
  }
};

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [allList, setAllList] = useState<MainProductData[]>([]);
  const [categoryName, setCategoryName] = useState<string>("전체");
  const [isRent, setIsRent] = useState<boolean | "">("");
  const [wordList, setWordList] = useState<string[]>([]);
  const [filterList, setFilterList] = useState<MainProductData[]>([]);

  const setProducts = (data: MainProductData[]) => {
    setAllList(data);
    setFilterList(data);
  };

  const updateList = (words: string[]) => setWordList(words);

  const removeWord = (word: string) =>
    setWordList(prev => prev.filter(item => item !== word));

  const setCategory = (name: string) => setCategoryName(name);

  const setRentStatus = (rent: boolean | "") => setIsRent(rent);

  const categoryFiltering = (name: string) => {
    const filteredList = allList.filter(product => product.category === name);
    return filteredList;
  };

  // category필터링 : 필터링에서 마켓리스트 상단 네비로 이동. 하나씩만 선택가능.
  // style필터링 : 선택한 스타일 모두 (카테고리에서 필터링된 리스트 중에서 - productList)
  // price필터링 : 선택한 category, style에 해당하면서 가격이 맞는것.
  const filtering = (category: string) => {
    let filteredData: MainProductData[] =
      category !== "전체" ? categoryFiltering(category) : allList;
    let styleList: MainProductData[] = [];
    let price = "";

    if (wordList.length > 0) {
      wordList.forEach(word => {
        if (word === LOW || word === MEDIUM || word === HIGH) {
          price = word;
        } else {
          const styles = filteredData.filter(product => product.style === word);
          styleList = [...styleList, ...styles];
        }
      });

      if (styleList.length > 0 || (styleList.length === 0 && price === "")) {
        filteredData = styleList;
      }

      if (price !== "") {
        filteredData = filteredData.filter((product: MainProductData) =>
          priceMapping(product.price, price),
        );
      }
    }

    if (isRent !== "") {
      if (isRent) filteredData = filteredData.filter(product => product.rental);
      else filteredData = filteredData.filter(product => !product.rental);
    }

    setFilterList(filteredData);
  };

  useEffect(() => {
    filtering(categoryName);
  }, [wordList, isRent]);

  return (
    <FilterContext.Provider
      value={{
        allList,
        filterList,
        wordList,
        categoryName,
        isRent,
        setProducts,
        setCategory,
        updateList,
        setRentStatus,
        removeWord,
        categoryFiltering,
        filtering,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };

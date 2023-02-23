import React, { createContext, useEffect, useState } from "react";
import { MainProductData } from "../types/data-type";

const FilterContext = createContext<{
  wordList: string[];
  updateList: (word: string) => void;
  filtering: (data: MainProductData[]) => MainProductData[] | void;
}>({
  wordList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateList: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  filtering: () => {
    [{}];
  },
});

const LOW = "30,000 이하";
const MEDIUM = "30,000 ~ 100,000";
const HIGH = "100,000 이상";

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [wordList, setWordList] = useState<string[]>([]);

  useEffect(() => {
    console.log(wordList);
  }, [wordList]);

  const updateList = (word: string) => {
    if (wordList.includes(word))
      setWordList(prev => prev.filter(item => item !== word));
    else setWordList(prev => [...prev, word]);
  };

  const filtering = (data: MainProductData[]) => {
    const priceMapping = (price: number, word: string) => {
      if (word === LOW) return price <= 30000;
      else if (word === MEDIUM) return price >= 30000 && price <= 100000;
      else if (word === HIGH) return price >= 100000;
    };

    const filteredData = wordList.reduce((acc, cur) => {
      acc = acc.filter(
        (product: any) =>
          product.style === cur ||
          product.category === cur ||
          priceMapping(product.price, cur),
      );
      return acc;
    }, data);

    return filteredData;
  };

  return (
    <FilterContext.Provider
      value={{
        wordList,
        updateList,
        filtering,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };

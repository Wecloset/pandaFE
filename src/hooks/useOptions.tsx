import React, { useState } from "react";
import { tabData } from "../lib/fake-data";

interface Options {
  [key: string]: { name: string; current: boolean; list: string[] };
}

const useOptions = () => {
  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>({
    category: { name: "카테고리", current: false, list: tabData.category },
    style: { name: "스타일", current: false, list: tabData.style },
    brand: { name: "브랜드", current: false, list: tabData.brand },
    rental: { name: "대여 가능", current: false, list: tabData.rental },
  });

  const closeTab = () => setIsTabOpen(false);

  const openOptionItem = (name: string) => {
    const newTabItem: Options = {};
    for (const key in options) {
      const val =
        options[key].name === name
          ? { ...options[key], current: true }
          : { ...options[key], current: false };
      newTabItem[key] = val;
    }
    setOptions(newTabItem);
    setIsTabOpen(true);
  };

  const selectOptionItem = (
    event: React.MouseEvent<HTMLLIElement>,
    name: string,
  ) => {
    const target = event.target as HTMLLIElement;
    const newTabItem: Options = {};
    for (const key in options) {
      const val =
        options[key].name === name
          ? { ...options[key], name: target.textContent as string }
          : options[key];
      newTabItem[key] = val;
    }
    setOptions(newTabItem);
    setIsTabOpen(false);
  };

  const submitBrand = (
    event: React.FormEvent<HTMLFormElement>,
    brandName: string,
  ) => {
    event.preventDefault();
    const newTabItem: Options = {};
    for (const key in options) {
      const val =
        key === "brand"
          ? { ...options[key], name: brandName as string }
          : options[key];
      newTabItem[key] = val;
    }
    setOptions(newTabItem);
    setIsTabOpen(false);
  };

  return {
    options,
    isTabOpen,
    openOptionItem,
    selectOptionItem,
    submitBrand,
    closeTab,
  };
};

export default useOptions;

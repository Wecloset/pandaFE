import { FormEvent, MouseEvent, useState } from "react";
import { Options } from "../types/create-type";

const useOptions = (initialValues: Options) => {
  const initialOptions = initialValues ? initialValues : {};
  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>(initialOptions);

  const openTab = () => setIsTabOpen(true);
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

  const selectOptionItem = (event: MouseEvent<HTMLLIElement>, name: string) => {
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
    event: FormEvent<HTMLFormElement>,
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
    openTab,
    closeTab,
  };
};

export default useOptions;

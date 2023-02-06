import { NextPage } from "next";
import React, { useState } from "react";
import MarketPage from "../../containers/market/market-list";

const Market: NextPage = () => {
  const [category, setCategory] = useState<string>("all");
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  const categoryClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    setCategory(target.name);
  };

  const openFilterOverlay = (event: React.MouseEvent) => {
    event.preventDefault();
    setFilterOpen(true);
  };

  const props = {
    category,
    categoryClick,
    isFilterOpen,
    openFilterOverlay,
  };

  return <MarketPage {...props} />;
};

export default Market;

import { NextPage } from "next";
import { useState } from "react";
import MarketPage from "../../containers/market-list";

const Market: NextPage = () => {
  const [category, setCategory] = useState<string>("all");

  const categoryClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    setCategory(target.name);
  };

  const props = {
    category,
    categoryClick,
  };

  return <MarketPage {...props} />;
};

export default Market;

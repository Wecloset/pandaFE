import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import productData from "../../lib/fake-data";
import MainProduct from "./product-item";
import MainList from "./product-item";

interface Recommend {
  id: number;
  title: string;
  subtitle: string;
  rental: string;
  price: string;
  view?: number;
  like?: number;
}

const RecommentList = () => {
  const [recommendItem, setRecommendItem] = useState<Recommend[]>([]);

  const setRandomItem = () => {
    const items = productData.slice();
    const randomItems = [];
    const LIMIT = 4;
    let randomIdx, randomItem;

    for (let i = 0; i < LIMIT; i++) {
      randomIdx = Math.floor(Math.random() * items.length);
      randomItem = items.splice(randomIdx, 1);
      randomItems.push(...randomItem);
    }
    setRecommendItem(randomItems);
  };

  useEffect(() => {
    setRandomItem();
  }, []);

  return (
    <div className="space-y-5 px-5">
      <div>
        <h2 className="text-xl">Style for You</h2>
        <p className="text-textColor-gray-100">
          조은님의 키워드에 적합한 아이템
        </p>
      </div>
      <div className="flex w-full items-center gap-[6px] overflow-hidden overflow-x-scroll font-bold text-common-gray scrollbar-hide">
        <button className="h-9 rounded-lg bg-common-black px-3 text-white">
          키워드
        </button>
        <button className="h-9 rounded-lg border-2 border-common-black px-3">
          키워드
        </button>
        <button className="h-9 rounded-lg border-2 border-common-black px-3">
          키워드
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {recommendItem.map((data: any) => (
          <MainProduct key={data.id} {...data} imgw="w-full" imgh="h-[190px]" />
        ))}
      </ul>
      <button className="flex h-10 w-full items-center justify-center border-2 border-textColor-gray-50">
        <Icon icon="ic:baseline-refresh" className="mr-1 -mt-1 text-lg" />
        <span>스트릿웨어</span>
      </button>
    </div>
  );
};

export default RecommentList;

import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";
import { ProductData } from "../../types/data-type";
import { cls } from "../../utils/class";
import MainProduct from "./product-item";

interface RecommendProps {
  keywords?: { id: number; tag: string }[];
  nickname?: string;
  productsData: ProductData[];
}

interface Recommends {
  [key: string]: ProductData[];
}

const RecommendList: NextPage<RecommendProps> = ({ productsData }) => {
  const userInfo = useRecoilValue(currentUserInfoQuery);
  const keywords = userInfo ? userInfo.keywords : null;
  const nickname = userInfo ? userInfo.nickname : "";
  const [keyword, setKeyword] = useState<string>("");
  const [keywordItems, setKeywordItems] = useState<Recommends>({});
  const [recommendList, setRecommendList] = useState<Recommends>({});

  const random = (productData: ProductData[]) => {
    const items = productData.slice();
    const itemList = [];
    const LIMIT = 4;
    let randomIdx, randomItem;
    for (let i = 0; i < LIMIT; i++) {
      randomIdx = Math.floor(Math.random() * items.length);
      randomItem = items.splice(randomIdx, 1);
      itemList.push(...randomItem);
    }
    return itemList;
  };

  const setRecommends = (products: ProductData[]) => {
    const recommends: Recommends = {};
    const randoms: Recommends = {};

    keywords.forEach(({ tag }: { tag: string }) => {
      const recommendItems = products.filter(product => product.style === tag);
      recommends[tag] = recommendItems;
    });

    setKeywordItems(recommends);

    Object.entries(recommends).forEach(
      ([key, value]: [key: string, value: ProductData[]]) => {
        const randomItems = random(value);
        randoms[key] = randomItems;
      },
    );

    setRecommendList(randoms);
  };

  const clickKeyword = (tagName: string) => {
    setKeyword(tagName);
  };

  const refresh = () => {
    const key = keyword !== "" ? keyword : "추천아이템";
    const newRandomItems = random(keywordItems[key]);
    setRecommendList((prev: Recommends) => ({
      ...prev,
      [key]: newRandomItems,
    }));
  };

  const setContents = (products: ProductData[]) => {
    if (userInfo) {
      setRecommends(products);
    } else {
      const randomList = random(products);
      setKeywordItems({ 추천아이템: products });
      setRecommendList({ 추천아이템: randomList });
    }
  };

  useEffect(() => {
    setKeyword(keywords[0].tag);
  }, [keywords]);

  useEffect(() => {
    if (productsData) setContents(productsData);
  }, [productsData]);

  const contents =
    keyword !== "" ? recommendList[keyword] : recommendList["추천아이템"];

  return (
    <div className="space-y-5 px-5">
      <div>
        <h2 className="text-xl">Style for You</h2>
        <p className="mt-1 text-textColor-gray-100">
          {nickname
            ? `${nickname}님의 키워드에 적합한 아이템`
            : "지금 핫한 아이템"}
        </p>
      </div>
      {keywords && (
        <div className="flex w-full items-center gap-[6px] overflow-hidden overflow-x-scroll font-bold text-common-gray scrollbar-hide">
          {keywords.map(({ tag, id }: { tag: string; id: number }) => (
            <button
              key={id}
              className={cls(
                "h-9 rounded-lg border-2 px-3",
                keyword === tag
                  ? "border-common-black bg-common-black text-white"
                  : "border-common-gray",
              )}
              onClick={() => clickKeyword(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {contents &&
          contents.map((data: ProductData) => (
            <MainProduct key={data.id} {...data} imgh="h-[190px]" />
          ))}
      </div>
      <button
        className="flex h-10 w-full items-center justify-center border-2 border-textColor-gray-50"
        onClick={refresh}
      >
        <Icon icon="ic:baseline-refresh" className="mr-1 -mt-1 text-lg" />
        {keyword !== "" ? (
          <span>{`${keyword} 아이템`}</span>
        ) : (
          <span>추천 아이템</span>
        )}
      </button>
    </div>
  );
};

export default RecommendList;

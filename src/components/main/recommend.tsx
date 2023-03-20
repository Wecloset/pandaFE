import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ProductData } from "../../types/data-type";
import { cls } from "../../utils/class";
import { axiosGet } from "../../utils/services";
import MainProduct from "./product-item";

interface RecommendProps {
  keywords: { id: number; tag: string }[];
  nickname: string;
}

interface Recommends {
  [key: string]: ProductData[];
}

const RecommendList: NextPage<RecommendProps> = ({ keywords, nickname }) => {
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

  const getItems = async () => {
    try {
      const { data } = await axiosGet(`/api/products`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const setRecommends = (products: ProductData[]) => {
    const recommends: Recommends = {};
    const randoms: Recommends = {};

    keywords.forEach(({ tag }) => {
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

  useQuery("products", getItems, {
    enabled: !!keywords,
    onSuccess: data => {
      setRecommends(data);
    },
    onError: ({ message }) => {
      console.log(message);
    },
  });

  const clickKeyword = (tagName: string) => {
    setKeyword(tagName);
  };

  const refresh = () => {
    const newRandomItems = random(keywordItems[keyword]);
    setRecommendList((prev: Recommends) => ({
      ...prev,
      [keyword]: newRandomItems,
    }));
  };

  useEffect(() => {
    if (keywords) setKeyword(keywords[0].tag);
  }, [keywords]);

  /*
  id: 11
  brand: "Hai"
  category: "가방"
  description: "새상품 급 컨디션\n택있음/더스트백있음\n구매가와 사이즈는 사진 확인해주세요!"
  price: 140000
  title: "Hai 넬리 토드백"
  view: 0
  style: "레트로"
  fav: []
  imgurl: (4) [{…}, {…}, {…}, {…}]
  createdDate: "2023-03-19T18:00:36.197Z"
  rental: true
  userId: 1
  */

  return (
    <div className="space-y-5 px-5">
      <div>
        <h2 className="text-xl">Style for You</h2>
        <p className="text-textColor-gray-100">
          {nickname}님의 키워드에 적합한 아이템
        </p>
      </div>
      {keywords && (
        <div className="flex w-full items-center gap-[6px] overflow-hidden overflow-x-scroll font-bold text-common-gray scrollbar-hide">
          {keywords.map(({ tag, id }) => (
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
      <ul className="grid grid-cols-2 gap-3">
        {recommendList[keyword]?.length > 0 &&
          recommendList[keyword].map((data: any) => (
            <MainProduct
              key={data.id}
              {...data}
              imgw="w-full"
              imgh="h-[190px]"
            />
          ))}
      </ul>
      <button
        className="flex h-10 w-full items-center justify-center border-2 border-textColor-gray-50"
        onClick={refresh}
      >
        <Icon icon="ic:baseline-refresh" className="mr-1 -mt-1 text-lg" />
        <span>{`${keyword} 아이템`}</span>
      </button>
    </div>
  );
};

export default RecommendList;

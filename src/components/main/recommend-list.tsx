import Image from "next/image";
import React, { useEffect } from "react";
import MainProduct from "./product-item";
import emptybox from "../../../public/asset/image/emptybox.svg";
import { NextPage } from "next";
import { ProductData, UserData } from "../../types/data-type";
import { useQuery } from "react-query";
import { apiGet } from "../../utils/request";
import { random } from "../../utils/random";
import { useRecoilValue } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";

interface Recommends {
  [key: string]: ProductData[];
}

interface RecommendListProps {
  content: ProductData[];
  onSetKeywords: (keywords: Recommends) => void;
  onSetRecommends: (recommends: Recommends) => void;
}

const RecommendList: NextPage<RecommendListProps> = ({
  content,
  onSetKeywords,
  onSetRecommends,
}) => {
  const userData = useRecoilValue<UserData>(currentUserInfoQuery);

  const { data: products } = useQuery("products", apiGet.GET_ITEMS, {
    suspense: true,
  });

  const setRecommends = (products: ProductData[]) => {
    const recommends: Recommends = {};
    const randoms: Recommends = {};

    if (userData.keywords.length > 0)
      userData.keywords.forEach(({ tag }: { tag: string }) => {
        const recommendItems = products.filter(
          product => product.style === tag,
        );
        recommends[tag] = recommendItems;
      });

    onSetKeywords(recommends);

    Object.entries(recommends).forEach(
      ([key, value]: [key: string, value: ProductData[]]) => {
        const randomItems = random(value);
        randoms[key] = randomItems;
      },
    );

    onSetRecommends(randoms);
  };

  const setContents = (products: ProductData[]) => {
    if (!userData) {
      const randomList = random(products);
      onSetKeywords({ 추천아이템: products });
      onSetRecommends({ 추천아이템: randomList });
    } else {
      setRecommends(products);
    }
  };

  useEffect(() => {
    setContents(products);
  }, []);

  return (
    <>
      {!content ? (
        <div className="flex min-h-[540px] items-center justify-center text-center">
          <div>
            <div className="mx-auto mb-4 h-20 w-20">
              <Image src={emptybox} alt="" width={80} height={80} />
            </div>
            <p>해당 키워드에 준비된 상품이 없습니다.</p>
          </div>
        </div>
      ) : (
        <div className="grid min-h-[540px] grid-cols-2 gap-3 transition">
          {content?.map(data => (
            <MainProduct {...data} key={data.id} imgh="h-[190px]" />
          ))}
        </div>
      )}
    </>
  );
};

export default RecommendList;

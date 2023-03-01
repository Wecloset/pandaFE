import { Icon } from "@iconify/react";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Header from "../../components/header";
import ImageSlide from "../../components/market/detail/image-slide";

import {
  categoryToEng,
  firstToUppercase,
  priceAddComma,
} from "../../lib/markets";
import { MainProductData, ProductData } from "../../types/data-type";

interface Product {
  productData: {
    message: string;
    data: ProductData;
  };
}

// updateLikes는 isLikeActive값에 의존적임. (바뀐 isLikeActive값을 payload로 보내야 함.)
const updateLikes = async (
  productId: number,
  payload: { likes: number; isLikeActive: boolean },
) => {
  console.log("updating likes...");
  const response = await axios.post(`/api/products/${productId}/likes`, {
    headers: { "Content-Type": "application/json" },
    payload,
  });
  console.log(response);
};

const updateViewCount = async (
  productId: number,
  payload: { view: number },
) => {
  console.log("updating view count...");
  const response = await axios.post(`/api/products/${productId}/views`, {
    headers: { "Content-Type": "application/json" },
    payload,
  });
  console.log(response);
};

const Product: NextPage<Product> = ({ productData }) => {
  const {
    id: productId,
    brand,
    category,
    description,
    price,
    title,
    imgurl,
    user,
    view,
    likes,
    hashTag,
  } = productData.data;
  const [isLikeActive, setIsLikeActive] = useState<boolean>(false);
  const [likeValue, setLikeValue] = useState<number>(likes); // 업데이트를 바로바로 보여주기 위한 state

  const updateLikeCount = async () => {
    setIsLikeActive(prev => !prev);
    isLikeActive
      ? setLikeValue(prev => prev - 1)
      : setLikeValue(prev => prev + 1);
  };

  // update like count
  useEffect(() => {
    updateLikes(productId, { likes, isLikeActive });
  }, [isLikeActive]);

  // update view count
  useEffect(() => {
    const productLog = localStorage.getItem("panda-market");

    if (!productLog) {
      console.log("product log is not defined.");
      const localData = {
        product: [productId],
      };
      localStorage.setItem("panda-market", JSON.stringify(localData));
      updateViewCount(productId, { view });
      return;
    }

    let isExisted = null;
    const views = JSON.parse(productLog as string).product;
    isExisted = views.indexOf(productId) !== -1 ? true : false;

    if (!isExisted) {
      const localData = {
        product: [...views, productId],
      };
      localStorage.setItem("panda-market", JSON.stringify(localData));
      updateViewCount(productId, { view });
    }
  }, []);

  return (
    <>
      <Header goBack />
      <ImageSlide images={imgurl} />
      <div className="p-5">
        <div className="flex justify-between">
          <div>
            <p className="text-base">{firstToUppercase(brand)}</p>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          {!isLikeActive ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
              <Icon
                icon="icon-park-outline:like"
                className="text-lg"
                onClick={updateLikeCount}
              />
            </div>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black bg-common-black ">
              <Icon
                icon="icon-park-solid:like"
                color="#ff5252"
                className=" border border-common-black text-lg"
                onClick={updateLikeCount}
              />
            </div>
          )}
        </div>
        <div className="mt-4 mb-6 flex gap-2">
          <div className="rounded-full border border-common-black px-2 py-0.5">
            {categoryToEng(category)}
          </div>
          <div className="rounded-full border border-common-black px-2 py-0.5">
            {firstToUppercase(brand)}
          </div>
        </div>
        <div className="mb-4 flex text-xs text-commom-gray">
          <span className="mr-2">조회 {view}</span>
          <span>찜 {likeValue}</span>
        </div>
        <div className="border-t border-b py-[18px]">
          <p className="mb-8 whitespace-pre-wrap">{description}</p>
          {hashTag && (
            <ul className="flex space-x-3 text-primary-violet">
              {hashTag?.map(item => (
                <li key={item.id}>#{item.tag}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="py-5">
          <h3 className="mb-4 text-lg font-bold">Seller</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-[50px] w-[50px] rounded-full border border-common-black bg-slate-400" />
              <span className="ml-4 text-base font-bold">{user.nickname}</span>
            </div>
            <button className="h-8 bg-black px-4 py-1 text-white">
              메시지
            </button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 flex w-[390px] items-center justify-between pl-5">
        <p className="text-2xl font-bold">
          {priceAddComma(price)}
          <span className="text-lg">원</span>
        </p>
        <div className="relative w-64">
          <Button text="구매하기" color="bg-black" fontColor="text-white" />
        </div>
      </div>
    </>
  );
};

const getAllProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/products");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getOneProduct = async (id: string | string[]) => {
  const productId = id;
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${productId}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getAllProducts();

  const paths = response.map((post: MainProductData) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;

  let productData = null;
  if (params?.id) {
    productData = await getOneProduct(params.id);
  }

  return { props: { productData } };
};

export default Product;

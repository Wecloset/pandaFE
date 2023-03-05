import { Icon } from "@iconify/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MainProductData, ProductData } from "../../types/data-type";
import Button from "../../components/button";
import Header from "../../components/header";
import ImageSlide from "../../components/market/detail/image-slide";
import {
  categoryToEng,
  firstToUppercase,
  priceAddComma,
} from "../../utils/markets";
import {
  getAllProducts,
  getOneProduct,
  getUserData,
  updateUserProduct,
  updateViewCount,
} from "../../utils/market-post";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/user";

interface Product {
  productData: {
    message: string;
    data: ProductData;
  };
}

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
    fav,
    hashTag,
  } = productData.data;
  const userEmail = useRecoilValue(currentUserState);
  const [userId, setUserId] = useState<number>(0);
  const [isLikeActive, setIsLikeActive] = useState<boolean | null>(null);
  const [likeValue, setLikeValue] = useState<number>(fav.length);

  const updateLikeCount = async () => {
    if (isLikeActive === null) setIsLikeActive(true);
    else setIsLikeActive(prev => !prev);

    isLikeActive
      ? setLikeValue(prev => prev - 1)
      : setLikeValue(prev => prev + 1);
  };

  useEffect(() => {
    if (!userEmail) return;
    getUserData({ userEmail }).then(({ id, fav }) => {
      setUserId(id);
      // 해당유저 찜상품이면 버튼active true로 변경.
      fav.forEach(
        (item: { productId: number }) =>
          item.productId === productId && setIsLikeActive(true),
      );
    });

    // update view count
    const log = localStorage.getItem("panda-market");
    const productLog = JSON.parse(log as string);
    const viewProducts = productLog.map(
      (item: { user: string; product: number[] }) => {
        if (item.user === userEmail) return item.product;
      },
    );

    if (!log) {
      const localData = [
        {
          user: userEmail,
          product: [productId],
        },
      ];
      localStorage.setItem("panda-market", JSON.stringify(localData));
      updateViewCount(productId, { view });
      return;
    }

    let isExisted = null;
    isExisted = viewProducts[0].indexOf(productId) !== -1 ? true : false;
    if (!isExisted) {
      const localData = productLog.map(
        (item: { user: string; product: number[] }) =>
          item.user === userEmail
            ? { ...item, product: [...item.product, productId] }
            : item,
      );
      localStorage.setItem("panda-market", JSON.stringify(localData));
      updateViewCount(productId, { view });
    }
  }, [userEmail]);

  // update user - fav
  useEffect(() => {
    let isExisted = false;
    if (fav.length > 0)
      fav.forEach(item => (isExisted = item.userId === userId ? true : false));
    // 첫 렌더링 요청X or 이미 찜한상품일 경우 요청X
    if (isLikeActive === null || (isLikeActive && isExisted)) return;

    updateUserProduct({ userId, productId, isLikeActive });
  }, [isLikeActive]);

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

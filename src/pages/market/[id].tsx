import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ProductData, UserData } from "../../types/data-type";
import Button from "../../components/button";
import Header from "../../components/header";
import ImageSlide from "../../components/market/detail/image-slide";
import {
  categoryToEng,
  firstToUppercase,
  priceAddComma,
} from "../../utils/markets";
import { useRecoilValue } from "recoil";
import { axiosGet, axiosPost } from "../../utils/services";
import { currentUserState } from "../../recoil/user";
import { useRouter } from "next/router";
import { updateViews } from "../../utils/market-view";

interface Product {
  productData: {
    message: string;
    data: ProductData;
  };
}

const Product: NextPage<Product> = () => {
  const router = useRouter();
  const { id: productId } = router.query;
  const userData = useRecoilValue(currentUserState) as UserData;

  console.log(userData); // 메인페이지 -> 마켓 -> 마켓디테일 이동시 null, 새로고침시{}.

  const [product, setProduct] = useState<ProductData | null>();
  const [isLikeActive, setIsLikeActive] = useState<boolean | null>(null);
  const [likeValue, setLikeValue] = useState<number>(0);

  const updateLikeCount = () => {
    if (isLikeActive === null) setIsLikeActive(true);
    else setIsLikeActive(prev => !prev);

    isLikeActive
      ? setLikeValue(prev => prev - 1)
      : setLikeValue(prev => prev + 1);
  };

  const getProductData = async () => {
    try {
      const { data } = await axiosGet(`/api/products/${productId}`);
      setProduct(data.product);
    } catch (err) {
      console.log(err);
    }
  };

  const pageSetting = () => {
    if (product && productId) {
      setLikeValue(product.fav.length);

      if (!userData) return;
      const { email: userEmail, fav } = userData;
      updateViews(userEmail, +productId, product.view);

      // fav button style setting
      fav.forEach((item: { productId: number }) => {
        item.productId === +productId && setIsLikeActive(true);
      });
    }
  };

  // update fav
  useEffect(() => {
    if (!product) return;

    let isExisted = false;
    const { fav } = product;
    const { id: userId } = userData;

    if (fav.length > 0)
      fav.forEach(item => (isExisted = item.userId === userId ? true : false));
    // 첫 렌더링 요청X or 이미 찜한상품일 경우 요청X
    if (isLikeActive === null || (isLikeActive && isExisted)) return;

    axiosPost("/api/user/fav", { userId, productId, isLikeActive });
  }, [isLikeActive]);

  useEffect(() => {
    if (productId) getProductData();
  }, [productId]);

  useEffect(() => {
    pageSetting();
  }, [userData, product]);

  return (
    <>
      <Header goBack />
      {product && (
        <>
          <ImageSlide images={product.imgurl} />
          <div className="p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-base">{firstToUppercase(product.brand)}</p>
                <h1 className="text-xl font-bold">{product.title}</h1>
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
                {categoryToEng(product.category)}
              </div>
              <div className="rounded-full border border-common-black px-2 py-0.5">
                {firstToUppercase(product.brand)}
              </div>
            </div>
            <div className="mb-4 flex text-xs text-commom-gray">
              <span className="mr-2">조회 {product.view}</span>
              <span>찜 {likeValue}</span>
            </div>
            <div className="border-t border-b py-[18px]">
              <p className="mb-8 whitespace-pre-wrap">{product.description}</p>
              {product.hashTag && (
                <ul className="flex space-x-3 text-primary-violet">
                  {product.hashTag?.map(item => (
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
                  <span className="ml-4 text-base font-bold">
                    {product.user.nickname}
                  </span>
                </div>
                <button className="h-8 bg-black px-4 py-1 text-white">
                  메시지
                </button>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 flex w-[390px] items-center justify-between pl-5">
            <p className="text-2xl font-bold">
              {priceAddComma(product.price)}
              <span className="text-lg">원</span>
            </p>
            <div className="relative w-64">
              <Button text="구매하기" color="bg-black" fontColor="text-white" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;

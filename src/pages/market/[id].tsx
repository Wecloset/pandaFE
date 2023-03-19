import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { UserData } from "../../types/data-type";
import Button from "../../components/button";
import Header from "../../components/header";
import ImageSlide from "../../components/market/detail/image-slide";
import {
  categoryToEng,
  firstToUppercase,
  priceAddComma,
} from "../../utils/markets";
import { useRecoilValue } from "recoil";
import { axiosGet } from "../../utils/services";
import { currentUserState } from "../../recoil/user";
import { updateViews } from "../../utils/market-view";
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../../components/loading-spinner";
import useFav from "../../hooks/useFav";
import { useRouter } from "next/router";

const Product: NextPage = () => {
  const userData = useRecoilValue(currentUserState) as UserData;
  const currentUserId = userData ? userData.id : 0;

  const router = useRouter();
  const { id: productId } = router.query;

  const {
    isFavActive,
    favCount,
    updateFav,
    changeCount,
    changeButtonSytle,
    updateFavCount,
    initialButtonStyle,
  } = useFav(currentUserId);

  const getProduct = async () => {
    try {
      console.log("get data");
      const { data } = await axiosGet(`/api/products/${productId}`);
      return data.product;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: product, isLoading } = useQuery("getData", getProduct, {
    enabled: !!productId,
    notifyOnChangeProps: "tracked",
  });

  const { mutate } = useMutation(updateFav, {
    onSuccess: ({ data }) => {
      console.log(data.message);
      changeCount();
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  const toggleFavButton = async () => {
    changeButtonSytle();
    mutate({ currentUserId, productId: +(productId as string) });
  };

  const setInitialFav = () => {
    updateFavCount(product.fav.length);
    initialButtonStyle(product.fav);
  };

  useEffect(() => {
    if (!product) return;
    setInitialFav();

    if (!userData) return;
    const { email: userEmail } = userData;
    updateViews(userEmail, +(productId as string), product.view);
  }, [currentUserId, product]);

  return (
    <>
      <Header goBack />
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <ImageSlide images={product.imgurl} isLoading={isLoading} />
          <div className="p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-base">{firstToUppercase(product.brand)}</p>
                <h1 className="text-xl font-bold">{product.title}</h1>
              </div>
              {!isFavActive ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
                  <Icon
                    icon="icon-park-outline:like"
                    className="text-lg"
                    onClick={toggleFavButton}
                  />
                </div>
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black bg-common-black ">
                  <Icon
                    icon="icon-park-solid:like"
                    color="#ff5252"
                    className=" border border-common-black text-lg"
                    onClick={toggleFavButton}
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
            <div className="mb-4 flex text-xs text-common-gray">
              <span className="mr-2">조회 {product.view}</span>
              <span>찜 {favCount}</span>
            </div>
            <div className="border-t border-b py-[18px]">
              <p className="mb-8 whitespace-pre-wrap">{product.description}</p>
              {product.hashTag && (
                <ul className="flex space-x-3 text-primary-violet">
                  {product.hashTag?.map((item: { id: number; tag: string }) => (
                    <li key={item.id}>#{item.tag}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="py-5 pb-20">
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
          <div className="fixed bottom-0 flex w-[390px] items-center justify-between border border-t-common-black bg-white pt-5 pl-5">
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

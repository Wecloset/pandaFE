import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../../components/ui/button";
import ImageSlide from "../../components/market/detail/image-slide";
import {
  categoryToEng,
  firstToUppercase,
  priceAddComma,
} from "../../utils/markets";
import { useRecoilValueLoadable } from "recoil";
import { useMutation, useQuery } from "react-query";
import useFav from "../../hooks/useFav";
import { useRouter } from "next/router";
import { currentUserInfoQuery } from "../../recoil/user";
import Header from "../../components/ui/header";
import LoadingSpinner from "../../components/ui/loading-spinner";
import useModal from "../../hooks/useModal";
import Overlay from "../../components/ui/overlay";
import { updateViews } from "../../utils/market-view";
import { apiGet } from "../../utils/request";

const Product: NextPage = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const { state, contents: userContents } = userInfo;

  const [currentUserId, setCurrentUserId] = useState<number>(0);

  const {
    isFavActive,
    favCount,
    updateFav,
    changeCount,
    changeButtonSytle,
    updateFavCount,
    initialButtonStyle,
  } = useFav(currentUserId);

  const { Modal, show, setModalState } = useModal();

  useEffect(() => {
    if (userContents) setCurrentUserId(userContents.id);
  }, [state]);

  const getProduct = async () => {
    const data = await apiGet.GET_ITEM(productId as string);
    return data.product;
  };

  const { data: product, isLoading } = useQuery("getData", getProduct, {
    enabled: !!productId,
    notifyOnChangeProps: "tracked",
  });

  const { mutate } = useMutation(updateFav, {
    onSuccess: ({ message }) => {
      changeCount();
    },
    onError: ({ response }) => {
      console.log(response.data.message);
    },
  });

  const goLoginPage = () => router.push("/login");

  const toggleFavButton = async () => {
    if (!currentUserId) {
      setModalState({
        message: "로그인 후 이용하실 수 있습니다.,로그인페이지로 이동할까요?",
        btnText: "로그인 하기",
        submit: goLoginPage,
      });
      return;
    }

    changeButtonSytle();
    mutate({
      currentUserId,
      productId: +(productId as string),
    });
  };

  const setInitialFav = () => {
    updateFavCount(product.fav.length);
    initialButtonStyle(product.fav);
  };

  useEffect(() => {
    if (!product) return;
    setInitialFav();

    if (!userContents) return;
    updateViews(userContents.id, Number(productId), product.view);
  }, [product]);

  return (
    <>
      <Header goBack />
      {show && (
        <>
          <Modal />
          <Overlay />
        </>
      )}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      {product && (
        <>
          <ImageSlide images={product.imgurl} isLoading={isLoading} />
          <div className="p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-base">{firstToUppercase(product.brand)}</p>
                <h1 className="text-xl font-bold">{product.title}</h1>
              </div>
              {!isFavActive ? (
                <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-common-black transition hover:scale-105">
                  <Icon
                    icon="icon-park-outline:like"
                    className="text-lg"
                    onClick={toggleFavButton}
                  />
                </div>
              ) : (
                <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-common-black bg-common-black transition hover:scale-105 ">
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
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full border border-common-black">
                    <img
                      src={product.user.profileImg}
                      alt="유저프로필이미지"
                      className="h-full w-full object-cover"
                    />
                  </div>
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
          <div className="fixed bottom-0 flex w-[390px] items-center justify-between border border-t-common-black bg-white p-5">
            <p className="text-2xl font-bold">
              {priceAddComma(product.price)}
              <span className="text-lg">원</span>
            </p>
            <div className="relative">
              <Button
                type="button"
                text="구매하기"
                classes="bg-black"
                width="w-[215px]"
                fontColor="text-white"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;

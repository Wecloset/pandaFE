import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userEmailState } from "../recoil/user";
import { getSession } from "next-auth/react";
import Button from "../components/ui/button";
import RecentStyle from "../components/main/recent-style";
import MainLookbook from "../components/main/lookbook";
import Header from "../components/ui/header";
import Navigation from "../components/ui/navigation";
import FloatingButton from "../components/ui/floating-button";
import useModal from "../hooks/useModal";
import ImageSlide from "../components/market/detail/image-slide";
import { bannerImages } from "../lib/banner-images";
import Recommend from "../components/main/recommend";
import LoadingSpinner from "../components/ui/loading-spinner";
import ErrorBoundary from "./error-boundary";
import NextSuspense from "../hooks/suspense";

const Home: NextPage = () => {
  const setEmail = useSetRecoilState(userEmailState);

  const { show, setModalState, Modal } = useModal();

  useEffect(() => {
    const fetchSession = async () => {
      getSession().then(session => {
        if (session) {
          const email = session.user?.email as string;
          setEmail(email);
        } else {
          setEmail("");
          localStorage.removeItem("current_user");
        }
      });
    };
    fetchSession();
  }, []);

  // const loadingfallback = (
  //   <div className="relative min-h-[540px]">
  //     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
  //       <LoadingSpinner />
  //     </div>
  //   </div>
  // );

  return (
    <>
      <Header />
      {show && <Modal />}
      <ImageSlide
        images={bannerImages}
        imgH="h-72"
        propH={288}
        slideTime={5500}
      />
      <ErrorBoundary
        errorFallback={<p>something went wrong...</p>}
        setModal={setModalState}
      >
        <div className="space-y-10 py-10">
          <Recommend />
          <RecentStyle />
          <MainLookbook />
          <div className="flex h-52 w-full flex-col items-center justify-center bg-gradient py-10 text-white">
            <p className="text-base">매일 수익이 발생하는 옷장공유</p>
            <p className="mt-1 mb-5 text-2xl">지금 시작해보세요!</p>
            <Button
              type="button"
              text="바로가기"
              fontColor="text-white"
              classes="bg-black"
              divWidth="w-32"
            />
          </div>
        </div>
        <Navigation setModal={setModalState} />
        <FloatingButton path="/create" setModal={setModalState} />
      </ErrorBoundary>
    </>
  );
};

export default Home;

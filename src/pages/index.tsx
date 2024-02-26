import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Button from "../components/ui/button";
import RecentStyle from "../components/main/recent-style";
import MainLookbook from "../components/main/lookbook";
import Header from "../components/ui/header";
import Navigation from "../components/ui/navigation";
import FloatingButton from "../components/ui/floating-button";
import ImageSlide from "../components/market/detail/image-slide";
import Recommend from "../components/main/recommend";
import ErrorBoundary from "./error-boundary";

import useModal from "../hooks/useModal";
import { bannerImages } from "../lib/banner-images";

const Home: NextPage = () => {
  const [userEmail, setUserEmail] = useState<string>();

  const { data, status } = useSession();

  const { show, setModalState, Modal } = useModal();

  const router = useRouter();

  const goLoginPage = () => router.push("/login");

  useEffect(() => {
    // 메인페이지로 라우팅될 때마다 인증처리.
    if (status === "authenticated") {
      console.log("login");
      setUserEmail(data.user?.email as string);
      return;
    }

    if (status === "unauthenticated") {
      console.log("사용자 인증 오류!");
      const modalProps = {
        message:
          "사용자 인증이 해제되어 재로그인이 필요합니다.,로그인페이지로 이동할까요?",
        btnText: "재로그인하기",
        submit: goLoginPage,
      };
      setModalState(modalProps);
      return;
    }
  }, [status]);

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
          <Recommend email={userEmail} />
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

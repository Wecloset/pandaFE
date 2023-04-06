import React from "react";
import Header from "../../components/ui/header";
import graphic from "../../../public/asset/image/graphic3.svg";
import Image from "next/image";
import Button from "../../components/ui/button";
import { useRouter } from "next/router";

const Welcome = () => {
  const router = useRouter();
  return (
    <>
      <Header text="SIGNUP" goBack noGoBack />
      <div className="signup-minheight flex flex-col items-center justify-center px-8 pt-4">
        <Image
          src={graphic}
          alt="판다그래픽이미지"
          width={190}
          height={160}
          className="mb-6"
        />
        <h1 className="mb-6 font-myfont text-4xl font-extrabold">Welcome!</h1>
        <p className="mb-1">판다피플이 되신것을 환영합니다!</p>
        <p>로그인하고 다양한 서비스를 경험해보세요!</p>
      </div>
      <Button
        type="button"
        classes="bg-black px-2 hover:bg-primary-green hover:text-black transition duration-300"
        text="로그인"
        textWidth="w-full"
        btnWrapClasses="px-6"
        position="absolute bottom-5"
        onClick={() => router.replace("/login")}
      />
    </>
  );
};

export default Welcome;

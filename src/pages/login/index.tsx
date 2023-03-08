import type { NextPage } from "next";
import Image from "next/image";
import logo from "../../../public/asset/image/full-logo.png";
import graphic1 from "../../../public/asset/image/graphic1.svg";
import graphic2 from "../../../public/asset/image/graphic2.svg";
import graphic3 from "../../../public/asset/image/graphic3.svg";
import graphic4 from "../../../public/asset/image/graphic4.svg";
import LoginForm from "../../components/login/login-form";
import Button from "../../components/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const GoogleLogin = async () => {
    await signIn("google");
  };
  const KakaoLogin = async () => {
    await signIn("kakao");
  };
  useEffect(() => {
    session && router.push("/");
  }, [session]);

  return (
    <div className="relative h-screen w-full bg-black">
      <Image src={graphic1} alt="" className="absolute -top-3 -left-3 w-1/2" />
      <Image src={graphic2} alt="" className="absolute top-20 right-0 w-1/4" />
      <Image src={graphic3} alt="" className="absolute top-1/2 right-0 w-1/2" />
      <Image src={graphic4} alt="" className="absolute bottom-0 -left-10" />
      <div className="absolute top-1/2 z-10 h-4/5 w-full -translate-y-1/2 px-5">
        <div className="mt-10 pb-10">
          <Image
            src={logo}
            alt="logo"
            className="m-auto h-28 w-auto"
            priority
          />
        </div>
        <LoginForm />
        <Button
          onClick={GoogleLogin}
          text="Continue With Google"
          color="bg-white"
          icon="ph:google-logo"
          logo="flex items-center"
          textWidth="w-4/5"
          padding="px-8"
          position="absolute left-0 bottom-[60px]"
        />
        <Button
          onClick={KakaoLogin}
          text="Continue With Kakao"
          color="bg-primary-yellow"
          icon="ri:kakao-talk-fill"
          logo="flex items-center"
          textWidth="w-4/5"
          padding="px-8"
          position="absolute left-0 bottom-0"
        />
      </div>
    </div>
  );
};

export default Login;

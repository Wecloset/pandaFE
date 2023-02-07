import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/asset/image/full-logo.png";
import ButtonItem from "../../components/button";
import graphic1 from "../../../public/asset/image/graphic1.svg";
import graphic2 from "../../../public/asset/image/graphic2.svg";
import graphic3 from "../../../public/asset/image/graphic3.svg";
import graphic4 from "../../../public/asset/image/graphic4.svg";

const Login: NextPage = () => {
  return (
    <div className="relative h-screen w-full bg-black">
      <Image src={graphic1} alt="" className="absolute -top-3 -left-3 w-1/2" />
      <Image src={graphic2} alt="" className="absolute top-20 right-0 w-1/4" />
      <Image src={graphic3} alt="" className="absolute top-1/2 right-0 w-1/2" />
      <Image src={graphic4} alt="" className="absolute bottom-0 -left-10" />
      <div className="absolute top-1/2 z-10 h-4/5 w-full -translate-y-1/2 px-5">
        <div className="mt-10 pb-10">
          <Image src={logo} alt="logo" className="m-auto h-28" />
        </div>
        <div className="space-y-2 px-3 pb-2 text-base [&>input]:h-[52px] [&>input]:border-b [&>input]:px-4">
          <input
            type="text"
            name="email"
            placeholder="이메일"
            autoComplete="off"
            className="bg-transparent text-white placeholder:text-white focus:border-primary-green "
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="bg-transparent text-white placeholder:text-white focus:border-primary-green"
          />
        </div>
        <div className="mt-6">
          <ButtonItem text="로그인" color="bg-commom-gray" />
          <Link
            href="/sign"
            className="mx-auto mt-3 block w-14 text-white hover:underline"
          >
            회원가입
          </Link>
        </div>
        <ButtonItem
          text="Continue With Google"
          color="bg-white"
          icon="ph:google-logo"
          logo="flex items-center"
          textWidth="w-4/5"
          padding="px-8"
          position="absolute left-0 bottom-[60px]"
        />
        <ButtonItem
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

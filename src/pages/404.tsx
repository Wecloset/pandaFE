import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import notfind from "../../public/asset/image/full-logo.png";
import Button from "../components/button";

const Error404: NextPage = () => {
  return (
    <div className=" flex h-screen flex-col items-center justify-center">
      <Image src={notfind} alt="404" className=" mb-10 h-32 w-44" priority />
      <div className=" text-center">
        <h1 className="mb-3 text-xl">찾을 수 없는 페이지 입니다.</h1>
        <h2 className="mb-10 text-sm">
          요청하신 페이지가 사라졌거나, 잘못된 경로입니다 :)
        </h2>
        <Link href="/">
          <Button
            text="홈으로 이동"
            color="bg-black"
            fontColor="text-white"
            hover="hover:opacity-80"
          />
        </Link>
      </div>
    </div>
  );
};

export default Error404;

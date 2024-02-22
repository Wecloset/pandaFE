import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import notfind from "../../public/asset/image/full-logo.png";

import Button from "../components/ui/button";

const Error404: NextPage = () => {
  return (
    <div className=" flex h-screen flex-col items-center justify-center">
      <Image src={notfind} alt="4s04" className=" mb-10 h-24 w-44" priority />
      <div className=" text-center">
        <h1 className="mb-3 text-xl font-bold">찾을 수 없는 페이지 입니다.</h1>
        <h2 className="mb-10 text-sm">
          요청하신 페이지가 사라졌거나, 잘못된 접근입니다.
        </h2>
        <Link href="/">
          <Button
            type="button"
            text="홈으로 이동"
            classes="bg-black"
            fontColor="text-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default Error404;

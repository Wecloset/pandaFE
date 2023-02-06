import { NextPage } from "next";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/asset/image/logo.png";

const Nav: NextPage<string | any> = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-black bg-white px-5 py-5">
      <Link href="/">
        <Image src={logo} alt="로고이미지" className="h-8 w-7" />
      </Link>

      <div className="flex">
        <Link href="" className="mx-2 text-2xl">
          <Icon icon="mdi:chat-outline" aria-label="채팅하기" />
        </Link>
        <Link href="search" className="mx-2  text-2xl">
          <Icon icon="ic:baseline-search" aria-label="검색하기" />
        </Link>
      </div>
    </div>
  );
};

export default Nav;

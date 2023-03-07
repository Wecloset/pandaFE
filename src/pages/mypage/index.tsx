import { Icon } from "@iconify/react";
import type { NextPage } from "next";
import { useState } from "react";
import Header from "../../components/header";
import { cls } from "../../lib/class";
import productData from "../../lib/fake-data";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/user";
import { UserData } from "../../types/data-type";
import Image from "next/image";

const MyPage: NextPage = () => {
  const userData = useRecoilValue(currentUserState) as UserData;
  const [category, setCategory] = useState<string>("items");
  const categoryClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    setCategory(target.name);
  };
  return (
    <>
      <Header />
      <div className=" relative h-44 bg-gray-300">
        <Icon
          icon="iconoir:profile-circle"
          className="float-right mx-5 my-5 text-2xl"
        />
        <Image
          src={`${userData.profileImg}`}
          alt="유저이미지"
          width={50}
          height={50}
          className=" absolute left-40 top-32 h-20 w-20 rounded-full"
        />
      </div>
      <div className="my-10">
        <div className="mb-4 flex items-center justify-center">
          <p className="mx-1 text-xl font-semibold">{userData.nickname}</p>
          <Icon icon="material-symbols:edit-outline-rounded" />
        </div>
        <div className="mb-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-semibold">6</div>
            <div>followers</div>
          </div>
          <div className="mx-3 text-center">
            <div className="text-xl font-semibold">25</div>
            <div>following</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">10</div>
            <div>products</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className=" mx-1 rounded-2xl border-2 border-solid border-black px-1 py-1">
            #스트릿
          </button>
          <button className=" mx-1 rounded-2xl border-2 border-solid border-black px-1 py-1">
            #미니멀
          </button>
        </div>
      </div>
      <div>
        <div className="text-common-gray grid h-[45px] grid-cols-2 border-y border-common-black bg-white text-base text-textColor-gray-100">
          <button
            onClick={categoryClick}
            className={cls(
              " border-r  border-r-common-black",
              category === "items"
                ? "border-b-2 border-common-black font-bold text-common-black"
                : "",
            )}
            name="items"
          >
            Items
          </button>
          <button
            onClick={categoryClick}
            className={cls(
              " border-r  border-r-common-black",
              category === "looks"
                ? "border-b-2 border-common-black font-bold text-common-black"
                : "",
            )}
            name="looks"
          >
            Looks
          </button>
        </div>
      </div>
      {category === "items" ? (
        <div className="my-3 mx-8  grid grid-cols-2 gap-4">
          {productData.map((v, i) => {
            return (
              <div key={i} className="flex items-center justify-center">
                <Link href="">
                  <div
                    role="img"
                    className=" h-48 w-40 border border-common-black bg-borderColor-gray"
                  />
                  <p className="truncate">{v.subtitle}</p>
                  <p className="truncate text-textColor-gray-100">{v.title}</p>
                  <div className="mt-2 flex items-center">
                    <span
                      aria-label="판매상품"
                      className="mr-[6px] -mt-1 border  border-borderColor-gray px-1 text-xs "
                    >
                      {v.rental}
                    </span>
                    <span aria-label="가격">{v.price}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mx-3 my-3  grid grid-cols-2 gap-4">
          {Array(10)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className=" h-52 w-44 border border-common-black bg-borderColor-gray"
              />
            ))}
        </div>
      )}
    </>
  );
};

export default MyPage;

import { Icon } from "@iconify/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Header from "../../components/ui/header";
import { cls } from "../../utils/class";
import { useRecoilValueLoadable } from "recoil";
import { ProductDataMin, UserData } from "../../types/data-type";
import Image from "next/image";
import { useRouter } from "next/router";
import Navigation from "../../components/ui/navigation";
import LoadingSpinner from "../../components/ui/loading-spinner";
import { currentUserInfoQuery } from "../../recoil/user";
import MainProduct from "../../components/main/product-item";
import withAuth from "../auth";

const MyPage: NextPage = () => {
  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const { state, contents: userContents } = userInfo;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [category, setCategory] = useState<string>("items");

  const categoryClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    setCategory(target.name);
  };

  useEffect(() => {
    if (state === "hasValue") {
      setUserData(userContents);
      setIsLoading(false);
    }
  }, [state]);

  return (
    <>
      <Header />
      <div>
        <div className=" relative h-44 bg-common-gray">
          <Icon
            onClick={() => {
              router.push("/mypage/profile");
            }}
            icon="iconoir:profile-circle"
            className="float-right mx-5 my-5 cursor-pointer text-2xl"
          />
          {userData ? (
            <Image
              src={userData.profileImg as string}
              alt="유저이미지"
              width={50}
              height={50}
              className="absolute left-[155px] top-32 h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="absolute left-[155px] top-32 h-20 w-20 rounded-full bg-textColor-gray-100" />
          )}
        </div>
        <div className="my-10">
          <div className="mb-4 flex items-center justify-center">
            <p className="mx-1 text-xl font-semibold">{userData?.nickname}</p>
          </div>
          <div className="mb-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-semibold">
                {userData ? userData.followers.length : 0}
              </div>
              <div>followers</div>
            </div>
            <div className="mx-3 text-center">
              <div className="text-xl font-semibold">
                {userData ? userData.followings.length : 0}
              </div>
              <div>following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">
                {userData ? userData.product.length : 0}
              </div>
              <div>products</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center px-8">
            {userData?.keywords?.map((keyword, index) => {
              return (
                <div
                  key={index}
                  className="mx-1 my-1 rounded-xl border-[1px] border-solid border-black px-1 py-1 text-xs"
                >
                  {`#${keyword.tag}`}
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid h-[45px] grid-cols-2 border-y border-common-black bg-white text-base text-textColor-gray-100">
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
      {category === "items" && (
        <div className="mx-4 grid grid-cols-2 gap-4 pt-5 pb-20">
          {userData?.product.map((item: ProductDataMin) => (
            <MainProduct {...item} key={item.id} imgh="h-[190px]" />
          ))}
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      <Navigation />
    </>
  );
};

export default withAuth(MyPage);

import type { NextPage } from "next";
import productData from "../lib/fake-data";
import Header from "../components/header";
import Navigation from "../components/navigation";
import MainList from "../components/main/main-list";
import MainLookBook from "../components/main/main-lookbook";
import Button from "../components/button";
import FloatingButton from "../components/floating-button";
import { useSetRecoilState } from "recoil";
import { userState } from "./recoil/user";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Home: NextPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      const email = session?.user?.email;
      if (email) setUserEmail(email);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.post(`/api/user`, {
          headers: { "Content-Type": "application/json" },
          data: { userEmail },
        });
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userEmail]);

  return (
    <>
      <Header />
      <div className="h-72 w-full bg-borderColor-gray" />
      <div className="space-y-8 pt-10">
        <div className="space-y-5 px-5">
          <div>
            <h2 className="text-xl">Style for You</h2>
            <p className="text-textColor-gray-100">
              조은님의 키워드에 적합한 추천리스트
            </p>
          </div>
          <div className="flex items-center gap-4 text-base font-bold text-textColor-gray-50">
            <button>키워드</button>
            <button>키워드</button>
            <button>키워드</button>
          </div>
          <MainList data={productData} />
        </div>
        <div className="px-5">
          <h2 className="mb-3 text-xl">Recent Style</h2>
          <MainList data={productData} />
        </div>
        <div>
          <h2 className="mb-3 px-5 text-xl">Look Book</h2>
          <div className="border border-t-common-black border-b-common-black">
            <ul className="flex">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <MainLookBook key={idx} username="username" />
                ))}
            </ul>
          </div>
        </div>
        <div className="w-full bg-borderColor-gray py-10 text-center text-white">
          <p className="text-base">매일 수익이 발생하는 옷장공유</p>
          <p className="mt-1 text-2xl">지금 시작해보세요!</p>
          <Button
            text="바로가기"
            fontColor="text-white"
            color="bg-black"
            width="w-32"
          />
        </div>
      </div>
      <Navigation />
      <FloatingButton />
    </>
  );
};

export default Home;

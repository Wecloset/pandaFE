import type { NextPage } from "next";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userEmailState } from "../recoil/user";
import { getSession } from "next-auth/react";
import { useQuery } from "react-query";
import Header from "../components/header";
import Navigation from "../components/navigation";
import Button from "../components/button";
import FloatingButton from "../components/floating-button";
import RecentStyle from "../components/main/recent-style";
import MainLookbook from "../components/main/lookbook";
import { axiosGet } from "../utils/services";
import RecommendList from "../components/main/recommend";

const Home: NextPage = () => {
  const setEmail = useSetRecoilState(userEmailState);

  const getItems = async () => {
    try {
      const { data } = await axiosGet(`/api/products`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: products } = useQuery("products", getItems);

  useEffect(() => {
    const fetchSession = async () => {
      getSession().then(session => {
        if (session) {
          const email = session.user?.email as string;
          setEmail(email);
        }
      });
    };
    fetchSession();
  }, []);

  return (
    <>
      <Header />
      <div className="h-72 w-full bg-borderColor-gray" />
      <div className="space-y-10 py-10">
        <RecommendList productsData={products} />
        <RecentStyle productsData={products} />
        <MainLookbook />
        <div className="h-56 w-full bg-borderColor-gray py-10 text-center text-white">
          <p className="text-base">매일 수익이 발생하는 옷장공유</p>
          <p className="mt-1 mb-5 text-2xl">지금 시작해보세요!</p>
          <Button
            text="바로가기"
            fontColor="text-white"
            color="bg-black"
            width="w-32"
          />
        </div>
      </div>
      <Navigation />
      <FloatingButton path="/create" />
    </>
  );
};

export default Home;

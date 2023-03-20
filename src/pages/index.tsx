import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { currentUserState, userState } from "../recoil/user";
import { getSession } from "next-auth/react";
import { useQuery } from "react-query";
import Header from "../components/header";
import Navigation from "../components/navigation";
import Button from "../components/button";
import FloatingButton from "../components/floating-button";
import RecentStyle from "../components/main/recent-style";
import MainLookbook from "../components/main/lookbook";
import { axiosGet } from "../utils/services";
import { UserData } from "../types/data-type";
import RecommendList from "../components/main/recommend";

const Home: NextPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const setUser = useSetRecoilState(userState);
  const resetUser = useResetRecoilState(currentUserState);

  const { data: user } = useQuery<UserData>(
    "getUser",
    async () => {
      const { data } = await axiosGet(`/api/user?email=${userEmail}`);
      console.log(data);
      return data.user;
    },
    {
      enabled: userEmail !== "",
      onSuccess: data => {
        setUser(data);
      },
      onError: err => {
        alert(err);
      },
    },
  );

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      const email = session?.user?.email;

      if (!email) {
        resetUser();
        const localData = localStorage.getItem("current_user");
        if (localData) localStorage.removeItem("current_user");
      } else setUserEmail(email);
    };
    fetchSession();
  }, []);

  return (
    <>
      <Header />
      <div className="h-72 w-full bg-borderColor-gray" />
      <div className="space-y-10 py-10">
        <RecommendList {...(user as UserData)} />
        <RecentStyle />
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

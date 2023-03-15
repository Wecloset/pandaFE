import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/user";
import { getSession } from "next-auth/react";
import { useMutation } from "react-query";
import axios from "axios";
import Header from "../components/header";
import Navigation from "../components/navigation";
import Button from "../components/button";
import FloatingButton from "../components/floating-button";
import RecommentList from "../components/main/recommend";
import RecentStyle from "../components/main/recent-style";
import MainLookbook from "../components/main/lookbook";

const Home: NextPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const setUser = useSetRecoilState(userState);
  const { mutate: getUser } = useMutation(
    async (email: string) => {
      const { data } = await axios.post(`/api/user`, {
        headers: { "Content-Type": "application/json" },
        data: { userEmail: email },
      });
      return data.user;
    },
    {
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
      if (email) setUserEmail(email);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (userEmail) {
      getUser(userEmail);
    }
  }, [userEmail, getUser]);

  return (
    <>
      <Header />
      <div className="h-72 w-full bg-borderColor-gray" />
      <div className="space-y-10 py-10">
        <RecommentList />
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

import type { NextPage } from "next";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userEmailState } from "../recoil/user";
import { getSession } from "next-auth/react";
import { useQuery } from "react-query";
import Button from "../components/ui/button";
import RecentStyle from "../components/main/recent-style";
import MainLookbook from "../components/main/lookbook";
import RecommendList from "../components/main/recommend";
import Header from "../components/ui/header";
import Navigation from "../components/ui/navigation";
import FloatingButton from "../components/ui/floating-button";
import useModal from "../hooks/useModal";
import ImageSlide from "../components/market/detail/image-slide";
import { bannerImages } from "../lib/banner-images";
import { apiGet } from "../utils/request";

const Home: NextPage = () => {
  const setEmail = useSetRecoilState(userEmailState);

  const { show, setModalState, Modal } = useModal();

  const { data: products } = useQuery("products", apiGet.GET_ITEMS);
  const { data: lookbooks } = useQuery("lookbooks", apiGet.GET_LOOKS);

  useEffect(() => {
    const fetchSession = async () => {
      getSession().then(session => {
        if (session) {
          const email = session.user?.email as string;
          setEmail(email);
        } else {
          setEmail("");
          localStorage.removeItem("current_user");
        }
      });
    };
    fetchSession();
  }, []);

  return (
    <>
      <Header />
      {show && <Modal />}
      <ImageSlide
        images={bannerImages}
        imgH="h-72"
        propH={288}
        slideTime={5500}
      />
      <div className="space-y-10 py-10">
        <RecommendList productsData={products} />
        <RecentStyle productsData={products} />
        <MainLookbook lookbookData={lookbooks} />
        <div className="flex h-52 w-full flex-col items-center justify-center bg-gradient py-10 text-white">
          <p className="text-base">매일 수익이 발생하는 옷장공유</p>
          <p className="mt-1 mb-5 text-2xl">지금 시작해보세요!</p>
          <Button
            type="button"
            text="바로가기"
            fontColor="text-white"
            classes="bg-black"
            divWidth="w-32"
          />
        </div>
      </div>
      <Navigation setModal={setModalState} />
      <FloatingButton path="/create" setModal={setModalState} />
    </>
  );
};

export default Home;

import { NextPage } from "next";
import Header from "../../components/header";
import Navigation from "../../components/navigation";
import LookItem from "../../components/lookbook/look-item";
import FloatingButton from "../../components/floating-button";
import { axiosGet } from "../../utils/services";
import { useQuery } from "react-query";
import LoadingSpinner from "../../components/loading-spinner";
import { LookbookData } from "../../types/data-type";
import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";
import { useEffect, useState } from "react";

const Lookbook: NextPage = () => {
  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const { state, contents: userContents } = userInfo;
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    if (userContents) setUserId(userContents.id);
  }, [state]);

  const getAllLooks = async () => {
    try {
      const { data } = await axiosGet("/api/look");
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data: allData, isLoading } = useQuery("lookbooks", getAllLooks);

  return (
    <>
      <Header />
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      <div>
        <ul className="grid grid-cols-2 pb-10">
          {allData?.map((data: LookbookData) => (
            <LookItem key={data.id} {...data} userId={userId} />
          ))}
        </ul>
      </div>
      <FloatingButton path="/create/post" />
      <Navigation />
    </>
  );
};

export default Lookbook;

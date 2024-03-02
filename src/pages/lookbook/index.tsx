import { NextPage } from "next";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

import { useRecoilValueLoadable } from "recoil";
import { currentUserInfoQuery } from "../../recoil/user";

import Header from "../../components/ui/header";
import Navigation from "../../components/ui/navigation";
import LookItem from "../../components/lookbook/look-item";
import FloatingButton from "../../components/ui/floating-button";
import LoadingSpinner from "../../components/ui/loading-spinner";

import useModal from "../../hooks/useModal";
import { apiGet } from "../../utils/request";
import { LookbookData } from "../../types/data-type";

const Lookbook: NextPage = () => {
  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const { state, contents: userContents } = userInfo;
  const [userId, setUserId] = useState<number>(0);

  const { ModalUI, setLoginModalState } = useModal();

  useEffect(() => {
    if (userContents) setUserId(userContents.id);
  }, [state]);

  const { data: allData, isLoading } = useQuery("lookbooks", apiGet.GET_LOOKS);

  return (
    <>
      <Header />
      <ModalUI />
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      <div>
        <ul className="grid grid-cols-2 pb-10">
          {allData
            ?.slice()
            .reverse()
            .map((data: LookbookData) => (
              <LookItem
                key={data.id}
                {...data}
                userId={userId}
                setModal={setLoginModalState}
              />
            ))}
        </ul>
      </div>
      <FloatingButton path="/create/post" />
      <Navigation />
    </>
  );
};

export default Lookbook;

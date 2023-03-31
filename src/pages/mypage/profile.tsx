import { Icon } from "@iconify/react";
import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import Header from "../../components/ui/header";
import LoadingSpinner from "../../components/ui/loading-spinner";
import Navigation from "../../components/ui/navigation";
import Overlay from "../../components/ui/overlay";
import Toast from "../../components/ui/toast";
import UserManage from "../../components/user/manage";
import useUpload from "../../hooks/useUpload";
import { taglist } from "../../lib/tag-data";
import { currentUserInfoQuery, userInfoQuery } from "../../recoil/user";
import { CredentialProps } from "../../types/create-type";
import { createImageUrl } from "../../utils/image-url";

const ProfileEdit: NextPage<CredentialProps> = ({
  region,
  accessKey,
  secretKey,
}) => {
  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const credentials = { region, accessKey, secretKey };
  const { uploadImage, encodeFile, imgsrc } = useUpload(credentials);
  const { state, contents: userContents } = userInfo;

  const refreshUserInfo = useRecoilRefresher_UNSTABLE(
    userInfoQuery(userContents?.email),
  );

  const { register } = useForm({});

  const [toastValue, setToastValue] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isTab, setIsTab] = useState<boolean>(false);

  const [isNick, setIsNick] = useState<boolean>(false);
  const [nick, setNick] = useState("");
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const allSelectedTag = taglist.value;

  const nickButtonText = isNick ? "완료" : "변경";

  useEffect(() => {
    if (state === "hasValue") {
      setSelectedTag(
        userContents.keywords.map(({ tag }: { tag: string }) => tag),
      );
      setIsLoading(false);
    }
  }, [state]);

  useEffect(() => {
    if (imgsrc.length === 0) return;
    profileMutate();
  }, [imgsrc]);

  const closeModal = () => setToastValue("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNick(value);
  };

  const submitNickname = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nick && isNick) {
      setIsError(true);
      setToastValue("변경할 닉네임을 입력해주세요.");
      return;
    }
    setIsNick(true);
    nickButtonText === "완료" && isNick && nick !== "" && nickMutate(nick);
  };

  const { mutate: nickMutate } = useMutation(
    async (nick: string) => {
      if (!userContents) return;
      // 중복확인
      const { data } = await axios.post("/api/user/nickname", {
        headers: { "Content-Type": "application/json" },
        nickname: nick,
      });
      return data;
    },
    {
      onSuccess: ({ message }) => {
        setIsError(false);
        setToastValue(message);
        setIsNick(false);
        setNick("");
        setIsLoading(true);
        // 중복확인 통과하면 닉네임변경
        axios
          .post(`/api/user/nickname?id=${userContents.id}`, {
            headers: { "Content-Type": "application/json" },
            nickname: nick,
          })
          .then(() => refreshUserInfo());
      },
      onError: ({ response }) => {
        setIsError(true);
        setToastValue(response.data.message);
      },
    },
  );

  //------------------------------------------------------------

  const handleTagSelection = (data: string) => {
    setSelectedTag(prevTags =>
      prevTags.includes(data)
        ? prevTags.filter(tag => tag !== data)
        : [...prevTags, data],
    );
  };

  const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tagMutate(selectedTag);
  };

  const onResetBtn = () => {
    setSelectedTag([]);
  };

  //태그 변경
  const { mutate: tagMutate } = useMutation(
    async (tags: string[]) => {
      if (!userContents) return;
      const { data } = await axios.post(
        `/api/user/tag?update=${userContents.id}`,
        tags,
      );
      return data;
    },
    {
      onSuccess: ({ message }) => {
        setIsError(false);
        setToastValue(message);
        setIsLoading(true);
        setIsTab(false);
        setTimeout(() => refreshUserInfo(), 1000);
      },
      onError: ({ response }) => {
        setIsError(true);
        setToastValue(response.data.message);
      },
    },
  );

  //------------------------------------------------------------

  //이미지변경

  const updateProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    encodeFile(event);
  };

  const changeProfileImage = async () => {
    uploadImage(imgsrc[0].file, "profile");
    const imageurl = createImageUrl(imgsrc[0].file, "profile");

    const { data: response } = await axios.post("/api/user/image", {
      imageurl,
      userData: userContents.id,
    });

    return response;
  };

  const { mutate: profileMutate } = useMutation(changeProfileImage, {
    onSuccess: ({ message }) => {
      imgsrc.length = 0;
      setIsError(false);
      setToastValue(message);
      setIsLoading(true);
      setTimeout(() => refreshUserInfo(), 1000);
    },
    onError: ({ response }) => {
      setIsError(true);
      setToastValue(response.data.message);
    },
  });

  return (
    <>
      <Header goBack text="PROFILE" />
      {toastValue !== "" && (
        <Toast message={toastValue} error={isError} onClose={closeModal} />
      )}
      {isTab && <Overlay />}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <>
          <div className={`${isTab ? " opacity-30" : ""}`}>
            <div className="relative h-44 bg-gray-300">
              <div className="relative top-32 h-20 w-20 translate-x-[155px] transform overflow-hidden rounded-full bg-slate-700">
                <Image
                  src={`${userContents?.profileImg}`}
                  alt="유저이미지"
                  width={50}
                  height={50}
                  className="w-full object-cover"
                />
                <label className="absolute bottom-0 z-10 h-[22px] w-20 bg-black text-center text-white">
                  <input
                    {...register("image")}
                    id="picture"
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple={false}
                    onChange={updateProfileImage}
                    className="hidden"
                  />
                  변경
                </label>
              </div>
            </div>
          </div>
          <div className="px-5 py-10">
            <p className="px-2 text-base font-bold">유저정보 수정</p>
            <p className="text-textColor-gr ay-100 mt-5 px-2 text-sm">닉네임</p>
            <form
              className="my-2 flex w-full justify-between px-3"
              onSubmit={submitNickname}
            >
              <input
                ref={input => input && input.focus()}
                placeholder={userContents.nickname}
                className="border-b-[1px] border-solid border-black bg-transparent text-black outline-0 placeholder:text-textColor-gray-100 disabled:text-textColor-gray-100"
                disabled={!isNick}
                onChange={onChange}
              />
              <button
                type="submit"
                className=" ml-3 h-9 w-2/5 bg-black text-white"
              >
                {nickButtonText}
              </button>
            </form>
            <p className="mt-5 px-2 text-sm text-textColor-gray-100">키워드</p>
            <form>
              <div className="my-2 flex w-full justify-between px-3">
                <div className="flex w-full items-center whitespace-nowrap border-b-[1px] border-solid border-black  text-textColor-gray-100">
                  {userContents?.keywords?.map(
                    ({ tag }: { tag: string }) => tag,
                  )}
                </div>
                <button
                  type="button"
                  className=" ml-3 h-9 w-2/5 bg-black text-white"
                  onClick={() => setIsTab(true)}
                >
                  {nickButtonText}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {isTab && (
        <div className="fixed bottom-0 z-50 w-[390px]">
          <form
            onSubmit={handleTagSubmit}
            className="h-16 w-full justify-center border-b-[1px] border-solid border-black bg-white p-5 text-center shadow-2xl shadow-black "
          >
            <span className="text-base font-bold">키워드 선택</span>
            <Icon
              type="button"
              icon="carbon:close"
              className="absolute top-4 right-4 z-50 h-7 w-7 cursor-pointer"
              onClick={() => {
                setIsTab(false),
                  setSelectedTag(
                    userContents.keywords.map(
                      ({ tag }: { tag: string }) => tag,
                    ),
                  );
              }}
            />
            <button
              type="submit"
              className="absolute bottom-5 right-5 z-50 cursor-pointer font-bold"
            >
              완료
            </button>
          </form>
          <div className="h-[300px] w-full bg-white p-5 pt-0">
            <ul className="flex w-full flex-wrap gap-2 py-3 px-2">
              {allSelectedTag.map((ele, index) => {
                return (
                  <div
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-solid border-black py-1 px-2 ${
                      selectedTag.includes(ele) ? "bg-black text-white" : ""
                    } `}
                    key={index}
                    onClick={() => handleTagSelection(ele)}
                  >
                    {ele}
                  </div>
                );
              })}
              <button onClick={onResetBtn} className="px-2 text-2xl">
                <Icon icon="carbon:reset" />
              </button>
            </ul>
          </div>
        </div>
      )}
      <UserManage userData={userContents} />
      <Navigation />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const REGION = process.env.AWS_REGION ? process.env.AWS_REGION : null;
  const ACCESS_KEY = process.env.AWS_KEY ? process.env.AWS_KEY : null;
  const SECRECT_KEY = process.env.AWS_SECRET_KEY
    ? process.env.AWS_SECRET_KEY
    : null;

  return {
    props: {
      region: REGION,
      accessKey: ACCESS_KEY,
      secretKey: SECRECT_KEY,
    },
  };
};

export default ProfileEdit;

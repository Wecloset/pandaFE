import { Icon } from "@iconify/react";
import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import Header from "../../components/header";
import Navigation from "../../components/navigation";
import useUpload from "../../hooks/useUpload";
import { taglist } from "../../lib/tag-data";
import { currentUserInfoQuery, userInfoQuery } from "../../recoil/user";
import { CredentialProps } from "../../types/create-type";
import { UserData } from "../../types/data-type";
import { createImageUrl } from "../../utils/image-url";

const ProfileEdit: NextPage<CredentialProps> = ({
  region,
  accessKey,
  secretKey,
}) => {
  const router = useRouter();
  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const credentials = { region, accessKey, secretKey };
  const { uploadImage, encodeFile, imgsrc } = useUpload(credentials);
  const { state, contents: userContents } = userInfo;

  const refreshUserInfo = useRecoilRefresher_UNSTABLE(
    userInfoQuery(userContents?.email),
  );

  const { register } = useForm({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData>();
  const [isTab, setIsTab] = useState<boolean>(false);

  const [isNick, setIsNick] = useState<boolean>(false);
  const [nick, setNick] = useState("");

  useEffect(() => {
    if (state === "hasValue") {
      setUserData(userContents);
      setSelectedTag(
        userContents.keywords.map(({ tag }: { tag: string }) => tag),
      );
      setIsLoading(false);
    }
  }, [state]);

  const nickButtonText = isNick ? "완료" : "변경";

  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const allSelectedTag = taglist.value;

  const handleTagSelection = (data: string) => {
    setSelectedTag(prevTags =>
      prevTags.includes(data)
        ? prevTags.filter(tag => tag !== data)
        : [...prevTags, data],
    );
  };

  const onResetBtn = () => {
    setSelectedTag([]);
  };

  const { mutate: nickMutate } = useMutation(
    async (nick: string) => {
      if (!userData) return;
      // 중복확인
      const { data } = await axios.post("/api/user/nickname", {
        headers: { "Content-Type": "application/json" },
        nickname: nick,
      });
      return data;
    },
    {
      onSuccess: data => {
        alert("닉네임변경이 완료되었습니다.");
        setIsNick(false);
        setNick("");
        // 닉네임 변경
        axios
          .post(`/api/user/nickname?id=${userContents.id}`, {
            headers: { "Content-Type": "application/json" },
            nickname: nick,
          })
          .then(() => refreshUserInfo());
      },
      onError: ({ response }) => {
        alert(response.data.message);
      },
    },
  );

  const { mutate: tagMutate } = useMutation(
    async (tags: string[]) => {
      if (!userData) return;
      const { data } = await axios.post(
        `/api/user/tag?update=${userData.id}`,
        tags,
      );
      return data;
    },
    {
      onSuccess: data => {
        alert("키워드 변경이 완료되었습니다.");
        setIsTab(false);
        refreshUserInfo(); // refresh user
      },
      onError: error => {
        alert("키워드 변경이 실패되었습니다.");
      },
    },
  );

  const { mutate: userMutate } = useMutation(
    async (id: number) => {
      const response = await axios.delete(`/api/user/${id}`);
      return response;
    },
    {
      onSuccess: data => {
        alert("회원탈퇴가 완료되었습니다");
        router.push("/").then(() => signOut());
      },
      onError: error => {
        alert("다시 시도해주세요");
      },
    },
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNick(value);
  };

  const submitNickname = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nick && isNick) {
      alert("닉네임을 변경해주세요");
      return;
    }
    setIsNick(true);
    nickButtonText === "완료" && isNick && nick !== "" && nickMutate(nick);
  };

  const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tagMutate(selectedTag);
  };

  const handleDelete = () => {
    if (!userData) return;
    userMutate(userData.id);
  };

  const changeProfileImage = async () => {
    uploadImage(imgsrc[0].file, "profile");
    const imageurl = createImageUrl(imgsrc[0].file, "profile");

    const { data: response } = await axios.post("/api/imagechange", {
      imageurl,
      userData: userContents.id,
    });

    return response;
  };

  const { mutate: profileMutate } = useMutation(changeProfileImage, {
    onSuccess: ({ message }) => {
      imgsrc.length = 0;
      alert(message);
      refreshUserInfo();
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  const updateProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    encodeFile(event);
  };

  const signout = () => {
    alert("로그아웃이 완료되었습니다.");
    router.replace("/").then(() => signOut());
  };

  useEffect(() => {
    if (imgsrc.length === 0) return;
    profileMutate();
  }, [imgsrc]);

  return (
    <>
      <Header goBack text="PROFILE" />
      {isTab && (
        <div className="fixed z-10 h-[calc(100%-300px)] w-[390px] bg-black pt-10 opacity-80" />
      )}
      {!isLoading && userData && (
        <>
          <div className={`${isTab ? " opacity-30" : ""}`}>
            <div className="relative h-44 bg-gray-300">
              <div className="relative top-32 h-20 w-20 translate-x-[155px] transform overflow-hidden rounded-full bg-slate-700">
                <Image
                  src={`${userData.profileImg}`}
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
                placeholder={userData.nickname}
                className="border-b-[1px] border-solid border-black bg-transparent text-black outline-0 placeholder:text-textColor-gray-100 disabled:text-textColor-gray-100"
                disabled={!isNick}
                onChange={onChange}
              />
              <button
                type="submit"
                className=" ml-3 h-9 w-2/5 bg-black text-white hover:bg-primary-green"
              >
                {nickButtonText}
              </button>
            </form>
            <p className="mt-5 px-2 text-sm text-textColor-gray-100">키워드</p>
            <form>
              <div className="my-2 flex w-full justify-between px-3">
                <div className=" -0 flex w-full items-center whitespace-nowrap border-b-[1px] border-solid border-black  text-textColor-gray-100">
                  {userData.keywords.map(keyword => keyword.tag)}
                </div>
                <button
                  type="button"
                  className=" ml-3 h-9 w-2/5 bg-black text-white hover:bg-primary-green"
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
        <div className="fixed bottom-0 z-30 w-[390px]">
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
      <div className="  fixed bottom-0 w-[390px] py-14 px-6">
        <div
          className="flex cursor-pointer items-center justify-between py-3 hover:scale-105 hover:duration-150"
          onClick={signout}
        >
          <p className=" text-base font-bold">로그아웃</p>
          <Icon
            icon="material-symbols:chevron-right-sharp"
            className=" text-xl font-bold"
          />
        </div>
        <div
          className="flex cursor-pointer items-center justify-between py-3 hover:scale-105 hover:duration-150"
          onClick={handleDelete}
        >
          <p className=" text-base font-bold">회원탈퇴</p>
          <Icon
            icon="material-symbols:chevron-right-sharp"
            className=" text-xl font-bold"
          />
        </div>
      </div>
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

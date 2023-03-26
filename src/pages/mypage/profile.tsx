import { Icon } from "@iconify/react";
import axios from "axios";
import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import Header from "../../components/header";
import Navigation from "../../components/navigation";
import { taglist } from "../../lib/tag-data";
import { currentUserInfoQuery, userInfoQuery } from "../../recoil/user";
import { UserData } from "../../types/data-type";
import { axiosGet } from "../../utils/services";

const ProfileEdit: NextPage = () => {
  const userInfo = useRecoilValueLoadable(currentUserInfoQuery);
  const { state, contents: userContents } = userInfo;
  const refreshUserInfo = useRecoilRefresher_UNSTABLE(
    userInfoQuery(userContents.email),
  );

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData>();
  const [isTab, setIsTab] = useState<boolean>(false);
  const [isNick, setIsNick] = useState<boolean>(false);
  const [isTag, setIsTag] = useState<boolean>(false);
  const [nick, setNick] = useState("");
  const allSelectedTag = taglist.value;
  const newArray: string[] = [];
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  useEffect(() => {
    if (state === "hasValue") {
      setUserData(userContents);
      setSelectedTag(
        userContents.keywords.map(({ tag }: { tag: string }) => tag),
      );
      setIsLoading(false);
    }
  }, [state]);

  const tagButtonText = isTag ? "완료" : "변경";
  const nickButtonText = isNick ? "완료" : "변경";

  const onClick = (data: string) => {
    setSelectedTag([...selectedTag, data]);
    const deduplication = selectedTag.includes(data);
    if (deduplication) {
      setSelectedTag([...selectedTag]);
    }
  };

  const onDelete = (x: string) => {
    const deleteItem = selectedTag.indexOf(x);
    const cutone = selectedTag.slice(0, deleteItem);
    const cuttwo = selectedTag.slice(deleteItem + 1, selectedTag.length);
    newArray.push(...cutone);
    newArray.push(...cuttwo);
    setSelectedTag(newArray);
  };

  const onResetBtn = () => {
    setSelectedTag([]);
  };

  const getUser = async (email: string) => {
    console.log("get user");
    const { data } = await axiosGet(`/api/user?email=${email}`);
    return data.user;
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
          .then(res => refreshUserInfo());
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
        `/api/user/tag?update=${userData.keywords[0].id}`,
        tags,
      );
      return data;
    },
    {
      onSuccess: data => {
        alert("키워드 변경이 완료되었습니다.");
        setIsTag(false);
        refreshUserInfo(); // refresh user
      },
      onError: error => {
        alert("키워드 변경실패");
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formId = (event.target as HTMLFormElement).id;
    nickButtonText === "완료" &&
      formId === "nickname-form" &&
      isNick &&
      nick !== "" &&
      nickMutate(nick);
  };

  const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formId = (event.target as HTMLFormElement).id;
    tagButtonText === "완료" && formId === "tag-form" && tagMutate(selectedTag);
  };

  const handleDelete = () => {
    if (!userData) return;
    userMutate(userData.id);
  };

  const signout = () => {
    alert("로그아웃이 완료되었습니다.");
    router.replace("/").then(() => signOut());
  };

  return (
    <>
      <Header goBack text="PROFILE" />
      {!isLoading && userData && (
        <div className={`${isTab ? " opacity-30" : ""}`}>
          <div className="relative h-44 bg-gray-300">
            <Image
              src={`${userData.profileImg}`}
              alt="유저이미지"
              width={50}
              height={50}
              className=" absolute  left-[155px] top-32 h-20 w-20 rounded-full"
            />
          </div>
          <div className="px-5 py-10">
            <p className="px-2 text-base font-bold">유저정보 수정</p>
            <p className="text-textColor-gr ay-100 mt-5 px-2 text-sm">닉네임</p>
            <form
              id="nickname-form"
              className="my-2 flex w-full justify-between px-3"
              onSubmit={handleSubmit}
            >
              <input
                placeholder={userData.nickname}
                className="border-b-[1px] border-solid border-black bg-transparent text-black outline-0 placeholder:text-textColor-gray-100"
                disabled={!isNick}
                onChange={onChange}
              />
              <button
                type="submit"
                className=" ml-3 h-9 w-2/5 bg-black text-white hover:bg-primary-green"
                onClick={() => nickButtonText === "변경" && setIsNick(true)}
              >
                {nickButtonText}
              </button>
            </form>
            <p className="mt-5 px-2 text-sm text-textColor-gray-100">키워드</p>
            <form onSubmit={handleTagSubmit} id="tag-form">
              <div className="my-2 flex w-full justify-between px-3">
                <div className=" flex w-full items-center whitespace-nowrap border-b-[1px] border-solid border-black text-textColor-gray-100 outline-0">
                  {userData.keywords[0].tag.split(",") === selectedTag
                    ? userData.keywords[0].tag
                    : selectedTag.length < 20
                    ? selectedTag.join(", ").slice(0, 22) + " ..."
                    : selectedTag.join(", ")}
                </div>
                <button
                  type="submit"
                  className=" ml-3 h-9 w-2/5 bg-black text-white hover:bg-primary-green"
                  onClick={() => {
                    tagButtonText === "변경" && setIsTab(true);
                  }}
                >
                  {tagButtonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isTab && (
        <div className="fixed bottom-0 z-30 w-[390px]">
          <div className="h-16 w-full justify-center border-b-[1px] border-solid border-black bg-white p-5 text-center shadow-2xl shadow-black ">
            <span className="text-base font-bold">키워드 선택</span>
            <Icon
              icon="carbon:close"
              className="absolute top-4 right-4 z-50 h-7 w-7 cursor-pointer"
              onClick={() => setIsTab(false)}
            />
            <button
              type="button"
              className="absolute bottom-5 right-5 z-50 cursor-pointer font-bold"
              onClick={() => {
                setIsTab(false), setIsTag(true);
              }}
            >
              완료
            </button>
          </div>
          <div className="h-[300px] w-full bg-white p-5 pt-0">
            <ul className="flex w-full flex-wrap gap-2 py-3 px-2">
              {allSelectedTag.map((ele, index) => {
                return (
                  <div
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-solid border-black py-1 px-2 ${
                      selectedTag.includes(ele) ? "bg-black text-white" : ""
                    } `}
                    key={index}
                    onClick={
                      selectedTag.includes(ele)
                        ? () => onDelete(ele)
                        : () => onClick(ele)
                    }
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

export default ProfileEdit;

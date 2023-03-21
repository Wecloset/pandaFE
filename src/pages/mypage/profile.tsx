import { Icon } from "@iconify/react";
import axios from "axios";
import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Header from "../../components/header";
import Navigation from "../../components/navigation";
import { taglist } from "../../lib/tag-data";
import { currentUserState, userState } from "../../recoil/user";
import { UserData } from "../../types/data-type";

const ProfileEdit: NextPage = () => {
  const userData = useRecoilValue(currentUserState) as UserData;
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const [isTab, setIsTab] = useState<boolean>(false);
  const [isNick, setIsNick] = useState<boolean>(false);
  const [isTag, setIsTag] = useState<boolean>(false);
  const [nick, setNick] = useState("");
  const allSelectedTag = taglist.value;
  const newArray: string[] = [];
  const [selectedTag, setSelectedTag] = useState<string[]>(
    userData.keywords.map(keyword => keyword.tag),
  );
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

  const { mutate: nickMutate } = useMutation(
    async (nick: string) => {
      const { data } = await axios.post("/api/nickname", { nickname: nick });
      return data;
    },
    {
      onSuccess: data => {
        alert("닉네임변경이 완료되었습니다.");
        setIsNick(false);
        setNick("");
        axios.post("/api/nickchange", {
          id: userData.id,
          nickname: data.nickname,
        });
        axios
          .get(`/api/user?email=${userData.email}`)
          .then(res => setUser(res.data.user));
      },
      onError: error => {
        alert("닉네임이 중복됩니다");
      },
    },
  );

  const { mutate: tagMutate } = useMutation(
    async (tag: string[]) => {
      const { data } = await axios.post("/api/tagchange", {
        tags: tag,
        id: userData.id,
      });
      return data;
    },
    {
      onSuccess: data => {
        // console.log(data);
        alert("태그변경이 완료되었습니다.");
        setIsTag(false);
        axios
          .get(`/api/user?email=${userData.email}`)
          .then(res => setUser(res.data.user));
      },
      onError: error => {
        alert("태그변경이 잘못됫습니다");
      },
    },
  );

  const { mutate: userMutate } = useMutation(
    async (id: number) => {
      const response = await axios.delete("/api/userdelete", {
        data: { userId: id },
      });
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
    userMutate(userData.id);
  };

  return (
    <>
      <Header goBack text="PROFILE" />
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
              ref={input => input && input.focus()}
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
                {userData.keywords.map(keyword => keyword.tag) === selectedTag
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

      {isTab && (
        <div className="fixed bottom-0 z-30  w-[390px]">
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
          onClick={() => (
            alert("로그아웃이 완료되었습니다."),
            router.push("/").then(() => signOut())
          )}
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

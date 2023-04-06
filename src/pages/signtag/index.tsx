import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { taglist } from "../../lib/tag-data";
import { Icon } from "@iconify/react";
import Header from "../../components/ui/header";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../../components/ui/loading-spinner";
import Button from "../../components/ui/button";
import useToast from "../../hooks/useToast";
import withAuth from "../auth";

interface TagData {
  userId: number;
  email?: string;
  tags: string[];
}

const SignTag: NextPage = () => {
  const router = useRouter();

  const { setToast, Toast } = useToast();

  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const allSelectedTag = taglist.value;

  //유저 정보를 query 로 전달받아서 signUser 의 user.id 을 이용해 다음단계이어감
  const { data: signUser } = useQuery("userData", async () => {
    const { data } = await axios.get(`/api/user?email=${router.query.email}`);
    return data;
  });

  //태그 등록

  const postTagData = async (tagData: TagData) => {
    const { userId, tags } = tagData;
    const { data: response } = await axios.post(
      `/api/user/tag?post=${userId}`,
      tags,
    );
    return response;
  };

  const { mutate, isLoading } = useMutation(postTagData, {
    onSuccess: ({ message }) => {
      router.replace(
        {
          pathname: "/signprofile",
          query: {
            email: router.query.email,
          },
        },
        "/signprofile",
      );
    },
    onError: ({ response }) => {
      setToast(response.data.message, true);
    },
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const tagData: TagData = {
      userId: signUser?.user?.id,
      tags: selectedTag,
    };
    mutate(tagData);
  };

  const onResetBtn = () => {
    setSelectedTag([]);
  };

  const handleTagSelection = (data: string) => {
    setSelectedTag(prevTags =>
      prevTags.includes(data)
        ? prevTags.filter(tag => tag !== data)
        : [...prevTags, data],
    );
  };

  return (
    <>
      <Header text="SIGNUP" goBack noGoBack />
      <Toast />
      <div className="signup-minheight px-8 pt-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="mt-5 mb-1 text-xl">어울리는 무드를 골라보세요!</p>
            <p className="text-textColor-gray-100">
              1개 이상의 키워드나 브랜드를 선택해주세요.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button onClick={onResetBtn} className="px-2 text-3xl">
              <Icon icon="carbon:reset" />
            </button>
            <p>{`${selectedTag.length}/${taglist.value.length}`}</p>
          </div>
        </div>
        <ul className="mt-10 grid w-full grid-cols-2 gap-3">
          {allSelectedTag.map((ele, index) => {
            return (
              <li className="w-full border border-black p-2" key={index}>
                <input
                  type="checkbox"
                  id={`${ele}-${index}`}
                  className="peer hidden"
                  onChange={() => handleTagSelection(ele)}
                  checked={selectedTag.includes(ele) ? true : false}
                />
                <label
                  htmlFor={`${ele}-${index}`}
                  className="flex items-center justify-between peer-checked:font-bold peer-checked:[&>span]:bg-primary-green
                  peer-checked:[&>span]:after:absolute peer-checked:[&>span]:after:top-0.5 peer-checked:[&>span]:after:left-0.5
                  peer-checked:[&>span]:after:block peer-checked:[&>span]:after:h-[6px] peer-checked:[&>span]:after:w-[9px]
                  peer-checked:[&>span]:after:origin-center peer-checked:[&>span]:after:-rotate-45 peer-checked:[&>span]:after:border-2
                  peer-checked:[&>span]:after:border-t-0 peer-checked:[&>span]:after:border-r-0 peer-checked:[&>span]:after:border-black"
                >
                  <span className="relative h-4 w-4 border border-black" />
                  <div>{ele}</div>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="mx-6 flex items-center justify-center"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            type="submit"
            classes="bg-black px-2"
            text="다음"
            textWidth="w-full"
            btnWrapClasses="px-2 mt-10"
          />
        )}
      </form>
    </>
  );
};

export default withAuth(SignTag);

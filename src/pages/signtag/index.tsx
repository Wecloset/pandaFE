import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { taglist } from "../../lib/tag-data";
import { Icon } from "@iconify/react";
import Header from "../../components/header";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../../components/loading-spinner";

interface TagData {
  userId: number;
  email?: string;
  tags: string[];
}

const SignTag: NextPage = () => {
  const router = useRouter();

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
      alert(message);
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
      alert(response.data.message);
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
      <div className=" px-5">
        <p className="mt-5 mb-1 px-2 text-lg">키워드를 선택해주세요.</p>
        <div className="flex justify-between px-2 ">
          <p className="mb-2 text-xs text-textColor-gray-100">
            1개 이상의 키워드나 브랜드를 선택해주세요.
          </p>
          <p>{`${selectedTag.length}/${taglist.value.length}`}</p>
        </div>
        <div>
          <ul className="my-3 flex w-full flex-wrap gap-2 px-2">
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
      <form
        onSubmit={handleFormSubmit}
        className="mx-6 flex items-center justify-center"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <input
            type="submit"
            className="mt-5 h-14 w-full bg-black px-10 text-white hover:bg-primary-green"
          />
        )}
      </form>
    </>
  );
};

export default SignTag;

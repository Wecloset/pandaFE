import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { taglist } from "../../lib/tag-data";
import { Icon } from "@iconify/react";
import Header from "../../components/header";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../../components/loading-spinner";
import Button from "../../components/button";

interface TagData {
  userId: number;
  tags: string[];
}

const SignTag: NextPage = () => {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const { data: signedUser } = useQuery("userData", async () => {
    const { data } = await axios.get("/api/user");
    return data[data.length - 1];
  });

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
      router.replace("/signprofile");
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const tagData: TagData = {
      userId: signedUser.id,
      tags: selectedTag,
    };
    mutate(tagData);
  };

  // ------------------------------------------------------------

  const newArray: string[] = [];
  const onResetBtn = () => {
    setSelectedTag([]);
  };
  const allSelectedTag = taglist.value;

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

  return (
    <>
      <Header text="SIGNUP" goBack noGoBack />
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
                  onClick={
                    selectedTag.includes(ele)
                      ? () => onDelete(ele)
                      : () => onClick(ele)
                  }
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

export default SignTag;

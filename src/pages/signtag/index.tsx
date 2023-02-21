import { NextPage } from "next";
import { useEffect, useState } from "react";
import { taglist } from "../../lib/tag-data";
import { Icon } from "@iconify/react";
import Header from "../../components/header";
import { useRouter } from "next/router";
import { axiosGet, axiosPost } from "../../lib/services";

interface userProps {
  createdDate: string;
  email: string;
  id: number;
  password: string;
}

const SignTag: NextPage = () => {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [user, setUser] = useState<userProps | undefined>(undefined);
  useEffect(() => {
    axiosGet("/api/signtag").then(res => {
      setUser(
        res.data.length === 0
          ? res.data[res.data.length]
          : res.data[res.data.length - 1],
      );
    });
  }, []);
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

  const onSubmitTag = () => {
    axiosPost(
      "/api/signtag",
      {
        tags: selectedTag.toString(),
        userData: user?.id,
      },
      router,
      "/signprofile",
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
      <div
        className="mx-6 flex items-center justify-center"
        onClick={onSubmitTag}
      >
        <button className="mt-5 h-14 w-full bg-black px-10 text-white hover:bg-primary-green">
          완료
        </button>
      </div>
    </>
  );
};

export default SignTag;

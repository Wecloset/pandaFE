import { NextPage } from "next";
import { useEffect, useState } from "react";
import { taglist } from "../../lib/tag-data";
import { Icon } from "@iconify/react";
import Header from "../../components/header";
import axios from "axios";
import { useRouter } from "next/router";

const SignTag: NextPage = () => {
  const router = useRouter();
  const [returnitem, setReturnItem] = useState<string[]>([]);
  const [user, setUser]: any = useState();
  useEffect(() => {
    axios.get("/api/signtag").then(res => {
      setUser(res.data[res.data.length - 1]);
    });
  }, []);
  const newArray: string[] = [];
  const onResetBtn = () => {
    setReturnItem([]);
  };
  const newList = taglist.value;
  const onClick = (data: string) => {
    setReturnItem([...returnitem, data]);
    const deduplication = returnitem.includes(data);
    if (deduplication) {
      setReturnItem([...returnitem]);
    }
  };
  const onDelete = (x: string) => {
    const deleteItem = returnitem.indexOf(x);
    const cutone = returnitem.slice(0, deleteItem);
    const cuttwo = returnitem.slice(deleteItem + 1, returnitem.length);
    newArray.push(...cutone);
    newArray.push(...cuttwo);
    setReturnItem(newArray);
  };
  const onSubmitTag = async () => {
    await axios
      .post("/api/signtag", {
        headers: { "Content-Type": "application/json" },
        data: {
          tags: returnitem.toString(),
          userData: user?.id,
        },
      })
      .then(res => {
        res.status === 200 && router.replace("/login");
      });
  };
  return (
    <>
      <Header text="TAGSELECT" goBack noGoBack />
      <div className=" px-5">
        <p className="mt-5 mb-1 px-2 text-lg">키워드를 선택해주세요.</p>
        <div className="flex justify-between px-2 ">
          <p className="mb-2 text-xs text-textColor-gray-100">
            1개 이상의 키워드나 브랜드를 선택해주세요.
          </p>
          <p>{`${returnitem.length}/${taglist.value.length}`}</p>
        </div>
        <div>
          <ul className="my-3 flex w-full flex-wrap gap-2 px-2">
            {newList.map((ele, index) => {
              return (
                <div
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-solid border-black py-1 px-2 ${
                    returnitem.includes(ele) ? "bg-black text-white" : ""
                  } `}
                  key={index}
                  onClick={
                    returnitem.includes(ele)
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

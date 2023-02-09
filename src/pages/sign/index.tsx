import { Icon } from "@iconify/react";
import type { NextPage } from "next";
import { useState } from "react";
import ButtonItem from "../../components/button";
import Header from "../../components/header";
import Input from "../../components/input";

const Sign: NextPage = () => {
  const taglist = {
    value: [
      "모노톤",
      "파스텔톤",
      "비비드톤",
      "딥톤",
      "팝칼라",
      "10대",
      "20대",
      "30대",
      "40대",
      "50대 이상",
      "뉴오커",
      "레트로",
      "미니멀",
      "보헤미안",
      "비즈니스",
      "톰보이",
      "빈티지",
      "아메카지",
      "스트릿",
      "SPA",
      "고프코어/y2k",
      "프레피룩",
      "페미닌",
      "고스패션",
      "펑크",
      "로리타",
      "히피",
      "케주얼",
    ],
  };
  const [returnitem, setReturnItem] = useState<string[]>([]);
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
  return (
    <>
      <Header text="SIGNUP" goBack />
      <div className="px-5">
        <Input
          title="사용하실 이메일을 입력해주세요."
          type="text"
          name="email"
          placeholder="아이디(이메일)"
          classname="text-black placeholder:text-textColor-gray-100"
        />
        <Input
          title="비밀번호를 입력해주세요."
          isSubtitle
          subtitle="6자리 이상의 비밀번호를 설정해주세요."
          type="password"
          name="password"
          placeholder="비밀번호"
          isSecond
          secondtype="password"
          secondplaceholder="비밀번호를 확인해주세요"
          classname="text-black placeholder:text-textColor-gray-100"
        />

        <div className="px-3 pb-10 [&>input]:h-[48px] [&>input]:border-b [&>input]:px-4">
          <p className="mb-2 px-2 text-lg">사용하실 닉네임을 입력해주세요.</p>
          <div className="ml-2 flex">
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              className=" mr-4 pl-2 text-black placeholder:text-textColor-gray-100"
            />
            <ButtonItem
              text="중복확인"
              width="w-4/5"
              position="flex justify-end"
              color="bg-black"
              fontColor="text-white"
              padding="p-0"
            />
          </div>
        </div>
        <div className="px-3 pb-6 [&>input]:h-[48px] [&>input]:border-b [&>input]:px-4">
          <p className="mb-2 px-2 text-lg">키워드를 선택해주세요.</p>
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
                    className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-solid border-black py-1 px-2 hover:bg-black hover:text-white"
                    key={index}
                    onClick={() => onClick(ele)}
                  >
                    {ele}
                  </div>
                );
              })}
              <button onClick={onResetBtn} className="px-2 text-2xl">
                <Icon icon="carbon:reset" />
              </button>
            </ul>
            {
              <>
                <ul className="my-3 flex w-full flex-wrap gap-2 px-2">
                  {returnitem.map(x => (
                    <div key={Math.random()} onClick={() => onDelete(x)}>
                      {x}
                    </div>
                  ))}
                </ul>
              </>
            }
          </div>
        </div>
        <div className="inline-flex w-full items-center justify-center">
          <hr className="my-8 h-px w-80 border-0 bg-black dark:bg-black" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
            or
          </span>
        </div>
        <div className="mt-7">
          <div>
            <ButtonItem
              text="Continue With Google"
              color="bg-white"
              icon="ph:google-logo"
              logo="flex items-center"
              textWidth="w-4/5"
              border="rounded border-solid border-2 border-black	"
            />
          </div>

          <ButtonItem
            text="Continue With Kakao"
            color="bg-primary-yellow"
            icon="ri:kakao-talk-fill"
            logo="flex items-center"
            textWidth="w-4/5"
            border="rounded  border-solid border-2 border-black	"
          />
          <ButtonItem
            text="다음"
            color="bg-commom-gray"
            hover="hover:bg-primary-green"
          />
        </div>
      </div>
    </>
  );
};

export default Sign;

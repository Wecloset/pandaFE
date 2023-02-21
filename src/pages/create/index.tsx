import type { GetStaticProps, NextPage } from "next";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm, FieldErrors } from "react-hook-form";
import Button from "../../components/button";
import Header from "../../components/header";
import { cls } from "../../lib/class";
import Image from "next/image";
import axios from "axios";
import useUpload from "../../hooks/useUpload";
import { createImageUrl } from "../../lib/image-url";
import { tabData } from "../../lib/fake-data";

interface CreateState {
  [key: string]: string | number | FileList | undefined;
}

interface CredentialProps {
  region: string;
  accessKey: string;
  secretKey: string;
}

interface TabItem {
  [key: string]: { name: string; current: boolean; list: string[] };
}

const Create: NextPage<CredentialProps> = ({
  region,
  accessKey,
  secretKey,
}) => {
  const credentials = { region, accessKey, secretKey };
  const { uploadImage, deleteImage, encodeFile, imgsrc } =
    useUpload(credentials);

  const { register, handleSubmit } = useForm<CreateState>({
    mode: "onSubmit",
  });

  const brandRef = useRef<HTMLInputElement>(null);
  const [isText, setIsText] = useState<boolean>(false);
  const [isTabOpen, setIsTabOpen] = useState<boolean>(false);
  const [tabItem, setTabItem] = useState<TabItem>({
    category: { name: "카테고리", current: false, list: tabData.category },
    style: { name: "스타일", current: false, list: tabData.style },
    brand: { name: "브랜드", current: false, list: tabData.brand },
    rental: { name: "대여 가능", current: false, list: tabData.rental },
  });

  const textAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.value !== "" ? setIsText(true) : setIsText(false);
  };

  const createProduct = async (data: any, imageurlList: string[]) => {
    const payload = {
      data,
      imageurlList,
      tabItem,
    };

    const response = await axios.post("/api/products", {
      headers: { "Content-Type": "application/json" },
      payload,
    });
    // console.log(response);
  };

  const validation = (data: CreateState) => {
    let isNotTag;
    if (typeof data.tag === "string") {
      isNotTag = data.tag.split(" ").every((tag: string) => tag.includes("#"));
    }

    const numberCheck = /[0-9]/g;
    if (!numberCheck.test(data.price as string)) {
      return alert("상품가격을 숫자로 기입해주세요.");
    } else if (imgsrc.length === 0) {
      return alert("상품이미지를 추가해주세요.");
    } else if (!isNotTag) {
      return alert("태그는 공백을 포함할 수 없습니다.");
    }
    return true;
  };

  const valid = async (data: CreateState) => {
    if (!validation(data)) return;

    console.log("valid!!");

    const imageurlList: string[] = [];
    imgsrc.forEach(item => {
      // s3 upload
      uploadImage(item.file);

      const imageurl = createImageUrl(item.file);
      imageurlList.push(imageurl);
    });
    createProduct(data, imageurlList);
  };

  const inValid = (error: FieldErrors) => {
    alert(error.desc?.message || error.title?.message || error.price?.message);
  };

  const openTab = (name: string) => {
    const newTabItem: TabItem = {};
    for (const key in tabItem) {
      const val =
        tabItem[key].name === name
          ? { ...tabItem[key], current: true }
          : { ...tabItem[key], current: false };
      newTabItem[key] = val;
    }
    setTabItem(newTabItem);
    setIsTabOpen(true);
  };

  const selectTabItem = (
    event: React.MouseEvent<HTMLLIElement>,
    name: string,
  ) => {
    const target = event.target as HTMLLIElement;
    const newTabItem: TabItem = {};
    for (const key in tabItem) {
      const val =
        tabItem[key].name === name
          ? { ...tabItem[key], name: target.textContent as string }
          : tabItem[key];
      newTabItem[key] = val;
    }
    setTabItem(newTabItem);
    setIsTabOpen(false);
  };

  const brandSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const brandName = brandRef.current!.value;
    const newTabItem: TabItem = {};
    for (const key in tabItem) {
      const val =
        key === "brand"
          ? { ...tabItem[key], name: brandName as string }
          : tabItem[key];
      newTabItem[key] = val;
    }
    setTabItem(newTabItem);
    setIsTabOpen(false);
  };

  return (
    <>
      <Header goBack />
      {isTabOpen && (
        <div className="fixed z-10 h-[calc(100%-300px)] w-full bg-black pt-10 opacity-50" />
      )}
      <div className=" px-5 py-5">
        <form onSubmit={handleSubmit(valid, inValid)}>
          <div className="mb-6 flex">
            <label className="mr-2 mt-2 flex h-[100px] w-[100px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-1 border bg-gray-100 text-textColor-gray-100">
              <input
                type="file"
                {...register("image")}
                accept="image/png, image/jpeg"
                multiple
                className="hidden"
                onChange={encodeFile}
              />
              <Icon icon="bxs:image-add" className="text-2xl" />
              <p>
                {imgsrc.length === 0 ? 0 : imgsrc.length}
                /10
              </p>
            </label>
            <div className="h-[110px] w-[242px] overflow-x-scroll">
              <div className="mt-2 w-[242px]">
                <ul className="flex gap-2 ">
                  {imgsrc.length > 0 &&
                    imgsrc.map((item, i) => (
                      <li
                        key={i}
                        className="relative h-[100px] w-[100px] flex-shrink-0 border border-borderColor-gray"
                      >
                        <div className="peer">
                          <img
                            src={item.dataUrl}
                            alt={`업로드이미지${i}`}
                            className="h-[100px] w-[100px] object-cover"
                          />
                        </div>
                        <Icon
                          icon="ri:close-circle-fill"
                          className="absolute -top-2 -right-1 z-50 hidden rounded-full bg-white text-xl hover:block hover:cursor-pointer peer-hover:block"
                          onClick={() => deleteImage(item.dataUrl)}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-b border-borderColor-gray pb-2 [&>input]:h-[52px] [&>input]:border-b [&>input]:px-4">
            <input
              {...register("title", { required: "제목을 입력해주세요." })}
              type="text"
              name="title"
              placeholder="제목"
            />
            <input
              {...register("price", {
                required: "상품의 가격을 입력해주세요.",
              })}
              type="text"
              name="price"
              placeholder="가격"
              autoComplete="off"
            />
            <div className="relative h-auto w-full p-5">
              <textarea
                {...register("desc", {
                  onChange: e => textAreaValue(e),
                  required: "아이템에 대한 설명을 작성해주세요.",
                })}
                name="desc"
                rows={10}
                className={cls(
                  "peer w-full resize-none",
                  isText ? "is-valid" : "",
                )}
                onChange={textAreaValue}
              />
              <div className="pointer-events-none absolute top-5 left-5 bg-transparent text-commom-gray peer-focus:hidden peer-[.is-valid]:hidden">
                <p>아이템에 대한 설명을 작성해주세요.</p>
                <p className="mt-3">
                  작성예시. 제품상태, 사이즈, 소재 등 자세히
                </p>
              </div>
            </div>
            <input
              {...register("tag")}
              type="text"
              name="tag"
              placeholder="검색에 사용될 태그를 작성해주세요. Ex. #빈티지"
              autoComplete="off"
              className="border"
            />
          </div>
          <div className="[&>*]:flex [&>*]:h-[52px] [&>*]:items-center [&>*]:justify-between [&>*]:border-b [&>*]:px-4">
            {Object.values(tabItem).map(({ name }, i) => (
              <div key={`tab${i}`} onClick={() => openTab(name)}>
                <span>{name}</span>
                <Icon icon="material-symbols:arrow-outward" />
              </div>
            ))}
          </div>
          <div className="mt-40">
            <Button text="완료" color="bg-black" fontColor="text-white" />
          </div>
        </form>
        {/* Select Tab */}
        <div className="fixed bottom-0 z-30 w-[390px] -translate-x-5">
          {isTabOpen &&
            Object.entries(tabItem).map(([key, { current }], i) =>
              current === true ? (
                <div
                  key={i}
                  className="h-16 w-full justify-center border border-b-common-black bg-white p-5"
                >
                  <span>{key}</span>
                  <Icon
                    icon="carbon:close"
                    className="absolute top-4 right-5 z-50 h-7 w-7 cursor-pointer"
                    onClick={() => setIsTabOpen(false)}
                  />
                </div>
              ) : null,
            )}
          {isTabOpen &&
            Object.entries(tabItem).map(
              ([key, { name, current, list }]) =>
                current === true && (
                  <div key={key}>
                    <div className=" h-[350px] w-full bg-white p-5">
                      <ul className="h-[295px] w-full overflow-y-scroll [&>li]:text-textColor-gray-100">
                        {key === "brand" && (
                          <form
                            className="relative mb-16"
                            onSubmit={brandSubmit}
                          >
                            <input
                              type="text"
                              placeholder="해당하는 브랜드가 없는 경우 입력해주세요."
                              className="absolute left-0 rounded-md bg-gray-100 p-4 pr-14"
                              ref={brandRef}
                            />
                            <button className="text-md absolute right-3 top-4 font-bold hover:cursor-pointer">
                              완료
                            </button>
                          </form>
                        )}
                        {list.map((listItem, i) => (
                          <li
                            key={i}
                            className="cursor-pointer p-2 hover:bg-[#f7f7f7] hover:text-common-black"
                            onClick={e => selectTabItem(e, name)}
                          >
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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

export default Create;

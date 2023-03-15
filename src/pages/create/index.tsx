import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm, FieldErrors } from "react-hook-form";
import { useMutation } from "react-query";
import Button from "../../components/button";
import Header from "../../components/header";
import UploadImages from "../../components/create/upload-images";
import OptionTab from "../../components/create/option-tab";
import LoadingSpinner from "../../components/loading-spinner";
import { cls } from "../../utils/class";
import { createImageUrl } from "../../utils/image-url";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/user";
import { UserData } from "../../types/data-type";
import useUpload from "../../hooks/useUpload";
import useOptions from "../../hooks/useOptions";
import { tabData } from "../../lib/fake-data";
import { CreateState, CredentialProps } from "../../types/create-type";

const Create: NextPage<CredentialProps> = ({
  region,
  accessKey,
  secretKey,
}) => {
  const router = useRouter();

  const credentials = { region, accessKey, secretKey };

  const userData = useRecoilValue(currentUserState) as UserData;
  const { uploadImage, deleteImage, encodeFile, imgsrc } =
    useUpload(credentials);

  const {
    isTabOpen,
    options,
    openOptionItem,
    selectOptionItem,
    submitBrand,
    closeTab,
  } = useOptions({
    category: { name: "카테고리", current: false, list: tabData.category },
    style: { name: "스타일", current: false, list: tabData.style },
    brand: { name: "브랜드", current: false, list: tabData.brand },
    rental: { name: "대여 가능", current: false, list: tabData.rental },
  });

  const { register, handleSubmit } = useForm<CreateState>({
    mode: "onSubmit",
  });

  const [isText, setIsText] = useState<boolean>(false);

  const textAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.value !== "" ? setIsText(true) : setIsText(false);
  };

  const createProduct = async (payload: {
    data: any;
    imageurlList: string[];
  }) => {
    const { id: userId } = userData;
    const { data, imageurlList } = payload;
    const { data: response } = await axios.post("/api/products", {
      data,
      imageurlList,
      options,
      userId,
    });
    return response;
  };

  const { mutate, isLoading } = useMutation(createProduct, {
    onSuccess: ({ message }) => {
      alert(message);
      // router.replace("/mypage");
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  const validation = (data: CreateState) => {
    let isNotTag;
    if (typeof data.tag === "string") {
      isNotTag = data.tag
        .trim()
        .split(" ")
        .every((tag: string) => tag.includes("#"));
    }
    const numberCheck = /[0-9]/g;
    if (!numberCheck.test(data.price as string)) {
      return alert("상품가격을 숫자로 기입해주세요.");
    } else if (options.category.name === "카테고리") {
      return alert("카테고리를 선택해 주세요.");
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
      uploadImage(item.file, "products");

      const imageurl = createImageUrl(item.file, "products");
      imageurlList.push(imageurl);
    });
    mutate({ data, imageurlList });
  };

  const inValid = (error: FieldErrors) => {
    alert(
      error.desc?.message ||
        error.title?.message ||
        error.price?.message ||
        error.image?.message,
    );
  };

  return (
    <>
      <Header goBack />
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner />
        </div>
      )}
      {isTabOpen && (
        <div className="fixed z-10 h-[calc(100%-300px)] w-[390px] bg-black pt-10 opacity-50" />
      )}
      <div className=" px-5 py-5">
        <form onSubmit={handleSubmit(valid, inValid)}>
          <UploadImages
            register={register}
            deleteImage={deleteImage}
            encodeFile={encodeFile}
            imgsrc={imgsrc}
          />
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
              <div
                className="pointer-events-none absolute top-5 left-5 bg-transparent text-commom-gray 
              peer-focus:hidden peer-[.is-valid]:hidden"
              >
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
            {Object.values(options).map(({ name }, i) => (
              <div key={`tab${i}`} onClick={() => openOptionItem(name)}>
                <span>{name}</span>
                <Icon icon="material-symbols:arrow-outward" />
              </div>
            ))}
          </div>
          <div className="mt-40">
            <Button text="완료" color="bg-black" fontColor="text-white" />
          </div>
        </form>
        <OptionTab
          isTabOpen={isTabOpen}
          options={options}
          selectOptionItem={selectOptionItem}
          submitBrand={submitBrand}
          closeTab={closeTab}
        />
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

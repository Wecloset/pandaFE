import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm, FieldErrors } from "react-hook-form";
import { useMutation } from "react-query";
import Button from "../../components/ui/button";
import Header from "../../components/ui/header";
import UploadImages from "../../components/create/upload-images";
import OptionTab from "../../components/create/option-tab";
import { cls } from "../../utils/class";
import { createImageUrl } from "../../utils/image-url";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import useUpload from "../../hooks/useUpload";
import useOptions from "../../hooks/useOptions";
import { tabData } from "../../lib/fake-data";
import { CreateState, Options } from "../../types/create-type";
import { currentUserInfoQuery, userInfoQuery } from "../../recoil/user";
import Overlay from "../../components/ui/overlay";
import useToast from "../../hooks/useToast";
import { apiPost } from "../../utils/request";
import noExistUser from "../noExistUser";
import { credentials } from "../../lib/credentials";

const Create: NextPage = () => {
  const router = useRouter();

  const userData = useRecoilValueLoadable(currentUserInfoQuery);
  const { state, contents } = userData;

  const refreshUserInfo = useRecoilRefresher_UNSTABLE(
    userInfoQuery(contents?.email),
  );

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

  const { setToast, Toast } = useToast();

  const { register, handleSubmit } = useForm<CreateState>({
    mode: "onSubmit",
  });

  const [isText, setIsText] = useState<boolean>(false);

  const [isValid, setIsValid] = useState<boolean | null>(null);

  const textAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.value !== "" ? setIsText(true) : setIsText(false);
  };

  const createProduct = async (payload: {
    data: any;
    imageurlList: string[];
  }) => {
    const { data, imageurlList } = payload;
    const response = await apiPost.CREATE_ITEM<{
      data: FormData;
      imageurlList: string[];
      options: Options;
      userId: number;
    }>({
      data,
      imageurlList,
      options,
      userId: contents.id,
    });
    return response;
  };

  const { mutate, isLoading } = useMutation(createProduct, {
    onSuccess: ({ message }) => {
      setToast(message, false);
      refreshUserInfo();
      setTimeout(() => router.replace("/mypage"), 1500);
    },
    onError: ({ response }) => {
      setToast(response.data.message, true);
    },
  });

  const validation = (data: CreateState) => {
    let isNotTag;
    if (typeof data.tag === "string" && data.tag.length > 0) {
      if (data.tag.includes(" ")) isNotTag = true;
      else
        isNotTag = !data.tag
          ?.toString()
          .trim()
          .split(" ")
          .every((tag: string) => tag.includes("#"));
    }
    const numberCheck = /[0-9]/g;
    if (!numberCheck.test(data.price as string)) {
      return setToast("상품가격을 숫자로 기입해주세요.", true);
    } else if (options.category.name === "카테고리") {
      return setToast("카테고리를 선택해 주세요.", true);
    } else if (isNotTag) {
      return setToast("태그는 공백을 포함할 수 없습니다.", true);
    }
    return true;
  };

  const valid = async (data: CreateState) => {
    if (!validation(data)) return;

    setIsValid(true);

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
    setIsValid(false);
    console.log(error);
    const message =
      error.desc?.message ||
      error.title?.message ||
      error.price?.message ||
      error.image?.message;
    setToast(message as string, true);
  };

  return (
    <>
      <Header goBack />
      <Toast />
      {isTabOpen && <Overlay />}
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
                className="pointer-events-none absolute top-5 left-5 bg-transparent text-common-gray 
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
            <Button
              type="submit"
              text="완료"
              classes="bg-black"
              fontColor="text-white"
              isLoading={isLoading}
            />
          </div>
        </form>
        {isTabOpen && (
          <OptionTab
            isTabOpen={isTabOpen}
            options={options}
            selectOptionItem={selectOptionItem}
            submitBrand={submitBrand}
            closeTab={closeTab}
          />
        )}
      </div>
    </>
  );
};

export default noExistUser(Create);

import type { GetStaticProps, NextPage } from "next";
import React, { ChangeEvent, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm, FieldErrors } from "react-hook-form";
import Button from "../../components/button";
import Header from "../../components/header";
import { cls } from "../../lib/class";
import uploadImage from "../../lib/upload-image";
import Image from "next/image";
import { text } from "stream/consumers";

interface CreateState {
  image: string;
  title: string;
  price: number;
  desc: string;
  tag: string;
}

interface credentialProps {
  region: string;
  accessKey: string;
  secretKey: string;
}

const Create: NextPage<credentialProps> = ({
  region,
  accessKey,
  secretKey,
}) => {
  const credentials = { region, accessKey, secretKey };
  const [fetchImage] = uploadImage(credentials);

  const { register, handleSubmit } = useForm<CreateState>({ mode: "onSubmit" });

  const [isText, setIsText] = useState<boolean>(false);
  const [imgsrc, setImgsrc] = useState<string[]>([]);

  const textAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.value !== "" ? setIsText(true) : setIsText(false);
  };

  const valid = async (data: CreateState) => {
    // s3 upload
    Object.values(data.image).map((file: any) => {
      fetchImage(file);
    });

    // prisma create
    const userId = 52; // 임시 id
    // const a = await prisma.product.create({
    //   data: {
    //     userId,
    //     imageUrl,
    //   }
    // })
  };

  const inValid = (error: FieldErrors) => {
    console.log(error);
    alert(error.desc?.message || error.title?.message || error.price?.message);
  };

  const encodeFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      setImgsrc(prevImages => [...prevImages, result as string]);
    };
  };

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files;
    if (!imageFile || imageFile.length < 0) return;

    [...imageFile].forEach(image => encodeFile(image));
  };

  const deleteImage = (selectedImage: string) => {
    setImgsrc(prevImages => prevImages.filter(url => url !== selectedImage));
  };

  return (
    <>
      <Header goBack />
      <div className="px-5 py-5">
        <form onSubmit={handleSubmit(valid, inValid)}>
          <div className="mb-6 flex">
            <label className="mr-2 mt-2 flex h-[100px] w-[100px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-1 border bg-gray-100 text-textColor-gray-100">
              <input
                type="file"
                {...register("image", {
                  required: "이미지를 등록해주세요.",
                  onChange: e => uploadImages(e),
                })}
                accept="image/png, image/jpeg"
                multiple
                name="image"
                className="hidden"
                onChange={uploadImages}
              />
              <Icon icon="bxs:image-add" className="text-2xl" />
              <p>{imgsrc.length === 0 ? 0 : imgsrc.length}/10</p>
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
                        <Image
                          src={item}
                          alt={`업로드이미지${i}`}
                          width={100}
                          height={100}
                          className="peer"
                        />
                        <Icon
                          icon="ri:close-circle-fill"
                          className="absolute -top-2 -right-1 z-50 hidden rounded-full bg-white text-xl hover:block hover:cursor-pointer peer-hover:block"
                          onClick={() => deleteImage(item)}
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
          <Button
            text="완료"
            color="bg-black"
            fontColor="text-white"
            position="absolute bottom-0 left-0"
          />
        </form>
        <div className="[&>*]:flex [&>*]:h-[52px] [&>*]:items-center [&>*]:justify-between [&>*]:border-b [&>*]:px-4">
          <div>
            <span>카테고리</span>
            <Icon icon="material-symbols:arrow-outward" />
          </div>
          <div>
            <span>브랜드</span>
            <Icon icon="material-symbols:arrow-outward" />
          </div>
          <div>
            <span>대여 가능</span>
            <Icon icon="material-symbols:arrow-outward" />
          </div>
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

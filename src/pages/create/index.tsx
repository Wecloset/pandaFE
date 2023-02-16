import type { GetStaticProps, NextPage } from "next";
import React, { ChangeEvent, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm, FieldErrors } from "react-hook-form";
import Button from "../../components/button";
import Header from "../../components/header";
import { cls } from "../../lib/class";
import uploadImage from "../../lib/upload-image";
import Image from "next/image";
import client from "../../lib/client";

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
  prisma: any;
}

// interface Imagesrc {
//   [key: string]: string;
// }

interface ImageInfo {
  name: string;
  dataUrl: string;
  file: File;
}

const Create: NextPage<credentialProps> = ({
  region,
  accessKey,
  secretKey,
}) => {
  const credentials = { region, accessKey, secretKey };
  const [upload] = uploadImage(credentials);

  const { register, handleSubmit } = useForm<CreateState>({ mode: "onSubmit" });

  const [isText, setIsText] = useState<boolean>(false);
  const [imgsrc, setImgsrc] = useState<ImageInfo[]>([]);

  const textAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.value !== "" ? setIsText(true) : setIsText(false);
  };

  const createProduct = async (data: any, imageurlList: string[]) => {
    const userId = 84; // 임시 id
    const { title, price, desc, tag } = data;

    // const prisma = new PrismaClient();

    // const tag;
    const newProduct = await client.product.create({
      data: {
        userId,
        title,
        price,
        description: desc,
        imgurl: {
          create: imageurlList.map(image => ({ img: image })),
        },
        category: "category",
        brand: "brand",
        hashTag: {},
      },
    });
  };

  const valid = async (data: CreateState) => {
    // 1. s3업로드할 File 넘겨주기
    // 2. prisma에 올릴 이미지 리스트 만들고
    // 3. prisma 업로드
    const imageurlList: string[] = [];

    imgsrc.forEach(item => {
      // s3 upload
      // upload(item.file);

      // create image list
      const ext = item.file.type.split("/")[1];
      const encodedName = Buffer.from(item.file.name).toString("base64");
      const key = `products/${encodedName.substring(0, 11)}.${ext}`; // https://panda-products.s3.ap-northeast-2.amazonaws.com/products/MjU3NzcxMDU.jpeg
      const imageurl = `https://panda-products.s3.ap-northeast-2.amazonaws.com/${key}`;
      imageurlList.push(imageurl);
    });

    createProduct(data, imageurlList);
  };

  const inValid = (error: FieldErrors) => {
    console.log(error);
    alert(error.desc?.message || error.title?.message || error.price?.message);
  };

  const encodeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files;

    if (!imageFile || imageFile.length < 0) return;

    [...imageFile].forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;
        const obj = {
          name: file.name,
          dataUrl: result,
          file: file,
        };
        setImgsrc(prev => [...prev, obj]);
        // map[file.name] = result;
        // console.log(map);
        // setTest(prev => [...prev, fileRef.current]);
        // imgsrcRef.current.push(map);
        // console.log(imgsrcRef.current);
      };
    });
  };

  const deleteImage = (selectedImage: string) => {
    setImgsrc(prev => prev.filter(item => item.dataUrl !== selectedImage));
  };

  return (
    <>
      <Header goBack />
      <div className="px-5 py-5">
        <form onSubmit={handleSubmit(valid, inValid)}>
          <div className="mb-6 flex">
            <label className="mr-2 mt-2 flex h-[100px] w-[100px] flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-1 border bg-gray-100 text-textColor-gray-100">
              {/* name, onChange(일반)가 있으면 data에서 fileList를 받아올 수 없음 / useForm onChange로는 setImgsrc할 수 없음. */}
              <input
                type="file"
                {...register("image", {
                  required: "이미지를 등록해주세요.",
                  // onChange: e => encodeFile(e),
                })}
                accept="image/png, image/jpeg"
                multiple
                // name="file"
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
                        <Image
                          src={item.dataUrl}
                          alt={`업로드이미지${i}`}
                          width={100}
                          height={100}
                          className="peer"
                        />
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

import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm, FieldErrors } from "react-hook-form";
import Button from "../../components/button";
import Header from "../../components/header";
import { cls } from "../../lib/class";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 } from "uuid";

interface CreateState {
  image: string;
  title: string;
  price: number;
  desc: string;
  tag: string;
}

interface staticProps {
  region: string;
  accessKey: string;
  secretKey: string;
}

const Create: NextPage<staticProps> = ({ region, accessKey, secretKey }) => {
  const { register, handleSubmit } = useForm<CreateState>({ mode: "onSubmit" });
  const [isText, setIsText] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const textAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.value !== "" ? setIsText(true) : setIsText(false);
  };

  const valid = async (data: CreateState) => {
    // create
    console.log(data);

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

  // image upload
  const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });

  // panda-products.s3.ap-northeast-2.amazonaws.com/products/a2ef6d207bef432191a33ec9e97c5b73.jpeg

  const fetchImage = async (file?: any) => {
    const ext = file.type.split("/")[1];
    const key = `products/${v4().replaceAll("-", "")}.${ext}`;

    const bucketParams = {
      Bucket: "panda-products",
      Key: key,
      Body: file,
      ContentType: "image/jpeg",
      ACL: "public-read",
    };

    try {
      await s3Client.send(new PutObjectCommand(bucketParams));

      const enteredimgurl = `panda-products/${region}.amazonaws.com/${key}`;
      if (imageUrl.includes(enteredimgurl)) return;
      setImageUrl(prev => [...prev, enteredimgurl]);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files;
    console.log(imageFile);
    if (!imageFile || imageFile.length < 0) return;
    [...imageFile].forEach(image => {
      fetchImage(image);
    });
  };

  return (
    <>
      <Header goBack />
      <div className="px-5 py-5">
        <form onSubmit={handleSubmit(valid, inValid)}>
          <div className="mb-6">
            <label className="flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center gap-1 border bg-gray-100 text-textColor-gray-100">
              <input
                type="file"
                {...register("image")}
                accept="image/png, image/jpeg"
                multiple
                name="image"
                className="hidden"
                onChange={uploadImages}
              />
              <Icon icon="bxs:image-add" className="text-2xl" />
              <p>0/10</p>
            </label>
          </div>
          {/* 이미지 뜰 공간 */}
          <ul></ul>
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
            />

            <div className="relative h-auto w-full p-5">
              <textarea
                {...register("desc", {
                  onChange: () => textAreaValue,
                  required: "아이템에 대한 설명을 작성해주세요.",
                })}
                name="desc"
                rows={10}
                className={cls(
                  "peer w-full resize-none",
                  isText ? "is-valid" : "",
                )}
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

export const getStaticProps = async () => {
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

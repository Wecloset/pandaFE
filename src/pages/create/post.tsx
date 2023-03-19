import { Icon } from "@iconify/react";
import { GetStaticProps, NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/user";
import Button from "../../components/button";
import UploadImages from "../../components/create/upload-images";
import Header from "../../components/header";
import useOptions from "../../hooks/useOptions";
import useUpload from "../../hooks/useUpload";
import { CreateState, CredentialProps } from "../../types/create-type";
import { ProductDataMin, UserData } from "../../types/data-type";
import { cls } from "../../utils/class";
import ProductTagTab from "../../components/create/product-tab";
import { createImageUrl } from "../../utils/image-url";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingSpinner from "../../components/loading-spinner";

const CreatePost: NextPage<CredentialProps> = ({
  region,
  accessKey,
  secretKey,
}) => {
  const credentials = { region, accessKey, secretKey };
  const userData = useRecoilValue(currentUserState) as UserData;
  const { product } = userData;

  const router = useRouter();

  const [isText, setIsText] = useState<boolean>(false);
  const [tagItems, setTagItems] = useState<ProductDataMin[]>([]);

  const { register, handleSubmit } = useForm<CreateState>({
    mode: "onSubmit",
  });

  const { uploadImage, deleteImage, encodeFile, imgsrc } =
    useUpload(credentials);

  const { isTabOpen, openTab, closeTab } = useOptions({});

  const textAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.value !== "" ? setIsText(true) : setIsText(false);
  };

  const setTagItemList = (list: ProductDataMin[]) => {
    setTagItems(list);
  };

  const removeTagItem = (id: number) => {
    setTagItems(prev => prev.filter(item => item.id !== id));
  };

  const createPost = async (payload: {
    data: CreateState;
    imageurlList: string[];
    tagIdList: number[];
  }) => {
    const { id: userId } = userData;
    const { data, imageurlList, tagIdList } = payload;
    const { data: response } = await axios.post("/api/look", {
      data,
      imageurlList,
      tagIdList,
      userId,
    });
    return response;
  };

  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: ({ message }) => {
      alert(message);
      // router.replace("/mypage");
    },
    onError: ({ response }) => {
      alert(response.data.message);
    },
  });

  const valid = async (data: CreateState) => {
    const imageurlList: string[] = [];
    imgsrc.forEach(item => {
      // s3 upload
      uploadImage(item.file, "lookbook");
      const imageurl = createImageUrl(item.file, "lookbook");
      imageurlList.push(imageurl);
    });

    const tagIdList = tagItems.map(item => +item.id);
    mutate({ data, imageurlList, tagIdList });
  };

  const inValid = (error: FieldErrors) => {
    alert(error.image?.message);
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
      <div className="px-5 py-5">
        <form onSubmit={handleSubmit(valid, inValid)}>
          <UploadImages
            register={register}
            deleteImage={deleteImage}
            encodeFile={encodeFile}
            imgsrc={imgsrc}
          />
          <div className="border-t border-b border-borderColor-gray pb-2 [&>input]:h-[52px] [&>input]:border-b [&>input]:px-4">
            <div className="relative h-auto w-full p-5">
              <textarea
                {...register("desc", {
                  onChange: e => textAreaValue(e),
                })}
                name="desc"
                rows={10}
                className={cls(
                  "peer w-full resize-none",
                  isText ? "is-valid" : "",
                )}
                onChange={textAreaValue}
              />
              <div className="text-/common-gray pointer-events-none absolute top-5 left-5 bg-transparent peer-focus:hidden peer-[.is-valid]:hidden">
                <p>문구를 작성해주세요.</p>
              </div>
            </div>
            <input
              {...register("tag")}
              type="text"
              name="tag"
              placeholder="스타일관련 태그를 작성할 수 있습니다. Ex. #style"
              autoComplete="off"
              className="border"
            />
          </div>
          <div className="[&>*]:flex [&>*]:h-[52px] [&>*]:items-center [&>*]:justify-between [&>*]:border-b [&>*]:px-4 [&>*]:hover:bg-[#f7f7f7]">
            <div onClick={openTab}>
              <span>상품 태그</span>
              <Icon icon="material-symbols:arrow-outward" />
            </div>
          </div>
          <div className="fixed bottom-0 mt-40 w-[350px]">
            <Button
              text="완료"
              padding="p-0"
              color="bg-black"
              fontColor="text-white"
            />
          </div>
        </form>
        {isTabOpen && (
          <ProductTagTab
            product={product}
            tagItems={tagItems}
            closeTab={closeTab}
            onSetItems={setTagItemList}
          />
        )}
        {tagItems.length > 0 && (
          <ul className="mt-5 h-80 w-full space-y-4 overflow-hidden overflow-y-scroll">
            {tagItems.map(item => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex">
                  <img
                    src={item.imgurl[0].img}
                    alt={item.title}
                    className="mr-3 h-[62px] w-[62px] border border-common-black object-cover"
                  />
                  <div className="text-common-black">
                    <p>{item.brand}</p>
                    <p className="mb-2 text-xs text-textColor-gray-100">
                      {item.title}
                    </p>
                    <p className="font-bold">{item.price}</p>
                  </div>
                </div>
                <Icon
                  icon="ri:close-circle-fill"
                  className="rounded-full bg-white text-xl"
                  onClick={() => removeTagItem(+item.id)}
                />
              </li>
            ))}
          </ul>
        )}
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

export default CreatePost;

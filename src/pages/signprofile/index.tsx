import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "../../components/header";
import { errorLine } from "../../lib/error";
import profile from "../../../public/asset/image/addprofile.png";
import Image from "next/image";
import axios from "axios";
import { FormEvent, useState } from "react";
import useUpload from "../../hooks/useUpload";
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../../components/loading-spinner";
import { createImageUrl } from "../../utils/image-url";
import { signOut } from "next-auth/react";

interface CredentialProps {
  region: string;
  accessKey: string;
  secretKey: string;
}

const SignProfile: NextPage<CredentialProps> = ({
  region,
  accessKey,
  secretKey,
}) => {
  const router = useRouter();

  const credentials = { region, accessKey, secretKey };

  const { uploadImage, encodeFile, imgsrc } = useUpload(credentials);

  const [pass, setPass] = useState<boolean>(false); //닉네임 중복 통과 state

  //유저 정보를 query 로 전달받아서 signUser 의 user.id 을 이용해 다음단계이어감
  const { data: signUser } = useQuery("userData", async () => {
    const { data } = await axios.get(`/api/user?email=${router.query.email}`);
    return data;
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({});

  //닉네임 중복확인
  const onDuplication = (event: FormEvent) => {
    event.preventDefault();
    const nickname = getValues("nickname");
    nickMutate(nickname);
  };

  //닉네임 등록
  const createNickName = async (createNick: string) => {
    const { data } = await axios.post("/api/user/nickname", {
      nickname: createNick,
    });
    return data;
  };

  const { mutate: nickMutate, isLoading: nickLoading } = useMutation(
    createNickName,
    {
      onSuccess: ({ message }) => {
        alert(message);
        setPass(true);
      },
      onError: ({ response }) => {
        alert(response.data.message);
        setPass(false);
      },
    },
  );

  //프로필 이미지 등록
  const createProfile = async (userProfile: any) => {
    uploadImage(imgsrc[0].file, "profile");
    const imageurl = createImageUrl(imgsrc[0].file, "profile");
    userProfile.image = imageurl;
    const { data: response } = await axios.post("/api/auth/profile", {
      userProfile,
      userData: signUser.user.id,
    });

    return response;
  };

  const { mutate: profileMutate, isLoading: profileLoading } = useMutation(
    createProfile,
    {
      onSuccess: ({ message }) => {
        alert(message);
        router.replace("/login");
        signOut({ redirect: false }); //회원가입을 할 경우에 로그인 되어있어서 강제 로그아웃시킴
      },
      onError: ({ response }) => {
        alert(response.data.message);
      },
    },
  );

  return (
    <>
      <Header text="SIGNUP" goBack noGoBack />
      <div className="px-5">
        <p className="mb-3 px-2 text-xl">마지막입니다!</p>
        <p className="px-2 text-base">
          사용하실 닉네임과 프로필사진을 설정해주세요.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitData => profileMutate({ ...submitData }))}
        className="mt-32 flex flex-col items-center justify-center px-5"
      >
        <label className="text-textCol or-gray-100 flex h-[178px] w-[178px] flex-shrink-0 cursor-pointer gap-1 rounded-full bg-textColor-gray-100 hover:scale-105 hover:transition hover:duration-150  hover:ease-in-out">
          {imgsrc.length !== 0 ? (
            <Image
              src={imgsrc[0]?.dataUrl}
              alt="업로드이미지"
              width={178}
              height={178}
              className="rounded-full"
            />
          ) : (
            <Image src={profile} alt="test" width={178} height={178} />
          )}
          <input
            {...register("image", { required: "이미지를 등록해주세요." })}
            id="picture"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            multiple={false}
            onChange={encodeFile}
          />
        </label>

        <div className="mt-8 flex w-full justify-between px-3">
          <input
            {...register("nickname", { minLength: 1 })}
            placeholder="닉네임"
            className={errorLine(errors.nickname)}
          />
          {nickLoading ? (
            <LoadingSpinner />
          ) : (
            <button
              type="button"
              onClick={onDuplication}
              className=" ml-3 h-9 w-2/5 bg-black text-white hover:bg-primary-green"
            >
              중복확인
            </button>
          )}
        </div>
        {profileLoading ? (
          <LoadingSpinner />
        ) : (
          <input
            disabled={!pass}
            type="submit"
            className="mt-5 mb-10 h-12 bg-common-gray px-2 hover:cursor-pointer hover:bg-primary-green"
          />
        )}
      </form>
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

export default SignProfile;

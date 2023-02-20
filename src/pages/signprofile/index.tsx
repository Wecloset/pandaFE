import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "../../components/header";
import { errorLine } from "../../lib/error";
import profile from "../../../public/asset/image/addprofile.png";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import useUpload from "../../hooks/useUpload";
import { createImageUrl } from "../../lib/image-url";
import { axiosGet, axiosPost } from "../../lib/services";

interface CredentialProps {
  region: string;
  accessKey: string;
  secretKey: string;
}

interface userProps {
  createdDate: string;
  email: string;
  id: number;
  password: string;
}

interface ProfileProps {
  [key: string]: string | FileList;
}

const SignProfile: NextPage<CredentialProps> = ({
  region,
  accessKey,
  secretKey,
}) => {
  const [user, setUser] = useState<userProps | undefined>(undefined);
  useEffect(() => {
    axiosGet("/api/signtag").then(res => {
      setUser(
        res.data.length === 0
          ? res.data[res.data.length]
          : res.data[res.data.length - 1],
      );
    });
  }, []);

  const router = useRouter();
  const credentials = { region, accessKey, secretKey };

  const { uploadImage, encodeFile, imgsrc } = useUpload(credentials);

  const [pass, setPass] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({});

  const onDuplication = async () => {
    const nickname = getValues("nickname");
    await axios
      .post("/api/nickname", {
        headers: { "Content-Type": "application/json" },
        data: {
          nickname,
        },
      })
      .then(res => {
        res.status === 200 && window.alert(res.data.message);
        setPass(true);
      })
      .catch(error => {
        window.alert(`${error.response.data.message}`);
        setPass(false);
      });
  };

  const addProfile = (data: ProfileProps) => {
    axiosPost(
      "/api/profile",
      {
        data,
        userData: user?.id,
      },
      router,
      "/login",
    );
  };

  const valid = async (data: ProfileProps) => {
    uploadImage(imgsrc[0].file);
    const imageurl = createImageUrl(imgsrc[0].file);
    data.image = imageurl;
    addProfile(data);
  };

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
        onSubmit={handleSubmit(valid)}
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
          <button
            onClick={onDuplication}
            type="button"
            className=" ml-3 h-9 w-2/5 bg-black text-white hover:bg-primary-green"
          >
            중복확인
          </button>
        </div>
        <div className=" bottom-0 mb-7 w-full px-3">
          <input
            disabled={!pass}
            type="submit"
            className="mt-5 mb-10 h-12 bg-commom-gray px-2 hover:bg-primary-green"
          />
        </div>
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

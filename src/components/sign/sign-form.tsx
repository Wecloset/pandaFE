import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { regExgPw, regExpEm } from "../../lib/regInput";

interface SignProps {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

const SignForm: NextPage = () => {
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SignProps>({});
  const onSubmit = handleSubmit(data => {
    axios.post("/api/sign", {
      headers: { "Content-Type": "application/json" },
      data,
    });
    router.push("/signtag");
  });
  return (
    <form onSubmit={onSubmit} className="px-5">
      <p className="mt-5 px-2 text-lg">사용하실 이메일을 입력해주세요</p>
      <input
        {...register("email", { required: true, pattern: regExpEm })}
        placeholder="아이디(이메일)"
        className={`${
          errors.email && "border-b-error"
        } mb-2  h-9 border-b-2 px-3 text-black placeholder:text-textColor-gray-100`}
      />
      {errors?.email?.type === "required" && (
        <p className="mb-2 px-2 text-error">이메일을 입력해주세요</p>
      )}
      {errors?.email?.type === "pattern" && (
        <p className="mb-2 px-2 text-error">잘못된 이메일 형식입니다.</p>
      )}
      <p className="mb-1 mt-5  px-2 text-lg">비밀번호를 입력해주세요.</p>
      <p className="mb-2 px-2 text-xs text-textColor-gray-100">
        6자리 이상의 비밀번호를 설정해주세요
      </p>
      <input
        type="password"
        {...register("password", { required: true, pattern: regExgPw })}
        placeholder="비밀번호"
        autoComplete="false"
        className={`${
          errors.password && "border-b-error"
        } mb-2  h-9 border-b-2 px-3 text-black placeholder:text-textColor-gray-100`}
      />
      {errors?.password?.type === "required" && (
        <p className="mb-2 px-2 text-error">비밀번호를 입력해주세요</p>
      )}
      {errors?.password?.type === "pattern" && (
        <p className="mb-2 px-2 text-error">잘못된 비밀번호 형식입니다.</p>
      )}
      <input
        type="password"
        {...register("passwordConfirm", {
          required: true,
          validate: {
            confrimPassword: value => {
              const { password } = getValues();
              return password === value || "비밀번호가 일치하지 않습니다";
            },
          },
        })}
        placeholder="비밀번호 확인"
        autoComplete="false"
        className={`${
          errors.passwordConfirm && "border-b-error"
        } mb-2 h-9 border-b-2 px-3 text-black placeholder:text-textColor-gray-100`}
      />
      {errors?.passwordConfirm?.type === "required" && (
        <p className="mb-2 px-2 text-error">비밀번호를 다시 입력해주세요</p>
      )}
      <p className="mb-2 px-2 text-error">{errors?.passwordConfirm?.message}</p>
      <p className="mt-5 px-2 text-lg">사용하실 닉네임을 입력해주세요</p>
      <div className="flex">
        <input
          {...register("nickname", { required: true })}
          placeholder="닉네임"
          className={`${
            errors.nickname && "border-b-error"
          } h-11 w-3/5 border-b-2 px-3 py-5 text-black placeholder:text-textColor-gray-100`}
        />
        {/* <Button
          text="중복확인"
          color="bg-black"
          fontColor="text-white"
          hover="hover:bg-primary-green"
          divWidth="w-2/5"
          padding="pl-4"
          height="h-10"
        />*/}
      </div>
      {errors?.nickname?.type === "required" && (
        <p className="mb-2 px-2 text-error">닉네임 입력해주세요</p>
      )}
      <input
        type="submit"
        className="mt-5 mb-10 h-12 bg-commom-gray hover:bg-primary-green"
      />
    </form>
  );
};

export default SignForm;

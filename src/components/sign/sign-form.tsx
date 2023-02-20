import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { errorLine, errorMessage } from "../../lib/error";
import createHashedPassword from "../../lib/hash";
import { regExgPw, regExpEm } from "../../lib/regInput";
import { axiosPost } from "../../lib/services";

interface SignProps {
  email: string;
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
    axiosPost(
      "/api/sign",
      {
        email: data.email,
        password: createHashedPassword(data.password),
      },
      router,
      "/signtag",
    );
  });

  return (
    <form onSubmit={onSubmit} className="px-5">
      <p className="mt-5 px-2 text-lg">사용하실 이메일을 입력해주세요</p>
      <input
        {...register("email", { required: true, pattern: regExpEm })}
        placeholder="아이디(이메일)"
        className={errorLine(errors.email)}
      />
      {errorMessage(errors?.email?.type, "required", "이메일을 입력해주세요")}
      {errorMessage(errors?.email?.type, "pattern", "잘못된 이메일 형식입니다")}
      <p className="mb-1 mt-5  px-2 text-lg">비밀번호를 입력해주세요.</p>
      <p className="mb-2 px-2 text-xs text-textColor-gray-100">
        숫자,문자,특수문자를 혼합한 6자리 이상 비밀번호를 설정해주세요
      </p>
      <input
        type="password"
        {...register("password", { required: true, pattern: regExgPw })}
        placeholder="비밀번호"
        autoComplete="false"
        className={errorLine(errors.password)}
      />
      {errorMessage(
        errors?.password?.type,
        "required",
        "비밀번호를 입력해주세요",
      )}
      {errorMessage(
        errors?.password?.type,
        "pattern",
        "잘못된 비밀번호 형식입니다",
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
        className={errorLine(errors.passwordConfirm)}
      />
      {errorMessage(
        errors?.passwordConfirm?.type,
        "required",
        "비밀번호를 다시 입력해주세요",
      )}
      <p className="mb-2 px-2 text-error">{errors?.passwordConfirm?.message}</p>

      <input
        type="submit"
        className="mt-5 mb-10 h-12 bg-commom-gray hover:bg-primary-green"
      />
    </form>
  );
};

export default SignForm;

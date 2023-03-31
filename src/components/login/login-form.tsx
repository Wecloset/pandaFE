import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { errorLine, errorMessage } from "../../lib/error";
import { cls } from "../../utils/class";
import createHashedPassword from "../../utils/hash";
import { regExgPw, regExpEm } from "../../utils/regInput";

interface LoginProps {
  email: string;
  password: string;
  nickname: string;
}

const LoginForm: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginProps>({
    mode: "onChange",
  });

  const onSubmit = async (data: LoginProps) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: createHashedPassword(data.password),
      nickname: data.nickname,
    });

    !result?.error ? router.replace("/") : alert(result.error);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-3">
      <input
        {...register("email", { required: true, pattern: regExpEm })}
        placeholder="아이디(이메일)"
        className={cls(
          "mb-2 h-14 border-b border-b-white bg-transparent text-base text-white placeholder:text-white focus:border-b-primary-green",
          errors.email ? "border-b-error" : "",
        )}
      />
      {errorMessage(errors?.email?.type, "required", "이메일을 입력해주세요")}
      {errorMessage(errors?.email?.type, "pattern", "잘못된 이메일 형식입니다")}
      <input
        type="password"
        {...register("password", { required: true, pattern: regExgPw })}
        placeholder="비밀번호"
        autoComplete="false"
        className={cls(
          "mb-2 h-14 border-b border-b-white bg-transparent text-base text-white placeholder:text-white focus:border-b-primary-green",
          errors.email ? "border-b-error" : "",
        )}
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
      <button
        type="submit"
        className={cls(
          "mt-3 h-12 w-full text-base text-black",
          isValid ? "bg-primary-green" : "bg-common-gray",
        )}
        disabled={!isValid}
      >
        SIGN IN
      </button>
      <button
        type="button"
        className="mt-3 h-12 w-full bg-transparent text-white hover:underline"
      >
        <Link href="/sign">회원가입</Link>
      </button>
    </form>
  );
};

export default LoginForm;

import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { regExgPw, regExpEm } from "../../lib/regInput";

interface LoginProps {
  email: string;
  password: string;
}

interface LoginListProps {
  list: string[] | undefined;
}

const LoginForm: NextPage<LoginListProps> = ({ list }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({});
  const onSubmit = handleSubmit(data => {
    axios.post("/api/login", {
      headers: { "Content-Type": "application/json" },
      data: {
        userData: list,
        submit: data,
      },
    });
    router.push("/");
  });
  return (
    <form onSubmit={onSubmit} className="px-3 py-5">
      <input
        {...register("email", { required: true, pattern: regExpEm })}
        placeholder="아이디(이메일)"
        className={`${
          errors.email && "border-b-error"
        } mb-2 h-9 border-b-2 bg-transparent px-2 text-white placeholder:text-white`}
      />
      {errors?.email?.type === "required" && (
        <p className="mb-2 px-2 text-error">이메일을 입력해주세요</p>
      )}
      {errors?.email?.type === "pattern" && (
        <p className="mb-2 px-2 text-error">잘못된 이메일 형식입니다.</p>
      )}
      <input
        type="password"
        {...register("password", { required: true, pattern: regExgPw })}
        placeholder="비밀번호"
        autoComplete="false"
        className={`${
          errors.password && "border-b-error"
        } mb-2 h-9  border-b-2 bg-transparent px-2 text-white placeholder:text-white`}
      />
      {errors?.password?.type === "required" && (
        <p className="mb-2 px-2 text-error">비밀번호를 입력해주세요</p>
      )}
      {errors?.password?.type === "pattern" && (
        <p className="mb-2 px-2 text-error">잘못된 비밀번호 형식입니다.</p>
      )}
      <input
        type="submit"
        className="mt-3 h-12 bg-commom-gray hover:bg-primary-green"
      />
      <button
        type="button"
        className="mt-3 h-12 w-full bg-transparent text-white "
      >
        <Link href="/sign">회원가입</Link>
      </button>
    </form>
  );
};

export default LoginForm;

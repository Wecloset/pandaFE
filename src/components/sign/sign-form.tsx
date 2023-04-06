import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useToast from "../../hooks/useToast";
import { errorMessage } from "../../lib/error";
import { cls } from "../../utils/class";
import { regExgPw, regExpEm } from "../../utils/regInput";
import { apiPost } from "../../utils/request";
import Button from "../ui/button";

interface SignProps {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignForm: NextPage = () => {
  const router = useRouter();

  const { setToast, Toast } = useToast();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignProps>({
    mode: "onChange",
  });

  const createUser = (userData: SignProps) => {
    const response = apiPost.CREATE_USER(userData);
    return response;
  };

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: data => {
      router.push(
        {
          pathname: "/sign/signtag",
          query: {
            email: data.email,
          },
        },
        "/sign/signtag",
      );
    },
    onError: ({ response }) => {
      setToast(response.data.message, true);
    },
  });
  return (
    <>
      <Toast />
      <form
        onSubmit={handleSubmit(submitData => mutate({ ...submitData }))}
        className="signup-minheight space-y-14 px-8 pt-4"
      >
        <div>
          <p className="mt-5 mb-4 text-xl">사용하실 이메일을 입력해주세요.</p>
          <input
            {...register("email", { required: true, pattern: regExpEm })}
            placeholder="아이디(이메일)"
            className={cls(
              "h-10 border-b border-black bg-transparent placeholder:text-textColor-gray-50",
              errors.email ? "mb-2 border-b-error" : "",
            )}
          />
          {errorMessage(
            errors?.email?.type,
            "required",
            "이메일을 입력해주세요",
          )}
          {errorMessage(
            errors?.email?.type,
            "pattern",
            "잘못된 이메일 형식입니다",
          )}
        </div>
        <div>
          <p className="mb-3 text-xl">비밀번호를 입력해주세요.</p>
          <div className="mb-4 text-sm text-textColor-gray-100">
            <p>숫자,문자,특수문자를 혼합하여</p>
            <p>6자리 이상의 비밀번호를 설정해주세요.</p>
          </div>
          <input
            type="password"
            {...register("password", { required: true, pattern: regExgPw })}
            placeholder="비밀번호"
            autoComplete="false"
            className={cls(
              "h-10 border-b border-black bg-transparent placeholder:text-textColor-gray-50",
              errors.password ? "mb-2 border-b-error" : "",
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
            className={cls(
              "mt-3 h-10 border-b border-black bg-transparent placeholder:text-textColor-gray-50",
              errors.passwordConfirm ? "mb-2 border-b-error" : "",
            )}
          />
          {errorMessage(
            errors?.passwordConfirm?.type,
            "required",
            "비밀번호를 다시 입력해주세요",
          )}
          <p className="mb-2 px-2 text-error">
            {errors?.passwordConfirm?.message}
          </p>
        </div>
        <Button
          type="submit"
          classes="bg-black text-white"
          btnWrapClasses="p-0"
          text="다음"
          textWidth="w-full"
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default SignForm;

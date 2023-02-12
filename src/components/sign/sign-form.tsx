import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { regExgPw, regExpEm } from "../../lib/regInput";
import { taglist } from "../../lib/tag-data";

interface SignProps {
  tags: string[];
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
    if (returnitem.length === 0) {
      window.alert("태그는 하나이상 입력하셔야 합니다");
      return;
    }
    Object.assign(data, { tags: [returnitem] });
    router.push("/login");
  });
  const [returnitem, setReturnItem] = useState<string[]>([]);
  const newArray: string[] = [];
  const onResetBtn = () => {
    setReturnItem([]);
  };
  const newList = taglist.value;
  const onClick = (data: string) => {
    setReturnItem([...returnitem, data]);
    const deduplication = returnitem.includes(data);
    if (deduplication) {
      setReturnItem([...returnitem]);
    }
  };
  const onDelete = (x: string) => {
    const deleteItem = returnitem.indexOf(x);
    const cutone = returnitem.slice(0, deleteItem);
    const cuttwo = returnitem.slice(deleteItem + 1, returnitem.length);
    newArray.push(...cutone);
    newArray.push(...cuttwo);
    setReturnItem(newArray);
  };
  return (
    <form onSubmit={onSubmit} className="px-3 py-5">
      <p className=" px-2 text-lg">사용하실 이메일을 입력해주세요</p>
      <input
        {...register("email", { required: true, pattern: regExpEm })}
        placeholder="아이디(이메일)"
        className={`${
          errors.email && "border-b-error"
        } mb-2 h-9 border-b-2 px-2 text-black placeholder:text-textColor-gray-100`}
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
        } mb-2  h-9 border-b-2 px-2 text-black placeholder:text-textColor-gray-100`}
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
        } mb-2 h-9 border-b-2 px-2 text-black placeholder:text-textColor-gray-100`}
      />
      {errors?.passwordConfirm?.type === "required" && (
        <p className="mb-2 px-2 text-error">비밀번호를 다시 입력해주세요</p>
      )}
      <p className="mb-2 px-2 text-error">{errors?.passwordConfirm?.message}</p>
      <div className="[&>input]:h-[48px] [&>input]:border-b [&>input]:px-4">
        <p className="mt-5 mb-1 px-2 text-lg">키워드를 선택해주세요.</p>
        <div className="flex justify-between px-2 ">
          <p className="mb-2 text-xs text-textColor-gray-100">
            1개 이상의 키워드나 브랜드를 선택해주세요.
          </p>
          <p>{`${returnitem.length}/${taglist.value.length}`}</p>
        </div>
        <div>
          <ul className="my-3 flex w-full flex-wrap gap-2 px-2">
            {newList.map((ele, index) => {
              return (
                <div
                  className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-solid border-black py-1 px-2 hover:bg-black hover:text-white"
                  key={index}
                  onClick={() => onClick(ele)}
                >
                  {ele}
                </div>
              );
            })}
            <button onClick={onResetBtn} className="px-2 text-2xl">
              <Icon icon="carbon:reset" />
            </button>
          </ul>
          {
            <>
              <ul className="my-3 flex w-full flex-wrap gap-2 px-2">
                {returnitem.map(x => (
                  <div key={Math.random()} onClick={() => onDelete(x)}>
                    {x}
                  </div>
                ))}
              </ul>
            </>
          }
        </div>
      </div>
      <input
        type="submit"
        className=" h-12 bg-commom-gray hover:bg-primary-green"
      />
    </form>
  );
};

export default SignForm;

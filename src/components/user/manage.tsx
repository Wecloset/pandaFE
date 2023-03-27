import { Icon } from "@iconify/react";
import axios from "axios";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { UserData } from "../../types/data-type";

const UserManage: NextPage<{ userData: UserData }> = ({ userData }) => {
  const router = useRouter();

  const { mutate: userMutate } = useMutation(
    async (id: number) => {
      const response = await axios.delete(`/api/user/${id}`);
      return response;
    },
    {
      onSuccess: () => {
        alert("회원탈퇴가 완료되었습니다");
        router.replace("/").then(() => signOut());
      },
      onError: () => {
        alert("다시 시도해주세요");
      },
    },
  );

  const handleDelete = () => {
    if (!userData) return;
    userMutate(userData.id);
  };
  const signout = () => {
    alert("로그아웃이 완료되었습니다.");
    router.replace("/").then(() => signOut());
  };
  return (
    <div className="  fixed bottom-0 w-[390px] py-14 px-6">
      <div
        className="flex cursor-pointer items-center justify-between py-3 hover:scale-105 hover:duration-150"
        onClick={signout}
      >
        <p className=" text-base font-bold">로그아웃</p>
        <Icon
          icon="material-symbols:chevron-right-sharp"
          className=" text-xl font-bold"
        />
      </div>
      <div
        className="flex cursor-pointer items-center justify-between py-3 hover:scale-105 hover:duration-150"
        onClick={handleDelete}
      >
        <p className=" text-base font-bold">회원탈퇴</p>
        <Icon
          icon="material-symbols:chevron-right-sharp"
          className=" text-xl font-bold"
        />
      </div>
    </div>
  );
};

export default UserManage;

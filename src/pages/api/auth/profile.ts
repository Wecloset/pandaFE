import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const userSignTag = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return;

  const {
    userData,
    userProfile: { image, nickname },
  } = req.body;
  const UpdateProfile = await client.user.update({
    where: {
      id: userData,
    },
    data: {
      nickname,
      profileImg: image,
    },
  });
  UpdateProfile
    ? res.status(201).json({
        message: "회원가입이 완료되었습니다.",
      })
    : res.status(500).json({
        message: "프로필 내용을 올바르게 입력해주세요",
      });
};
export default userSignTag;

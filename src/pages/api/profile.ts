import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const userSignTag = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      userData,
      data: { image, nickname },
    } = req.body.data;

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
      ? res.status(200).json({
          message: "회원가입이 완료되었습니다.",
        })
      : res.status(400).json({
          message: "프로필 설정이 잘 못 되었습니다.",
        });
  }
};
export default userSignTag;

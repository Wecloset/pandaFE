import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const userSignTag = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const signUserData = await client.user.findMany();
    res.json(signUserData);
  }
  if (req.method === "POST") {
    const { userData, tags } = req.body.data;
    const signTagUser = await client.hashTag.create({
      data: {
        userId: userData,
        tag: tags,
      },
    });
    signTagUser
      ? res.status(200).json({
          message: "회원가입이 완료되었습니다.",
        })
      : res.status(400).json({
          message: "관심 태그 설정이 잘못되었습니다",
        });
  }
};

export default userSignTag;

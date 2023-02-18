import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";
import createHashedPassword from "../../lib/hash";

const userSign = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, nickname } = req.body.data;
  if (req.method === "POST") {
    const signUser = await client.user.create({
      data: {
        nickname,
        email,
        password: createHashedPassword(password),
      },
    });
    signUser
      ? res.status(200).json({
          message: "회원 정보가 저장되었습니다.",
        })
      : res.status(400).json({
          message: "회원정보가 잘못되었습니다",
        });
  }
};

export default userSign;

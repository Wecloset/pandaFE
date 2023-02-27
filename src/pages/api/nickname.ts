import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const nickCheck = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { nickname } = req.body.data;
    const CheckNickName = await client.user.findMany({
      where: {
        nickname,
      },
    });
    nickname === ""
      ? res
          .status(400)
          .json({ message: "닉네임은 최소 한글자 이상 입력해주세요" })
      : CheckNickName.length === 0
      ? res.status(200).json({ message: "닉네임을 사용할 수 있습니다." })
      : res.status(400).json({
          message: "해당 닉네임은 중복됩니다. ",
        });
  }
};

export default nickCheck;

import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const nickCheck = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nickname } = req.body;

  if (req.method === "POST") {
    const hasNickname = await client.user.findMany({
      where: {
        nickname,
      },
    });
    if (hasNickname.length === 0) {
      res
        .status(201)
        .json({
          message: "닉네임을 사용할 수 있습니다.",
          hasNickname,
          nickname,
        });
    }
    res.status(500).json({
      message: "해당 닉네임은 중복됩니다.",
    });
  }
};

export default nickCheck;

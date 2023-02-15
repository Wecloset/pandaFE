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
    if (CheckNickName.length === 0) {
      res
        .status(200)
        .json({ message: "닉네임을 사용할 수 있습니다.", error: false });
      return;
    } else {
      res.status(404).json({
        message: "해당 닉네임은 중복됩니다. ",
        error: true,
      });
    }
    res.json(CheckNickName);
  }
};

export default nickCheck;

import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const nickCheck = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { nickname } = req.body;

  if (req.method !== "POST") return;

  if (id) {
    // change nickname
    const nickChange = await client.user.update({
      where: {
        id: Number(id),
      },
      data: {
        nickname,
      },
    });
    res.json(nickChange);
  } else {
    // find nickname
    const hasNickname = await client.user.findMany({
      where: {
        nickname,
      },
    });
    if (hasNickname.length === 0) {
      res.status(201).json({
        message: "닉네임을 사용할 수 있습니다.",
        hasNickname,
        nickname,
      });
    }
    res.status(500).json({
      message: "중복된 닉네임입니다.",
    });
  }
};

export default nickCheck;

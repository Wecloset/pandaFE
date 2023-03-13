import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const nickNameChange = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nickname, id } = req.body;

  if (req.method === "POST") {
    const nickChange = await client.user.update({
      where: {
        id,
      },
      data: {
        nickname,
      },
    });
    res.json(nickChange);
  }
};

export default nickNameChange;

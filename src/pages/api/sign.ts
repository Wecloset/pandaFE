import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";
import createHashedPassword from "../../lib/hash";

export default async function userSign(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password, nickname } = req.body.data;
  if (req.method === "POST") {
    const signUser = await client.user.create({
      data: {
        nickname,
        email,
        password: createHashedPassword(password),
      },
    });
    res.json(signUser);
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";
import createHashedPassword from "../../../utils/hash";

const userSign = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (req.method === "POST") {
    try {
      const user = await client.user.create({
        data: {
          email,
          password: createHashedPassword(password),
        },
      });
      res.status(201).json(user);
    } catch {
      res.status(500).json({ message: "회원가입을 실패했습니다" });
    }
  }
};

export default userSign;

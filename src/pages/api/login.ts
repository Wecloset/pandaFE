import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";
import createHashedPassword from "../../lib/hash";

const userLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body.data;
    const CheckUser = await client.user.findMany({
      where: {
        email,
        password: createHashedPassword(password),
      },
    });
    if (CheckUser.length === 0) {
      return res.status(404).json({
        message: "회원정보가 없습니다.",
        error: true,
      });
    } else {
      return res
        .status(200)
        .json({ message: "로그인이 완료되었습니다.", error: false });
    }
  }
};

export default userLogin;

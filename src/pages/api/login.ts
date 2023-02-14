import { copyFile } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";
import createHashedPassword from "../../lib/hash";

export default async function userLogin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const LoginUserData = await client.user.findMany();
    res.json(LoginUserData);
  }
  if (req.method === "POST") {
    const { submit } = req.body.data;
    const CheckUser = await client.user.findMany({
      where: {
        email: submit.email,
        password: createHashedPassword(submit.password),
      },
    });
    if (CheckUser.length === 0) {
      res.status(404).json({
        message: "아이디 혹은 비밀번호가 잘못되었습니다.",
        error: true,
      });
      return;
    } else {
      res
        .status(200)
        .json({ message: "로그인이 완료되었습니다.", error: false });
    }
    res.json(CheckUser);
  }
}

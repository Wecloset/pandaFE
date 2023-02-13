import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

export default async function userLogin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const LoginUserData = await client.user.findMany();
    res.json(LoginUserData);
  }
  if (req.method === "POST") {
    const { userData, submit } = req.body.data;
    const CheckUser = await client.user
      .findMany({
        where: {
          email: submit.email,
          password: submit.password,
        },
      })
      .then(res => console.log(res));
    res.json(CheckUser);
  }
}

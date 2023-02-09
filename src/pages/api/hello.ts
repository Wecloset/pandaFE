// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await client.user.create({
    data: {
      email: "rlorxl3@test.com",
      nickname: "rlorxl3",
      password: "fjdksla",
    },
  });

  res.status(200).json({ name: "John Doe" });
}

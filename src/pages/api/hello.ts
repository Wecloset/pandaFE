// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password, nickname, tags, id } = req.body.data;
  if (req.method === "GET") {
    //Read
    res.json({ ok: true });
  }
  if (req.method === "POST") {
    const signUser = await client.user.create({
      data: {
        nickname,
        email,
        password,
      },
    });
    res.json(signUser);
  }
  if (req.method === "PUT") {
    //Update
    res.json({ ok: true });
  }
  if (req.method === "DELETE") {
    //Delete
    res.json({ ok: true });
  }
}

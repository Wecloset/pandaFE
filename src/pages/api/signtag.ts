import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const userSignTag = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const signUserData = await client.user.findMany();
    res.json(signUserData);
  }
  if (req.method === "POST") {
    const { userData, tags } = req.body.data;
    const signUser = await client.hashTag.create({
      data: {
        userId: userData,
        tag: tags,
      },
    });
    res.json(signUser);
  }
};

export default userSignTag;

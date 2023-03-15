import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const UserTagChange = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tags, id } = req.body;
  if (req.method === "POST") {
    const tagChange = await client.hashTag.update({
      where: {
        id,
      },
      data: {
        tag: tags.join(","),
      },
    });
    res.json(tagChange);
  }
};

export default UserTagChange;

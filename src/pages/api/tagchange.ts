import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const UserTagChange = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tags, id } = req.body;

  if (req.method === "POST") {
    try {
      const tagChange = await client.user.update({
        where: {
          id,
        },
        data: {
          keywords: {
            disconnect: [],
            connectOrCreate: tags.map((tagName: string) => ({
              create: { tag: tagName },
              where: { tag: tagName },
            })),
          },
        },
      });

      res.json(tagChange);
    } catch (err) {
      res.json(err);
    }
  }
};

export default UserTagChange;

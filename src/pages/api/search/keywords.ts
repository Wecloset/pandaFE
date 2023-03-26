import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const searchKeywords = async (req: NextApiRequest, res: NextApiResponse) => {
  const { item } = req.query;
  if (req.method === "GET") {
    try {
      const allKeywords = await client.product.findMany({
        where: {
          OR: [
            { title: { contains: item as string } },
            { hashTag: { some: { tag: { contains: item as string } } } },
          ],
        },
        include: {
          hashTag: true,
        },
      });
      res.status(200).send(allKeywords);
    } catch (err) {
      res.status(400).send({ message: "Getting products failed." });
    }
  }
};

export default searchKeywords;

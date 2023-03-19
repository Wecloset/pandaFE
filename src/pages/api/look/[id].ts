import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const lookbookDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  const lookbookId = req.query;
  const { id } = lookbookId;

  if (req.method === "GET") {
    try {
      const post = await client.look.findUnique({
        where: {
          id: parseInt(id as string),
        },
        include: {
          user: true,
          imgurl: true,
          hashTag: true,
          product: {
            select: {
              title: true,
              price: true,
              brand: true,
              imgurl: true,
            },
          },
          comment: {
            select: {
              id: true,
              text: true,
              author: true,
            },
          },
          fav: true,
        },
      });
      res.status(200).send(post);
    } catch (err) {
      res.status(400).send({ message: "Getting post failed." });
    }
  }
};

export default lookbookDetail;

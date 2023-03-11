import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const lookbookDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  const lookbookId = req.query;
  const { id } = lookbookId;

  if (req.method === "GET") {
    try {
      const post = await client.look.findUnique({
        where: {
          id: +id!, // non-null필수. 제거시 '`undefined` cannot be serialized as JSON.' 에러발생함.
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
        },
      });
      res.status(200).send(post);
    } catch (err) {
      res.status(400).send({ message: "Getting post failed." });
    }
  }
};

export default lookbookDetail;

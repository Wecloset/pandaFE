import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { lookbookId } = req.body;
  const take = 3;
  const cursorQuery =
    (req.query.cursor as string) === "1" ? undefined : req.query.cursor;
  const skip = cursorQuery ? 1 : 0;
  const cursor = cursorQuery
    ? { id: parseInt(req.query.cursor as string) }
    : { id: 1 };

  if (req.method === "POST") {
    try {
      const posts = await client.look.findMany({
        skip,
        take,
        cursor,
        where: {
          NOT: { id: +lookbookId },
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
        },
      });
      const nextId = posts.length < take ? undefined : posts[take - 1].id;
      res.status(200).json({ posts, nextId });
    } catch (err) {
      res.status(400).end();
    }
  }
};
export default getPosts;

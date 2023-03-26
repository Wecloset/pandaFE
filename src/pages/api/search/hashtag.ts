import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const getHashTag = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const allHashTags = await client.hashTag.findMany();
      res
        .status(200)
        .send({ message: "Getting user data success.", allHashTags });
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

export default getHashTag;

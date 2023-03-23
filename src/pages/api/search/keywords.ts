import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const searchKeywords = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const allKeywords = await client.hashTag.findMany({});
      res.status(200).send(allKeywords);
    } catch (err) {
      res.status(400).send({ message: "Getting products failed." });
    }
  }
};

export default searchKeywords;

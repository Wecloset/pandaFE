import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const productDetailHandler2 = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { slug } = req.query;
  const id = slug![0];

  if (req.method === "POST" && slug![1] === "views") {
    const { view } = req.body.payload;
    try {
      await client.product.update({
        where: {
          id: +id!,
        },
        data: {
          view: view + 1,
        },
      });
      res.status(200).send({ message: "Update views." });
    } catch (err) {
      res.status(400).send({ message: "Updating views failed." });
    }
  }
};

export default productDetailHandler2;

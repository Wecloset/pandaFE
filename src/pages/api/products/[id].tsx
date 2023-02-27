import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const productDetailHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const productId = req.query;
  const { id } = productId;

  if (req.method === "GET" && id) {
    try {
      const productOne = await client.product.findUnique({
        where: {
          id: +id,
        },
        include: {
          user: true,
          imgurl: true,
        },
      });
      res
        .status(200)
        .json({ message: "Getting product success.", data: productOne });
    } catch (err) {
      res.status(400).json({ message: "Getting product failed." });
    }
  }
};

export default productDetailHandler;

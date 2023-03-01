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
          id: +id!, // non-null필수. 제거시 '`undefined` cannot be serialized as JSON.' 에러발생함.
        },
        include: {
          user: true,
          imgurl: true,
          hashTag: true,
        },
      });
      res
        .status(200)
        .send({ message: "Getting product success.", data: productOne });
    } catch (err) {
      res.status(400).send({ message: "Getting product failed." });
    }
  }
};

export default productDetailHandler;

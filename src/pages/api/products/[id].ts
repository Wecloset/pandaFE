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
      const product = await client.product.findUnique({
        where: {
          id: +id!, // non-null필수. 제거시 '`undefined` cannot be serialized as JSON.' 에러발생함.
        },
        include: {
          user: true,
          imgurl: true,
          hashTag: true,
          fav: true,
        },
      });
      res.status(200).send({ message: "Getting product success.", product });
    } catch (err) {
      res.status(400).send({ message: "Getting product failed." });
    }
  }

  if (req.method === "POST") {
    const { currentView } = req.body.data;

    try {
      await client.product.update({
        where: {
          id: +id!,
        },
        data: {
          view: currentView + 1,
        },
      });
      res.status(200).send({ message: "Update view success." });
    } catch (err) {
      res.status(400).send({ message: "Update view failed." });
    }
  }
};

export default productDetailHandler;

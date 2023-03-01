import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const productDetailHandler2 = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { slug } = req.query;
  console.log(slug);

  const id = slug![0];

  if (req.method !== "POST") return;

  if (slug![1] === "like") {
    const { likes, isLikeActive } = req.body.payload;

    try {
      const response = await client.product.update({
        where: {
          id: +id!,
        },
        data: {
          likes: isLikeActive ? likes + 1 : likes,
        },
      });
      res.status(200).send({ message: "Update product data.", data: response });
    } catch (err) {
      res.status(400).send({ message: "Update product failed." });
    }
  }
  if (slug![1] === "views") {
    const { view } = req.body.payload;

    try {
      const response = await client.product.update({
        where: {
          id: +id!,
        },
        data: {
          view: view + 1,
        },
      });
      res.status(200).send({ message: "Update views.", data: response });
    } catch (err) {
      res.status(400).send({ message: "Updating views failed." });
    }
  }
};

export default productDetailHandler2;

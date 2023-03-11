import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const lookbookDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  const lookbookId = req.query;
  const { id } = lookbookId;

  console.log(id);

  if (req.method === "GET" && id) {
    // try {
    //   const product = await client.product.findUnique({
    //     where: {
    //       id: +id!, // non-null필수. 제거시 '`undefined` cannot be serialized as JSON.' 에러발생함.
    //     },
    //     include: {
    //       user: true,
    //       imgurl: true,
    //       hashTag: true,
    //       fav: true,
    //     },
    //   });
    //   res.status(200).send({ message: "Getting product success.", product });
    // } catch (err) {
    //   res.status(400).send({ message: "Getting product failed." });
    // }
  }
};

export default lookbookDetail;

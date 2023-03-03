import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const updateFav = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userId, productId, isLikeActive } = req.body.payload;

    try {
      if (!isLikeActive) {
        await client.user.update({
          where: {
            id: userId,
          },
          data: {
            fav: {
              deleteMany: {
                productId: productId,
              },
            },
          },
        });
      } else {
        await client.fav.create({
          data: {
            userId,
            productId,
          },
        });
      }
      res.status(200).send({ message: "Updating user success." });
    } catch (err) {
      res.status(400).send({ message: "Updating user failed." });
    }
  }
};

export default updateFav;

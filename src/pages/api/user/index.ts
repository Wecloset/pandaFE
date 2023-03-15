import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userEmail } = req.body.data;

    try {
      const user = await client.user.findUnique({
        where: {
          email: userEmail,
        },
        include: {
          keywords: true,
          product: {
            select: {
              id: true,
              brand: true,
              title: true,
              price: true,
              imgurl: {
                select: {
                  id: true,
                  img: true,
                },
              },
            },
          },
          followers: true,
          followings: true,
          fav: {
            select: {
              products: true,
              looks: true,
            },
          },
        },
      });
      res.status(200).send({ message: "Getting user data success.", user });
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

export default getUser;

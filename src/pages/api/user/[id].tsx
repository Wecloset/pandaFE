import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const updateFav = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id } = req.query;
    const { productId, lookId } = req.body;
    const currentUserId = Number(id);

    const fav = await client.user.findUnique({
      where: {
        id: currentUserId,
      },
      include: {
        fav: {
          select: {
            id: true,
            products: true,
            looks: true,
            userId: true,
          },
        },
      },
    });

    const favId = fav?.fav?.id;
    const lookExisted = fav?.fav?.looks.some(look => look.id === lookId);
    const productExisted = fav?.fav?.products.some(
      product => product.id === productId,
    );

    if (productId) {
      try {
        if (!favId) {
          // 초기 fav필드 생성
          await client.fav.create({
            data: {
              products: {
                connect: { id: productId },
              },
              user: {
                connect: { id: currentUserId },
              },
              userId: currentUserId,
            },
          });
        } else if (!productExisted) {
          // 좋아요 등록
          await client.fav.update({
            where: {
              id: favId,
            },
            data: {
              products: {
                connect: { id: productId },
              },
            },
          });
        } else {
          // 좋아요 해제
          await client.fav.update({
            where: {
              id: favId,
            },
            data: {
              products: {
                disconnect: { id: productId },
              },
            },
          });
        }
        res.status(200).send({ message: "Updating product fav success." });
      } catch (err) {
        res.status(400).send({ message: "Updating product fav failed." });
      }
    } else {
      try {
        if (!favId) {
          // 초기 fav필드 생성
          await client.fav.create({
            data: {
              looks: {
                connect: { id: lookId },
              },
              user: {
                connect: { id: currentUserId },
              },
              userId: currentUserId,
            },
          });
        } else if (!lookExisted) {
          // 좋아요 등록
          await client.fav.update({
            where: {
              id: favId,
            },
            data: {
              looks: {
                connect: { id: lookId },
              },
            },
          });
        } else {
          // 좋아요 해제
          await client.fav.update({
            where: {
              id: favId,
            },
            data: {
              looks: {
                disconnect: { id: lookId },
              },
            },
          });
        }
        res.status(200).send({ message: "Updating look fav success." });
      } catch (err) {
        res.status(400).send({ message: "Updating look fav failed." });
      }
    }
  }
};

export default updateFav;

import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const updateLookbook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { data, imageurlList, tagIdList, userId } = req.body;
    const tagList = data.tag
      .split(" ")
      .map((tag: string) => tag.replace("#", ""));

    try {
      await client.look.create({
        data: {
          userId,
          description: data.desc,
          imgurl: {
            create: imageurlList.map((image: string) => ({
              img: image,
            })),
          },
          product: {
            connect: tagIdList.map((tagId: number) => ({ id: tagId })),
          },
          hashTag: {
            // @unique
            connectOrCreate: tagList.map((tagName: string) => ({
              create: { tag: tagName },
              where: { tag: tagName },
            })),
          },
        },
      });
      res.status(200).json({ message: "업로드 완료!" });
    } catch (err) {
      res.status(400).json({ message: "업로드 실패." });
    }
  }

  if (req.method === "GET") {
    try {
      const allLookbooks = await client.look.findMany({
        include: {
          imgurl: true,
          user: true,
          product: {
            select: {
              title: true,
              price: true,
              brand: true,
              imgurl: true,
            },
          },
          hashTag: true,
        },
      });
      res.status(200).send(allLookbooks);
    } catch (err) {
      res.status(400).send({ message: "리스트를 가져오는데 실패했습니다." });
    }
  }
};

export default updateLookbook;

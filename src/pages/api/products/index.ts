import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const productHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { data, imageurlList, tabItem } = req.body.payload;

    const tagList = data.tag
      .split(" ")
      .map((tag: string) => tag.replace("#", ""));

    const userId = 101; // 테스트 id

    try {
      const newProduct = await client.product.create({
        data: {
          userId,
          title: data.title,
          price: +data.price,
          description: data.desc,
          imgurl: {
            create: imageurlList.map((image: string) => ({
              img: image,
            })),
          },
          category: tabItem.category.name,
          style: tabItem.style.name === "스타일" ? "" : tabItem.style.name,
          brand: tabItem.brand.name,
          rental: tabItem.rental.name === "대여 가능" ? true : false,
          hashTag: {
            // @unique
            connectOrCreate: tagList.map((tagName: string) => ({
              create: { tag: tagName },
              where: { tag: tagName },
            })),
          },
        },
      });

      res.status(200).json(newProduct);
    } catch (err) {
      console.log(err);
    }
  }

  if (req.method === "GET") {
    const allProduct = await client.product.findMany({
      include: {
        imgurl: true,
      },
    });
    res.status(200).json(allProduct);
  }
};

export default productHandler;

import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const productHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { data, imageurlList } = req.body.payload;

    const userId = 84; // 테스트 id
    const tagList = data.tag
      .split(" ")
      .map((tag: string) => tag.replace("#", ""));

    // const result = tagList.map((tag: string) => ({ tag }));

    const newProduct = await client.product.create({
      data: {
        userId,
        title: data.title,
        price: +data.price,
        description: data.desc,
        imgurl: {
          create: imageurlList.map((image: string) => ({
            img: { create: { url: image } },
          })),
        },
        category: "category",
        brand: "brand",
      },
    });
    // hashTag: { create: result },

    res.status(200).json(newProduct);
  }
};

export default productHandler;

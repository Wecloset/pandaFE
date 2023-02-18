import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const productHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { data, imageurlList, tabItem } = req.body.payload;

    const userId = 84; // 테스트 id
    const tagList = data.tag.split(" ").map((tag: string) => tag.replace("#", ""));

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
          brand: tabItem.brand.name,
          rental: tabItem.rental.name === "대여 가능" ? true : false,
          hashTag: {
            create: tagList.map((tagName: string) => ({
              tag: tagName,
            })),
          },
        },
      });

      res.status(200).json(newProduct);
    } catch (err) {
      console.log(err);
    }
  }
};

export default productHandler;

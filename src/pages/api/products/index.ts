import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const productHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { data, imageurlList, options, userId } = req.body;
    const { title, price, desc } = data;
    const category = options.category.name;
    const style = options.style.name === "스타일" ? "" : options.style.name;
    const rental = options.rental.name === "대여 가능" ? true : false;
    const brand =
      options.brand.name === "브랜드" ? "Vintage" : options.brand.name;

    const setTagList = () => {
      let tags = data.tag.split(" ").map((tag: string) => tag.replace("#", ""));
      if (tags[0] === "") tags = [category, brand];
      return tags;
    };

    const tagList = setTagList();

    try {
      await client.product.create({
        data: {
          userId,
          title,
          price: +price,
          description: desc,
          imgurl: {
            create: imageurlList.map((image: string) => ({
              img: image,
            })),
          },
          category,
          style,
          brand,
          rental,
          hashTag: {
            // @unique
            connectOrCreate: tagList.map((tagName: string) => ({
              create: { tag: tagName },
              where: { tag: tagName },
            })),
          },
        },
      });
      res.status(200).json({ message: "아이템 등록 완료!" });
    } catch (err) {
      res.status(400).json({ message: "Error: 아이템 등록에 실패하였습니다." });
    }
  }

  if (req.method === "GET") {
    try {
      const allProduct = await client.product.findMany({
        include: {
          imgurl: true,
          fav: true,
        },
      });
      res.status(200).send(allProduct);
    } catch (err) {
      res.status(400).send({ message: "Getting products failed." });
    }
  }
};

export default productHandler;

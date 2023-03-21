import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const signTag = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { userData, tags } = req.body;

  if (req.method !== "POST") return;

  if (id) {
    // change tag
    const tagChange = await client.hashTag.update({
      where: {
        id: Number(id),
      },
      data: {
        tag: tags.join(","),
      },
    });
    res.json(tagChange);
  } else {
    // post tag data
    try {
      await client.user.update({
        where: {
          id: userData,
        },
        data: {
          keywords: {
            connectOrCreate: tags.map((tagName: string) => ({
              create: { tag: tagName },
              where: { tag: tagName },
            })),
          },
        },
      });
      res.status(201).json({ message: "태그 저장이 완료되었습니다" });
    } catch {
      res.status(500).json({ message: "1개 이상의 태그를 저장해주세요" });
    }
  }
};

export default signTag;

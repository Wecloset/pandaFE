import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const signTag = async (req: NextApiRequest, res: NextApiResponse) => {
  const { update: updateId, post: postId } = req.query;
  const tags = req.body;

  if (req.method !== "POST") return;

  if (updateId) {
    // update tag
    try {
      const tagChange = await client.user.update({
        where: {
          id: Number(updateId),
        },
        data: {
          keywords: {
            set: [],
            connectOrCreate: tags.map((tagName: string) => ({
              create: { tag: tagName },
              where: { tag: tagName },
            })),
          },
        },
      });
      res.status(201).json({ message: "키워드가 변경되었습니다." });
    } catch (err) {
      res.status(500).json({ message: "키워드 변경에 실패했습니다." });
    }
  } else {
    // post tag data
    try {
      await client.user.update({
        where: {
          id: Number(postId),
        },
        data: {
          keywords: {
            connectOrCreate: tags.map((tagName: string) => ({
              where: { tag: tagName },
              create: { tag: tagName },
            })),
          },
        },
      });
      res.status(201).json({ message: "키워드 저장 완료" });
    } catch {
      res.status(500).json({ message: "1개 이상의 키워드를 선택해주세요" });
    }
  }
};

export default signTag;

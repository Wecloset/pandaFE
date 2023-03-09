import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const userSignTag = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const signUserData = await client.user.findMany({
      include: {
        keywords: true,
      },
    });
    res.json(signUserData);
  }
  const { userData, tags } = req.body;
  if (req.method === "POST") {
    try {
      await client.hashTag.create({
        data: {
          userId: userData,
          tag: tags,
        },
      });
      res.status(201).json({ message: "태그 저장이 완료되었습니다" });
    } catch {
      res.status(500).json({ message: "1개 이상의 태그를 저장해주세요" });
    }
  }
};

export default userSignTag;

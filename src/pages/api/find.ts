import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const socialFind = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const email = Object.keys(req.body)[0];
    const signSocialData = await client.user.findMany({
      where: {
        email,
      },
      include: {
        keywords: true,
      },
    });
    res.json(signSocialData);
  }
};

export default socialFind;

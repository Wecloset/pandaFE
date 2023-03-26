import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const useImageChange = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userData, imageurl } = req.body;

    const changeImage = await client.user.update({
      where: {
        id: userData,
      },
      data: {
        profileImg: imageurl,
      },
    });
    changeImage
      ? res.status(201).json({
          message: "이미지를 변경했습니다",
        })
      : res.status(500).json({
          message: "이미지가 잘못되었습니다",
        });
  }
};
export default useImageChange;

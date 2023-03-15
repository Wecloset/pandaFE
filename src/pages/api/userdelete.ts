import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/client";

const userDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;
  if (req.method === "DELETE") {
    const deleteUser = await client.user.delete({
      where: {
        id: userId,
      },
    });
    res.json(deleteUser);
  }
};

export default userDelete;

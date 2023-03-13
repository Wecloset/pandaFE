import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/client";

const updateComment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { comment, userId } = req.body.payload;
    const { postId, commentId } = req.query;
    const update = commentId ? true : false;
    // console.log(update, comment, commentId);

    try {
      if (!comment) {
        await client.comment.delete({
          where: {
            id: commentId ? +commentId : undefined,
          },
        });
        res.status(200).send({ message: "댓글이 삭제되었습니다." });
      } else if (!update) {
        const newComment = await client.comment.create({
          data: {
            text: comment,
            author: {
              connect: { id: userId },
            },
            look: {
              connect: { id: postId ? +postId : undefined },
            },
          },
        });
        res.status(200).send({ message: "댓글 작성 성공.", data: newComment });
      } else {
        const updateComment = await client.comment.update({
          where: {
            id: commentId ? +commentId : undefined,
          },
          data: {
            text: comment,
          },
        });
        res
          .status(200)
          .send({ message: "댓글 수정 성공.", data: updateComment });
      }
    } catch (err) {
      res.status(400).send({ message: "Updating comment failed." });
    }
  }
};

export default updateComment;

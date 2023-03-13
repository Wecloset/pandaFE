import { useEffect, useState } from "react";

const useComment = () => {
  const [commentInput, setCommentInput] = useState<boolean>(false);

  const setInputState = (val: boolean) => setCommentInput(val);

  // useEffect(() => {
  //   console.log(commentInput);
  // }, [commentInput]);

  return { commentInput, setInputState };
};

export default useComment;

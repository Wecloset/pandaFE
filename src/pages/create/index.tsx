import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import CreatePage from "../../containers/create";

const Create: NextPage = () => {
  const [isText, setIsText] = useState<boolean>(false);

  const textAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.value !== "" ? setIsText(true) : setIsText(false);
  };

  const props = {
    isText,
    textAreaValue,
  };

  return <CreatePage {...props} />;
};

export default Create;

import { NextPage } from "next";

const Button: NextPage<string | any> = ({ text }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full px-5 pb-5">
      <button className="h-[50px] w-full bg-black text-white">{text}</button>
    </div>
  );
};

export default Button;

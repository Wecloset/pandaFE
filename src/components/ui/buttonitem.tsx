import { NextPage } from "next";
import { Icon } from "@iconify/react";

const ButtonItem: NextPage<string | any> = ({
  text,
  color,
  fontColor,
  icon,
  logo,
  textWidth,
  hover,
  border,
}) => {
  return (
    <div className="w-full px-4 pb-3">
      <button
        className={`h-[50px] w-full ${border} ${color} ${
          fontColor ?? "text-black"
        }  ${logo} ${hover}`}
      >
        <div className="flex w-1/5 justify-center">
          <Icon icon={icon} width="20" />
        </div>
        <div className={`${textWidth}`}>{text}</div>
      </button>
    </div>
  );
};

export default ButtonItem;

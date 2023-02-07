import { NextPage } from "next";
import { Icon, IconifyIcon, IconProps } from "@iconify/react";

interface buttonInterface {
  text?: string;
  color?: string;
  fontColor?: string;
  icon?: string | any;
  logo?: string;
  textWidth?: string;
  hover?: string;
  border?: string;
  position?: string;
  width?: string;
  padding?: string;
}

const ButtonItem: NextPage<buttonInterface> = ({
  text,
  color,
  fontColor,
  icon,
  logo,
  textWidth,
  hover,
  border,
  position,
  width,
  padding,
}) => {
  return (
    <div
      className={`w-full ${padding ? padding : "px-4"} pb-3 ${position} mt-3`}
    >
      <button
        className={`h-[50px] ${width ? width : "w-full"} ${border} ${color} ${
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

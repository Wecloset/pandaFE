import { NextPage } from "next";
import { Icon } from "@iconify/react";

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
  divWidth?: string;
  height?: string;
}

const Button: NextPage<buttonInterface> = ({
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
  divWidth,
  padding,
  height,
}) => {
  return (
    <div
      className={`${divWidth ? divWidth : "w-full"} ${
        padding ? padding : "px-4"
      } pb-3 ${position}`}
    >
      <button
        className={`${height ? height : "h-[50px]"} ${
          width ? width : "w-full"
        } ${border} ${color} ${fontColor ?? "text-black"}  ${logo} ${hover}`}
      >
        <div className="flex w-1/5 justify-center">
          <Icon icon={icon} width="20" />
        </div>
        <div className={`${textWidth}`}>{text}</div>
      </button>
    </div>
  );
};

export default Button;

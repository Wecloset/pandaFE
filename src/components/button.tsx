import { NextPage } from "next";
import { Icon } from "@iconify/react";
import { FormEvent } from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  icon?: string;
  disabled?: boolean;
  onClick?: (event: FormEvent | any) => void;
  divWidth?: string;
  position?: string;
  width?: string;
  height?: string;
  fontColor?: string;
  textWidth?: string;
  text: string;
  btnWrapClasses?: string;
  classes?: string;
}

const Button: NextPage<ButtonProps> = ({
  type,
  icon,
  disabled,
  onClick,
  divWidth,
  position,
  width,
  height,
  textWidth,
  text,
  fontColor,
  btnWrapClasses,
  classes,
}) => {
  return (
    <div
      className={`
        ${divWidth ? divWidth : "w-full"} 
        ${position}
        ${btnWrapClasses}
        `}
    >
      <button
        type={type}
        className={`
        flex items-center 
        ${height ? height : "h-[52px]"}
        ${fontColor ? fontColor : "text-white"} 
        ${width ? width : "w-full"}
        ${disabled ? "cursor-not-allowed" : ""}
        ${classes}
        `}
        disabled={disabled ? true : false}
        onClick={onClick}
      >
        {icon && <Icon icon={icon} width="24" className="mr-2 w-1/5" />}
        <span className={`${textWidth ? textWidth : "w-full"}`}>{text}</span>
      </button>
    </div>
  );
};

export default Button;

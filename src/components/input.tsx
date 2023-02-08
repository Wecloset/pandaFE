import { NextPage } from "next";

interface InputProps {
  title?: string;
  isSubtitle?: boolean;
  subtitle?: string;
  type: string;
  name: string;
  placeholder: string;
  isSecond?: boolean;
  secondtype?: string;
  secondname?: string;
  secondplaceholder?: string;
  classname: string;
}

const Input: NextPage<InputProps> = ({
  title,
  isSubtitle,
  subtitle,
  type,
  name,
  placeholder,
  isSecond,
  secondtype,
  secondname,
  secondplaceholder,
  classname,
}) => {
  return (
    <div className="px-3 py-5 [&>input]:h-[48px] [&>input]:border-b [&>input]:px-4">
      <p className="mb-2 px-2 text-lg">{title}</p>
      {isSubtitle ? (
        <p className="mb-2 px-2 text-xs text-textColor-gray-100">{subtitle}</p>
      ) : null}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        className={classname}
      />
      {isSecond ? (
        <input
          type={secondtype}
          name={secondname}
          placeholder={secondplaceholder}
          autoComplete="off"
          className={classname}
        />
      ) : null}
    </div>
  );
};

export default Input;

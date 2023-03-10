import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { cls } from "../../../utils/class";

interface FilterTabProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  isOpen: string | null;
  name: string;
  data: string[];
  setList: (word: string) => void;
  wordList: string[];
}

const FilterTab: NextPage<FilterTabProps> = ({
  onClick,
  isOpen,
  name,
  data,
  setList,
  wordList,
}) => {
  const changeWordList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setList(value);
  };

  return (
    <div className="transition duration-150 ease-out">
      <div
        onClick={onClick}
        className={cls(
          "peer h-[50px] select-none border-b border-common-black py-3 px-5 text-lg",
          isOpen === name ? "is-active" : "",
        )}
      >
        {name.toUpperCase()}
      </div>
      {isOpen === name && (
        <ul className="h-0 select-none border-b border-common-black peer-[.is-active]:h-auto peer-[.is-active]:p-5 [&>li]:flex [&>li]:h-7 [&>li]:justify-between [&_svg]:-mt-[3px] [&_svg]:text-2xl">
          {data.map((item, i) => {
            const itemKey = `${item}-${i}`;
            return (
              <li key={itemKey}>
                <label htmlFor={itemKey} className="peer">
                  {item}
                </label>
                <input
                  type={name === "PRICE" ? "radio" : "checkbox"}
                  id={itemKey}
                  value={item}
                  name={name}
                  className="peer hidden"
                  onChange={changeWordList}
                  checked={wordList.includes(item) ? true : false}
                />
                <Icon
                  icon="material-symbols:check-small"
                  className="hidden peer-checked:block"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterTab;

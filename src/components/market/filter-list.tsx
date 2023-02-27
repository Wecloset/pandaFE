import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useContext } from "react";
import { FilterContext } from "../../store/filter-context";

const FilterList: NextPage = () => {
  const { wordList, removeWord } = useContext(FilterContext);

  const content =
    wordList.length > 0 ? (
      <ul className="flex gap-2 overflow-x-scroll pt-[18px] scrollbar-hide [&_svg]:ml-1 [&_svg]:-mt-0.5 [&_svg]:cursor-pointer [&_svg]:text-textColor-gray-50">
        {wordList.map((item, i) => {
          const key = `${item}-${i}`;
          return (
            <li key={key} className="flex items-center">
              {item}
              <Icon
                icon="ic:baseline-clear"
                aria-label="검색어 삭제"
                onClick={() => removeWord(item)}
              />
            </li>
          );
        })}
      </ul>
    ) : null;

  return content;
};

export default FilterList;

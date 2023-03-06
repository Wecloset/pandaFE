import { NextPage } from "next";
import { useContext } from "react";
import { cls } from "../../lib/class";
import { FilterContext } from "../../store/filter-context";

const navigationList = ["전체", "상의", "하의", "아우터", "가방", "기타"];
const CategoryNavigation: NextPage = () => {
  const { categoryName, setCategory, filtering } = useContext(FilterContext);

  const changeCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setCategory(target.name);
    filtering(target.name);
  };

  return (
    <div
      className="text-common-gray flex h-10 overflow-x-scroll border-b border-common-black 
    bg-white text-base text-textColor-gray-100 scrollbar-hide [&>button]:flex-shrink-0"
    >
      {navigationList.map((item, i) => (
        <button
          key={i}
          className={cls(
            "w-[84px] border-r border-r-common-black last:border-r-0",
            `${
              categoryName === item
                ? "border-b-2 border-common-black font-bold text-common-black"
                : ""
            }`,
          )}
          name={item}
          onClick={changeCategory}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CategoryNavigation;

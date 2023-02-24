import { NextPage } from "next";
import { useContext } from "react";
import { cls } from "../../lib/class";
import { FilterContext } from "../../store/filter-context";

const CategoryNavigation: NextPage = () => {
  const { categoryName, setCategory, filtering } = useContext(FilterContext);

  const changeCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    setCategory(target.name);
    filtering(target.name);
  };

  return (
    <div className="text-common-gray grid h-[45px] grid-cols-4 border-b border-common-black bg-white text-base text-textColor-gray-100">
      <button
        className={cls(
          " border-r  border-r-common-black",
          categoryName === "전체"
            ? "border-b-2 border-common-black font-bold text-common-black"
            : "",
        )}
        name="전체"
        onClick={changeCategory}
      >
        전체
      </button>
      <button
        className={cls(
          " border-r  border-r-common-black ",
          categoryName === "상의"
            ? "border-b-2 border-common-black font-bold text-common-black"
            : "",
        )}
        name="상의"
        onClick={changeCategory}
      >
        상의
      </button>
      <button
        className={cls(
          " border-r border-r-common-black",
          categoryName === "하의"
            ? "border-b-2 border-common-black font-bold text-common-black"
            : "",
        )}
        name="하의"
        onClick={changeCategory}
      >
        하의
      </button>
      <button
        className={cls(
          "",
          categoryName === "기타"
            ? "border-b-2 border-common-black font-bold text-common-black"
            : "",
        )}
        name="기타"
        onClick={changeCategory}
      >
        기타
      </button>
    </div>
  );
};

export default CategoryNavigation;

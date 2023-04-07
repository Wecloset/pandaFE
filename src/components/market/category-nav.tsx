import { NextPage } from "next";
import { cls } from "../../utils/class";
import { useRecoilState } from "recoil";
import { categoryNameState } from "../../recoil/filter";

const navigationList = ["전체", "상의", "하의", "아우터", "가방", "기타"];
const CategoryNavigation: NextPage = () => {
  const [category, setCategory] = useRecoilState(categoryNameState);

  const changeCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setCategory(target.name);
  };

  return (
    <div
      className="flex h-10 overflow-x-scroll border-b border-common-black 
    bg-white text-base text-textColor-gray-100 scrollbar-hide [&>button]:flex-shrink-0"
    >
      {navigationList.map((item, i) => (
        <button
          key={i}
          className={cls(
            "w-[65px]",
            `${
              category === item
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

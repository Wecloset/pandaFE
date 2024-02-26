import { NextPage } from "next";
import { cls } from "../../utils/class";
import { KeywordsProps } from "../../types";

const Keywords: NextPage<KeywordsProps> = ({
  keywords,
  keyword,
  onClickKeyword,
}) => {
  const clickKeyword = (tagName: string) => () => onClickKeyword(tagName);

  return (
    <div className="flex h-11 w-full items-center gap-2 overflow-hidden overflow-x-scroll font-bold text-common-gray scrollbar-hide">
      {keywords.map(({ tag, id }: { tag: string; id: number }) => (
        <div key={id} className="relative h-9 min-w-[65px] rounded-lg px-3">
          <button
            type="button"
            className={cls(
              "absolute top-0 left-0 z-10 h-full w-full rounded-lg border border-common-black",
              keyword === tag
                ? "border-common-black bg-common-black text-white"
                : "border-common-black bg-white",
            )}
            onClick={clickKeyword(tag)}
          >
            {tag}
          </button>
          <span className="absolute top-[2px] left-[2px] h-full w-full rounded-lg bg-common-black" />
        </div>
      ))}
    </div>
  );
};

export default Keywords;

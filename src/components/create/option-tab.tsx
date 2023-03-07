import { NextPage } from "next";
import { Icon } from "@iconify/react";
import { useRef } from "react";

interface Options {
  [key: string]: { name: string; current: boolean; list: string[] };
}

interface OptionTabProps {
  isTabOpen: boolean;
  options: Options;
  selectOptionItem: (
    event: React.MouseEvent<HTMLLIElement>,
    name: string,
  ) => void;
  submitBrand: (
    event: React.FormEvent<HTMLFormElement>,
    brandName: string,
  ) => void;
  closeTab: () => void;
}

const OptionTab: NextPage<OptionTabProps> = ({
  isTabOpen,
  options,
  selectOptionItem,
  submitBrand,
  closeTab,
}) => {
  const brandRef = useRef<HTMLInputElement>(null);

  return (
    <div className="fixed bottom-0 z-30 w-[390px] -translate-x-5">
      {isTabOpen &&
        Object.entries(options).map(([key, { current }], i) =>
          current === true ? (
            <div
              key={i}
              className="h-16 w-full justify-center border border-b-common-black bg-white p-5"
            >
              <span>{key}</span>
              <Icon
                icon="carbon:close"
                className="absolute top-4 right-5 z-50 h-7 w-7 cursor-pointer"
                onClick={closeTab}
              />
            </div>
          ) : null,
        )}
      {isTabOpen &&
        Object.entries(options).map(
          ([key, { name, current, list }]) =>
            current === true && (
              <div key={key}>
                <div className=" h-[350px] w-full bg-white p-5">
                  <ul className="h-[295px] w-full overflow-y-scroll [&>li]:text-textColor-gray-100">
                    {key === "brand" && (
                      <form
                        className="relative mb-16"
                        onSubmit={e => submitBrand(e, brandRef.current!.value)}
                      >
                        <input
                          type="text"
                          placeholder="해당하는 브랜드가 없는 경우 입력해주세요."
                          className="absolute left-0 rounded-md bg-gray-100 p-4 pr-14"
                          ref={brandRef}
                        />
                        <button className="text-md absolute right-3 top-4 font-bold hover:cursor-pointer">
                          완료
                        </button>
                      </form>
                    )}
                    {list.map((listItem, i) => (
                      <li
                        key={i}
                        className="cursor-pointer p-2 hover:bg-[#f7f7f7] hover:text-common-black"
                        onClick={e => selectOptionItem(e, name)}
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
        )}
    </div>
  );
};

export default OptionTab;

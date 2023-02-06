import { Icon } from "@iconify/react";
import { NextPage } from "next";

const StylePage: NextPage = () => {
  return (
    <div className="py-10">
      <ul className="grid grid-cols-2 [&>li]:border-r [&>li]:border-b [&>li]:odd:border-common-black">
        {Array(16)
          .fill(0)
          .map((_, idx) => (
            <li
              key={idx}
              className="flex h-[220px] w-[196px] items-center justify-center"
            >
              <div className="relative h-[190px] w-40 bg-slate-200 p-3">
                <div className="absolute right-3 flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-common-black">
                  <Icon icon="icon-park-outline:like" className="text-lg" />
                </div>
                <p className="absolute bottom-3">@username</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StylePage;

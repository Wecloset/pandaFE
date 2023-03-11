import Link from "next/link";
import React from "react";

const TagItem = () => {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <li
            key={i}
            className="flex min-w-[200px] items-center justify-between"
          >
            <Link href={""} className="flex">
              <img
                src={""}
                alt={""}
                className="mr-3 h-[62px] w-[62px] flex-shrink-0 border border-common-black object-cover"
              />
              <div className="text-common-black">
                <p className="text-sm">Brand name</p>
                <p className="mb-2 text-xs text-textColor-gray-100">
                  item title
                </p>
                <p className="font-bold">999999</p>
              </div>
            </Link>
          </li>
        ))}
    </>
  );
};

export default TagItem;

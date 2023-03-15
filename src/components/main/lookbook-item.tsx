import { NextPage } from "next";

const MainLookBookItem: NextPage<{ username: string }> = ({ username }) => {
  return (
    <li className="border-r border-common-black py-4 px-3 first:pl-0">
      <div className="relative h-56 w-48 bg-borderColor-gray">
        <p className="absolute bottom-4 left-4">{username}</p>
      </div>
    </li>
  );
};

export default MainLookBookItem;

import { NextPage } from "next";
import { styleListData } from "../api/fake-data";
import Header from "../../components/header";
import Navigation from "../../components/navigation";
import StyleItem from "../../components/style/style-item";

const Style: NextPage = () => {
  return (
    <>
      <Header />
      <div>
        <ul className="grid grid-cols-2 [&>li]:border-r [&>li]:border-b [&>li]:odd:border-common-black">
          {styleListData.map(data => (
            <StyleItem key={data.id} styleList={data} />
          ))}
        </ul>
      </div>
      <Navigation />
    </>
  );
};

export default Style;

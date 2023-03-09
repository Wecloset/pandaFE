import { NextPage } from "next";
import { styleListData } from "../../lib/fake-data";
import Header from "../../components/header";
import Navigation from "../../components/navigation";
import StyleItem from "../../components/lookbook/style-item";
import FloatingButton from "../../components/floating-button";

const Lookbook: NextPage = () => {
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
      <FloatingButton path="/create/post" />
      <Navigation />
    </>
  );
};

export default Lookbook;

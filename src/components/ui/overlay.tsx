import { NextPage } from "next";
import React from "react";

const Overlay: NextPage = () => {
  return (
    <div className="fixed z-10 h-screen w-[390px] bg-black pt-10 opacity-40" />
  );
};

export default Overlay;

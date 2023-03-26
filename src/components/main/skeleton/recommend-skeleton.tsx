import { NextPage } from "next";
import React from "react";

const RecommendSkeleton: NextPage = () => {
  return (
    <div>
      <div className="mb-2 bg-slate-200">
        <div className="h-[190px] w-full" />
      </div>
      <div className="w-full">
        <div className="h-3 bg-slate-200" />
        <div className="mt-1 h-3 bg-slate-200" />
        <div className="mt-1 h-3 bg-slate-200" />
      </div>
    </div>
  );
};

export default RecommendSkeleton;

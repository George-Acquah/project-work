import React from "react";
import { inter } from "../font";
import { strongTextColor } from "../themes";

const Loading = ({ bg = "blue-500", label }: { bg?: string; label?: string }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex space-x-4">
        <div className={`w-5 h-5 bg-${bg} rounded-full animate-bounce1`} />
        <div className={`w-5 h-5 bg-${bg} rounded-full animate-bounce2`} />
        <div className={`w-5 h-5 bg-${bg} rounded-full animate-bounce3`} />
      </div>
      {label && <h1 className={`${inter.className} text-2xl my-8 ${strongTextColor}`}>{label}</h1>}
    </div>
  );
};

export default Loading;

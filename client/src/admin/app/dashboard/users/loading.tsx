import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex space-x-4">
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce1"></div>
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce2"></div>
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce3"></div>
      </div>
    </div>
  );
};

export default Loading;

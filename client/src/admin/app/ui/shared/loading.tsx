import React from "react";

const Loading = ({bg = 'blue-500'}: {bg?: string}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex space-x-4">
        <div className={`w-5 h-5 bg-${bg} rounded-full animate-bounce1`}/>
        <div className={`w-5 h-5 bg-${bg} rounded-full animate-bounce2`}/>
        <div className={`w-5 h-5 bg-${bg} rounded-full animate-bounce3`}/>
      </div>
    </div>
  );
};

export default Loading;

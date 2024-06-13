// components/Loading.js
import React from "react";
import "@/app/ui/test.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loading;

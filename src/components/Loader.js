import React from "react";
import "../assets/css/loader.css";

const Loader = () => {
  return (
    <div className="ring_wrapper">
    <div className="ring">
      Loading...
      <span></span>
    </div>
    </div>
  );
};

export default Loader;

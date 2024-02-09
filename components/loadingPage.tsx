import React from "react";

const LoadingPage = () => {
  return (
    <div className="relative flex flex-col h-screen">
      <div className="relative inline-flex flex-col gap-2 items-center justify-center mx-auto max-w-7xl pt-10 px-6 flex-grow">
        <div className="relative flex w-24 h-24">
          <i className="absolute w-full h-full rounded-full animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent border-8 border-b-warning"></i>
          <i className="absolute w-full h-full rounded-full opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent border-8 border-b-warning"></i>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

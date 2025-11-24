import React from "react";
import checklist from "../assets/checklist.jpg";
function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-200 via-green-100 to-red-300 p-8 ">
      <div className="flex justify-center items-center 0">
        <h1 className="text-8xl text-center bold m-auto text-blue-900  mt-60 underline  ">
          Welcome to To-Do App
        </h1>
        <img src={checklist} alt="checklist" />
      </div>
    </div>
  );
}

export default Home;

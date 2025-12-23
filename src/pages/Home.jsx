import React from "react";
import checklist from "../assets/checklist.jpg";

function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-200 via-green-100 to-red-300 p-8 min-h-screen">
      {/* Changed: Added flex-col for mobile so image and text don't overlap, kept items-center */}
      <div className="flex flex-col lg:flex-row justify-center items-center">
        
        {/* LAYOUT PRESERVED: 
          - Desktop: mt-60 and text-8xl (lg:mt-60 lg:text-8xl)
          - Mobile: Adjusted to text-4xl and mt-20 so it fits the device
        */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl text-center font-bold m-auto text-blue-900 mt-20 lg:mt-60 underline">
          Welcome to To-Do App
        </h1>

        {/* Added: Responsive width so the image doesn't exceed screen width on mobile */}
        <img 
          src={checklist} 
          alt="checklist" 
          className="w-full max-w-[300px] md:max-w-md lg:max-w-none mt-10 lg:mt-60" 
        />
        
      </div>
    </div>
  );
}

export default Home;
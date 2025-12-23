import React from "react";
import checklist from "../assets/checklist.jpg";

function Home() {
  return (
    // Changed: h-screen and overflow-hidden ensures the page never scrolls
    <div className="bg-gradient-to-r from-blue-200 via-green-100 to-red-300 h-screen overflow-hidden p-4">
      
      {/* Changed: Used h-full and justify-center to center content instead of using mt-60 */}
      <div className="flex flex-col lg:flex-row justify-center items-center h-full gap-5">
        
        {/* LAYOUT PRESERVED:
            - Desktop: lg:text-8xl
            - Mobile: text-4xl (to prevent horizontal scroll)
            - Removed mt-60 to keep content within the screen
        */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl text-center font-bold text-blue-900 underline">
          Welcome to To-Do App
        </h1>

        {/* Added: max-h for the image so it shrinks to fit the screen height on small devices */}
        <img 
          src={checklist} 
          alt="checklist" 
          className="w-auto max-h-[30vh] md:max-h-[50vh] lg:max-h-none object-contain" 
        />
        
      </div>
    </div>
  );
}

export default Home;
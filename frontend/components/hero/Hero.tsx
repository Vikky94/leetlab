import React from 'react';
import {CarouselPlugin} from "../carousel/snippets"

function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-amber-500 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-green-500 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-purple-500 rounded-full opacity-20 animate-ping"></div>
        
        {/* Code-like grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 grid-rows-10 gap-1 w-full h-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-gray-700"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left content */}
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-amber-500 leading-tight">
              <span className="block">Master the Coding</span>
              <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Puzzles
              </span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
              Solve cutting-edge coding challenges, climb the leaderboard, and join a global community of coders.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-500/30">
                Start Practicing
              </button>
              <button className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all border border-gray-700">
                Explore Problems
              </button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2000+</div>
                <div className="text-gray-400 mt-1">Coding Problems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-gray-400 mt-1">Company Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2M+</div>
                <div className="text-gray-400 mt-1">Active Users</div>
              </div>
            </div>
          </div>
          
          {/* Right content - Code editor preview */}
          <div className="md:w-1/2 w-full max-w-2xl flex justify-center">
            <CarouselPlugin/>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Hero
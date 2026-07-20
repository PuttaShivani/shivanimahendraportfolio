import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SplineScene } from "@/components/ui/SplineScene";
import { Download } from "lucide-react";
import Link from 'next/link';

export function HeroVisual({ isExiting }: { isExiting?: boolean }) {
  const { personal } = portfolioData;

  // Split name for the big title
  const names = personal.name.split(' ');
  const firstName = names[0].toUpperCase();
  const lastName = names.slice(1).join(' ').toUpperCase();

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-center">
      {/* Container */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between z-10 pt-24 pb-24 lg:pb-12 lg:pt-0">
        
        {/* Left Section */}
        <div className="w-full lg:w-3/5 flex flex-col items-start z-20">
          <p className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-zinc-400 mb-8 md:mb-16 font-semibold mt-12 md:mt-24 break-words max-w-full leading-relaxed">
            WELCOME TO MY PORTFOLIO
          </p>

          <h1 className="text-6xl sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-bold leading-[1] tracking-tight mb-8">
            <span className="block">{firstName}</span>
            <span className="block">{lastName}</span>
          </h1>

          <div className="w-[80%] md:w-[130%] h-[2px] bg-zinc-700/60 mb-8 lg:mb-12 -ml-6 md:-ml-10 pl-6 md:pl-10" />
        </div>

        {/* Right Section: Spline Scene & Bio */}
        <div className="relative w-full lg:w-2/5 h-[45vh] lg:h-[90vh] pointer-events-auto opacity-100 z-10 flex flex-col items-center lg:items-end justify-center lg:justify-end pb-0 lg:pb-12 lg:pr-6 mt-8 lg:mt-0">
          {/* Spline container */}
          <div className="absolute inset-0 lg:inset-auto lg:w-full lg:h-full z-0 flex items-center justify-center -mt-10 lg:-mt-0">
            <SplineScene 
              scene="https://prod.spline.design/qVnpleqGGhqRlQYK/scene.splinecode" 
              className="w-full h-[120%] lg:h-full scale-[1] sm:scale-[1.2] lg:scale-[1.5] origin-center"
            />
          </div>
          
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-zinc-300 font-light uppercase tracking-widest text-center lg:text-right w-full max-w-md lg:self-end leading-relaxed bg-black/40 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 rounded-xl relative z-10 mt-auto mb-10 lg:mb-0 lg:p-0">
            {personal.bio}
          </p>
        </div>
      </div>

      {/* Resume Button */}
      <div className="absolute bottom-6 md:bottom-8 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 z-30">
        <Link href={personal.resumeUrl || 'pavankumar_resume.pdf'} target="_blank">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full flex items-center gap-3 font-semibold transition-colors shadow-xl shadow-purple-900/20 text-sm md:text-base whitespace-nowrap">
            Resume <Download className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}

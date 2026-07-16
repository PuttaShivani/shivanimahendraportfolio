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
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden flex items-center justify-center">
      {/* Container */}
      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between z-10 pt-24 pb-12 lg:pt-0">
        
        {/* Left Section */}
        <div className="w-full lg:w-3/5 flex flex-col items-start z-20">
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-zinc-400 mb-10 md:mb-16 font-semibold mt-12 md:mt-24">
            W E L C O M E   T O   M Y   P O R T F O L I O
          </p>

          <h1 className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-bold leading-[1] tracking-tight mb-8">
            <span className="block">{firstName}</span>
            <span className="block">{lastName}</span>
          </h1>

          <div className="w-[150%] md:w-[130%] h-[2px] bg-zinc-700/60 mb-12 -ml-10 pl-10" />
        </div>

        {/* Right Section: Spline Scene & Bio */}
        <div className="absolute inset-0 lg:relative lg:w-2/5 h-[60vh] lg:h-[90vh] pointer-events-none lg:pointer-events-auto opacity-40 lg:opacity-100 z-0 flex flex-col items-center lg:items-end justify-center lg:justify-end pb-12 pr-6">
          <SplineScene 
            scene="https://prod.spline.design/qVnpleqGGhqRlQYK/scene.splinecode" 
            className="w-full h-full scale-[1.2] lg:scale-[1.5] origin-center absolute inset-0 -z-10"
          />
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-zinc-300 font-light uppercase tracking-widest text-right w-full max-w-md self-end leading-relaxed bg-black/30 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-4 lg:p-0 rounded-lg">
            {personal.bio}
          </p>
        </div>
      </div>

      {/* Resume Button */}
      <div className="absolute bottom-8 right-8 z-30">
        <Link href={personal.resumeUrl || '#'} target="_blank">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full flex items-center gap-3 font-semibold transition-colors">
            Resume <Download className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}

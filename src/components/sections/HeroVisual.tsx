import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SplineScene } from "@/components/ui/SplineScene";
import { Download, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Link from 'next/link';

export function HeroVisual({ isExiting }: { isExiting?: boolean }) {
  const { personal } = portfolioData;

  const nameParts = personal.name.split(' ');
  const firstName = nameParts.slice(0, 2).join(' ').toUpperCase(); // TEJESWARA SAI
  const lastName = nameParts.slice(2).join(' ').toUpperCase();   // APPIKATLA

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-center">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-[1450px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between z-10 pt-24 pb-24 lg:py-0">
        
        {/* Left Section: Information & Title */}
        <div className="w-full lg:w-3/5 flex flex-col items-start z-20 mt-4 md:mt-12 lg:mt-0">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{personal.subtitle}</span>
          </div>

          {/* Name Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.8rem] font-extrabold leading-[1.08] tracking-tight mb-6 w-full">
            <span className="block text-white tracking-tight">{firstName}</span>
            <span className="block text-purple-400 bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
              {lastName}
            </span>
          </h1>

          {/* Quick Info Tags */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-zinc-400 mb-8 font-medium">
            <span className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              {personal.location}
            </span>
            <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              {personal.email}
            </a>
            <a href={`tel:${personal.phone}`} className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              {personal.phone}
            </a>
          </div>

          <div className="w-full sm:w-[90%] lg:w-[120%] h-[1px] bg-gradient-to-r from-purple-500/40 via-zinc-700/60 to-transparent mb-8" />

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 z-30">
            <Link href={personal.resumeUrl || '/Tejaswara_sai_resume.pdf'} target="_blank">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full flex items-center gap-2.5 font-semibold transition-all shadow-xl shadow-purple-900/30 text-sm md:text-base hover:scale-105 active:scale-95">
                Resume <Download className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/#projects-section">
              <button className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 px-6 py-3 rounded-full flex items-center gap-2 font-semibold transition-all text-sm md:text-base hover:scale-105 active:scale-95">
                View Projects <ArrowRight className="w-4 h-4 text-purple-400" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Spline 3D Scene & Clean Bio Card */}
        <div className="relative w-full lg:w-2/5 h-[45vh] sm:h-[50vh] lg:h-[85vh] pointer-events-auto opacity-100 z-10 flex flex-col items-center lg:items-end justify-center lg:justify-end pb-0 lg:pb-12 mt-8 lg:mt-0">
          
          {/* Spline 3D Scene */}
          <div className="absolute inset-0 lg:w-full lg:h-full z-0 flex items-center justify-center">
            <SplineScene 
              scene="https://prod.spline.design/qVnpleqGGhqRlQYK/scene.splinecode" 
              className="w-full h-full scale-[1.1] sm:scale-[1.3] lg:scale-[1.4] origin-center"
            />
          </div>
          
          {/* Clean Bio Glass Card */}
          <div className="w-full max-w-md lg:self-end bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 p-5 rounded-2xl relative z-10 mt-auto shadow-2xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-2">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Data Analyst with <span className="text-white font-semibold">3+ years of analytics experience</span> supporting product, operational, executive, and data quality reporting across U.S. business environments. Skilled in <span className="text-purple-300 font-medium">Power BI, Tableau, SQL, DAX, and Python</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

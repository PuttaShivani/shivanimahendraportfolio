import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { Download, Mail, Phone, MapPin, ArrowRight, Video, Volume2, VolumeX, Sparkles } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import Link from 'next/link';

export function HeroVisual({ isExiting }: { isExiting?: boolean }) {
  const { personal } = portfolioData;
  const linkedinLink = personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url;
  const githubLink = personal.socialLinks.find(s => s.platform === 'GitHub')?.url;
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typing animation state for "Full Stack Web Engineer"
  const titles = [
    "Full Stack Engineer",
    "Software Development Engineer",
    "Full Stack Web Developer"
  ];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetTitle = titles[titleIdx];

    if (!isDeleting && charIdx === targetTitle.length) {
      const timer = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIdx((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 40 : 85);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, titleIdx]);

  const nameParts = personal.name.split(' ');
  const firstName = nameParts[0]?.toUpperCase() || 'PUTTA';
  const lastName = nameParts.slice(1).join(' ').toUpperCase() || 'SHIVANI';

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
    setIsMuted(nextMuted);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0c0614] text-white overflow-hidden flex flex-col justify-center z-20">
      {/* Full-Screen AI Character Avatar Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/Character_speaking_to_camera_202608241437.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 opacity-70 lg:opacity-75"
        />
        {/* Gradient Overlays for High Legibility & Cinematic Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0614] via-[#0c0614]/85 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0614] via-transparent to-[#0c0614]/75 z-10 pointer-events-none" />
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[140px] pointer-events-none z-10" />
      </div>

      {/* Top Right Controls: AI Avatar Status & Sound Toggle */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-12 z-30 flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#130826]/85 border border-purple-500/30 backdrop-blur-xl text-xs font-semibold text-purple-300 shadow-xl">
          <Video className="w-3.5 h-3.5 text-purple-400" />
          <span>AI Avatar Background</span>
        </div>

        <button
          onClick={toggleMute}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-600/90 hover:bg-purple-600 border border-purple-400/40 text-white text-xs font-semibold backdrop-blur-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-purple-950/50"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>Enable Sound</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>Sound Active</span>
            </>
          )}
        </button>
      </div>

      {/* Main Foreground Container */}
      <div className="relative w-full max-w-[1450px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between z-20 pt-24 sm:pt-28 pb-16 sm:pb-24 lg:py-0">
        
        {/* Left Section: Information & Title */}
        <div className="w-full lg:w-3/4 flex flex-col items-start z-20 mt-2 sm:mt-4 md:mt-12 lg:mt-0">
          
          {/* Status Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium backdrop-blur-xl shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{personal.subtitle}</span>
            </div>
          </div>

          {/* Name Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.8rem] font-extrabold leading-[1.08] tracking-tight mb-3 sm:mb-4 w-full drop-shadow-2xl">
            <span className="block text-white tracking-tight">{firstName}</span>
            <span className="block text-purple-400 bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
              {lastName}
            </span>
          </h1>

          {/* Large Typing Animation Title */}
          <div className="mb-4 sm:mb-6 flex items-center min-h-[42px] sm:min-h-[64px]">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
              {titles[titleIdx].slice(0, charIdx)}
            </h2>
            <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-mono text-purple-400 animate-pulse ml-1 font-bold">
              |
            </span>
          </div>

          {/* Quick Info Tags */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-purple-200/90 mb-6 sm:mb-8 font-medium">
            <span className="flex items-center gap-1.5 bg-[#130826]/90 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-purple-500/25 shadow-md">
              <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="truncate">{personal.location}</span>
            </span>
            <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 bg-[#130826]/90 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-purple-500/25 hover:border-purple-500/60 hover:text-white transition-all shadow-md">
              <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="truncate">{personal.email}</span>
            </a>
            <a href={`tel:${personal.phone}`} className="flex items-center gap-1.5 bg-[#130826]/90 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-purple-500/25 hover:border-purple-500/60 hover:text-white transition-all shadow-md">
              <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="truncate">{personal.phone}</span>
            </a>
          </div>

          <div className="w-full sm:w-[90%] lg:w-[100%] h-[1px] bg-gradient-to-r from-purple-500/40 via-purple-900/60 to-transparent mb-6 sm:mb-8" />

          {/* CTA Buttons & Social Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 z-30 w-full sm:w-auto">
            <a href={personal.resumeUrl || '/ShivaniMahendra_resume.docx'} download="Shivanimahendra_resume.docx" target="_blank" rel="noopener noreferrer" className="shrink-0">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-full flex items-center gap-2 sm:gap-2.5 font-semibold transition-all shadow-xl shadow-purple-950/60 text-xs sm:text-sm md:text-base hover:scale-105 active:scale-95 border border-purple-400/30">
                Resume <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </a>

            <Link href="/#projects-section" className="shrink-0">
              <button className="bg-[#180a33]/90 hover:bg-[#25104f] text-white border border-purple-500/35 backdrop-blur-xl px-5 sm:px-7 py-3 sm:py-3.5 rounded-full flex items-center gap-2 font-semibold transition-all text-xs sm:text-sm md:text-base hover:scale-105 active:scale-95 shadow-xl">
                View Projects <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              </button>
            </Link>

            <div className="flex items-center gap-2.5 sm:gap-3">
              {linkedinLink && (
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-full bg-[#180a33]/90 hover:bg-[#25104f] border border-purple-500/35 hover:border-purple-400/60 text-purple-300 hover:text-white transition-all shadow-xl hover:scale-110 active:scale-95"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}

              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-3.5 rounded-full bg-[#180a33]/90 hover:bg-[#25104f] border border-purple-500/35 hover:border-purple-400/60 text-purple-300 hover:text-white transition-all shadow-xl hover:scale-110 active:scale-95"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

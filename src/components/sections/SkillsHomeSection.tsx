'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Sparkles, Code2, Server, Layout, Database, Cloud, Terminal, ShieldCheck, Cpu } from 'lucide-react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillCategory {
  title: string;
  desc: string;
  tag: string;
  skills: string[];
  bgImage: string;
  accentColor: string;
  icon: any;
}

const skillCategories: SkillCategory[] = [
  { 
    title: 'Programming Languages', 
    desc: 'Core languages for building high-performance software, scalable backend APIs, and modern frontend interfaces.', 
    tag: 'LANGUAGES',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript'],
    bgImage: '/skill_frontend_bg.png',
    accentColor: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-300',
    icon: Code2
  },
  { 
    title: 'Backend Engineering', 
    desc: 'Building robust, scalable server-side systems, RESTful microservices, and asynchronous event-driven architectures.', 
    tag: 'BACKEND ARCHITECTURE',
    skills: ['FastAPI', 'Flask', 'REST APIs', 'OpenAPI', 'Pydantic', 'AsyncIO', 'Microservices', 'API Design', 'Event-Driven Architecture'],
    bgImage: '/woman_sde_3d_render.png',
    accentColor: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300',
    icon: Server
  },
  { 
    title: 'Frontend Engineering', 
    desc: 'Crafting beautiful, interactive, and responsive web experiences with modern component architectures and API integrations.', 
    tag: 'FRONTEND & UI/UX',
    skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design', 'Dashboard Development', 'API Integration'],
    bgImage: '/skill_frontend_bg.png',
    accentColor: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300',
    icon: Layout
  },
  { 
    title: 'Databases & Caching', 
    desc: 'Designing high-performance relational and NoSQL databases with in-memory caching layers for low-latency queries.', 
    tag: 'DATA STORAGE',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    bgImage: '/contact_3d_hologram.png',
    accentColor: 'from-teal-500/20 to-emerald-500/20 border-teal-500/40 text-teal-300',
    icon: Database
  },
  { 
    title: 'Cloud & Containerization', 
    desc: 'Architecting cloud-native microservices, container orchestrations, serverless compute, and event hub streams.', 
    tag: 'CLOUD INFRASTRUCTURE',
    skills: ['AWS', 'Azure', 'EC2', 'S3', 'Lambda', 'ECS', 'EKS', 'ECR', 'CloudWatch', 'Azure Event Hub', 'Docker'],
    bgImage: '/contact_3d_hologram.png',
    accentColor: 'from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300',
    icon: Cloud
  },
  
  { 
    title: 'Testing, Security & Observability', 
    desc: 'Ensuring 99.9% reliability through automated testing, role-based access control (RBAC), and secret management.', 
    tag: 'SECURITY & RELIABILITY',
    skills: ['Pytest', 'Unit Testing', 'Integration Testing', 'Postman', 'RBAC', 'API Authentication', 'Secret Management'],
    bgImage: '/contact_3d_hologram.png',
    accentColor: 'from-rose-500/20 to-purple-500/20 border-rose-500/40 text-rose-300',
    icon: ShieldCheck
  },
  { 
    title: 'AI-Enabled Software Development', 
    desc: 'Integrating generative AI workflows, Retrieval-Augmented Generation (RAG), LLMs, and intelligent automation.', 
    tag: 'ARTIFICIAL INTELLIGENCE',
    skills: ['LangChain', 'OpenAI', 'Hugging Face Transformers', 'RAG'],
    bgImage: '/skill_frontend_bg.png',
    accentColor: 'from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/40 text-fuchsia-300',
    icon: Cpu
  }
];

export default function SkillsHomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyViewRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const animProgressObj = useRef({ p: 0 });

  const updateCardPositions = (p: number) => {
    const clampedP = Math.max(0, Math.min(skillCategories.length - 1, p));
    const activeIdx = Math.round(clampedP);
    setActiveIndex(activeIdx);
    animProgressObj.current.p = clampedP;

    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const radius = Math.min(winWidth * 1.15, 1500); 
    const angleSpread = winWidth < 768 ? 18 : 14; 

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const offset = i - clampedP;
      
      const angle = offset * angleSpread;
      const rad = (angle * Math.PI) / 180;
      
      const x = Math.sin(rad) * radius;
      const y = radius - Math.cos(rad) * radius; 
      const z = -Math.abs(offset) * 45; 
      const rotateZ = angle; 
      
      const scale = Math.max(0.48, 1 - Math.abs(offset) * 0.12);
      const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.25);
      const zIndex = Math.round(100 - Math.abs(offset) * 10);

      gsap.set(card, {
        x: x,
        y: y,
        z: z,
        scale: scale,
        rotationZ: rotateZ,
        rotationY: 0, 
        opacity: opacity,
        zIndex: zIndex,
        transformOrigin: "center bottom",
      });
    });

    bgRefs.current.forEach((bg, i) => {
      if (!bg) return;
      const itemOpacity = Math.max(0, 1 - Math.abs(i - clampedP));
      gsap.set(bg, { opacity: itemOpacity });
      
      if (textRefs.current[i]) {
        gsap.set(textRefs.current[i], { opacity: itemOpacity });
      }
    });
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 769) return;
    const container = e.currentTarget;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let activeIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    setActiveIndex(activeIdx);

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, opacity: i === activeIdx ? 1 : 0.6, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
  };

  const scrollToIndex = (index: number) => {
    const targetIdx = Math.max(0, Math.min(skillCategories.length - 1, index));
    setActiveIndex(targetIdx);

    if (typeof window !== 'undefined' && window.innerWidth >= 769 && triggerRef.current) {
      const total = skillCategories.length - 1;
      const targetProgress = targetIdx / total;
      const scrollPos = triggerRef.current.start + targetProgress * (triggerRef.current.end - triggerRef.current.start);
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    } else {
      const container = stickyViewRef.current?.querySelector('.carousel-container') as HTMLElement;
      const targetCard = cardsRef.current[targetIdx];
      if (container && targetCard) {
        const scrollLeft = targetCard.offsetLeft - (container.offsetWidth - targetCard.offsetWidth) / 2;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        });
      }
    }
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    updateCardPositions(0);

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        updateCardPositions(0);

        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress * (skillCategories.length - 1);
            updateCardPositions(p);
          }
        });

        triggerRef.current = st;
      });

      mm.add("(max-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
          if (card) {
            gsap.set(card, { clearProps: "x,y,z,rotation,scale,opacity,position" });
            gsap.set(card, { scale: i === 0 ? 1 : 0.92, opacity: i === 0 ? 1 : 0.7 });
          }
        });
        
        bgRefs.current.forEach((bg, i) => {
          if (bg) gsap.set(bg, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
        
        textRefs.current.forEach((txt, i) => {
          if (txt) gsap.set(txt, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
      });

    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div 
      id="skills" 
      ref={containerRef}
      className="relative w-full h-auto md:h-[450vh]"
    >
      {/* Sticky Viewport Pinned Screen */}
      <div 
        ref={stickyViewRef}
        className="relative md:sticky top-0 min-h-screen md:h-screen w-full bg-[#0c0614] text-white overflow-hidden flex flex-col items-center justify-center md:[perspective:1200px] select-none z-10 py-6 md:py-0"
      >
        {/* Dynamic Purple Vignette Backgrounds */}
        {skillCategories.map((_, i) => (
          <div 
            key={i}
            ref={el => { bgRefs.current[i] = el; }}
            className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-[#07030c] via-[#1a0c30] to-[#07030c] transition-opacity duration-500"
          />
        ))}

        {/* Massive Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          {skillCategories.map((_, i) => (
            <h1 
              key={`text-${i}`}
              ref={el => { textRefs.current[i] = el; }}
              className="absolute text-[26vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
              style={{ 
                WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(168,85,247,0.35)' : 'rgba(20,184,166,0.35)'}`,
                opacity: i === 0 ? 1 : 0 
              }}
            >
               SKILLS
            </h1>
          ))}
        </div>

        {/* Top Header Badge & Section Info */}
        <div className="w-full max-w-[1400px] px-4 sm:px-6 md:px-12 z-20 flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-8 gap-3 sm:gap-4 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md shadow-lg pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
            <span className="truncate">Technical Skills & Engineering Expertise</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-purple-300/80 font-mono bg-black/60 px-3.5 py-1.5 rounded-full border border-purple-500/20 backdrop-blur-md pointer-events-auto">
            <span>Skill Cards [ 0{activeIndex + 1} / 0{skillCategories.length} ]</span>
          </div>
        </div>

        {/* Semi-Circle Arc Cards Stage */}
        <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center z-10 md:[transform-style:preserve-3d] min-h-[460px] md:min-h-[540px] my-auto">
          <div 
            className="carousel-container relative w-full h-full flex items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-[6vw] md:px-0 gap-4 md:gap-0 touch-pan-x min-h-[460px] md:min-h-[540px] py-4"
            onScroll={handleMobileScroll}
          >
            {skillCategories.map((category, i) => {
              const IconComp = category.icon;
              return (
                <div 
                  key={i}
                  ref={el => { cardsRef.current[i] = el; }}
                  className="md:absolute relative shrink-0 snap-center w-[88vw] sm:w-[400px] md:w-[440px] min-h-[440px] md:h-[540px] rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 md:p-9 bg-zinc-950/95 backdrop-blur-3xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.95)] hover:border-teal-400/80 transition-colors duration-500"
                >
                  {/* Background Colorful 3D Image & Gradient Overlay */}
                  {category.bgImage && (
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                      <Image
                        src={category.bgImage}
                        alt={category.title}
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700 contrast-[1.08] saturate-[1.1]"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/30 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                    </div>
                  )}

                  {/* Inner Glowing Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/15 via-transparent to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                  
                  {/* Top Card Metadata */}
                  <div className="flex items-center justify-between relative z-20">
                    <span className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border bg-black/60 backdrop-blur-md ${category.accentColor}`}>
                      {category.tag}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-white/60 bg-black/50 px-2 sm:px-2.5 py-1 rounded-full border border-white/10">
                      [ 0{i + 1} / 0{skillCategories.length} ]
                    </span>
                  </div>

                  {/* Middle Title & Description */}
                  <div className="space-y-2.5 sm:space-y-3.5 relative z-20 my-auto py-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mb-1.5 sm:mb-2">
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300" />
                    </div>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:text-teal-300 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed line-clamp-3">
                      {category.desc}
                    </p>
                  </div>

                  {/* Bottom Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-white/15 relative z-20">
                    {category.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-[11px] sm:text-xs font-mono font-medium text-white bg-black/60 border border-white/15 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl group-hover:border-teal-400/40 transition-colors backdrop-blur-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Glow Accent */}
                  <div className="absolute bottom-4 right-4 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-teal-400 group-hover:shadow-[0_0_20px_#2dd4bf] transition-all z-20" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Horizontal Navigation Controls & Indicators */}
        <div className="w-full max-w-[1400px] px-4 sm:px-6 md:px-12 z-30 flex items-center justify-between mt-2 sm:mt-4 pointer-events-auto">
          
          {/* Previous Card Button */}
          <button
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-zinc-950/90 border border-teal-500/30 text-white text-xs font-semibold backdrop-blur-xl shadow-xl hover:bg-teal-600 disabled:opacity-40 disabled:pointer-events-none transition-all hover:scale-105 active:scale-95"
            title="Previous Skill Card"
          >
            <ChevronLeft className="w-4 h-4 text-teal-300" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/80 border border-teal-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-xl shadow-xl">
            {skillCategories.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`transition-all rounded-full ${
                  i === activeIndex 
                    ? 'w-5 sm:w-6 h-2 sm:h-2.5 bg-teal-400 shadow-[0_0_12px_#2dd4bf]' 
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/60'
                }`}
                title={`Go to Skill Card ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Card Button */}
          <button
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === skillCategories.length - 1}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-zinc-950/90 border border-teal-500/30 text-white text-xs font-semibold backdrop-blur-xl shadow-xl hover:bg-teal-600 disabled:opacity-40 disabled:pointer-events-none transition-all hover:scale-105 active:scale-95"
            title="Next Skill Card"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 text-teal-300" />
          </button>

        </div>
      </div>
    </div>
  );
}

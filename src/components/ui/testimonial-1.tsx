"use client";

import { ArrowUp, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const count = useMotionValue(1);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [count, value, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Testimonial1() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  interface StatItem {
    value: number;
    decimals: number;
    suffix: string;
    label: string;
    href: string;
    cta: string;
  }

  const stats: StatItem[] = [
    {
      value: 6,
      decimals: 0,
      suffix: "+",
      label: "Certifications",
      href: "/#certifications-section",
      cta: "View Credentials",
    },
    {
      value: 3,
      decimals: 0,
      suffix: " Major",
      label: "Key Projects",
      href: "/#projects-section",
      cta: "View Projects",
    },
    {
      value: 1,
      decimals: 0,
      suffix: "+ Year",
      label: "SDE Experience",
      href: "/#experience-section",
      cta: "Explore Experience",
    },
    {
      value: 15,
      decimals: 0,
      suffix: "+ Skills",
      label: "Tech & Dev Stack",
      href: "/#skills-section",
      cta: "See Skills",
    },
  ];

  return (
    <div className="bg-white dark:bg-black h-auto min-h-0 lg:h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 py-6 sm:py-8 lg:py-0 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full">
        
        {/* Top Badge */}
        <div className="flex justify-center">
          <div className="bg-[#f1efec] dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-black dark:text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-sm">
            <span className="relative flex h-2 w-2">
              <motion.span
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60"
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            </span>
            Professional Statistics
          </div>
        </div>

        {/* Main Heading with Block Reveal Animation */}
        <div className="text-center max-w-3xl mx-auto relative text-neutral-900 dark:text-white px-2 space-y-1 sm:space-y-1.5">
          {[
            { text: "Scalable web architectures. Modern UI workflows.", color: "#6366f1", delay: 0 },
            { text: "Full-stack solutions engineered for performance.", color: "#10b981", delay: 0.15 },
            { text: "Optimized REST APIs, PostgreSQL JSONB mappings,", color: "#f59e0b", delay: 0.3 },
            { text: "and production-ready web applications.", color: "#ef4444", delay: 0.45 }
          ].map((line, i) => (
            <div key={i} className="relative block overflow-hidden py-0.5">
              <motion.h1
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  delay: line.delay + 0.35,
                  duration: 0.01
                }}
                className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-black leading-snug tracking-tight"
              >
                {line.text}
              </motion.h1>

              {/* The Revealer Block */}
              <motion.div
                initial={{ clipPath: i % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
                whileInView={{
                  clipPath: i % 2 === 0
                    ? ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0 0 100%)"]
                    : ["inset(0 0 0 100%)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"]
                }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.75,
                  times: [0, 0.45, 0.55, 1],
                  delay: line.delay,
                  ease: [0.85, 0, 0.15, 1]
                }}
                className="absolute inset-0 z-10"
                style={{ backgroundColor: line.color }}
              />
            </div>
          ))}
        </div>

        {/* Glassmorphic Stats Bar - Perfectly Centered & Fully Visible */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0e061b]/95 dark:bg-[#0c0614]/95 backdrop-blur-xl px-4 py-3 sm:py-4 border-2 border-purple-500/60 dark:border-purple-500/60 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-400 transition-all duration-300 relative overflow-hidden">
          {/* Subtle Background Glow inside the bar */}
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-purple-500/10 blur-[100px] pointer-events-none" />

          {stats.map((stat, index) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="flex-1 relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => {
                if (stat.href.startsWith('/#')) {
                  const targetId = stat.href.replace('/#', '');
                  const elem = document.getElementById(targetId);
                  if (elem) {
                    e.preventDefault();
                    elem.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              <div className="flex flex-col items-center justify-center relative h-full group py-1">
                {index !== 0 && (
                  <div className="hidden sm:block w-0.5 h-8 border border-dashed border-neutral-200 dark:border-zinc-700 absolute -left-2" />
                )}

                <div className="flex flex-col items-center text-center transition-all duration-300 group-hover:opacity-40">
                  <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">
                    {stat.label}
                  </span>
                  <div className="text-base sm:text-xl md:text-2xl font-black text-neutral-900 dark:text-white tracking-tight flex items-baseline justify-center">
                    <Counter value={stat.value} decimals={stat.decimals} />
                    <span className="text-xs sm:text-sm ml-0.5 font-bold">{stat.suffix}</span>
                  </div>
                </div>

                {/* Hover Reveal */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                      <div
                        className="absolute inset-0 bg-white dark:bg-zinc-950 backdrop-blur-[50px] rounded-xl"
                        style={{
                          maskImage: 'radial-gradient(circle, black 45%, transparent 95%)',
                          WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 95%)',
                        }}
                      />

                      <span className="relative text-[10px] sm:text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 drop-shadow-md z-30">
                        {stat.cta}
                        <ExternalLink className="w-3 h-3 text-teal-400" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

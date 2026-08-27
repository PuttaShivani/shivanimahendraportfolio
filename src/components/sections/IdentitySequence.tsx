"use client";

import React, { useRef } from "react";
import { motion, useTransform, useSpring, easeOut, easeInOut, circOut } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { BrandScroller, BrandScrollerReverse } from "@/components/ui/brand-scroller";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import MagneticEffect from "@/components/ui/MagneticEffect";

interface IdentitySequenceProps {
    scrollYProgress: any; // Parent scroll progress [0, 1]
    isVisible: boolean;
}

export const IdentitySequence = ({ scrollYProgress, isVisible }: IdentitySequenceProps) => {
    const t = useTranslations("about");

    // Map the parent's scroll progress (0.4 to 0.85) to local progress (0 to 1).
    // This leaves 0.85 to 1.0 (approx 90vh) as a "pause" where the user can just read the Tech Stack before it scrolls away.
    const localProgress = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);

    // 1. Card Transformation (Entrance & Scaling)
    const cardScale = useTransform(localProgress, [0, 0.4], [0.8, 1], { ease: easeInOut });
    const cardY = useTransform(localProgress, [0, 0.4], ["60vh", "0vh"], { ease: easeInOut });
    const cardBorderRadius = useTransform(localProgress, [0.1, 0.4], ["60px", "0px"], { ease: easeInOut });

    // 2. Internal Content Scroll
    const contentY = useTransform(localProgress, [0.35, 1], ["0%", "-15%"], { ease: easeInOut });

    // 3. Elements specific animations
    const phase0Opacity = useTransform(localProgress, [0, 0.15], [1, 0]);
    const cardContentOpacity = useTransform(localProgress, [0.05, 0.25], [0, 1]);
    const textOpacity = useTransform(localProgress, [0.1, 0.35], [0, 1]);

    // 4. Background Color Transition (Smoothing the exit)
    const cardBg = useTransform(
        localProgress,
        [0.8, 1],
        ["#EBEBEB", "#FFFFFF"]
    );
    const cardBgDark = useTransform(
        localProgress,
        [0.8, 1],
        ["#18181b", "#000000"]
    );

    const { resolvedTheme } = useTheme();
    const cardBgValue = resolvedTheme === 'dark' ? cardBgDark : cardBg;

    const marqueeItems = [
        <span key="1" className="text-[3.5rem] xs:text-[6rem] sm:text-[10rem] md:text-[16rem] font-black uppercase tracking-tighter mx-4 xs:mx-8 sm:mx-12 text-black dark:text-white leading-none">
            {portfolioData.personal.title}
        </span>,
        <div key="icon" className="w-16 h-16 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full bg-[#D1FF4D] flex items-center justify-center mx-4 xs:mx-8 sm:mx-12">
            <svg viewBox="0 0 100 100" className="w-10 h-10 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 fill-black dark:fill-zinc-900">
                <path d="M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0" />
            </svg>
        </div>
    ];

    return (
        <div className="relative w-full max-w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background dark:bg-black">
            {/* Phase 0: The Lead-in UI (Visible before card scales) */}
            <motion.div
                style={{ opacity: phase0Opacity }}
                className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none -translate-y-12"
            >
                {/* Center Unified Action - Magnetic Group */}
                <div className="mb-12 sm:mb-16 pointer-events-auto">
                    <MagneticEffect>
                        <div className="group flex items-center gap-1 cursor-pointer">
                            <div className="relative px-6 xs:px-8 sm:px-10 py-3.5 sm:py-5 rounded-full bg-[#D1FF4D] overflow-hidden transition-all duration-500">
                                <div className="absolute inset-0 bg-black dark:bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10 h-6 sm:h-7 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <span className="text-black group-hover:text-white dark:group-hover:text-black font-bold text-base sm:text-xl leading-6 sm:leading-7 transition-colors duration-500">
                                            {t("leadIn.aboutMe")}
                                        </span>
                                        <span className="text-black group-hover:text-white dark:group-hover:text-black font-bold text-base sm:text-xl leading-6 sm:leading-7 transition-colors duration-500">
                                            {t("leadIn.aboutMe")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#D1FF4D] overflow-hidden flex items-center justify-center transition-all duration-500">
                                <div className="absolute inset-0 bg-black dark:bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10 h-6 sm:h-8 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
                                        <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MagneticEffect>
                </div>

                {/* Unified Bottom Labels Layer */}
                <div className="w-full max-w-[1200px] flex items-center justify-between px-4 sm:px-12">
                    <div className="flex items-center gap-3 text-zinc-500 dark:text-white/60 text-sm font-medium tracking-tight">
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-4 h-4 flex items-center justify-center"
                        >
                            ↓
                        </motion.span>
                        <span>{t("leadIn.scroll")}</span>
                    </div>

                    <div className="text-zinc-500 dark:text-white/60 text-sm font-medium tracking-tight">
                        {t("leadIn.shortStory")}
                    </div>
                </div>
            </motion.div>

            {/* The Main Card Container */}
            <motion.div
                style={{
                    scale: cardScale,
                    y: cardY,
                    borderRadius: cardBorderRadius,
                    backgroundColor: cardBgValue,
                    willChange: "transform, background-color",
                }}
                className="relative w-full h-full flex flex-col overflow-hidden origin-bottom z-10"
            >
                {/* Unified Scrolling Content Wrapper */}
                <motion.div
                    style={{ y: contentY }}
                    className="relative w-full flex flex-col items-center"
                >
                    {/* Phase 1: Marquee Header */}
                    <div className="w-full py-12 md:py-16 flex items-center justify-center flex-shrink-0">
                        <motion.div style={{ opacity: cardContentOpacity }} className="w-full">
                            <InfiniteMarquee
                                items={marqueeItems}
                                speed={18}
                                className="w-full"
                                itemClassName="py-4"
                            />
                        </motion.div>
                    </div>

                    {/* Phase 4: Tech Stack & Tools Scrollers */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto py-6 md:py-8 flex flex-col gap-6 flex-shrink-0"
                    >
                        <div className="px-8 md:px-16 lg:px-24 mb-2">
                            <h4 className="text-lg md:text-xl uppercase tracking-[0.15em] font-bold text-zinc-500 dark:text-zinc-400">
                                Tech Stack & Ecosystem
                            </h4>
                        </div>
                        <BrandScroller />
                        <BrandScrollerReverse />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

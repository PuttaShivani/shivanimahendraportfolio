"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { getOnlineSkillIcon } from "@/lib/utils";
import { IconColorizer } from "@/components/ui/IconColorizer";

const techStackItems = portfolioData.techStack;
const toolItems = portfolioData.tools;

const ScrollerItem = ({ name, icon }: { name: string; icon: string }) => (
    <div className="flex items-center gap-4 px-6 sm:px-8 py-3.5 mx-2 my-1 rounded-2xl bg-[#0c0614]/80 border-2 border-purple-500/50 hover:border-purple-400 hover:scale-105 transition-all duration-300 backdrop-blur-xl shadow-lg shadow-purple-950/40 group cursor-pointer">
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <IconColorizer
                name={name}
                iconUrl={getOnlineSkillIcon(name, icon)}
                className="object-contain"
            />
        </div>
        <p className="text-sm sm:text-base font-mono font-bold text-purple-200 group-hover:text-purple-300 transition-colors duration-300 whitespace-nowrap">
            {name}
        </p>
    </div>
);

export const BrandScroller = () => {
    // Quadruple items to guarantee a continuous marquee across wide monitors
    const itemsList = [...techStackItems, ...techStackItems, ...techStackItems, ...techStackItems];

    return (
        <div className="relative flex overflow-hidden py-3 w-full px-4 md:px-12 [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
            <motion.div
                animate={{
                    x: ["-50%", "0%"],
                }}
                transition={{
                    duration: 35,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex whitespace-nowrap"
            >
                <div className="flex shrink-0">
                    {itemsList.map((item, idx) => (
                        <ScrollerItem key={`tech-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export const BrandScrollerReverse = () => {
    // Quadruple items to guarantee a continuous marquee across wide monitors
    const itemsList = [...toolItems, ...toolItems, ...toolItems, ...toolItems];

    return (
        <div className="relative flex overflow-hidden py-3 w-full px-4 md:px-12 [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
            <motion.div
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    duration: 35,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex whitespace-nowrap"
            >
                <div className="flex shrink-0">
                    {itemsList.map((item, idx) => (
                        <ScrollerItem key={`tool-${idx}`} name={item.name} icon={item.icon} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

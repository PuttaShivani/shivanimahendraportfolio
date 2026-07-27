"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { getOnlineSkillIcon } from "@/lib/utils";
import { IconColorizer } from "@/components/ui/IconColorizer";

const techStackItems = portfolioData.techStack;
const toolItems = portfolioData.tools;

const ScrollerItem = ({ name, icon }: { name: string; icon: string }) => (
    <div className="flex items-center gap-3.5 px-8 sm:px-10 py-3 transition-all duration-300 group">
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 transition-all duration-500">
            <IconColorizer
                name={name}
                iconUrl={getOnlineSkillIcon(name, icon)}
                className="object-contain"
            />
        </div>
        <p className="text-lg sm:text-xl font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-500 whitespace-nowrap">
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

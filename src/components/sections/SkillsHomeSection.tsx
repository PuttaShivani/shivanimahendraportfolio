'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { portfolioData } from '@/data/portfolio';
import dynamic from 'next/dynamic';
import { getOnlineSkillIcon } from '@/lib/utils';

const KineticTechGrid = dynamic(() => import('@/components/ui/KineticTechGrid').then(mod => mod.KineticTechGrid), { ssr: false });
const ArchedTechIconsInteractive = dynamic(() => import('@/components/ui/ArchedTechIcons').then(mod => mod.ArchedTechIconsInteractive), { ssr: false });


const ToolsSection = dynamic(() => import('@/components/sections/skills/ToolsSection').then(mod => mod.ToolsSection), { ssr: false });
const FeatureSection = dynamic(() => import('@/components/ui/stack-feature-section'), { ssr: false });

const techLogos: Record<string, string> = {
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Solidity': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
};

export default function SkillsHomeSection() {
    return (
        <div className="w-full relative bg-background">
            {/* Section Header */}
            <div className="w-full flex flex-col items-center max-w-[1700px] px-2 xs:px-4 md:px-6 mb-8 xs:mb-12 sm:mb-16">
                <div className="text-center space-y-3 xs:space-y-4">
                    <h3 className="text-foreground text-2xl xs:text-3xl md:text-5xl font-black tracking-tighter">
                        Skills & Tools
                    </h3>
                    <p className="text-muted-foreground text-[9px] xs:text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] xs:tracking-[0.4em]">
                        Technologies and tools I work with
                    </p>
                </div>
            </div>

            <section className="pt-6 xs:pt-12 pb-24 xs:pb-48 px-3 xs:px-8 relative overflow-hidden bg-background">
                <div className="max-w-7xl mx-auto relative z-10 w-full mt-6 xs:mt-12 md:mt-16">
                    <div className="relative w-full flex flex-col justify-center items-center mb-0">
                        <ArchedTechIconsInteractive
                            key="arched-tech-icons-interactive"
                            icons={portfolioData.techStack.map(t => ({
                                name: t.name,
                                icon: getOnlineSkillIcon(t.name, techLogos[t.name] || t.icon)
                            }))}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-100px", once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center space-y-3 xs:space-y-4 max-w-3xl mx-auto px-2 xs:px-4 relative z-10 pointer-events-auto -mt-[20px] xs:-mt-[30px] sm:-mt-[50px] md:-mt-[70px]"
                        >
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-100px", once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-[9px] xs:text-[10px] font-mono uppercase tracking-[0.3em] xs:tracking-[0.5em] text-primary/80 font-bold block"
                            >
                                CORE TECHNOLOGIES
                            </motion.span>
                            <h2 className="text-2xl xs:text-4xl md:text-6xl font-medium tracking-tight text-foreground">
                                The Engineering Foundation
                            </h2>
                            <p className="text-xs xs:text-sm md:text-base text-muted-foreground leading-relaxed pt-2">
                                Building scalable architectures using modern languages and frameworks optimized for high-performance execution.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ margin: "-100px", once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-16 sm:mt-20 md:mt-24 w-full"
                    >
                        <KineticTechGrid
                            items={portfolioData.techStack.map(t => ({
                                name: t.name,
                                icon: getOnlineSkillIcon(t.name, techLogos[t.name] || t.icon)
                            }))}
                        />
                    </motion.div>
                </div>
            </section>

            <ToolsSection />
            <FeatureSection />
        </div>
    );
}

'use client';

import { useState, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useTranslations } from 'next-intl';
import { Search, X, Layers, ArrowRight, ArrowUpRight, Sparkles, Code2, Zap, Brain, Cpu, Wifi, Blocks, Globe, Database, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Project } from '@/types';

import { ProjectUniverseModal } from '@/components/projects/ProjectUniverseModal';

import { LogoTimeline, LogoItem } from '@/components/ui/logo-timeline';
import { Icons } from '@/components/icons';
import { Meteors } from '@/components/ui/meteors';
import dynamic from 'next/dynamic';


const ProjectStats = dynamic(() => import('@/components/sections/ProjectStats').then(mod => mod.ProjectStats), { ssr: true });

import { usePerformance } from '@/hooks/usePerformance';
import { ProjectPlaceholder } from '@/components/projects/ProjectPlaceholder';

import { getProjectImages } from '@/app/actions/getProjectImages';

type FilterType = 'all' | 'ongoing' | 'completed';

function ProjectListItem({
    project,
    onClick,
    index,
    isLowPowerMode
}: {
    project: Project;
    onClick: () => void;
    index: number;
    isLowPowerMode?: boolean;
}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const springConfig = { stiffness: 200, damping: 22, mass: 0.1 };
    const translateX = useSpring(useTransform(cursorX, (val) => val - 250), springConfig);
    const translateY = useSpring(useTransform(cursorY, (val) => val - 150), springConfig);

    const isOngoing = project.status === 'ongoing';
    const displayIndex = String(index + 1).padStart(2, '0');

    const rafRef = useRef<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!itemRef.current) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const rect = itemRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;

        rafRef.current = requestAnimationFrame(() => {
            mouseX.set(clientX - rect.left);
            mouseY.set(clientY - rect.top);
            cursorX.set(clientX);
            cursorY.set(clientY);
        });
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        const clientX = e.clientX;
        const clientY = e.clientY;

        // Synchronously update coordinates to prevent the (0,0) render bug
        cursorX.set(clientX);
        cursorY.set(clientY);
        
        if (itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            mouseX.set(clientX - rect.left);
            mouseY.set(clientY - rect.top);
        }
        
        setIsHovered(true);
    };

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const techText = project.techStack.join(' • ');
    const bgGradient = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.03), transparent 40%)`;

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative"
            data-project-slug={project.slug}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={onClick}
        >
            <motion.div
                className={cn(
                    "relative cursor-default overflow-hidden rounded-xl border-b border-white/5 transition-all duration-300",
                    isHovered ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                )}
                whileHover={{ scale: 1.002 }} /* Micro interaction */
            >
                {/* Spotlight */}
                {!isLowPowerMode && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            background: bgGradient
                        }}
                    />
                )}

                {/* Content */}
                <div className="relative z-10 flex items-center gap-2 xs:gap-4 sm:gap-8 py-4 xs:py-6 sm:py-10 px-3 xs:px-4 sm:px-8">
                    {/* Index */}
                    <motion.span
                        className={cn(
                            "text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black tabular-nums transition-colors duration-500 shrink-0",
                            isHovered
                                ? (isOngoing ? "text-emerald-500 dark:text-emerald-400" : "text-blue-500 dark:text-blue-400")
                                : "text-muted-foreground/20"
                        )}
                        animate={{ scale: isHovered ? 1.1 : 1, x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {displayIndex}
                    </motion.span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 sm:gap-4 mb-2">
                            <motion.h3
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground truncate"
                                animate={{ x: isHovered ? 8 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {project.title}
                            </motion.h3>
                            <span className={cn(
                                "shrink-0 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider",
                                isOngoing
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/20"
                                    : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 dark:border-blue-500/20"
                            )}>
                                {isOngoing ? 'ongoing' : 'done'}
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm sm:text-base truncate max-w-2xl hidden sm:block">
                            {project.description}
                        </p>
                        <p className="text-muted-foreground text-xs line-clamp-1 sm:hidden">
                            {project.description}
                        </p>
                    </div>


                </div>

                {/* Tech Marquee on Hover */}
                {!isLowPowerMode && (
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]"
                            >
                                <div className="relative py-3 overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                                    <motion.div
                                        className="flex whitespace-nowrap"
                                        animate={{ x: [0, -500] }}
                                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                    >
                                        {[...Array(4)].map((_, i) => (
                                            <span key={i} className={cn("mx-4 text-sm font-mono tracking-wider", isOngoing ? "text-emerald-600/60 dark:text-emerald-400/60" : "text-blue-600/60 dark:text-blue-400/60")}>
                                                {techText} •
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </motion.div>

            {/* Floating Preview */}
            <AnimatePresence>
                {isHovered && mounted && createPortal(
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, exit: { duration: 0.1 }, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed pointer-events-none z-[9999] hidden md:block"
                        style={{
                            left: 0,
                            top: 0,
                            x: translateX,
                            y: translateY,
                        }}
                    >
                        <div className={cn(
                            "w-[500px] h-[300px] rounded-2xl overflow-hidden border backdrop-blur-xl flex flex-col justify-end relative shadow-2xl transition-all duration-300",
                            "border-white/10 bg-zinc-950"
                        )}>
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-contain opacity-80 block transition-transform duration-500 hover:scale-105"
                                />
                            ) : (
                                <ProjectPlaceholder className="pb-0" title={project.title} />
                            )}

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20 z-10" />

                            {/* Related Content */}
                            <div className="relative z-20 p-6 flex flex-col space-y-3">
                                <div>
                                    <h4 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
                                        {project.title}
                                    </h4>
                                    <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed font-medium drop-shadow-sm">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {project.techStack.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/10 text-white/90 border border-white/5 backdrop-blur-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 4 && (
                                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/5 text-zinc-400">
                                            +{project.techStack.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>,
                    document.body
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function FeaturedCard({ project, onClick, index, isLowPowerMode }: { project: Project; onClick: () => void; index: number; isLowPowerMode?: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [showAllTech, setShowAllTech] = useState(false);
    const visibleTech = showAllTech ? project.techStack : project.techStack.slice(0, 6);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const pixelX = useMotionValue(0);
    const pixelY = useMotionValue(0);

    const rafRef = useRef<number | null>(null);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], isLowPowerMode ? [0, 0] : [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], isLowPowerMode ? [0, 0] : [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        const rect = cardRef.current.getBoundingClientRect();

        rafRef.current = requestAnimationFrame(() => {
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
            pixelX.set(e.clientX - rect.left);
            pixelY.set(e.clientY - rect.top);
        });
    };

    const handleMouseLeave = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const isOngoing = project.status === 'ongoing';
    const bgGradient = useMotionTemplate`radial-gradient(800px circle at ${pixelX}px ${pixelY}px, ${isOngoing ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)'}, transparent 40%)`;

    return (
        <motion.article
            initial={{ opacity: 0, y: isLowPowerMode ? 40 : 80, scale: isLowPowerMode ? 1 : 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: isLowPowerMode ? 0.6 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 group cursor-pointer perspective-1000"
            onClick={onClick}
        >
            <motion.div
                ref={cardRef}
                className="relative h-full min-h-[450px] sm:min-h-[550px] rounded-3xl overflow-hidden"
                style={isLowPowerMode ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                whileHover={isLowPowerMode ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {/* Animated Gradient Border */}
                {!isLowPowerMode && (
                    <motion.div
                        className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                        style={{
                            background: isOngoing
                                ? 'linear-gradient(135deg, #10b981, #06b6d4, #3b82f6, #10b981)'
                                : 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                            backgroundSize: '300% 300%',
                        }}
                        animate={{ backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%' }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                )}

                {/* Main Card Body */}
                <div className="relative h-full bg-white/50 dark:bg-black/40 backdrop-blur-2xl rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 transition-colors duration-500">

                    {/* Project Cover & Preview Image */}
                    {project.image && (
                        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-700">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover object-right-top transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                        </div>
                    )}

                    {/* Content Body: Responsive Flex Layout */}
                    <div className="relative z-30 p-6 sm:p-10 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 h-full min-h-[500px]">
                        
                        {/* Left Section: Text & Data */}
                        <div className="flex-1 min-w-0 max-w-2xl">
                            {/* Status Badge */}
                            <motion.div
                                className="flex items-center gap-3 mb-5"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className={cn(
                                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md",
                                    isOngoing
                                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                                        : "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                                )}>
                                    <span className={cn(
                                        "w-2 h-2 rounded-full",
                                        isOngoing ? "bg-emerald-400 animate-pulse" : "bg-blue-400"
                                    )} />
                                    {isOngoing ? 'In Development' : 'Completed'}
                                </span>
                            </motion.div>

                            {/* Title with underline effect */}
                            <motion.h2
                                className="relative text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
                                animate={{ x: isHovered ? 6 : 0 }}
                            >
                                {project.title}
                                <motion.div
                                    className={cn(
                                        "absolute -bottom-1 left-0 h-1 rounded-full",
                                        isOngoing ? "bg-gradient-to-r from-emerald-400 to-cyan-400" : "bg-gradient-to-r from-blue-400 to-violet-400"
                                    )}
                                    initial={{ width: 0 }}
                                    animate={{ width: isHovered ? '60%' : '0%' }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.h2>

                            {/* Description */}
                            <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg mb-6 leading-relaxed line-clamp-3">
                                {project.description}
                            </p>

                            {/* Tech Stack with stagger */}
                            <div className="flex flex-wrap gap-2 mb-8 relative z-40">
                                {visibleTech.map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-purple-950/50 text-purple-200 border border-purple-500/30 backdrop-blur-sm shadow-sm"
                                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                                {project.techStack.length > 6 && !showAllTech && (
                                    <motion.button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowAllTech(true);
                                        }}
                                        className={cn(
                                            "px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold border backdrop-blur-sm cursor-pointer transition-all hover:scale-105 shadow-md z-50",
                                            isOngoing
                                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 hover:bg-emerald-500/30"
                                                : "bg-purple-900/70 text-purple-200 border-purple-400/50 hover:bg-purple-800/90"
                                        )}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        title="Click to show more skills"
                                    >
                                        +{project.techStack.length - 6} more
                                    </motion.button>
                                )}
                                {showAllTech && project.techStack.length > 6 && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowAllTech(false);
                                        }}
                                        className="text-xs font-mono text-purple-300 hover:underline ml-1 cursor-pointer font-bold self-center z-50"
                                    >
                                        Show Less
                                    </button>
                                )}
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                className={cn(
                                    "inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300",
                                    isOngoing
                                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                                        : "bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/25"
                                )}
                                animate={{ x: isHovered ? 8 : 0 }}
                            >
                                <Zap className="w-4 h-4" />
                                <span>Explore Project</span>
                                <ArrowRight className={cn(
                                    "w-5 h-5 transition-transform duration-300",
                                    "group-hover:translate-x-1"
                                )} />
                            </motion.div>
                        </div>

                        {/* Right Section: Image Showcase Preview Box */}
                        {project.image && (
                            <motion.div
                                className="w-full lg:w-[380px] xl:w-[440px] h-[260px] sm:h-[300px] lg:h-[340px] shrink-0 rounded-2xl border border-white/15 overflow-hidden shadow-2xl bg-zinc-950/80 backdrop-blur-md p-3 relative z-20"
                                animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.02 : 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                                    <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-xs font-mono text-zinc-300 bg-black/80 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                                        <span className="truncate font-semibold text-white">{project.title}</span>
                                        <span className="text-cyan-400 font-bold shrink-0 ml-2">PREVIEW</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </div>
                </div>
            </motion.div>
        </motion.article>
    );
}

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number; }) {
    const [showAllTech, setShowAllTech] = useState(false);
    const isOngoing = project.status === 'ongoing';
    const visibleTech = showAllTech ? project.techStack : project.techStack.slice(0, 4);

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: 0.1 * (index % 2) }}
            className="group cursor-pointer flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-zinc-950/60 hover:bg-zinc-900/80 border border-white/10 hover:border-cyan-500/40 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-cyan-500/10 relative overflow-hidden"
            onClick={onClick}
        >
            {/* Top Glow Ambient Accent */}
            <div className={cn(
                "absolute top-0 right-0 w-36 h-36 rounded-full blur-[70px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-40",
                isOngoing ? "bg-emerald-500" : "bg-cyan-500"
            )} />

            {/* Top Image Box */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-inner transition-all duration-500 group-hover:shadow-2xl">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 bg-black/40"
                    />
                ) : (
                    <ProjectPlaceholder className="absolute inset-0" title={project.title} />
                )}
                
                {/* Overlay hover icon badge */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-semibold backdrop-blur-md flex items-center gap-2">
                        <span>Inspect Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0614] via-transparent to-transparent opacity-60" />
            </div>

            {/* Content Body */}
            <div className="flex flex-col flex-grow">
                {/* Title & Badge Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-xl xs:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
                        {project.title}
                    </h3>
                    <div className="shrink-0">
                        <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-mono tracking-wide border uppercase font-semibold",
                            isOngoing ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-purple-500/15 text-purple-300 border-purple-500/40"
                        )}>
                            {project.category || (isOngoing ? 'In Development' : 'Completed')}
                        </span>
                    </div>
                </div>

                {/* Description - Bullet Points */}
                {project.highlights && (
                    <ul className="space-y-2.5 mb-6 flex-grow">
                        {project.highlights.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-purple-200/90 text-xs sm:text-sm leading-relaxed">
                                <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", isOngoing ? "bg-emerald-400" : "bg-purple-400")} />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Footer Tech Badges */}
                <div className="mt-auto flex flex-wrap gap-2 items-center pt-2 border-t border-purple-500/20">
                    {visibleTech.map((tech) => {
                        const Icon = Icons[getIconKey(tech)];
                        return (
                            <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-500/30 text-[11px] font-medium text-purple-200 bg-purple-950/50 transition-colors group-hover:border-purple-400">
                                {Icon ? <Icon className="w-3.5 h-3.5 text-purple-400" /> : <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                                {tech}
                            </div>
                        );
                    })}
                    {project.techStack.length > 4 && !showAllTech && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAllTech(true);
                            }}
                            className="text-xs font-mono font-bold text-purple-300 bg-purple-900/60 hover:bg-purple-800/80 border border-purple-400/50 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer hover:scale-105 shadow-md"
                            title="Click to show more skills"
                        >
                            +{project.techStack.length - 4} more
                        </button>
                    )}
                    {showAllTech && project.techStack.length > 4 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAllTech(false);
                            }}
                            className="text-[10px] font-mono text-purple-400 hover:underline ml-1 cursor-pointer font-bold"
                        >
                            Show Less
                        </button>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

function CompactCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const isOngoing = project.status === 'ongoing';

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="group cursor-pointer"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative p-5 rounded-xl bg-zinc-900/50 border border-white/5 h-full backdrop-blur-sm overflow-hidden"
                whileHover={{ y: -4, scale: 1.02, borderColor: isOngoing ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)' }}
                transition={{ duration: 0.25 }}
            >
                {/* Subtle spotlight */}
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        opacity: isHovered ? 0.5 : 0,
                        background: `radial-gradient(200px circle at 50% 0%, ${isOngoing ? 'rgba(16, 185, 129, 0.08)' : 'rgba(59, 130, 246, 0.08)'}, transparent)`
                    }}
                />

                {/* Status Dot */}
                <motion.div
                    className={cn(
                        "absolute top-4 right-4 w-2 h-2 rounded-full z-10",
                        isOngoing ? "bg-emerald-400" : "bg-blue-400"
                    )}
                    animate={{ scale: isOngoing ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Title */}
                <motion.h4
                    className={cn(
                        "text-base font-semibold text-white mb-2 pr-6 line-clamp-1 transition-colors duration-300 z-10 relative",
                        isHovered && (isOngoing ? "text-emerald-400" : "text-blue-400")
                    )}
                >
                    {project.title}
                </motion.h4>

                {/* Description */}
                <p className="text-zinc-500 text-sm line-clamp-2 mb-3 z-10 relative">
                    {project.description}
                </p>

                {/* Tech Preview */}
                <div className="flex items-center gap-2 text-xs text-zinc-600 z-10 relative">
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{project.techStack.slice(0, 2).join(' • ')}</span>
                </div>
            </motion.div>
        </motion.article>
    );
}

const getIconKey = (name: string): keyof typeof Icons => {
    const lower = name.toLowerCase().replace('.', '').replace(/\s+/g, '');
    if (lower.includes('react')) return 'react';
    if (lower.includes('next')) return 'react';
    if (lower.includes('node')) return 'ts';
    if (lower.includes('typescript')) return 'ts';
    if (lower.includes('tailwind')) return 'tailwind';
    if (lower.includes('github')) return 'gitHub';
    if (lower.includes('git')) return 'gitHub';
    return (Object.keys(Icons).find(k => lower.includes(k.toLowerCase())) as keyof typeof Icons) || 'unknown';
};

export default function ProjectsPage() {
    const t = useTranslations('projects');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [visibleCount, setVisibleCount] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = sessionStorage.getItem('projects-visible-count');
            if (saved) return Math.max(10, parseInt(saved, 10));
        }
        return 10;
    });
    const { isLowPowerMode } = usePerformance();

    const router = useRouter();
    const pathname = usePathname();



    // Generate Timeline Items - delay is calculated in component based on index
    const timelineItems: LogoItem[] = useMemo(() => {
        const tech = portfolioData.techStack.map(t => t.name);
        const tools = portfolioData.tools ? portfolioData.tools.map(t => t.name) : [];
        const allItems = [...tech, ...tools];

        // Distribute across 7 rows
        const rowCount = 7;

        return allItems.map((name, index) => {
            const row = (index % rowCount) + 1;
            const duration = 22 + (row * 2); // 24s, 26s, 28s, 30s, 32s, 34s, 36s - varied speeds

            return {
                label: name,
                icon: getIconKey(name),
                animationDelay: 0, // Calculated in component
                animationDuration: duration,
                row: row
            };
        });
    }, []);

    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        { id: 'All', label: 'All Realms', icon: Globe },
        { id: 'AI & Machine Learning', label: 'Artificial Intelligence', icon: Brain },
        { id: 'Software Engineering', label: 'Software Architecture', icon: Database },
        { id: 'More', label: 'More', icon: Layers },
    ];

    const [projects, setProjects] = useState(portfolioData.projects);

    useEffect(() => {
        const loadImages = async () => {
            const updatedProjects = await Promise.all(
                portfolioData.projects.map(async (project) => {
                    // Try to find dynamic images
                    try {
                        const images = await getProjectImages(project.slug, project.title);
                        if (images.length > 0) {
                            return { ...project, image: images[0] }; // Use first image as cover
                        }
                    } catch (e) {
                        console.error("Failed to load images for", project.title, e);
                    }
                    return project;
                })
            );
            setProjects(updatedProjects);
        };
        loadImages();
    }, []);

    const filteredProjects = useMemo(() => {
        let currentProjects = [...projects];

        // Category Filter
        if (selectedCategory !== 'All') {
            if (selectedCategory === 'More') {
                currentProjects = currentProjects.filter(p => p.category && ['IoT & Embedded', 'Blockchain', 'Creative Tech'].includes(p.category));
            } else {
                currentProjects = currentProjects.filter(p => p.category === selectedCategory);
            }
        }

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            currentProjects = currentProjects.filter((p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.techStack.some((t) => t.toLowerCase().includes(query)));
        }

        // Status Filter
        if (filter !== 'all') currentProjects = currentProjects.filter((p) => p.status === filter);
        return currentProjects;
    }, [searchQuery, filter, selectedCategory, projects]);

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);

    const lenis = useLenis();

    const hasRestoredScroll = useRef(false);

    // Scroll restoration: runs BEFORE browser paint so user never sees wrong position
    useLayoutEffect(() => {
        if (hasRestoredScroll.current) return;

        const savedSlug = sessionStorage.getItem('projects-last-clicked');
        if (!savedSlug || !lenis) return;

        // Mark as handled so strict mode re-run won't interfere
        hasRestoredScroll.current = true;
        sessionStorage.removeItem('projects-last-clicked');
        sessionStorage.removeItem('projects-visible-count');
        sessionStorage.removeItem('projects-view-mode');

        // Stop Lenis, scroll natively, then restart
        lenis.stop();

        const el = document.querySelector(`[data-project-slug="${savedSlug}"]`);
        if (el) {
            const rect = el.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // Fixed offset from top of viewport (120px accounts for navbar)
            // Avoids centering issue where project #1 was pushed above the archive section
            const targetY = scrollTop + rect.top - 120;
            window.scrollTo(0, Math.max(0, targetY));
        }

        // Restart Lenis on next frame
        requestAnimationFrame(() => lenis.start());
    }, [lenis]);

    // Reset pagination only when filters actually change (not on mount)
    const prevFilters = useRef({ searchQuery, filter, selectedCategory });
    useEffect(() => {
        const prev = prevFilters.current;
        prevFilters.current = { searchQuery, filter, selectedCategory };

        if (prev.searchQuery !== searchQuery || prev.filter !== filter || prev.selectedCategory !== selectedCategory) {
            setVisibleCount(10);
        }
    }, [searchQuery, filter, selectedCategory]);

    const filters: { key: FilterType; label: string }[] = [{ key: 'all', label: t('filters.all') }, { key: 'ongoing', label: t('filters.ongoing') }, { key: 'completed', label: t('filters.completed') }];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden" style={{ position: 'relative' }}>

            {/* Project Stats - Impressive Metrics */}
            <ProjectStats isLowPowerMode={isLowPowerMode} />

            <div id="project-archive" className="container-creative relative z-10 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8">

                {/* Layout View Switcher Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
                            <span>Project Showcase</span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                {filteredProjects.length} Projects
                            </span>
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            Switch between Grid view or List view
                        </p>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all",
                                viewMode === 'grid' 
                                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/20" 
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            <span>Grid View</span>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all",
                                viewMode === 'list' 
                                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/20" 
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <List className="w-4 h-4" />
                            <span>List View</span>
                        </button>
                    </div>
                </div>

                {/* Projects Content View Modes */}
                <div className="space-y-0 mb-8 sm:mb-10 md:mb-12">
                    {viewMode === 'list' ? (
                        <div className="border-t border-white/5">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.slice(0, visibleCount).map((project, index) => (
                                    <ProjectListItem
                                        key={project.id}
                                        project={project}
                                        onClick={() => setSelectedProjectModal(project)}
                                        index={index}
                                        isLowPowerMode={isLowPowerMode}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-12 sm:gap-16">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.slice(0, visibleCount).map((project, index) => (
                                    <FeaturedCard
                                        key={project.id}
                                        project={project}
                                        onClick={() => setSelectedProjectModal(project)}
                                        index={index}
                                        isLowPowerMode={isLowPowerMode}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* View All Button for Grid/List */}
                {
                    filteredProjects.length > 10 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-center mt-12 sm:mt-16 pb-12"
                        >
                            <button
                                onClick={() => setVisibleCount(visibleCount < filteredProjects.length ? filteredProjects.length : 10)}
                                className="group relative px-8 py-3 rounded-full bg-zinc-900 border border-white/10 text-white font-semibold hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {visibleCount < filteredProjects.length ? 'View All Projects' : 'View Less'}
                                    <ArrowRight className={cn("w-4 h-4 transition-transform", visibleCount >= filteredProjects.length && "rotate-180")} />
                                </span>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                            </button>
                        </motion.div>
                    )
                }

                {
                    filteredProjects.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                            <Layers className="w-16 h-16 mx-auto text-white/20 mb-4" />
                            <p className="text-lg text-white/50">No projects found</p>
                        </motion.div>
                    )
                }

            </div>

            {/* Project Details Modal */}
            <ProjectUniverseModal
                project={selectedProjectModal}
                isOpen={!!selectedProjectModal}
                onClose={() => setSelectedProjectModal(null)}
            />

        </div>
    );
}

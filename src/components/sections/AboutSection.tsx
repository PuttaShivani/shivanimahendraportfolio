"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { WarpBackground } from "@/components/ui/warp-background";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import InfiniteMenu from "@/components/InfiniteMenu";
import { portfolioData } from "@/data/portfolio";
import { BeamDivider } from "@/components/ui/BeamDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { MessageSquare, ArrowRight, ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCountUp } from "@/hooks/useCountUp";
import { SocialCorner } from "@/components/layout/SocialCorner";
import { cn } from "@/lib/utils";

import Testimonial1 from "@/components/ui/testimonial-1";
import { IdentitySequence } from "./IdentitySequence";
import ExperienceCarousel from "@/components/ui/ExperienceCarousel";
import { CertificateShowcase } from "@/components/ui/certificate-marquee";

const SkillsHomeSection = dynamic(() => import("@/components/sections/SkillsHomeSection"), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

const ProjectsPage = dynamic(() => import("@/app/projects/page"), {
    ssr: false,
    loading: () => <div className="h-[800px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

const CertificateHeroScroll = dynamic(() => import("@/components/sections/CertificateHeroScroll"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5" />
});

const formatExperiencePeriod = (startDate: string, endDate?: string, isOngoing?: boolean) => {
    const format = (date: string) => new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(date));
    return `${format(startDate)} - ${isOngoing ? 'Present' : endDate ? format(endDate) : 'Present'}`;
};

const showcaseImages = ['/beyond_finance_logo.png', '/commerce_trust_logo.png', '/wipro_logo.png'];

const showcaseMembers = portfolioData.experiences.map((exp, index) => ({
    id: exp.id,
    name: exp.company,
    role: exp.position,
    description: exp.description,
    period: formatExperiencePeriod(exp.startDate, exp.endDate, exp.isOngoing),
    points: exp.responsibilities,
    image: showcaseImages[index % showcaseImages.length],
    social: exp.externalLink ? { website: exp.externalLink } : undefined
}));

const GALLERY_IMAGES = [
    "/gallery/Foto Utama.jpeg",
    "/gallery/academicaffairsdivision1.jpg",
    "/gallery/computernetworkpracticumassistant2.jpg",
    "/gallery/dataentryassistant1.jpg",
    "/gallery/delegateaiesecfutureleaders20241.jpg",
    "/gallery/environmentalhygieneteam1.jpg",
    "/gallery/environmentalhygieneteam2.jpg",
    "/gallery/logisticsoperatorcampusexpo20242.jpg",
    "/gallery/researchassistant1.jpg",
    "/gallery/researchassistant2.jpg"
];

const AboutLeadInImageStack = () => {
    const [randomData, setRandomData] = useState<{ src: string, rotate: number, x: number, y: number }[]>([]);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;
        const shuffled = [...GALLERY_IMAGES].sort(() => 0.5 - Math.random()).slice(0, 2);
        const data = shuffled.map((src, i) => {
            const offsetMultiplier = i === 0 ? -1 : 1;
            return {
                src,
                rotate: Math.round(offsetMultiplier * 15 + (Math.random() * 8 - 4)),
                x: Math.round(offsetMultiplier * 25 + (Math.random() * 10 - 5)),
                y: Math.round(Math.random() * 10 - 5),
            };
        });
        setRandomData(data);
    }, [mounted]);

    if (!mounted || randomData.length === 0) return null;

    return (
        <div className="relative flex items-center justify-center w-56 h-32 md:w-72 md:h-44 mb-8 lg:mb-10 overflow-visible">
            {randomData.map((item, i) => (
                <div
                    key={item.src}
                    className="absolute w-24 h-28 md:w-32 md:h-40 rounded-xl overflow-hidden border-[4px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] bg-white"
                    style={{
                        zIndex: i === 1 ? 20 : 10,
                        transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rotate}deg)`,
                    }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={item.src}
                            alt="Gallery Piece"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100px, 120px"
                            priority={i === 1}
                        />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Utility: Slide Reveal (Smooth & Cinematic) ---
const SlideReveal = ({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
            scale: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }}
    >
        {children}
    </motion.div>
);

// --- Component 1: Editorial Lead-in ---
const AboutLeadIn = () => {
    const t = useTranslations('about');

    return (
        <div className="w-full max-w-[1650px] mx-auto px-6 py-6 flex justify-center items-center">
            {/* The Reference Card Container (Gambar 1 Style with Dark/Light Support) */}
            <div className="relative w-full bg-white dark:bg-black border border-teal-400/20 dark:border-teal-400/40 p-6 md:p-12 lg:p-16 overflow-hidden group shadow-xl dark:shadow-2xl transition-colors duration-500">

                {/* 1. Grid Background Overlay (Dynamic Colors) */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_#00000008_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none transition-opacity" />

                {/* 2. Red Corner Tabs */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-teal-400 -translate-x-1 translate-y-[-50%] z-10" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-teal-400 translate-x-1 translate-y-[-50%] z-10" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-teal-400 -translate-x-1 translate-y-[50%] z-10" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-teal-400 translate-x-1 translate-y-[50%] z-10" />

                {/* 3. Content Layer */}
                <div className="relative z-10">
                    <div className="grid grid-cols-1 gap-8 lg:gap-12 items-stretch">

                        {/* Tagline + text content */}
                        <div className="flex flex-col justify-between gap-8">
                            {/* Top Tagline */}
                            <div className="flex justify-between items-center relative">
                                <span className="text-teal-400 dark:text-teal-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] select-none">I BELIEVE</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-zinc-400 dark:text-zinc-600 text-[9px] font-mono tracking-widest uppercase hidden md:block select-none">{t('leadIn.role')}</span>
                                </div>
                            </div>

                            {/* Detail Grid */}
                            <div className="flex flex-col gap-8 border-t border-zinc-100 dark:border-zinc-900 pt-8 flex-1 justify-between">
                                {/* Thesis narrative */}
                                <p
                                    className="text-base md:text-lg lg:text-xl font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed tracking-tight"
                                    dangerouslySetInnerHTML={{ __html: t.raw('leadIn.thesis') }}
                                />

                                {/* Scope & Integration columns */}
                                <div className="flex flex-col sm:flex-row gap-8 text-[13px]">
                                    <div className="flex-1 space-y-3">
                                        <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">Scope &amp; Platform</span>
                                        <p className="text-zinc-500 leading-relaxed">
                                            {t('leadIn.scope')}
                                        </p>
                                        <p className="text-teal-400/80 dark:text-teal-300/70 font-medium italic">
                                            {t('leadIn.bridging')}
                                        </p>
                                    </div>
                                    <div className="flex-1 space-y-3 flex flex-col">
                                        <span className="text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-widest block border-b border-zinc-100 dark:border-zinc-900 pb-3">Integration</span>
                                        <p className="text-zinc-500 leading-relaxed">
                                            {t('leadIn.integration')}
                                        </p>
                                        <div className="mt-6 md:mt-auto pt-4">
                                            <span className="text-3xl lg:text-4xl font-signature text-zinc-900 dark:text-white/90">{t('leadIn.signature')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Tech Stack Logos (from portfolio.ts project data) ---
const TECH_LOGOS = [
    { name: "Python", slug: "python" },
    { name: "TensorFlow", slug: "tensorflow" },
    { name: "PyTorch", slug: "pytorch" },
    { name: "LangChain", slug: "langchain" },
    { name: "Hugging Face", slug: "huggingface" },
    { name: "Docker", slug: "docker" },
    { name: "MLflow", slug: "mlflow" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "AWS", slug: "amazonaws" },
    { name: "Azure", slug: "azure" },
    { name: "Kubernetes", slug: "kubernetes" },
    { name: "Spark", slug: "apachespark" },
    { name: "Kafka", slug: "apachekafka" },
    { name: "FAISS", slug: "meta" },
    { name: "Flask", slug: "flask" },
];

// --- Component 2: Core Engineering Panel ---
// --- Component 1: Core Engineering Panel (Stats) ---
const CoreEngineeringPanel = ({ scrollYProgress }: { scrollYProgress: any }) => {
    // Panel 1 exits between 0.45 and 0.65
    const opacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.45, 0.6], [1, 0.9]);
    const blur = useTransform(scrollYProgress, [0.45, 0.6], [0, 10]);

    return (
        <div className="w-screen h-full flex items-center justify-center bg-background transition-colors duration-500 overflow-hidden">
            <motion.div
                style={{
                    opacity,
                    scale,
                    filter: `blur(${blur}px)`,
                    willChange: "transform, opacity, filter",
                }}
                className="w-full h-full flex items-center justify-center"
            >
                <Testimonial1 />
            </motion.div>
        </div>
    );
};

// EmergingResearchPanel removed as per user request


// --- Component 3: Profile Intersection ---
// Optimized ProfilePanel (Restored to Original Design with Cinematic Transitions)
// ProfilePanel removed and replaced by IdentitySequence component


// --- Unified Typography-Focused Card for Bitwise Symmetry ---
const ClosingCard = ({ title, subtitle, desc, index, direction }: { title: string, subtitle: string, desc: string, index: number, direction: 'left' | 'right' }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative h-[50vh] flex flex-col justify-center ${direction === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
    >
        <div className={`flex flex-col gap-6 relative z-10 w-full px-4 ${direction === 'right' ? 'items-end' : 'items-start'}`}>
            {/* Minimalist Index & Role Indicator */}
            <div className={`flex items-center gap-6 w-full ${direction === 'left' ? 'flex-row-reverse' : ''}`}>
                <span className="text-xl md:text-2xl font-serif-elegant italic text-muted-foreground/30 group-hover:text-primary transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-px bg-foreground/10 flex-1 group-hover:bg-primary/30 transition-colors duration-500" />
                <span className="text-[11px] md:text-[13px] font-mono uppercase tracking-[0.3em] text-primary/80 font-semibold group-hover:tracking-[0.4em] transition-all duration-700">
                    {subtitle}
                </span>
            </div>

            {/* Title with subtle hover shift */}
            <h4 className={`text-4xl md:text-5xl lg:text-[64px] font-black text-foreground tracking-tighter leading-[1.1] transition-all duration-500 ${direction === 'right' ? 'group-hover:pr-4 origin-right' : 'group-hover:pl-4 origin-left'}`}>
                {title}
            </h4>

            {/* Description fading in slightly on hover */}
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-muted-foreground/60 leading-relaxed max-w-[85%] font-medium mt-4 group-hover:text-foreground/90 transition-colors duration-500 line-clamp-3">
                {desc}
            </p>
        </div>
    </motion.div>
);

const ViewMoreCard = ({ href, title }: { href: string, title: string }) => {
    const t = useTranslations('about');
    return (
        <Link href={href} className="group block h-[50vh] flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative flex flex-col items-center justify-center gap-10"
            >
                {/* Minimalist circular arrow */}
                <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-700 ease-out">
                    <ArrowRight className="w-10 h-10 text-primary group-hover:text-primary-foreground group-hover:translate-x-2 transition-all duration-500" />
                </div>

                <div className="text-center space-y-4">
                    <p className="text-[12px] md:text-[14px] font-mono uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors">{t('closing.discoverMore')}</p>
                    <h4 className="text-4xl lg:text-5xl font-black text-foreground/80 group-hover:text-foreground transition-all">{title}</h4>
                </div>
            </motion.div>
        </Link>
    );
};

const GhostedHeader = ({ label, part1, part2, direction = "left" }: { label: string, part1: string, part2: string, direction?: "left" | "right" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`space-y-3 mb-16 h-32 flex flex-col justify-end ${direction === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
    >
        <div className={`flex items-center gap-4 ${direction === 'right' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-px bg-primary/50" />
            <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] text-primary/80 font-bold">
                {label}
            </span>
        </div>
        <h3 className={`text-4xl md:text-5xl lg:text-5xl xl:text-[54px] font-black uppercase tracking-tighter leading-none flex items-center gap-x-3 gap-y-1 ${direction === 'right' ? 'flex-row-reverse flex-wrap-reverse justify-start' : 'flex-wrap'}`}>
            <span className="text-foreground drop-shadow-sm">{part1}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground/20 to-transparent dark:from-white/20 dark:to-transparent">{part2}</span>
        </h3>
    </motion.div>
);







const ScrollHijackSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });
    const [isComp2Visible, setIsComp2Visible] = React.useState(false);
    const [showBorder, setShowBorder] = React.useState(true);

    // Hooks moved to top level to avoid React Hook Rules violations
    const borderOpacity = useTransform(smoothProgress, [0.1, 0.15], [1, 0]);
    const xShift = useTransform(smoothProgress, [0, 0.1, 0.4, 1], ["0vw", "0vw", "-100vw", "-100vw"]);

    useMotionValueEvent(smoothProgress, "change", (v: any) => {
        // Hard toggle for the decorative border to ensure it's GONE
        if (v >= 0.20 && showBorder) setShowBorder(false);
        if (v < 0.15 && !showBorder) setShowBorder(true);

        // Trigger precisely as the second panel begins to enter the viewport
        if (v >= 0.30 && !isComp2Visible) setIsComp2Visible(true);
        if (v < 0.25 && isComp2Visible) setIsComp2Visible(false);
    });

    const { scrollYProgress: exitProgressRaw } = useScroll({
        target: sectionRef,
        offset: ["end end", "end start"]
    });

    // Apply a spring physics wrapper to make the scale/fade exit incredibly buttery smooth
    const exitProgress = useSpring(exitProgressRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });



    const exitScale = useTransform(exitProgress, [0, 1], [1, 0.85]);
    const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0]); // Changed to 1 to ensure full fade out
    const exitBorderRadius = useTransform(exitProgress, [0, 1], ["0px", "40px"]);

    return (
        <div ref={sectionRef} className="relative h-[600vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
                <motion.div
                    style={{ scale: exitScale, opacity: exitOpacity, borderRadius: exitBorderRadius }}
                    className="w-full h-full relative origin-center"
                >
                    {/* Decorative curved edges with hard unmount for guaranteed removal */}
                    <AnimatePresence>
                        {showBorder && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                style={{
                                    opacity: borderOpacity,
                                    maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
                                }}
                                className="absolute top-0 left-0 right-0 h-48 border-t-2 border-x-2 border-neutral-200 dark:border-zinc-800 rounded-t-[50px] md:rounded-t-[80px] pointer-events-none z-[100]"
                            />
                        )}
                    </AnimatePresence>
                    <motion.div
                        className="flex h-full"
                        style={{
                            width: "200vw",
                            x: xShift
                        }}
                    >
                        <div className="h-full w-screen flex-shrink-0">
                            <CoreEngineeringPanel scrollYProgress={smoothProgress} />
                        </div>
                        <div className="h-full w-screen flex-shrink-0">
                            <IdentitySequence isVisible={isComp2Visible} scrollYProgress={smoothProgress} />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

const EducationSection = () => {
    const t = useTranslations('about.education');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center max-w-[1700px] px-4 md:px-6 mt-32 md:mt-48"
        >
            <div className="mb-12 md:mb-16 text-center space-y-4">
                <h3 className="text-foreground text-3xl md:text-5xl font-black tracking-tighter">
                    {t('title')}
                </h3>
                <p className="text-muted-foreground text-[10px] md:text-xs font-mono uppercase tracking-[0.4em]">
                    {t('subtitle')}
                </p>
            </div>

            <div className="flex flex-col gap-8 w-full items-center">
                {portfolioData.education.map((edu) => (
                    /* Premium Lab Card for Education */
                    <div key={edu.id} className="relative w-full max-w-4xl bg-white dark:bg-black border border-teal-400/20 dark:border-teal-400/40 p-8 md:p-12 overflow-hidden group shadow-xl dark:shadow-2xl transition-colors duration-500">
                        {/* 1. Grid Background Overlay */}
                        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_#00000008_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none transition-opacity" />

                        {/* 2. Red Corner Tabs */}
                        <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-teal-400 -translate-x-1 translate-y-[-50%] z-10" />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-teal-400 translate-x-1 translate-y-[-50%] z-10" />
                        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-teal-400 -translate-x-1 translate-y-[50%] z-10" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-teal-400 translate-x-1 translate-y-[50%] z-10" />

                        {/* Content */}
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                            {/* Left Column: Degree & University Details */}
                            <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                                <div>
                                    <span className="text-teal-400 dark:text-teal-300 text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">
                                        {edu.institution}
                                    </span>
                                    <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                                        {edu.degree} in {edu.major}
                                    </h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                                        {edu.startDate ? `${new Date(edu.startDate).getFullYear()} - ${edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}` : ''}
                                    </p>
                                </div>

                                {/* {edu.gpa && (
                                    <div>
                                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-lg">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#D1FF4D] animate-pulse" />
                                            <span className="text-sm font-mono font-bold text-zinc-800 dark:text-zinc-200">
                                                GPA: {edu.gpa}
                                            </span>
                                        </div>
                                    </div>
                                )} */}
                            </div>

                            {/* Right Column: Highlights & Research Details */}
                            <div className="md:col-span-7 flex flex-col justify-between space-y-6 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-900 pt-6 md:pt-0 md:pl-8">
                                <div>
                                    <span className="text-zinc-400 dark:text-zinc-600 text-[10px] font-mono tracking-widest uppercase block mb-4">
                                        {t('highlights')}
                                    </span>

                                    <ul className="space-y-4">
                                        {(edu.activities ?? []).map((activity: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                                                <span>{activity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {edu.achievements && edu.achievements.length > 0 && (
                                    <div className="border-t border-zinc-100 dark:border-zinc-900 pt-6">
                                        <ul className="space-y-2">
                                            {edu.achievements.map((achievement: string, idx: number) => (
                                                <li key={idx} className="text-sm italic text-zinc-500 dark:text-zinc-400">
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // REALIGNED TIMING: Parent is ~900vh long. The first 100vh delay = ~11% (0.11) of total scroll.
    const scale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0.03, 0.12], [1, 0]);
    const yLeadIn = useTransform(scrollYProgress, [0, 0.12], [0, -80]);

    const leadInTriggerRef = useRef(null);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative bg-background text-foreground dark:bg-black dark:text-white transition-colors duration-500"
        >
            {/* 1. STICKY PLANE - Lead-in */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center z-10">
                <motion.div
                    style={{ scale, opacity, y: yLeadIn }}
                    className="relative px-4 md:px-6 w-full max-w-[1700px] mx-auto pointer-events-none"
                    ref={leadInTriggerRef}
                >
                    <div className="pointer-events-auto">
                        <AboutLeadIn />
                    </div>
                </motion.div>
            </div>

            {/* 2. OVERLAY LAYER - Hijack Zone & Footer */}
            <div className="relative pointer-events-none mt-[20vh] md:mt-[20vh]">
                {/* Content wrapper with background - rounded corners removed to allow animated border to control the shape */}
                <div className="bg-background dark:bg-black transition-colors duration-500 pointer-events-auto relative">

                    <ScrollHijackSection />
                    <div className="flex flex-col items-center w-full bg-background relative z-20 pt-32 pb-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full flex flex-col items-center max-w-[1700px] px-4 md:px-6"
                        >
                            <div className="mb-6 md:mb-10 text-center space-y-4">
                                <h3 className="text-foreground text-3xl md:text-5xl font-black tracking-tighter">
                                    Experience
                                </h3>
                                <p className="text-muted-foreground text-[10px] md:text-xs font-mono uppercase tracking-[0.4em]">
                                    Professional Background
                                </p>
                            </div>
                            <div className="w-full">
                                <ExperienceCarousel members={showcaseMembers} />
                            </div>
                        </motion.div>

                        <EducationSection />

                        {/* Skills Section */}
                        <div id="skills-section" className="w-full mt-32 md:mt-48">
                            <SkillsHomeSection />
                        </div>

                        {/* Projects Section */}
                        <div id="projects-section" className="w-full mt-32 md:mt-48">
                            <ProjectsPage />
                        </div>

                        {/* Certifications Section */}
                        <div id="certifications-section" className="w-full mt-32 md:mt-48">
                            <CertificateHeroScroll />
                        </div>

                    </div>
                </div>
            </div>
        </section >
    );
};




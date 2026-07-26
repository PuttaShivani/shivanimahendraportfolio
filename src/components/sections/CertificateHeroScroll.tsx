"use client";

import { useEffect, useRef, useCallback, type FC, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { usePerformance } from "@/hooks/usePerformance";
import { ChevronDown } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface Position {
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius: number;
    zIndex?: number;
}

interface Positions {
    initial: Record<string, Position>;
    final: Record<string, Position>;
}

interface CertificateHeroScrollProps {
    onDownloadClick?: () => void;
    isLowPowerMode?: boolean;
}

const getCertDescription = (id: string): string => {
    switch (id) {
        case 'cert-1':
            return 'Professional certification covering data modeling, DAX measures, Power Query, drill-through reporting, and Power BI dashboard development.';
        case 'cert-2':
            return 'Comprehensive Google certification covering data cleaning, analysis, SQL, R/Python, data visualization, and data storytelling for decision-making.';
        case 'cert-3':
            return 'Advanced SQL certification covering complex joins, subqueries, common table expressions (CTEs), window functions, and query optimization.';
        case 'cert-4':
            return 'IBM certification covering Python programming, Pandas, NumPy, data structures, and automated data processing.';
        case 'cert-5':
            return 'Cognitive Class AI certification covering exploratory data analysis, data wrangling, model development, and statistical analysis with Python.';
        case 'cert-6':
            return 'Professional certification focusing on Matplotlib, Seaborn, Folium, and data storytelling techniques to present visual insights effectively.';
        default:
            return 'Verification of technical competency in Data Analytics, Business Intelligence, and visualization.';
    }
};

const getCertSkills = (id: string): string[] => {
    switch (id) {
        case 'cert-1':
            return ['Power BI', 'DAX', 'Power Query', 'Data Modeling'];
        case 'cert-2':
            return ['Data Analysis', 'SQL', 'Data Cleaning', 'Visualization'];
        case 'cert-3':
            return ['Advanced SQL', 'CTEs', 'Window Functions', 'Query Optimization'];
        case 'cert-4':
            return ['Python', 'Pandas', 'NumPy', 'Data Processing'];
        case 'cert-5':
            return ['EDA', 'Data Wrangling', 'SciPy', 'Statistical Analysis'];
        case 'cert-6':
            return ['Data Visualization', 'Matplotlib', 'Seaborn', 'Data Storytelling'];
        default:
            return ['Data Analytics', 'Business Intelligence', 'SQL'];
    }
};

const CertificateHeroScroll: FC<CertificateHeroScrollProps> = ({ onDownloadClick, isLowPowerMode: isLowPowerModeProp }) => {
    const spacerRef = useRef<HTMLDivElement>(null);
    const fixedContainerRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { isLowPowerMode: performanceLowPower } = usePerformance();
    const isLowPowerMode = isLowPowerModeProp ?? performanceLowPower;

    const certificates = useMemo(() => {
        return portfolioData.achievements.filter(ach => ach.category === 'certification').slice(0, 6);
    }, []);

    const getPositions = useCallback((): Positions => {
        const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
        const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
        const isCurrentlyMobile = vw < 768;

        const desktopInitial: Record<string, Position> = {
            cert1: { top: vh * 0.15, left: vw * 0.05, width: vw * 0.22, height: vh * 0.22, borderRadius: 12, zIndex: 1 },
            cert2: { top: vh * 0.12, left: vw * 0.38, width: vw * 0.2, height: vh * 0.2, borderRadius: 12, zIndex: 1 },
            cert3: { top: vh * 0.18, left: vw * 0.72, width: vw * 0.22, height: vh * 0.22, borderRadius: 12, zIndex: 1 },
            cert4: { top: vh * 0.70, left: vw * 0.08, width: vw * 0.2, height: vh * 0.25, borderRadius: 12, zIndex: 1 },
            cert5: { top: vh * 0.75, left: vw * 0.42, width: vw * 0.2, height: vh * 0.18, borderRadius: 12, zIndex: 1 },
            cert6: { top: vh * 0.65, left: vw * 0.75, width: vw * 0.18, height: vh * 0.25, borderRadius: 12, zIndex: 1 },
        };

        const mGap = 10;
        const mGridW = vw * 0.9;
        const mColW = (mGridW - mGap) / 2;
        const fixedHeight = 170;

        const mobileInitial: Record<string, Position> = {
            cert1: { top: vh * 0.15, left: vw * 0.05, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert2: { top: vh * 0.12, left: vw * 0.52, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert3: { top: vh * 0.35, left: vw * 0.08, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert4: { top: vh * 0.60, left: vw * 0.10, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert5: { top: vh * 0.65, left: vw * 0.55, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
            cert6: { top: vh * 0.40, left: vw * 0.50, width: mColW, height: fixedHeight, borderRadius: 8, zIndex: 1 },
        };

        const initial = isCurrentlyMobile ? mobileInitial : desktopInitial;

        const gridW = Math.min(vw * 0.85, 1400);
        const gridH = vh * 0.7;
        const startX = (vw - gridW) / 2;
        const startY = (vh - gridH) / 2 + (vh * 0.05);
        const gap = 16;
        const col1W = (gridW - 2 * gap) * 0.4;
        const col2W = (gridW - 2 * gap) * 0.3;
        const col3W = (gridW - 2 * gap) * 0.3;

        const desktopFinal: Record<string, Position> = {
            cert1: { top: startY, left: startX, width: col1W, height: (gridH - gap) * 0.55, borderRadius: 8, zIndex: 10 },
            cert2: { top: startY + (gridH - gap) * 0.55 + gap, left: startX, width: col1W, height: (gridH - gap) * 0.45, borderRadius: 8, zIndex: 10 },
            cert3: { top: startY, left: startX + col1W + gap, width: col2W, height: (gridH - gap) * 0.4, borderRadius: 8, zIndex: 10 },
            cert4: { top: startY + (gridH - gap) * 0.4 + gap, left: startX + col1W + gap, width: col2W, height: (gridH - gap) * 0.6, borderRadius: 8, zIndex: 10 },
            cert5: { top: startY, left: startX + col1W + col2W + 2 * gap, width: col3W, height: (gridH - gap) * 0.65, borderRadius: 8, zIndex: 10 },
            cert6: { top: startY + (gridH - gap) * 0.65 + gap, left: startX + col1W + col2W + 2 * gap, width: col3W, height: (gridH - gap) * 0.35, borderRadius: 8, zIndex: 10 },
        };

        const mStartX = (vw - mGridW) / 2;
        const mStartY = vh * 0.2;

        const mobileFinal: Record<string, Position> = {
            cert1: { top: mStartY, left: mStartX, width: mColW, height: 170, borderRadius: 8, zIndex: 10 },
            cert2: { top: mStartY, left: mStartX + mColW + mGap, width: mColW, height: 170, borderRadius: 8, zIndex: 10 },
            cert3: { top: mStartY + 180, left: mStartX, width: mColW, height: 170, borderRadius: 8, zIndex: 10 },
            cert4: { top: mStartY + 180, left: mStartX + mColW + mGap, width: mColW, height: 170, borderRadius: 8, zIndex: 10 },
            cert5: { top: mStartY + 360, left: mStartX, width: mColW, height: 170, borderRadius: 8, zIndex: 10 },
            cert6: { top: mStartY + 360, left: mStartX + mColW + mGap, width: mColW, height: 170, borderRadius: 8, zIndex: 10 },
        };

        const final = isCurrentlyMobile ? mobileFinal : desktopFinal;

        return { initial, final };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined" || certificates.length === 0) return;

        gsap.registerPlugin(ScrollTrigger);

        const { initial, final } = getPositions();
        const cardElements = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);

        const ctx = gsap.context(() => {
            cardElements.forEach((card, index) => {
                const pos = initial[`cert${index + 1}`];
                if (pos) {
                    gsap.set(card, {
                        top: pos.top,
                        left: pos.left,
                        width: pos.width,
                        height: pos.height,
                        borderRadius: pos.borderRadius,
                        zIndex: pos.zIndex,
                        scale: 0.8,
                        rotate: index % 2 === 0 ? -5 : 5,
                        opacity: 0,
                    });
                }
            });

            gsap.to(cardElements, {
                opacity: 0.9,
                scale: 1,
                duration: isLowPowerMode ? 0.6 : 1.2,
                stagger: isLowPowerMode ? 0.05 : 0.1,
                ease: "power2.out",
            });

            const mainTL = gsap.timeline({
                scrollTrigger: {
                    trigger: spacerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: isLowPowerMode ? 0.2 : 0.5,
                },
            });

            if (heroContentRef.current) {
                mainTL.to(heroContentRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.2 }, 0);
            }

            cardElements.forEach((card, index) => {
                const finalPos = final[`cert${index + 1}`];
                const initialPos = initial[`cert${index + 1}`];

                if (finalPos && initialPos) {
                    mainTL.fromTo(
                        card,
                        {
                            top: initialPos.top,
                            left: initialPos.left,
                            width: initialPos.width,
                            height: initialPos.height,
                            borderRadius: initialPos.borderRadius,
                            rotate: index % 2 === 0 ? -5 : 5,
                            opacity: 0.9,
                            scale: 1,
                            zIndex: initialPos.zIndex,
                        },
                        {
                            top: finalPos.top,
                            left: finalPos.left,
                            width: finalPos.width,
                            height: finalPos.height,
                            borderRadius: finalPos.borderRadius,
                            opacity: 1,
                            rotate: 0,
                            scale: 1,
                            zIndex: finalPos.zIndex,
                            duration: 1,
                            ease: "power2.inOut",
                            immediateRender: false
                        },
                        0
                    );
                }
            });

            mainTL.to({}, { duration: 1.0 });

        }, spacerRef);

        ScrollTrigger.create({
            trigger: spacerRef.current,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => gsap.to(fixedContainerRef.current, { autoAlpha: 1, duration: 0.5 }),
            onLeave: () => gsap.to(fixedContainerRef.current, { autoAlpha: 0, duration: 0.5 }),
            onEnterBack: () => gsap.to(fixedContainerRef.current, { autoAlpha: 1, duration: 0.5 }),
            onLeaveBack: () => gsap.to(fixedContainerRef.current, { autoAlpha: 0, duration: 0.5 }),
        });

        return () => ctx.revert();
    }, [getPositions, certificates, isLowPowerMode]);

    return (
        <>
            <div ref={spacerRef} className="relative h-[350vh] w-full z-10 pointer-events-none">
                <div ref={fixedContainerRef} style={{ opacity: 0, visibility: 'hidden' }} className="sticky top-0 z-10 h-screen w-full overflow-hidden bg-transparent pointer-events-none">
                    {/* Background Effects */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-primary/10 blur-[80px] rounded-full" />
                        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-secondary/10 blur-[80px] rounded-full" />
                    </div>

                    {/* Content */}
                    <div
                        ref={heroContentRef}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-50 pt-10 pb-32"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 backdrop-blur-md border border-border/50 text-xs font-medium mb-6 animate-fade-in-up">
                            Professional Milestones
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 animate-fade-in-up delay-100">
                            Certificates<br />&amp; Credentials
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-200">
                            A dynamic verification of core capabilities and AI/ML engineering credentials.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: window.scrollY + window.innerHeight * 1.2, behavior: 'smooth' })}
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all group animate-fade-in-up delay-300 pointer-events-auto"
                        >
                            <span>Scroll to Explore</span>
                            <ChevronDown className="w-4 h-4 animate-bounce" />
                        </button>
                    </div>

                    {/* Text Cards */}
                    {certificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            className="absolute overflow-hidden shadow-xl border border-teal-400/10 dark:border-teal-400/20 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-between group pointer-events-auto hover:border-teal-400/50 dark:hover:border-teal-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-400/5"
                        >
                            {/* Corner red accent indicator */}
                            <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-teal-400 rounded-br-md" />

                            {/* Card Grid Pattern */}
                            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_#00000003_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#ffffff02_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full justify-between space-y-3 sm:space-y-4">
                                {/* Card Header: Issuer & Platform */}
                                <div className="flex justify-between items-start">
                                    <span className="text-teal-400 dark:text-teal-300 text-[10px] font-bold uppercase tracking-[0.2em] font-mono leading-none">
                                        {cert.issuer}
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] text-muted-foreground font-mono leading-none">
                                        {cert.date}
                                    </span>
                                </div>

                                {/* Card Body: Title & Custom Description */}
                                <div className="flex-grow flex flex-col justify-center">
                                    <h4 className="text-[13px] sm:text-[15px] md:text-[17px] lg:text-lg xl:text-xl font-bold text-zinc-900 dark:text-white leading-snug tracking-tight group-hover:text-teal-400 dark:group-hover:text-teal-300 transition-colors duration-300 line-clamp-3">
                                        {cert.title}
                                    </h4>
                                </div>

                                {/* Card Footer: Description Paragraph & Skills badges */}
                                <div className="border-t border-zinc-100 dark:border-zinc-900/50 pt-2 sm:pt-3">
                                    <p className="text-[10px] sm:text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-3 line-clamp-3 md:line-clamp-none">
                                        {getCertDescription(cert.id)}
                                    </p>
                                    <div className="flex flex-wrap gap-1 md:gap-1.5">
                                        {getCertSkills(cert.id).map((skill) => (
                                            <span key={skill} className="px-1.5 py-0.5 rounded bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 text-[8px] sm:text-[9px] font-mono text-zinc-500 dark:text-zinc-400 font-bold uppercase">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CertificateHeroScroll;

"use client";

import { useEffect, useRef, useCallback, type FC, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
            return 'Professional certification covering Power BI, DAX measures, Power Query, data modeling, and executive dashboards.';
        case 'cert-2':
            return 'Google professional certification covering data cleaning, SQL analytics, Python, data visualization, and storytelling.';
        case 'cert-3':
            return 'HackerRank Advanced SQL certification covering complex joins, subqueries, CTEs, window functions, and optimization.';
        case 'cert-4':
            return 'IBM certification covering Python programming, Pandas, NumPy, data structures, and automated processing.';
        case 'cert-5':
            return 'Cognitive Class AI certification covering exploratory data analysis, data wrangling, and statistical modeling with Python.';
        case 'cert-6':
            return 'Coursera certification focusing on data visualization, Matplotlib, Seaborn, and visual data storytelling.';
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
            return ['Advanced SQL', 'CTEs', 'Window Functions', 'Optimization'];
        case 'cert-4':
            return ['Python', 'Pandas', 'NumPy', 'Processing'];
        case 'cert-5':
            return ['EDA', 'Data Wrangling', 'SciPy', 'Statistics'];
        case 'cert-6':
            return ['Visualization', 'Matplotlib', 'Seaborn', 'Storytelling'];
        default:
            return ['Data Analytics', 'Business Intelligence', 'SQL'];
    }
};

const CertificateHeroScroll: FC<CertificateHeroScrollProps> = ({ isLowPowerMode: isLowPowerModeProp }) => {
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
        const isMobile = vw < 768;
        const isTablet = vw >= 768 && vw < 1200;

        // Desktop & Tablet Initial Positions (Side framing)
        const cardW = isTablet ? Math.min(vw * 0.22, 250) : Math.min(vw * 0.24, 330);
        const cardH = isTablet ? 200 : 220;

        const leftX = isTablet ? vw * 0.02 : vw * 0.03;
        const rightX = isTablet ? vw * 0.76 : vw * 0.74;

        const desktopInitial: Record<string, Position> = {
            cert1: { top: vh * 0.10, left: leftX, width: cardW, height: cardH, borderRadius: 12, zIndex: 1 },
            cert2: { top: vh * 0.10, left: rightX, width: cardW, height: cardH, borderRadius: 12, zIndex: 1 },
            cert3: { top: vh * 0.40, left: leftX, width: cardW, height: cardH, borderRadius: 12, zIndex: 2 },
            cert4: { top: vh * 0.40, left: rightX, width: cardW, height: cardH, borderRadius: 12, zIndex: 2 },
            cert5: { top: vh * 0.70, left: leftX, width: cardW, height: cardH, borderRadius: 12, zIndex: 3 },
            cert6: { top: vh * 0.70, left: rightX, width: cardW, height: cardH, borderRadius: 12, zIndex: 3 },
        };

        // Mobile Initial Positions
        const mCardW = Math.min(vw * 0.44, 175);
        const mCardH = 160;
        const mLeft1 = vw * 0.03;
        const mLeft2 = vw * 0.53;

        const mobileInitial: Record<string, Position> = {
            cert1: { top: vh * 0.08, left: mLeft1, width: mCardW, height: mCardH, borderRadius: 8, zIndex: 1 },
            cert2: { top: vh * 0.08, left: mLeft2, width: mCardW, height: mCardH, borderRadius: 8, zIndex: 1 },
            cert3: { top: vh * 0.40, left: mLeft1, width: mCardW, height: mCardH, borderRadius: 8, zIndex: 1 },
            cert4: { top: vh * 0.40, left: mLeft2, width: mCardW, height: mCardH, borderRadius: 8, zIndex: 1 },
            cert5: { top: vh * 0.70, left: mLeft1, width: mCardW, height: mCardH, borderRadius: 8, zIndex: 1 },
            cert6: { top: vh * 0.70, left: mLeft2, width: mCardW, height: mCardH, borderRadius: 8, zIndex: 1 },
        };

        const initial = isMobile ? mobileInitial : desktopInitial;

        // Desktop Final Grid
        const gridW = Math.min(vw * 0.88, 1400);
        const gridH = Math.max(vh * 0.75, 580);
        const startX = (vw - gridW) / 2;
        const startY = (vh - gridH) / 2 + (vh * 0.04);
        const gap = isTablet ? 12 : 16;
        const col1W = (gridW - 2 * gap) * 0.4;
        const col2W = (gridW - 2 * gap) * 0.3;
        const col3W = (gridW - 2 * gap) * 0.3;

        const desktopFinal: Record<string, Position> = {
            cert1: { top: startY, left: startX, width: col1W, height: (gridH - gap) * 0.52, borderRadius: 10, zIndex: 10 },
            cert2: { top: startY + (gridH - gap) * 0.52 + gap, left: startX, width: col1W, height: (gridH - gap) * 0.48, borderRadius: 10, zIndex: 10 },
            cert3: { top: startY, left: startX + col1W + gap, width: col2W, height: (gridH - gap) * 0.48, borderRadius: 10, zIndex: 10 },
            cert4: { top: startY + (gridH - gap) * 0.48 + gap, left: startX + col1W + gap, width: col2W, height: (gridH - gap) * 0.52, borderRadius: 10, zIndex: 10 },
            cert5: { top: startY, left: startX + col1W + col2W + 2 * gap, width: col3W, height: (gridH - gap) * 0.55, borderRadius: 10, zIndex: 10 },
            cert6: { top: startY + (gridH - gap) * 0.55 + gap, left: startX + col1W + col2W + 2 * gap, width: col3W, height: (gridH - gap) * 0.45, borderRadius: 10, zIndex: 10 },
        };

        // Mobile Final Grid: 2-column x 3-row grid fitting ALL 6 cards with generous row height & gaps
        const mGridW = vw * 0.94;
        const mStartX = (vw - mGridW) / 2;
        const mGapX = 8;
        const mColW = (mGridW - mGapX) / 2;
        const mStartY = vh * 0.08;
        const mRowH = Math.min(vh * 0.25, 175);
        const mGapY = 10;

        const mobileFinal: Record<string, Position> = {
            // Row 1
            cert1: { top: mStartY, left: mStartX, width: mColW, height: mRowH, borderRadius: 8, zIndex: 10 },
            cert2: { top: mStartY, left: mStartX + mColW + mGapX, width: mColW, height: mRowH, borderRadius: 8, zIndex: 10 },
            // Row 2
            cert3: { top: mStartY + mRowH + mGapY, left: mStartX, width: mColW, height: mRowH, borderRadius: 8, zIndex: 10 },
            cert4: { top: mStartY + mRowH + mGapY, left: mStartX + mColW + mGapX, width: mColW, height: mRowH, borderRadius: 8, zIndex: 10 },
            // Row 3
            cert5: { top: mStartY + (mRowH + mGapY) * 2, left: mStartX, width: mColW, height: mRowH, borderRadius: 8, zIndex: 10 },
            cert6: { top: mStartY + (mRowH + mGapY) * 2, left: mStartX + mColW + mGapX, width: mColW, height: mRowH, borderRadius: 8, zIndex: 10 },
        };

        const final = isMobile ? mobileFinal : desktopFinal;

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
                        scale: 0.9,
                        rotate: index % 2 === 0 ? -3 : 3,
                        opacity: 0,
                    });
                }
            });

            gsap.to(cardElements, {
                opacity: 0.95,
                scale: 1,
                duration: isLowPowerMode ? 0.6 : 1.0,
                stagger: isLowPowerMode ? 0.05 : 0.08,
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
                            rotate: index % 2 === 0 ? -3 : 3,
                            opacity: 0.95,
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

        const handleResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ctx.revert();
        };
    }, [getPositions, certificates, isLowPowerMode]);

    return (
        <>
            <div ref={spacerRef} className="relative h-[320vh] w-full z-10 pointer-events-none">
                <div ref={fixedContainerRef} style={{ opacity: 0, visibility: 'hidden' }} className="sticky top-0 z-10 h-screen w-full overflow-hidden bg-transparent pointer-events-none">
                    {/* Background Glows */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-purple-500/10 blur-[90px] rounded-full" />
                        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-teal-500/10 blur-[90px] rounded-full" />
                    </div>

                    {/* Hero Header Content */}
                    <div
                        ref={heroContentRef}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-50 pt-16 pb-24"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 backdrop-blur-md border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
                            Professional Milestones
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/40">
                            Certificates<br />&amp; Credentials
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                            A dynamic verification of core capabilities, Data Analytics, SQL, Python, and Business Intelligence credentials.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: window.scrollY + window.innerHeight * 1.2, behavior: 'smooth' })}
                            className="flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-all group pointer-events-auto"
                        >
                            <span>Scroll to Explore</span>
                            <ChevronDown className="w-4 h-4 animate-bounce text-purple-400" />
                        </button>
                    </div>

                    {/* Certificate Cards */}
                    {certificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            className="absolute overflow-hidden shadow-2xl border border-teal-400/25 dark:border-teal-400/35 bg-white dark:bg-zinc-950 backdrop-blur-xl rounded-xl p-2.5 sm:p-4 md:p-5 flex flex-col justify-between group pointer-events-auto hover:border-teal-400 dark:hover:border-teal-300 transition-all duration-300 hover:shadow-teal-500/10"
                        >
                            {/* Accent tag */}
                            <div className="absolute top-0 left-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-teal-400 rounded-br-md" />

                            <div className="relative z-10 flex flex-col h-full justify-between gap-1 overflow-hidden">
                                {/* Header: Issuer & Date */}
                                <div className="flex justify-between items-center shrink-0">
                                    <span className="text-teal-500 dark:text-teal-300 text-[9px] sm:text-xs font-bold uppercase tracking-wider font-mono">
                                        {cert.issuer}
                                    </span>
                                    <span className="text-[8px] sm:text-[10px] text-muted-foreground font-mono">
                                        {cert.date}
                                    </span>
                                </div>

                                {/* Title */}
                                <div className="shrink-0">
                                    <h4 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-zinc-900 dark:text-white leading-tight tracking-tight group-hover:text-teal-400 dark:group-hover:text-teal-300 transition-colors duration-200 line-clamp-2">
                                        {cert.title}
                                    </h4>
                                </div>

                                {/* Description & Skill Badges */}
                                <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-1 flex flex-col gap-1 shrink-0">
                                    <p className="text-[8px] sm:text-[10px] md:text-xs text-zinc-600 dark:text-zinc-400 font-normal leading-tight line-clamp-2">
                                        {getCertDescription(cert.id)}
                                    </p>
                                    <div className="flex flex-wrap gap-0.5 sm:gap-1 pt-0.5">
                                        {getCertSkills(cert.id).slice(0, 3).map((skill) => (
                                            <span key={skill} className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[7px] sm:text-[8px] md:text-[9px] font-mono text-zinc-700 dark:text-zinc-300 font-semibold uppercase">
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

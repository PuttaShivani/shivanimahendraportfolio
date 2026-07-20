'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface ExperienceItem {
    id: string;
    name: string;
    role: string;
    description?: string;
    period?: string;
    points?: string[];
    image: string;
}

interface ExperienceCarouselProps {
    members: ExperienceItem[];
}

export default function ExperienceCarousel({ members }: ExperienceCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const angle = 360 / members.length;
    // Calculate radius dynamically based on screen size, ensuring cards have enough space
    const tz = isMobile ? 250 : 400; 

    const handleNext = useCallback(() => {
        setRotation((prev) => prev - angle);
        setCurrentIndex((prev) => (prev + 1) % members.length);
    }, [angle, members.length]);

    const handlePrev = useCallback(() => {
        setRotation((prev) => prev + angle);
        setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
    }, [angle, members.length]);

    return (
        <div className="relative w-full max-w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden py-4 md:py-10 perspective-deep">
            {/* Controls */}
            <div className="absolute bottom-2 md:bottom-10 flex gap-6 z-50">
                <button
                    onClick={handlePrev}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-background/50 border border-border/60 hover:bg-primary/20 hover:border-primary/50 transition-all text-foreground backdrop-blur-md"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                    onClick={handleNext}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-background/50 border border-border/60 hover:bg-primary/20 hover:border-primary/50 transition-all text-foreground backdrop-blur-md"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>

            {/* 3D Container */}
            <motion.div
                className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[450px] h-[400px] md:h-[500px] preserve-3d cursor-grab active:cursor-grabbing"
                animate={{ rotateY: rotation }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                        handleNext();
                    } else if (swipe > swipeConfidenceThreshold) {
                        handlePrev();
                    }
                }}
            >
                {members.map((member, index) => {
                    const currentAngle = angle * index;
                    return (
                        <div
                            key={member.id}
                            className="absolute inset-0 preserve-3d"
                            style={{
                                transform: `rotateY(${currentAngle}deg) translateZ(${tz}px)`,
                            }}
                        >
                            {/* Card Content */}
                            <div
                                className={cn(
                                    "w-full h-full p-5 md:p-8 rounded-2xl md:rounded-3xl border border-border/30 bg-background/80 backdrop-blur-2xl shadow-2xl transition-all duration-500 flex flex-col gap-3 md:gap-4 overflow-hidden",
                                    currentIndex === index ? "opacity-100 ring-2 ring-primary/50 shadow-[0_0_40px_rgba(139,92,246,0.15)] scale-100" : "opacity-30 md:opacity-40 scale-90 md:scale-95 pointer-events-none"
                                )}
                            >
                                <div className="flex items-center gap-4 border-b border-border/50 pb-3 md:pb-4">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-lg md:text-2xl font-bold text-foreground truncate">{member.name}</h4>
                                        <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-primary truncate">{member.role}</p>
                                    </div>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto no-scrollbar">
                                    {member.period && (
                                        <p className="text-[10px] md:text-sm font-mono text-muted-foreground mb-2 md:mb-3">{member.period}</p>
                                    )}
                                    {member.description && (
                                        <p className="text-xs md:text-sm text-foreground/80 leading-relaxed mb-3 md:mb-4 font-medium">{member.description}</p>
                                    )}
                                    {member.points && member.points.length > 0 && (
                                        <ul className="space-y-1.5 md:space-y-2">
                                            {member.points.map((pt, idx) => (
                                                <li key={idx} className="flex gap-2 text-[11px] md:text-sm text-foreground/70 leading-relaxed">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 md:mt-1.5 shrink-0" />
                                                    <span>{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

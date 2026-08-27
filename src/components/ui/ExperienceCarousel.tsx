'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { CheckCircle2, Building2, Terminal, Move3D, Sparkles } from 'lucide-react';

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
    const member = members[0];
    const containerRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();
    
    // Interactive 3D Drag-to-Rotate State
    const [rotation, setRotation] = useState({ x: 16, y: -22 });
    const [isDragging, setIsDragging] = useState(false);
    const startPos = useRef({ x: 0, y: 0 });

    // Lock screen movement & Lenis scroll when 3D scene is being dragged
    useEffect(() => {
        if (!isDragging) return;

        lenis?.stop();
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';

        const preventScroll = (e: Event) => {
            if (e.cancelable) {
                e.preventDefault();
            }
            e.stopPropagation();
        };

        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('scroll', preventScroll, { passive: false });

        return () => {
            window.removeEventListener('touchmove', preventScroll);
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('scroll', preventScroll);
            lenis?.start();
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isDragging, lenis]);

    // Container level non-passive touchmove prevention
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const preventPageScroll = (e: TouchEvent) => {
            if (e.cancelable) {
                e.preventDefault();
            }
            e.stopPropagation();
        };

        el.addEventListener('touchmove', preventPageScroll, { passive: false });
        return () => {
            el.removeEventListener('touchmove', preventPageScroll);
        };
    }, []);

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        startPos.current = { x: e.clientX, y: e.clientY };
        if (containerRef.current) {
            containerRef.current.setPointerCapture(e.pointerId);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        e.stopPropagation();
        const deltaX = e.clientX - startPos.current.x;
        const deltaY = e.clientY - startPos.current.y;
        startPos.current = { x: e.clientX, y: e.clientY };

        setRotation((prev) => ({
            x: Math.max(-40, Math.min(50, prev.x - deltaY * 0.35)),
            y: (prev.y + deltaX * 0.4) % 360,
        }));
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        if (containerRef.current) {
            try {
                containerRef.current.releasePointerCapture(e.pointerId);
            } catch (_) {}
        }
    };

    if (!member) return null;

    const techSkills = [
        'TypeScript', 'React.js', 'Next.js', 'PostgreSQL', 
        'Supabase', 'JSONB', 'BFS Traversal', 'CRM Workflows', 'Dashboard Analytics', 'Node.js'
    ];

    return (
        <div className="w-full max-w-[1500px] mx-auto px-2 sm:px-4">
            {/* Main Bento Hero Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full rounded-3xl overflow-hidden border-0 bg-zinc-950/90 dark:bg-black/90 backdrop-blur-3xl shadow-2xl p-6 sm:p-10 md:p-14 group"
            >
                {/* Ambient Grid Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,_#14b8a615_1px,_transparent_1px)] bg-[size:28px_28px] pointer-events-none z-0" />
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-2 sm:pt-4">
                    
                    {/* Left Column: Role, Company, Period, Responsibilities & Tech Stack */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                        
                        {/* Header Badge */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                {member.period || 'March 2026 – Present'}
                            </span>
                            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                <Building2 className="w-3.5 h-3.5" />
                                {member.name}
                            </span>
                        </div>

                        {/* Position Title & Company */}
                        <div className="space-y-1.5">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
                                {member.role}
                            </h3>
                            <p className="text-base sm:text-lg font-medium text-teal-400/90 flex items-center gap-2">
                                <span>{member.name}</span>
                                <span className="text-zinc-500">•</span>
                                <span className="text-zinc-400 text-sm sm:text-base font-normal">SDE Engineering Team</span>
                            </p>
                        </div>

                        {/* Responsibilities List */}
                        {member.points && member.points.length > 0 && (
                            <div className="space-y-3 pt-2 border-t border-white/10">
                                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-3 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-teal-400" />
                                    Key Accomplishments & System Engineering
                                </h4>
                                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                                    {member.points.map((pt, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * idx }}
                                            className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed group/item hover:text-white transition-colors"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5 group-hover/item:text-cyan-300 transition-colors" />
                                            <span>{pt}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tech Stack Pills */}
                        <div className="pt-4 border-t border-white/10">
                            <div className="flex flex-wrap gap-2">
                                {techSkills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-white/5 text-teal-200 border border-teal-500/20 backdrop-blur-md"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Interactive 3D Drag-to-Rotate Workstation Scene */}
                    {/* Right Column: Interactive 3D Drag-to-Rotate Workstation Scene */}
                    <div className="lg:col-span-6 flex items-center justify-center w-full">
                        <div
                            ref={containerRef}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                            className={`relative w-full max-w-2xl rounded-3xl overflow-hidden border border-purple-500/30 bg-[#0c0614] p-1 sm:p-2 select-none touch-none shadow-[0_20px_60px_rgba(168,85,247,0.25)] cursor-${isDragging ? 'grabbing' : 'grab'}`}
                        >
                            {/* Ambient Stage Lighting */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/50 via-[#0c0614] to-[#07030c] pointer-events-none" />

                            {/* 3D Scene Viewport Wrapper */}
                            <div className="relative w-full h-[320px] xs:h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center [perspective:1400px] overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-[#140a26] via-[#0c0614] to-[#07030c]">
                                
                                {/* Top Hologram Status Header */}
                                <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
                                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-purple-300 bg-[#0c0614]/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl border border-purple-500/50 shadow-xl flex items-center gap-1.5 sm:gap-2">
                                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                                        SDE 3D WORKSTATION SYSTEM
                                    </span>
                                </div>

                                {/* Floating Interactive 3D Canvas Scene */}
                                <div
                                    style={{
                                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                                        transformStyle: 'preserve-3d',
                                        transition: isDragging ? 'none' : 'transform 0.4s ease-out',
                                    }}
                                    className="relative w-[280px] h-[280px] xs:w-[340px] xs:h-[340px] sm:w-[420px] sm:h-[420px] scale-95 xs:scale-115 sm:scale-145 md:scale-160 flex items-center justify-center"
                                >
                                    {/* 3D Desk Surface Plane */}
                                    <div 
                                        style={{ transform: 'translateZ(-25px) rotateX(70deg)' }}
                                        className="absolute w-80 h-48 rounded-2xl bg-gradient-to-r from-purple-950 via-[#130924] to-purple-950 border-2 border-purple-500/60 shadow-[0_30px_70px_rgba(168,85,247,0.4)] flex items-center justify-center"
                                    >
                                        {/* Keyboard & Desk Details */}
                                        <div className="w-36 h-6 bg-[#08030e] rounded border border-purple-400/30 shadow-inner flex items-center justify-center">
                                            <div className="w-28 h-2 bg-purple-400/60 rounded-full" />
                                        </div>
                                    </div>

                                    {/* 3D Dual Monitors */}
                                    {/* Left Monitor: Code IDE */}
                                    <div
                                        style={{ transform: 'translate3d(-105px, -55px, 30px) rotateY(15deg)' }}
                                        className="absolute w-44 h-28 rounded-xl bg-[#08030e] border-2 border-purple-400/80 p-3 shadow-2xl flex flex-col justify-between"
                                    >
                                        <div className="flex items-center justify-between border-b border-purple-500/40 pb-1.5">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                            </div>
                                            <span className="text-[9px] font-mono text-purple-300 font-bold">crm_service.ts</span>
                                        </div>
                                        <div className="space-y-1.5 font-mono text-[9px]">
                                            <div className="w-24 h-2.5 bg-purple-400/90 rounded" />
                                            <div className="w-28 h-2.5 bg-violet-400 rounded" />
                                            <div className="w-20 h-2.5 bg-indigo-400 rounded" />
                                            <div className="w-26 h-2.5 bg-purple-300 rounded" />
                                        </div>
                                    </div>

                                    {/* Right Monitor: Analytics Dashboard */}
                                    <div
                                        style={{ transform: 'translate3d(105px, -55px, 30px) rotateY(-15deg)' }}
                                        className="absolute w-44 h-28 rounded-xl bg-[#08030e] border-2 border-indigo-400/80 p-3 shadow-2xl flex flex-col justify-between"
                                    >
                                        <div className="flex items-center justify-between border-b border-indigo-500/40 pb-1.5">
                                            <span className="text-[9px] font-mono text-indigo-300 font-extrabold">ANALYTICS DASHBOARD</span>
                                        </div>
                                        {/* Bar Chart Visuals */}
                                        <div className="flex items-end justify-between gap-2 h-14 px-1 pt-2">
                                            <div className="w-5 h-7 bg-gradient-to-t from-purple-600 to-violet-400 rounded-t" />
                                            <div className="w-5 h-12 bg-gradient-to-t from-indigo-600 to-purple-400 rounded-t animate-pulse" />
                                            <div className="w-5 h-8 bg-gradient-to-t from-violet-600 to-indigo-300 rounded-t" />
                                            <div className="w-5 h-13 bg-gradient-to-t from-purple-500 to-violet-300 rounded-t animate-pulse" />
                                        </div>
                                    </div>

                                    {/* 3D Developer Avatar Figure */}
                                    <div
                                        style={{ transform: 'translate3d(0px, 25px, 65px)' }}
                                        className="absolute flex flex-col items-center"
                                    >
                                        {/* Avatar Head */}
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-200 to-amber-100 border-2 border-amber-400/40 shadow-xl flex items-center justify-center">
                                            <div className="w-10 h-6 bg-zinc-900 rounded-t-full" />
                                        </div>
                                        {/* Avatar Torso */}
                                        <div className="w-20 h-16 rounded-t-2xl bg-gradient-to-b from-purple-600 to-[#08030e] border-t-2 border-purple-400/70 shadow-2xl" />
                                    </div>

                                    {/* 3D Floating Tech Badges matching portfolio theme */}
                                    {/* Badge 1: REACT.JS */}
                                    <div
                                        style={{ transform: 'translate3d(-145px, -100px, 30px) rotateZ(-6deg)' }}
                                        className="absolute px-3 py-1.5 rounded-xl bg-purple-500/30 border border-purple-400/80 text-purple-300 text-xs font-mono font-extrabold shadow-[0_0_20px_rgba(168,85,247,0.6)] backdrop-blur-md animate-bounce"
                                    >
                                        REACT.JS
                                    </div>

                                    {/* Badge 2: FASTAPI */}
                                    <div
                                        style={{ transform: 'translate3d(145px, -100px, 30px) rotateZ(6deg)' }}
                                        className="absolute px-3 py-1.5 rounded-xl bg-violet-500/30 border border-violet-400/80 text-violet-300 text-xs font-mono font-extrabold shadow-[0_0_20px_rgba(139,92,246,0.6)] backdrop-blur-md animate-bounce"
                                    >
                                        FASTAPI
                                    </div>

                                    {/* Badge 3: POSTGRESQL */}
                                    <div
                                        style={{ transform: 'translate3d(-145px, 60px, 30px) rotateZ(8deg)' }}
                                        className="absolute px-3 py-1.5 rounded-xl bg-indigo-500/30 border border-indigo-400/80 text-indigo-300 text-xs font-mono font-extrabold shadow-[0_0_20px_rgba(99,102,241,0.6)] backdrop-blur-md"
                                    >
                                        POSTGRESQL
                                    </div>

                                    {/* Badge 4: TYPESCRIPT */}
                                    <div
                                        style={{ transform: 'translate3d(145px, 60px, 30px) rotateZ(-8deg)' }}
                                        className="absolute px-3 py-1.5 rounded-xl bg-purple-500/30 border border-purple-400/80 text-purple-300 text-xs font-mono font-extrabold shadow-[0_0_20px_rgba(168,85,247,0.6)] backdrop-blur-md"
                                    >
                                        TYPESCRIPT
                                    </div>

                                </div>

                                {/* Bottom Right Floating Drag Badge */}
                                <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2 text-xs sm:text-sm font-mono font-extrabold text-white bg-purple-950/90 border border-purple-500/40 px-4 py-2.5 rounded-full shadow-2xl pointer-events-none">
                                    <Move3D className="w-4 h-4 text-purple-400 animate-spin" />
                                    <span>3D Scene (Drag to Rotate)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}

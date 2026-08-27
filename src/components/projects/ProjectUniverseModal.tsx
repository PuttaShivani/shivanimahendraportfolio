'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { X, ExternalLink, Github, Sparkles, Layers, Cpu, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { ProjectPlaceholder } from './ProjectPlaceholder';

interface ProjectUniverseModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectUniverseModal({ project, isOpen, onClose }: ProjectUniverseModalProps) {
    const lenis = useLenis();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            // Lock Lenis smooth scroll and native body scroll
            lenis?.stop();
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            lenis?.start();
            document.body.style.overflow = '';
        }

        return () => {
            lenis?.start();
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose, lenis]);

    if (!isOpen || !project || !mounted) return null;

    return createPortal(
        <AnimatePresence>
            <div 
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                data-lenis-prevent-touch="true"
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 touch-pan-y"
                onWheel={(e) => e.stopPropagation()}
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    data-lenis-prevent="true"
                    data-lenis-prevent-wheel="true"
                    data-lenis-prevent-touch="true"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
                    className="relative w-full max-w-4xl max-h-[85dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain touch-pan-y [webkit-overflow-scrolling:touch] pointer-events-auto bg-zinc-950/95 backdrop-blur-3xl border border-purple-500/30 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-950/60 text-slate-100 z-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar"
                >
                    {/* Header Controls */}
                    <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-zinc-950/95 backdrop-blur-2xl border-b border-purple-500/20">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300">
                            <Layers className="w-4 h-4 text-purple-400" />
                            <span>Project Deep Dive</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-purple-950/50 border border-transparent hover:border-purple-500/30 transition-all"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                        {/* Banner Image / Placeholder */}
                        <div className="relative h-48 xs:h-60 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-inner group">
                            {project.image ? (
                                <>
                                    {/* Ambient Blurred Background */}
                                    <img
                                        src={project.image}
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute inset-0 w-full h-full object-cover opacity-35 blur-2xl scale-110 pointer-events-none"
                                    />
                                    {/* Unclipped Foreground Image */}
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="relative z-10 w-full h-full object-contain object-center p-2 sm:p-4 drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                </>
                            ) : (
                                <ProjectPlaceholder className="w-full h-full" title={project.title} />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />
                            
                            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3">
                                <span className={cn(
                                    "px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border backdrop-blur-md shadow-md",
                                    project.status === 'completed' && "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
                                    project.status === 'ongoing' && "bg-amber-500/20 border-amber-500/40 text-amber-300",
                                    project.status === 'planned' && "bg-blue-500/20 border-blue-500/40 text-blue-300"
                                )}>
                                    {project.status}
                                </span>
                                {project.category && (
                                    <span className="px-3 py-1 text-xs font-mono bg-slate-900/80 border border-slate-700/80 text-slate-300 rounded-full backdrop-blur-md shadow-md">
                                        {project.category}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Title & Info */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                                {project.title}
                            </h2>
                            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                                {project.longDescription || project.description}
                            </p>
                        </div>

                        {/* External Links */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Live Preview</span>
                                </a>
                            )}
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm rounded-xl transition-all"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>Source Code</span>
                                </a>
                            )}
                        </div>

                        {/* Key Highlights */}
                        {project.highlights && project.highlights.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                                    Key Highlights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {project.highlights.map((highlight: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                            <span className="text-sm text-slate-300">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Challenges & Solutions */}
                        {project.challengesAndSolutions && project.challengesAndSolutions.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <ShieldAlert className="w-5 h-5 text-amber-400" />
                                    Challenges & Solutions
                                </h3>
                                <div className="space-y-3">
                                    {project.challengesAndSolutions.map((cs: { problem: string; solution: string } | string, idx: number) => {
                                        const problem = typeof cs === 'string' ? cs : cs.problem;
                                        const solution = typeof cs === 'string' ? null : cs.solution;
                                        return (
                                            <div key={idx} className="p-4 rounded-xl bg-slate-800/30 border border-slate-800 space-y-2">
                                                <div className="flex items-start gap-2 text-amber-300 text-sm font-medium">
                                                    <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">Problem</span>
                                                    <span>{problem}</span>
                                                </div>
                                                {solution && (
                                                    <div className="flex items-start gap-2 text-emerald-300 text-sm pl-4 border-l-2 border-emerald-500/30 mt-2">
                                                        <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                                        <span>{solution}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Tech Stack */}
                        {project.techStack && project.techStack.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Cpu className="w-5 h-5 text-blue-400" />
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech: string) => (
                                        <span key={tech} className="px-3 py-1.5 text-xs font-mono bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tools */}
                        {project.tools && project.tools.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-slate-800">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-purple-400" />
                                    Tools & Infrastructure
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tools.map((tool: string) => (
                                        <span key={tool} className="px-3 py-1.5 text-xs font-mono bg-slate-800/60 text-slate-400 rounded-lg border border-slate-800">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
}

"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Send, MapPin, Phone, Mail, Sparkles, Copy, Check, MessageSquare, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

export default function CTASection() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    // Mouse tilt physics for the 3D Hologram Contact Card
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
    const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const { email, location, phone, name, socialLinks } = portfolioData.personal;
    const linkedinLink = socialLinks.find(s => s.platform === 'LinkedIn')?.url;
    const githubLink = socialLinks.find(s => s.platform === 'GitHub')?.url;

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative py-16 lg:py-28 bg-background overflow-hidden flex justify-center items-center px-4 md:px-8" id="contact-section">
            
            {/* Background Glow Orbs */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

            {/* Main Contact Container */}
            <div className="relative w-full max-w-[1300px] rounded-[2.5rem] bg-[#0e061b]/95 dark:bg-[#0c0614]/95 border border-purple-500/30 shadow-2xl backdrop-blur-3xl overflow-hidden p-6 sm:p-10 md:p-14 lg:p-16">
                
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,_#8b5cf612_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

                {/* Main Content Grid */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Left Column: Direct Contact Info & Socials */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                        
                        {/* Status Tag */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Available for New Opportunities
                            </span>
                            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Let's Connect
                            </span>
                        </div>

                        {/* Section Header */}
                        <div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
                                Get In Touch
                            </h2>
                            <p className="text-purple-200/80 text-base sm:text-lg max-w-xl leading-relaxed">
                                Interested in collaborating, discussing new software engineering projects, or exploring tech opportunities? Drop a line below!
                            </p>
                        </div>

                        {/* Contact Channels Card */}
                        <div className="space-y-4 pt-2">
                            {/* Email Card */}
                            <div className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-purple-900/10 border border-purple-500/20 hover:border-purple-500/50 backdrop-blur-md transition-all duration-300">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-mono uppercase tracking-widest text-purple-300/60 mb-0.5">Email Address</p>
                                        <a href={`mailto:${email}`} className="text-white font-semibold text-sm sm:text-base hover:text-purple-300 transition-colors truncate block">
                                            {email}
                                        </a>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCopyEmail}
                                    className="p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 border border-purple-500/20 transition-all shrink-0 ml-2"
                                    title="Copy Email"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Location & Phone Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
                                    <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-mono uppercase tracking-widest text-purple-300/60 mb-0.5">Location</p>
                                        <p className="text-white font-semibold text-sm truncate">{location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
                                    <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-mono uppercase tracking-widest text-purple-300/60 mb-0.5">Direct Line</p>
                                        <a href={`tel:${phone}`} className="text-white font-semibold text-sm hover:text-purple-300 transition-colors truncate block">
                                            {phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action CTA & Social Links */}
                        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-purple-500/20">
                            <a
                                href={`mailto:${email}`}
                                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-950/50 transition-all duration-300 border border-purple-400/30"
                            >
                                <Send className="w-4 h-4" />
                                <span>Send Direct Message</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>

                            {linkedinLink && (
                                <a
                                    href={linkedinLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3.5 rounded-2xl bg-purple-900/10 hover:bg-purple-900/20 border border-purple-500/20 hover:border-purple-400/50 text-purple-300 hover:text-white transition-all"
                                    title="LinkedIn Profile"
                                >
                                    <FaLinkedinIn className="w-5 h-5 text-purple-400" />
                                </a>
                            )}
                            {githubLink && (
                                <a
                                    href={githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3.5 rounded-2xl bg-purple-900/10 hover:bg-purple-900/20 border border-purple-500/20 hover:border-purple-400/50 text-purple-300 hover:text-white transition-all"
                                    title="GitHub Profile"
                                >
                                    <FaGithub className="w-5 h-5 text-purple-400" />
                                </a>
                            )}
                        </div>

                    </div>

                    {/* Right Column: 3D Hologram Contact Render */}
                    <div className="lg:col-span-5 flex items-center justify-center">
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX: rotateXSpring,
                                rotateY: rotateYSpring,
                                transformStyle: 'preserve-3d',
                            }}
                            className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-0 shadow-2xl shadow-purple-950/80 cursor-pointer group/render bg-[#08030e] p-2.5 transition-all duration-500"
                        >
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border-0 bg-[#0c0614] flex items-center justify-center">
                                <Image
                                    src="/contact_touch_img.png"
                                    alt="Digital Connection Hologram Node"
                                    fill
                                    className="object-cover object-center group-hover/render:scale-105 transition-transform duration-700 contrast-[1.06] brightness-[1.04]"
                                    sizes="(max-width: 768px) 100vw, 500px"
                                    priority
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0614]/90 via-transparent to-transparent pointer-events-none" />
                                
                                {/* Holographic Floating Status Tags */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300 bg-[#0c0614]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-purple-400/40 shadow-lg flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                                        COMMUNICATE NODE 08
                                    </span>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono text-purple-200 bg-[#0c0614]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-purple-500/20">
                                    <span className="font-semibold text-white truncate">Secure Messaging</span>
                                    <span className="text-purple-400 font-bold shrink-0 ml-2">24/7 ONLINE</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

        </section>
    );
}

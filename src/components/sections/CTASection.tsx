"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, MapPin, Phone, BarChart2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-card',
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const { email, location, phone, name } = portfolioData.personal;

    return (
        <section ref={sectionRef} className="relative py-12 lg:py-24 bg-background overflow-hidden flex justify-center items-center px-4 md:px-8" id="contact-section">
            
            <div className="cta-card relative w-full max-w-[1100px] rounded-[2rem] bg-zinc-950/80 border border-primary/20 shadow-2xl backdrop-blur-xl overflow-hidden">
                
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 p-6 flex gap-1 z-0">
                    <div className="w-4 h-6 bg-primary rounded-l-md opacity-80"></div>
                    <div className="w-4 h-6 bg-primary/30 rounded-r-md opacity-80"></div>
                </div>
                <div className="absolute -bottom-10 right-10 flex items-end gap-2 z-0">
                    <div className="w-16 h-16 rounded-full bg-primary/20 opacity-50 blur-xl"></div>
                    <div className="w-32 h-32 rounded-full bg-primary/10 blur-3xl"></div>
                </div>

                {/* Main Content Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 p-10 md:p-16 lg:p-20">
                    
                    {/* Left Column */}
                    <div className="flex flex-col justify-between min-h-[300px] relative">
                        {/* Circular abstract background graphics */}
                        <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] pointer-events-none opacity-40">
                            <div className="absolute inset-0 rounded-full border-[1px] border-primary/50 scale-[1]"></div>
                            <div className="absolute inset-0 rounded-full border-[1px] border-primary/20 scale-[1.3] -translate-x-[10%] -translate-y-[10%]"></div>
                        </div>

                        <div className="relative z-10 pt-4">
                            <h3 className="text-primary text-xl font-semibold mb-2">Contact Me</h3>
                            <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                Get In Touch
                            </h2>
                        </div>

                        <div className="relative z-10 mt-16 md:mt-0 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 border border-primary/30 flex items-center justify-center shadow-lg backdrop-blur-sm">
                                <BarChart2 className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-primary/80 font-bold tracking-widest uppercase mb-1">
                                    DATA ANALYST
                                </p>
                                <p className="text-white font-bold text-lg uppercase tracking-wide">
                                    {name}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Contact Details) */}
                    <div className="flex flex-col justify-center gap-8 text-white relative z-10 md:pl-10">
                        
                        {/* Email */}
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors bg-white/5">
                                <Send className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="border-b border-white/10 pb-6 w-full flex flex-col justify-center min-h-[80px]">
                                <h4 className="text-xl font-semibold mb-1 text-white">Email Address</h4>
                                <a href={`mailto:${email}`} className="text-gray-400 hover:text-primary transition-colors break-all">
                                    {email}
                                </a>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors bg-white/5">
                                <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="border-b border-white/10 pb-6 w-full flex flex-col justify-center min-h-[80px]">
                                <h4 className="text-xl font-semibold mb-1 text-white">Location</h4>
                                <p className="text-gray-400">
                                    {location}
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-6 group">
                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors bg-white/5">
                                <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="w-full flex flex-col justify-center min-h-[80px]">
                                <h4 className="text-xl font-semibold mb-1 text-white">Contact Number</h4>
                                <a href={`tel:${phone}`} className="text-gray-400 hover:text-primary transition-colors">
                                    {phone}
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
}



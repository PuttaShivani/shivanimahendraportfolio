'use client';

import { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
    Github,
    Linkedin,
    Instagram,
    Bot,
    Focus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';

type SocialIconComponent = typeof Github;

const socialIcons: { [key: string]: SocialIconComponent } = {
    github: Github,
    linkedin: Linkedin,
    twitter: Bot, // Replaced Twitter logo with AI Bot logo
    instagram: Instagram,
};

import { SocialLink } from '@/types/index';

export function Footer() {
    const pathname = usePathname();
    const isBlog = pathname?.includes('/blog');
    const [mounted, setMounted] = useState(false);
    const [copyrightIndex, setCopyrightIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setCopyrightIndex(prev => (prev + 1) % 2);
        }, 2500); // Trigger every 2.5s
        return () => clearInterval(interval);
    }, []);

    const currentYear = new Date().getFullYear();

    const previewSocials = portfolioData.personal.socialLinks
        .filter((s: SocialLink) => s.platform !== 'Discord' && s.platform !== 'Spotify')
        .slice(0, 4);

    return (
        <footer className={cn(
            isBlog ? 'absolute bottom-0 w-full border-t-0 pointer-events-none !bg-transparent z-20' : 'relative z-20 mt-auto dark:bg-[#07030c]'
        )}>
            <div className={`max-w-[1600px] mx-auto relative z-10 px-6 md:px-12 lg:px-24 py-6 md:py-8 pointer-events-auto ${isBlog ? '!bg-transparent' : ''}`}>
                <div className={`
                    px-6 md:px-8 py-4 md:py-6 transition-all duration-300
                    ${isBlog
                        ? 'bg-card dark:bg-[#0c0614]/60 dark:backdrop-blur-xl border-2 border-foreground/10 dark:border-purple-500/20 rounded-[2rem] shadow-xl dark:shadow-purple-950/20'
                        : 'glass-card'
                    }
                `}>
                    <div className="flex items-center justify-between gap-4">
                        {/* Left Side - Animated Copyright */}
                        <div className="flex items-center gap-1.5 md:gap-2 pl-2 md:pl-4 z-10 overflow-hidden h-6">
                            <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${isBlog ? 'text-muted-foreground' : 'text-gradient'}`}>
                                © {currentYear}
                            </span>
                            <div className="relative w-[280px] h-full flex items-center">
                                <AnimatePresence mode="popLayout">
                                    {mounted && (
                                        <motion.span
                                            key={copyrightIndex}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className={`absolute left-0 text-xs md:text-sm font-bold uppercase tracking-widest whitespace-nowrap ${isBlog ? 'text-muted-foreground' : 'text-gradient'}`}
                                        >
                                            {copyrightIndex === 0
                                                ? `${portfolioData.personal.name}.`
                                                : "All rights reserved."}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right Side - Socials Only */}
                        <div className="flex items-center justify-end gap-4 md:gap-8 z-10 ml-auto">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                {/* Social Icons */}
                                {previewSocials.map((social: SocialLink) => {
                                    const Icon = socialIcons[social.icon];
                                    return (
                                        <Fragment key={social.platform}>
                                            {social.platform === 'Twitter' && (
                                                <motion.a
                                                    href="https://arfazrllworkspace.vercel.app/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1.5 rounded-full hover:bg-foreground/5 transition-all text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95"
                                                    aria-label="Workspace"
                                                >
                                                    <Focus className="w-4 h-4" />
                                                </motion.a>
                                            )}
                                            <motion.a
                                                key={social.platform}
                                                href={social.platform === 'Twitter' ? undefined : social.url}
                                                onClick={social.platform === 'Twitter' ? (e) => {
                                                    e.preventDefault();
                                                    window.dispatchEvent(new CustomEvent('portfolio:toggle-chatbot'));
                                                } : undefined}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 rounded-full hover:bg-foreground/5 transition-all text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95"
                                                aria-label={social.platform}
                                            >
                                                {Icon && <Icon className="w-4 h-4" />}
                                            </motion.a>
                                        </Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

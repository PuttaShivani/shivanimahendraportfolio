'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Moon, Sun, Globe, Focus, Download } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

function Clock() {
    const [time, setTime] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            setTime(`${h}:${m}:${s}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <span className="font-mono text-xl md:text-2xl font-black opacity-0">00:00:00</span>;

    return (
        <span className="font-mono text-xl md:text-2xl font-black text-gradient tracking-widest hover:tracking-[0.2em] transition-all duration-300">
            {time}
        </span>
    );
}


export function Navbar() {
    const t = useTranslations('navigation');
    const tMenu = useTranslations('navigation.menu');
    const { theme, setTheme, resolvedTheme } = useTheme();
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [currentLocale, setCurrentLocale] = useState('en');

    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        setMounted(true);
        const locale = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1] || 'en';
        setCurrentLocale(locale);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (isMenuOpen) return; // Don't hide navbar when menu is open

        setIsScrolled(latest > 50);
        setIsVisible(true);
        
        setLastScrollY(latest);
    });

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const toggleLocale = useCallback(() => {
        const newLocale = currentLocale === 'en' ? 'id' : 'en';
        document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
        setCurrentLocale(newLocale);
        window.location.reload();
    }, [currentLocale]);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const handleHomeClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        closeMenu();
    }, [pathname, closeMenu]);

    // Animation variants
    const navVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
    };

    const menuVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    return (
        <>
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate={isVisible || isMenuOpen ? 'visible' : 'hidden'}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed top-0 left-0 right-0 z-[100]"
            >
                <div className="max-w-[1600px] mx-auto px-2 xs:px-6 md:px-12 py-2 sm:py-4 md:py-6">
                    <motion.div
                        className={cn(
                            'flex items-center justify-between transition-all duration-500 rounded-full',
                            isScrolled ? 'glass-strong px-3 xs:px-6 py-2 xs:py-3' : 'py-2'
                        )}
                        layout
                    >
                        {/* Make a text logo as a Link to Home */}
                        <Link href="/" className="relative group shrink-0" onClick={handleHomeClick}>
                            <span className="font-mono text-sm xs:text-lg md:text-2xl font-black text-gradient tracking-wider xs:tracking-widest transition-all duration-300 whitespace-nowrap">
                                TEJESWARA SAI
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            {/* HOME */}
                            <Link
                                href="/"
                                onClick={handleHomeClick}
                                className={cn(
                                    'relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full group',
                                    pathname === '/' ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <span className="relative z-10">{t('home')}</span>
                            </Link>

                            {/* ABOUT */}
                            <Link
                                href="/#about"
                                onClick={(e) => {
                                    if (pathname === '/') {
                                        e.preventDefault();
                                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full text-muted-foreground hover:text-foreground"
                            >
                                <span className="relative z-10">{t('about')}</span>
                            </Link>

                            {/* SKILLS */}
                            <Link
                                href="/#skills-section"
                                onClick={(e) => {
                                    if (pathname === '/') {
                                        e.preventDefault();
                                        document.getElementById('skills-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full text-muted-foreground hover:text-foreground"
                            >
                                <span className="relative z-10">{tMenu('skills')}</span>
                            </Link>

                            {/* PROJECTS */}
                            <Link
                                href="/#projects-section"
                                onClick={(e) => {
                                    if (pathname === '/') {
                                        e.preventDefault();
                                        document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full text-muted-foreground hover:text-foreground"
                            >
                                <span className="relative z-10">{tMenu('projects')}</span>
                            </Link>

                            {/* CERTIFICATIONS */}
                            <Link
                                href="/#certifications-section"
                                onClick={(e) => {
                                    if (pathname === '/') {
                                        e.preventDefault();
                                        document.getElementById('certifications-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full text-muted-foreground hover:text-foreground"
                            >
                                <span className="relative z-10">{tMenu('certifications')}</span>
                            </Link>

                            {/* CONTACT */}
                            <Link
                                href="/#contact-section"
                                onClick={(e) => {
                                    if (pathname === '/') {
                                        e.preventDefault();
                                        const contactSection = document.getElementById('contact-section');
                                        if (contactSection) {
                                            contactSection.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                }}
                                className={cn(
                                    'relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full group',
                                    pathname === '/contact' || pathname === '/#contact-section' ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <span className="relative z-10">{t('contact')}</span>
                            </Link>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* View Resume â€” desktop only */}
                            <a
                                href="/resume"
                                className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm"
                                aria-label="View Resume"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span>Resume</span>
                            </a>


                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleMenu}
                                className="p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors lg:hidden"
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={isMenuOpen ? 'close' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.nav >

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    isMenuOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[90] lg:hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-background"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            <div className="relative flex flex-col items-center justify-center h-full overflow-y-auto py-20">
                                <nav className="flex flex-col items-center gap-6">
                                    {/* Mobile Home */}
                                    <Link
                                        href="/"
                                        onClick={handleHomeClick}
                                        className="text-3xl font-black text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {t('home')}
                                    </Link>

                                    <Link
                                        href="/#contact-section"
                                        onClick={(e) => {
                                            closeMenu();
                                            if (pathname === '/') {
                                                e.preventDefault();
                                                const contactSection = document.getElementById('contact-section');
                                                if (contactSection) {
                                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }
                                        }}
                                        className="text-3xl font-black text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {t('contact')}
                                    </Link>

                                    {/* Mobile Section Links */}
                                    {[
                                        { label: t('about'), href: '/#about' },
                                        { label: tMenu('skills'), href: '/#skills-section' },
                                        { label: tMenu('projects'), href: '/#projects-section' },
                                        { label: tMenu('certifications'), href: '/#certifications-section' },
                                    ].map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={(e) => {
                                                closeMenu();
                                                if (pathname === '/' && link.href.startsWith('/#')) {
                                                    const hash = link.href.split('#')[1];
                                                    const targetEl = document.getElementById(hash);
                                                    if (targetEl) {
                                                        e.preventDefault();
                                                        targetEl.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                }
                                            }}
                                            className="text-2xl font-bold text-muted-foreground/60 hover:text-foreground transition-all hover:scale-110 active:scale-95 duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex flex-col items-center gap-4 mt-12"
                                >
                                    {/* View Resume â€” mobile */}
                                    <a
                                        href="/resume"
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all duration-300 shadow-sm"
                                    >
                                        <Download className="w-4 h-4" />
                                        View Resume
                                    </a>
                                    <div className="flex items-center gap-4">

                                    </div>
                                </motion.div>
                            </div>
                        </motion.div >
                    )
                }
            </AnimatePresence >
        </>
    );
}




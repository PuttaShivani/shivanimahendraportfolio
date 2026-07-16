"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Mail, Layers, Send, CheckCircle, AlertCircle, Loader2, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { InfiniteRibbon } from "@/components/ui/infinite-ribbon";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { usePerformance } from "@/hooks/usePerformance";
import { portfolioData } from "@/data/portfolio";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}



function InputGroup({ label, name, type = "text", value, onChange, required = false }: any) {
    return (
        <div className="group relative z-0 w-full mb-8 text-left">
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={1}
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-lg font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300 resize-y min-h-[40px] max-h-[150px]"
                    placeholder=" "
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="peer block w-full appearance-none border-0 border-b-2 border-foreground/20 bg-transparent py-2.5 px-0 text-lg font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-0 transition-colors duration-300"
                    placeholder=" "
                />
            )}
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-8 scale-75 transform text-sm font-bold tracking-widest text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-foreground">
                {label.toUpperCase()}
            </label>
        </div>
    );
}

function ContactForm() {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        } finally {
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="w-full relative z-20">
            {/* Form Header */}
            <div className="mb-10 text-left">
                <h3 className="text-3xl font-black tracking-tight text-foreground uppercase">
                    {t('title')}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 font-light">
                    {t('subtitle')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full relative z-10">
                <InputGroup label={t('form.name')} name="name" value={formData.name} onChange={handleChange} required />
                <InputGroup label={t('form.email')} name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputGroup label={t('form.subject')} name="subject" value={formData.subject} onChange={handleChange} required />
                <InputGroup
                    label={t('form.messagePlaceholder')}
                    name="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />

                {/* Submit button */}
                <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full flex items-center justify-between border-b-2 border-foreground py-6 text-left hover:bg-foreground/5 transition-colors disabled:opacity-50"
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="text-xl font-bold tracking-tight text-foreground group-hover:pl-4 transition-all duration-300">
                        {status === 'loading' ? t('form.sending') : status === 'success' ? t('form.sent') : t('form.submit')}
                    </span>

                    <div className="relative overflow-hidden w-10 h-10 flex items-center justify-center rounded-full bg-foreground text-background group-hover:scale-110 transition-transform duration-500">
                        {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> :
                            status === 'success' ? <CheckCircle className="w-5 h-5" /> :
                                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                        }
                    </div>
                </motion.button>
            </form>
        </div>
    );
}

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations('ctaSection');
    const linkedinUrl = portfolioData.personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url;
    const { isLowPowerMode } = usePerformance();
    const words = [t('words.amazing'), t('words.innovative'), t('words.intelligent'), t('words.creative')];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [words.length]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.cta-content',
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-12 lg:py-16 overflow-hidden bg-background">
            {/* Infinite Ribbons - Moved from Stats Section */}
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden pointer-events-none mb-16">
                <InfiniteRibbon rotation={6} className="z-10 py-5 border-y border-blue-200 dark:border-white/5 shadow-xl" background="bg-white dark:bg-zinc-900" textColor="text-blue-700 dark:text-zinc-400 font-mono tracking-tighter">
                    {t('ribbon1')}
                </InfiniteRibbon>
                <InfiniteRibbon rotation={-6} reverse={true} className="z-20 py-5 border-y border-white/40 dark:border-white/10 shadow-2xl" background="bg-blue-600 dark:bg-black" textColor="text-white font-bold tracking-widest uppercase">
                    {t('ribbon2')}
                </InfiniteRibbon>
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10 px-6 md:px-12 lg:px-24 cta-content" id="contact-section">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Column: CTA Text & Action Buttons (7/12 cols) */}
                    <div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8">
                            {t('title')}
                            <br />
                            <span className="inline-grid place-items-center">
                                {/* Invisible longest word ensures the container NEVER changes width/height */}
                                <span className="col-start-1 row-start-1 invisible pointer-events-none text-gradient mx-2">
                                    {words.reduce((a, b) => a.length > b.length ? a : b, "")}
                                </span>
                                <AnimatePresence>
                                    <motion.span
                                        key={words[currentWord]}
                                        initial={{ y: 50, opacity: 0, rotateX: -90 }}
                                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                        exit={{ y: -50, opacity: 0, rotateX: 90 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="col-start-1 row-start-1 inline-block text-gradient lg:mx-0 mr-2"
                                    >
                                        {words[currentWord]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                            <span className="whitespace-nowrap">{t('together')}</span>
                        </h2>

                        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto lg:mx-0">
                            {t('subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button
                                    onClick={() => {
                                        const formInput = document.getElementsByName('name')[0];
                                        if (formInput) {
                                            formInput.focus();
                                        }
                                    }}
                                    className="btn-creative text-lg px-10 py-5 inline-flex items-center gap-3 w-full sm:w-auto justify-center"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>{t('start')}</span>
                                </button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/resume" className="btn-outline-creative text-lg px-10 py-5 inline-flex items-center gap-3 w-full sm:w-auto justify-center">
                                    <Layers className="w-5 h-5" />
                                    <span>{t('work')}</span>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Contact Information */}
                        <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-6 text-sm md:text-base text-muted-foreground font-medium">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>{portfolioData.personal.location}</span>
                            </div>
                            <div className="hidden sm:block text-foreground/20">•</div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" />
                                <a href={`tel:${portfolioData.personal.phone}`} className="hover:text-foreground transition-colors">{portfolioData.personal.phone}</a>
                            </div>
                            <div className="hidden sm:block text-foreground/20">•</div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-foreground transition-colors">{portfolioData.personal.email}</a>
                            </div>
                            {linkedinUrl && (
                                <>
                                    <div className="hidden sm:block text-foreground/20">•</div>
                                    <div className="flex items-center gap-2">
                                        <FaLinkedin className="w-4 h-4 text-primary" />
                                        <a
                                            href={linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            LinkedIn
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Contact Form (5/12 cols) */}
                    <div className="lg:col-span-5 w-full relative z-20 bg-white/5 dark:bg-zinc-950/40 border border-black/5 dark:border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl backdrop-blur-xl">
                        <ContactForm />
                    </div>

                </div>
            </div>
        </section>
    );
}



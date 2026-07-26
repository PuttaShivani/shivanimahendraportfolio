'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { usePerformance } from '@/hooks/usePerformance';

const formatDate = (date?: string) => {
    if (!date) return 'Present';
    return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(date));
};

export default function ResumePage() {
    const { isLowPowerMode } = usePerformance();
    const { personal, experiences, education, achievements, hardSkills, tools } = portfolioData;

    return (
        <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
            <motion.div
                initial={isLowPowerMode ? { opacity: 0 } : { opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container-creative px-3 sm:px-6 mb-8"
            >
                <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Portfolio</span>
                </Link>
            </motion.div>

            <motion.article
                initial={isLowPowerMode ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="container-creative px-2 xs:px-4 sm:px-6 max-w-5xl"
            >
                <div className="rounded-2xl border border-border/60 bg-card/60 p-4 xs:p-6 md:p-10 shadow-xl">
                    <header className="border-b border-border pb-4 xs:pb-6 mb-6 xs:mb-8">
                        <h1 className="text-2xl xs:text-3xl md:text-5xl font-black tracking-tight break-words">{personal.name}</h1>
                        <p className="mt-2 xs:mt-3 text-base xs:text-lg md:text-xl text-primary font-semibold">{personal.title}</p>
                        <div className="mt-4 xs:mt-5 flex flex-wrap gap-3 xs:gap-4 text-xs xs:text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 shrink-0" />{personal.location}</span>
                            <a className="inline-flex items-center gap-1.5 hover:text-foreground break-all" href={`tel:${personal.phone}`}><Phone className="w-3.5 h-3.5 shrink-0" />{personal.phone}</a>
                            <a className="inline-flex items-center gap-1.5 hover:text-foreground break-all" href={`mailto:${personal.email}`}><Mail className="w-3.5 h-3.5 shrink-0" />{personal.email}</a>
                        </div>
                    </header>

                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-primary mb-3">Professional Summary</h2>
                        <p className="text-muted-foreground leading-relaxed">{personal.bio}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">Technical Skills</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {hardSkills.map((skill) => (
                                <div key={skill.name} className="rounded-xl border border-border/60 p-4 bg-background/50">
                                    <h3 className="font-bold">{skill.name}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {tools.map((tool) => (
                                <span key={tool.name} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                                    {tool.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">Professional Experience</h2>
                        <div className="space-y-7">
                            {experiences.map((experience) => (
                                <div key={experience.id} className="border-l-2 border-primary/30 pl-5">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                        <div>
                                            <h3 className="text-xl font-bold">{experience.position}</h3>
                                            <p className="text-muted-foreground font-medium">{experience.company} | {experience.location}</p>
                                        </div>
                                        <p className="text-sm font-mono text-muted-foreground whitespace-nowrap">
                                            {formatDate(experience.startDate)} - {experience.isOngoing ? 'Present' : formatDate(experience.endDate)}
                                        </p>
                                    </div>
                                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
                                        {(experience.responsibilities ?? []).map((item) => (
                                            <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">Projects</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            {portfolioData.projects.map((project) => (
                                <div key={project.id} className="rounded-xl border border-border/60 p-4 bg-background/50">
                                    <h3 className="font-bold">{project.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">Education</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {education.map((edu) => (
                                <div key={edu.id} className="rounded-xl border border-border/60 p-4 bg-background/50">
                                    <h3 className="font-bold">{edu.degree} in {edu.major}</h3>
                                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                    <p className="mt-2 text-xs font-mono text-muted-foreground">{formatDate(edu.endDate)}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">Certifications</h2>
                        <div className="grid gap-2 md:grid-cols-2">
                            {achievements.map((cert) => (
                                <p key={cert.id} className="text-sm text-muted-foreground">{cert.title} - {cert.issuer}</p>
                            ))}
                        </div>
                    </section>
                </div>
            </motion.article>
        </main>
    );
}

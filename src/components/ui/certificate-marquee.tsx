"use client";

import { motion } from "framer-motion";

export function CertificateShowcase() {
  return (
    <section className="relative w-full bg-background overflow-hidden pb-32">
      {/* Intro Text Section */}
      <div className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10 max-w-[1750px] mb-20 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center justify-center gap-8 w-full"
        >
          <div className="space-y-6 w-full">
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-[0.2em] text-primary/60 uppercase">
                Certifications &amp; Achievements
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight max-w-none text-foreground">
                Validating <span className="text-shiny">Excellence</span> through Global Standards.
              </h3>
              <p className="text-lg text-muted-foreground max-w-none leading-relaxed lg:whitespace-nowrap">
                A collection of my professional certifications in AI, Web Development, and Cloud Engineering from industry leaders.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-[20%] left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </section>
  );
}

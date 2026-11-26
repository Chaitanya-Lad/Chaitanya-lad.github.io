"use client";

import { useRef, type FC } from "react";
import { motion, useInView } from "motion/react";
import { fadeInUp } from "@/animations/scroll-animations";
import { HERO_LOCATION, HERO_NAME, HERO_ROLE } from "@/constants/hero-constants";

export const AboutBio: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.7 }}
      className="glass gradient-border p-8 md:p-10 lg:col-span-7"
    >
      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-neutral-400">
        Who I Am
      </p>
      <h3 className="mb-4 text-2xl font-bold md:text-3xl">
        {HERO_NAME} · {HERO_LOCATION}
      </h3>
      <p className="text-base leading-relaxed text-neutral-300 md:text-lg">
        I&apos;m a {HERO_ROLE} with{" "}
        <span className="font-semibold text-white">~5 years</span> of experience
        in the MedTech domain, progressing from software development to end-to-end
        product lifecycle ownership. I connect customer needs, R&D and
        engineering to move MedTech products from requirements through release.
      </p>
      <p className="mt-4 leading-relaxed text-neutral-400">
        My work spans <span className="text-white">Product Lifecycle Coordination</span>,
        <span className="text-white">Requirements Analysis (BRD/FRD/SRS/DRS)</span>,
        <span className="text-white">Verification & Validation</span>, and
        <span className="text-white">Software Delivery</span> — supported by hands-on
        expertise in Python, IoT and hardware–software integration.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#contact" className="btn-primary">
          <span>Start a project</span>
          <span aria-hidden>→</span>
        </a>
        <a href="#work" className="btn-ghost">
          <span>See past work</span>
        </a>
        <a
          href="/Chaitanya_Lad.pdf"
          download="Chaitanya_Lad.pdf"
          className="btn-ghost"
        >
          <span>Download Resume</span>
        </a>
      </div>
    </motion.div>
  );
};

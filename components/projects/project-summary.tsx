"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import { formatCounter } from "@/helpers/format-helpers";
import { type ProjectSummaryProps } from "@/types/project-types";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.4 },
  transition: { duration: 0.6, delay },
});

export const ProjectSummary: FC<ProjectSummaryProps> = ({
  project,
  index,
  total,
  onOpen,
}) => (
  <div className="order-2 flex flex-col justify-between lg:order-1 lg:col-span-7">
    <div>
    <motion.p
      {...reveal()}
      transition={{ duration: 0.5 }}
      className="text-[10px] uppercase tracking-[0.4em] text-white/60"
    >
      {formatCounter(index, total)} · {project.category}
    </motion.p>

    <motion.h3
      {...reveal()}
      className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl"
    >
      {project.title}
    </motion.h3>

    <motion.p
      {...reveal(0.1)}
      className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
    >
      {project.description}
    </motion.p>
    </div>

    <motion.div {...reveal(0.3)} className="mt-8 flex flex-wrap gap-3">
      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 text-white"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary transition-transform duration-300 group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
          <span className="text-base font-medium tracking-tight md:text-lg">
            Visit live
          </span>
        </a>
      )}
      <button type="button" onClick={onOpen} className="btn-ghost">
        <span>Case study</span>
      </button>
    </motion.div>
  </div>
);

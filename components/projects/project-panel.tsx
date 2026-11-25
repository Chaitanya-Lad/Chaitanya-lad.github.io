import { type FC } from "react";
import { type ProjectPanelProps } from "@/types/project-types";
import { ProjectPreview } from "./project-preview";
import { ProjectSummary } from "./project-summary";

export const ProjectPanel: FC<ProjectPanelProps> = ({
  project,
  index,
  total,
  onOpen,
  showPreview,
}) => (
  <div className="flex h-[80vh] w-screen shrink-0 items-center justify-center px-5 md:px-10 lg:px-15">
    <article className="relative h-full w-full max-w-[1440px] overflow-hidden rounded-3xl border border-white/10 bg-midnight">
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-30 ${project.accent}`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.10),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(0,0,0,0.5),transparent_45%)]" />

      <div className="relative grid h-full grid-cols-1 gap-8 p-8 md:p-12 lg:grid-cols-12 lg:p-16">
      <ProjectSummary
        project={project}
        index={index}
        total={total}
        onOpen={onOpen}
      />
      <ProjectPreview
        project={project}
        index={index}
        total={total}
        showPreview={showPreview}
      />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
    </article>
  </div>
);

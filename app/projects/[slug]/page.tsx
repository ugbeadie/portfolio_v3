import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "./ProjectDetail";
import { projects, FEATURED_COUNT } from "../../data/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — Ugbe Adie`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  // The pitch belongs at the end of the curated set, not the end of the array,
  // so appending weaker work never inherits it.
  const closerIndex = Math.min(FEATURED_COUNT, projects.length) - 1;

  return (
    <ProjectDetail
      key={project.slug}
      project={project}
      next={next}
      isCloser={index === closerIndex}
      hasMore={projects.length > FEATURED_COUNT}
    />
  );
}

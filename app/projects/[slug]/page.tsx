import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "../../components/ProjectDetail";
import { projects } from "../../data/projects";

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
  const next = projects[(index + 1) % projects.length];

  return <ProjectDetail key={project.slug} project={project} next={next} />;
}

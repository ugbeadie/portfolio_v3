import type { Metadata } from "next";
import { ProjectsIndex } from "./ProjectsIndex";

const DESCRIPTION =
  "Selected software projects, each with a write-up of what it does, the hard part, and a decision worth defending.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  openGraph: {
    siteName: "Ugbe Adie",
    title: "Projects — Ugbe Adie",
    description: DESCRIPTION,
    url: "/projects",
  },
};

export default function Page() {
  return <ProjectsIndex />;
}

import type { Metadata } from "next";
import { ProjectsIndex } from "./ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects — Ugbe Adie",
  description:
    "Selected software projects, each with a write-up of what it does, the hard part, and a decision worth defending.",
};

export default function Page() {
  return <ProjectsIndex />;
}

import type { Metadata } from "next";
import { PlaygroundGallery } from "./PlaygroundGallery";

const DESCRIPTION =
  "Small live experiments and interface micro-interactions, built for the pleasure of building them.";

export const metadata: Metadata = {
  title: "Playground",
  description: DESCRIPTION,
  openGraph: {
    siteName: "Ugbe Adie",
    title: "Playground — Ugbe Adie",
    description: DESCRIPTION,
    url: "/playground",
  },
};

export default function Page() {
  return <PlaygroundGallery />;
}

import type { Metadata } from "next";
import { PlaygroundGallery } from "./PlaygroundGallery";

const DESCRIPTION =
  "Animation experiments built for the pleasure of building them, kept live so they can be opened and tried rather than described.";

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

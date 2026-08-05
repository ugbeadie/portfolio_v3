import type { Metadata } from "next";
import { GridScroll } from "./GridScroll";

const DESCRIPTION =
  "A single card blooms into a grid and folds back into itself, the reveal timed so brightness radiates outward in a circle.";

export const metadata: Metadata = {
  title: "Grid Scroll",
  description: DESCRIPTION,
  openGraph: {
    siteName: "Ugbe Adie",
    title: "Grid Scroll — Ugbe Adie",
    description: DESCRIPTION,
    url: "/playground/grid-scroll",
  },
};

export default function Page() {
  return <GridScroll />;
}

import type { Metadata } from "next";
import { PlaygroundPage } from "./PlaygroundPage";

export const metadata: Metadata = {
  title: "Playground — Ugbe Adie",
  description:
    "Small live experiments and interface micro-interactions, built for the pleasure of building them.",
};

export default function Page() {
  return <PlaygroundPage />;
}

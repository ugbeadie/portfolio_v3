import type { Metadata } from "next";
import { ImageTrail } from "./ImageTrail";

const DESCRIPTION =
  "A pointer-driven image trail — photographs drop along the path the cursor travels, then fade out behind it.";

export const metadata: Metadata = {
  title: "Image Trail",
  description: DESCRIPTION,
  openGraph: {
    siteName: "Ugbe Adie",
    title: "Image Trail — Ugbe Adie",
    description: DESCRIPTION,
    url: "/playground/image-trail",
  },
};

export default function Page() {
  return <ImageTrail />;
}

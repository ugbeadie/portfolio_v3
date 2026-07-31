import type { Metadata } from "next";
import { TickerScroller } from "./TickerScroller";

const DESCRIPTION =
  "Four columns of photographs wrapping endlessly in opposite directions, driven by the wheel and eased so they never stop where you let go.";

export const metadata: Metadata = {
  title: "Ticker Scroller",
  description: DESCRIPTION,
  openGraph: {
    siteName: "Ugbe Adie",
    title: "Ticker Scroller — Ugbe Adie",
    description: DESCRIPTION,
    url: "/playground/ticker-scroller",
  },
};

export default function Page() {
  return <TickerScroller />;
}

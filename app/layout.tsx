import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { PageTransitionProvider } from "./components/layout/PageTransition";
import { Navbar } from "./components/layout/Navbar";
import { Cursor } from "./components/layout/Cursor";
import { DarkModeToggle } from "./components/layout/DarkModeToggle";
import { SocialSidebar } from "./components/layout/SocialSidebar";

const DESCRIPTION =
  "Software developer building products end to end — the interface, the data model underneath it, and the deployment that puts it in front of people.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ugbeadie.com",
  ),
  title: {
    default: "Ugbe Adie — Software Developer",
    template: "%s — Ugbe Adie",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Ugbe Adie",
    url: "/",
    title: "Ugbe Adie — Software Developer",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@atersam1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PageTransitionProvider>
            <DarkModeToggle />
            <Cursor />
            <Navbar />
            <SocialSidebar />
            {children}
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

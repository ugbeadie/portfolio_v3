import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { PageTransitionProvider } from "./components/PageTransition";
import { Navbar } from "./components/Navbar";
import { Cursor } from "./components/Cursor";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { SocialSidebar } from "./components/SocialSidebar";

export const metadata: Metadata = {
  title: "The Personal Website of Ugbe Adie",
  description: "Portfolio website",
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

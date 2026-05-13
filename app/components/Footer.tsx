import { ArrowUp } from "lucide-react";
import { Magnetic } from "./Magnetic";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-900 py-8 px-6 md:px-12 border-t border-zinc-800 text-white font-['Inter']">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-6 text-sm font-medium">
          <Magnetic>
            <a href="#" className="hover:text-[#ab8bff] transition-colors">
              Twitter
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="hover:text-[#ab8bff] transition-colors">
              LinkedIn
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="hover:text-[#ab8bff] transition-colors">
              GitHub
            </a>
          </Magnetic>
        </div>

        <div className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Adie Ugbe. All rights reserved.
        </div>

        <Magnetic>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium group"
          >
            Back to top
            <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-[#ab8bff] group-hover:border-[#ab8bff] group-hover:text-white transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}

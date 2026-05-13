"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Magnetic } from "./Magnetic";

const works = [
  {
    id: "01",
    title: "Developer Relations Platform",
    category: "Architecture & Strategy",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXJrJTIwd2ViJTIwZGVzaWduJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3ODQwNTYyOXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "02",
    title: "Global Tech Summit",
    category: "Keynote & Evangelism",
    image:
      "https://images.unsplash.com/photo-1773611814475-e80ea69a4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZWNvbW1lcmNlJTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3Nzg0MDU2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "03",
    title: "Open Source Documentation",
    category: "Technical Content",
    image:
      "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc4MzIzNDk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

function WorkCard({ work, index }: { work: any; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div ref={ref} className="group cursor-pointer mb-24 md:mb-32">
      <div className="flex items-baseline gap-6 mb-6">
        <span className="text-sm font-['Inter'] font-medium text-zinc-400">
          {work.id}
        </span>
        <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-zinc-900 group-hover:text-[#ab8bff] transition-colors duration-500">
          {work.title}
        </h3>
      </div>

      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-zinc-100 rounded-xl">
        <motion.img
          style={{ y }}
          src={work.image}
          alt={work.title}
          className="absolute inset-0 w-full h-[120%] object-cover -top-[10%] scale-100 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

        {/* Hover Reveal Details */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-end justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <p className="font-['Inter'] text-white font-medium tracking-wide uppercase text-sm">
              {work.category}
            </p>
            <Magnetic>
              <button className="w-16 h-16 rounded-full bg-white text-zinc-900 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <h2 className="font-['Playfair_Display'] text-6xl md:text-8xl text-zinc-900 leading-none">
            Selected <br />
            <span className="italic text-zinc-400">Works</span>
          </h2>
          <p className="font-['Inter'] text-lg text-zinc-500 max-w-sm">
            A curated selection of talks, platforms, and technical content
            designed to elevate developer experiences.
          </p>
        </div>

        <div className="flex flex-col">
          {works.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

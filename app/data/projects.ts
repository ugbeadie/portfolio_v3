export type Project = {
  id: number;
  slug: string;
  title: string;
  image: string;
  tools: string[];
  about: string;
  repo?: string;
  live?: string;
};

// The first FEATURED_COUNT projects are shown by default on the home page,
// the rest are revealed by the "View more" toggle.
export const FEATURED_COUNT = 4;

export const projects: Project[] = [
  {
    id: 1,
    slug: "warrant",
    title: "WARRANT",
    image: "/images/placeholder-warrant.svg",
    tools: ["Next.js", "TypeScript", "Tailwind"],
    about:
      "Placeholder description — copy for Warrant is coming soon. This paragraph is a stand-in so the layout, spacing and transitions can be reviewed before the real content lands.",
  },
  {
    id: 2,
    slug: "roomful",
    title: "ROOMFUL",
    image: "/images/placeholder-roomful.svg",
    tools: ["Next.js", "TypeScript", "Tailwind"],
    about:
      "Placeholder description — copy for Roomful is coming soon. This paragraph is a stand-in so the layout, spacing and transitions can be reviewed before the real content lands.",
  },
  {
    id: 3,
    slug: "trackr",
    title: "TRACKR",
    image: "/images/trackr.png",
    tools: [
      "Next.js",
      "Tailwind",
      "PostgreSQL",
      "Drizzle ORM",
      "OpenRouter AI",
    ],
    about:
      "A full-stack job tracking platform with a drag-and-drop Kanban board, analytics dashboard, GitHub-style activity graph, and AI-powered job detail extraction from pasted job links.",
    repo: "https://github.com/ugbeadie/billr",
    live: "https://trackr.ugbeadie.com/",
  },
  {
    id: 4,
    slug: "moneytrail",
    title: "MONEYTRAIL",
    image: "/images/moneytrail.png",
    tools: ["Next.js", "Tailwind", "PostgreSQL", "Drizzle ORM"],
    about:
      "A full-stack expense tracking application with real-time synchronization, comprehensive reporting and extensive analytics.",
    repo: "https://github.com/ugbeadie/moneytrail-rework",
    live: "https://moneytrail.ugbeadie.com/",
  },
  {
    id: 5,
    slug: "gitburn",
    title: "GitBurn",
    image: "/images/gitburn.png",
    tools: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Tailwind",
      "Framer Motion",
      "OpenRouter AI",
    ],
    about:
      "An AI-powered roast machine that aggregates a developer's public GitHub footprint, repository metrics, and commit history to generate a brutally personalized, cynical code review.",
    repo: "https://github.com/ugbeadie/GitBurn",
    live: "https://gitburn.ugbeadie.com",
  },
  {
    id: 6,
    slug: "snapsack",
    title: "Snapsack",
    image: "/images/snapsack.png",
    tools: ["React", "React-Router", "Animate-on-scroll"],
    about: "An ecommerce store built with react focusing on clean ui",
    repo: "https://github.com/ugbeadie/Snapsack",
    live: "https://ugbecommercials.vercel.app/",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

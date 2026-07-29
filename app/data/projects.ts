export type Shot = {
  image: string;
  caption: string;
  /** Shown side by side in one frame, in order. `image` stays the lead. */
  images?: string[];
  /** Plays in place of the still; the image becomes its poster frame. */
  video?: string;
  /** Playback multiple the file was exported at. Declared, never hidden. */
  speed?: number;
  /** CSS aspect-ratio for the frame. Defaults to 16 / 9. */
  aspect?: string;
};

export type Section = { label: string; body: string[] };

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  hook: string;
  repo?: string;
  live?: string;
  demoLogin?: { email: string; password: string };
  writeup?: { label: string; url?: string };
  hero: Shot;
  stack: string[];
  sections: Section[];
  gallery: Shot[];
  closingSections: Section[];
  closer?: string[];
  draft?: boolean;
};

const SHOT = "/images/placeholder-shot.svg";

/** Screen captures come off a laptop viewport, not a 16:9 frame. */
const SCREEN = "1365 / 630";

export const FEATURED_COUNT = 4;

export const projects: Project[] = [
  {
    id: 1,
    slug: "warrant",
    title: "WARRANT",
    category: "Security & access",
    tagline:
      "Borrow access, not own access. A permissions system where every grant expires by default and can explain itself.",
    image: "/images/warrant/audit-log.png",
    hook: "Access gets granted once and never revoked. Someone needs admin for a one-off migration and still has it eighteen months later.",
    repo: "https://github.com/ugbeadie/warrant",
    live: "https://warrant.ugbeadie.com",
    demoLogin: { email: "admin@warrant.dev", password: "admin12345" },
    writeup: {
      label: "Why I built a system that forgets",
      url: "https://medium.com/@ugbeadie3/why-i-built-a-system-that-forgets-acab773178c1",
    },
    hero: {
      image: "/images/warrant/access-trace.png",
      video: "/videos/warrant-preview.mp4",
      speed: 2,
      aspect: "2324 / 1080",
      caption: "Every access decision comes back as a sentence, not a boolean.",
    },
    stack: [
      "React",
      "TypeScript",
      "Tailwind",
      "Node",
      "Express",
      "PostgreSQL",
      "Prisma",
    ],
    sections: [
      {
        label: "What it does",
        body: [
          "Borrow access, not own access. Every grant expires by default, whether it was given to a person directly or inherited through a group. If you still need it when it runs out, you ask again.",
          "Users request a role on a resource with a reason and a duration. Owners approve manually, or set policy rules that auto-approve low-risk requests within a role ceiling. A background job sweeps expired access and flags grants nobody has used in days.",
          "And for any user and resource, the system explains exactly why they do or don't have access: a direct grant, an inherited group grant, or nothing at all.",
        ],
      },
      {
        label: "The hard part",
        body: [
          "An access check that can't trust its own data.",
          "A cron job sweeps expired grants on a schedule, which means there's always a window between a grant's real expiry and the next run. If access decisions read the cached status field, they'd wrongly grant access inside that window.",
          "So every check re-derives validity from the timestamp, live, every time. The cron job's job is narrower than I first assumed: flip status, write the audit entry, send the notification. It's the janitor, not the source of truth.",
          "That distinction reshaped how I thought about every background process in the system afterwards.",
        ],
      },
      {
        label: "A decision I'd defend",
        body: [
          "PostgreSQL over MongoDB. Access control is inherently relational. Grants reference resources, roles, users and groups, and the correctness of the whole system depends on those relationships actually being enforced.",
          "Postgres gives real foreign keys and referential integrity, and Prisma's `include` performs actual SQL joins rather than the multiple round trips `.populate()` needs in Mongoose. For a system whose entire premise is reasoning correctly about who has access to what, that mattered more than familiarity.",
        ],
      },
    ],
    gallery: [
      {
        image: "/images/warrant/access-trace.png",
        aspect: SCREEN,
        caption:
          "The why panel. Traces access to its source, and says what's missing when it's denied.",
      },
      {
        image: "/images/warrant/approvals-queue.png",
        aspect: SCREEN,
        caption:
          "Approvals queue. Owners decide requests for their own resources; admins can see every pending request platform-wide.",
      },
      {
        image: "/images/warrant/audit-log.png",
        aspect: SCREEN,
        caption:
          "Audit log. Distinct actions, so a policy auto-approval never looks like a human decision.",
      },
      {
        image: "/images/warrant/policy-rule.png",
        aspect: SCREEN,
        caption:
          "Policy rule editor. Auto-approval is capped by role tier, so “auto-approve viewer” can never become “auto-approve admin”.",
      },
    ],
    closingSections: [
      {
        label: "Where it stands",
        body: [
          "Shipped and live with a public demo login, so you can see the whole system rather than a scoped-down guest view.",
          "Nine distinct audit actions covering every way access can begin, change hands or end. Requests must escalate rather than duplicate, and a higher grant supersedes lower ones automatically.",
        ],
      },
      {
        label: "What's still missing",
        body: [
          "Auto-approval caps the role but not the cumulative duration, so someone could split one long access need into several short auto-approved requests to avoid manual review.",
          "The group branch of the access check runs one query per group the user belongs to. It's an N+1 that hasn't mattered at this scale and would need collapsing at any other.",
          "Surrendering a group grant writes an audit entry but notifies nobody, so members lose access without being told.",
          "Full reasoning for all three is in the README.",
        ],
      },
    ],
    closer: [
      "I wrote up the whole build: the design decisions, the bugs that actually taught me something, and what I'd do differently.",
    ],
  },
  {
    id: 2,
    slug: "roomful",
    title: "ROOMFUL",
    category: "Utility",
    tagline:
      "Know what you own. A home inventory for insurance claims with no backend at all — everything stays saved on your device.",
    image: "/images/roomful/desktop.png",
    hook: "If your place burned down tomorrow, could you tell your insurer what was in it? Almost nobody can.",
    repo: "https://github.com/ugbeadie/roomful",
    live: "https://roomful.ugbeadie.com",
    writeup: { label: "Why I built an app that can't phone home" },
    hero: {
      image: "/images/roomful/01-home.jpg",
      video: "/videos/roomful-preview.mp4",
      speed: 2,
      aspect: "1080 / 2244",
      caption: "Cataloguing a room. About eight seconds an item.",
    },
    stack: ["React", "TypeScript", "Tailwind", "Zustand", "IndexedDB", "PWA"],
    sections: [
      {
        label: "What it does",
        body: [
          "Walk around the house with your phone. Photograph a thing, name it, put a value on it, and the camera reopens for the next one. About eight seconds an item, because if it takes twenty nobody finishes a house.",
          "Later, at a laptop, fix the values you guessed at, add serial numbers off the receipts, and export a dated PDF with photos and totals for your insurer.",
          "It installs to a home screen and opens with no signal, which matters because the place you actually use it is a garage with no reception. Nothing is ever uploaded. No account, no server, no analytics.",
        ],
      },
      {
        label: "The hard part",
        body: [
          "Fitting a whole house of photographs into a browser storage quota, with no server to offload to.",
          "A phone photo is three to five megabytes. Forty of them is more than most browsers will store. So every image is decoded off the main thread, downscaled to 1200px on its long edge and re-encoded as WebP, landing around 200 KB. That's still enough resolution to read a serial number off a label.",
          "Compression here isn't about bandwidth, which is the usual reason. There's nothing to upload. It's purely about fitting inside a quota that can't be raised.",
        ],
      },
      {
        label: "A decision I'd defend",
        body: [
          "IndexedDB over localStorage. localStorage caps at roughly 5 MB and stores strings only, so photos would have needed base64 encoding, a third larger and blocking the main thread. About ten items would have exhausted it. IndexedDB stores binary directly and gets a quota measured in hundreds of megabytes.",
          "The cost is that everything becomes asynchronous, which is why the app loads all its text records into memory once at startup and treats memory as the read path. Photos deliberately stay out and are fetched only when something renders them.",
        ],
      },
    ],
    gallery: [
      {
        image: "/images/roomful/01-home.jpg",
        images: [
          "/images/roomful/01-home.jpg",
          "/images/roomful/01-room.jpg",
          "/images/roomful/01-capture.jpg",
        ],
        caption:
          "The phone, left to right: the house total by room, a room's items, and the capture screen whose primary button reopens the camera rather than returning to a list.",
      },
      {
        image: "/images/roomful/empty-state.png",
        aspect: SCREEN,
        caption:
          "First run. It offers the room you're standing in, or a sample home, so you can see what an export looks like before cataloguing anything of your own.",
      },
      {
        image: "/images/roomful/desktop.png",
        aspect: SCREEN,
        caption:
          "Desktop three-column layout. The phone captures and the laptop reviews, so they get different arrangements of the same components.",
      },
      {
        image: "/images/roomful/export.png",
        aspect: SCREEN,
        caption:
          "Export and transfer. With no server to sync through, moving an inventory between devices is a backup file you carry.",
      },
      {
        image: "/images/roomful/print.png",
        aspect: SCREEN,
        caption:
          "The exported document. Grouped by room with photos and subtotals, generated by a print stylesheet rather than a PDF library.",
      },
    ],
    closingSections: [
      {
        label: "Where it stands",
        body: [
          "Shipped and live. Installs to a home screen, opens in airplane mode, and produces a document you could attach to a claim.",
          "23 tests covering the money helpers and the total calculations, including the property that the grand total always equals the sum of the room totals.",
        ],
      },
      {
        label: "What's still missing",
        body: [
          "Devices can't see each other's data. That's the direct cost of having no backend rather than an oversight, so moving an inventory between a phone and a laptop is a file you export and carry.",
          "Object URLs are held for the whole session, so memory grows with the number of photos viewed. Fine at a few hundred items.",
          "And a value above JavaScript's safe integer range breaks totals. It needs an input cap and a test, and it's documented rather than fixed.",
          "Full reasoning for all three is in the README.",
        ],
      },
    ],
    closer: [
      "I wrote up the whole build: why no backend, what that bought and what it cost, and the bug I spent two hours on when the stack trace had already named it.",
    ],
  },
  {
    id: 3,
    slug: "trackr",
    title: "TRACKR",
    category: "Productivity",
    tagline:
      "Paste a job link and AI fills the card for you. Every application then lives on a drag-and-drop board.",
    image: "/images/trackr/board.png",
    hook: "Most job hunts are tracked in a spreadsheet that stops being updated somewhere around week three.",
    repo: "https://github.com/ugbeadie/billr",
    live: "https://trackr.ugbeadie.com/",
    hero: {
      image: "/images/trackr/board.png",
      video: "/videos/trackr-preview.mp4",
      speed: 2,
      aspect: "2336 / 1080",
      caption: "The board. Every application you have open, in one screen.",
    },
    stack: [
      "Next.js",
      "Tailwind",
      "Framer Motion",
      "PostgreSQL",
      "Drizzle",
      "OpenRouter AI",
    ],
    sections: [
      {
        label: "What it does",
        body: [
          "Every job you apply to becomes a card on a Kanban board, and you drag it between Applied, Interviewing, Offer and Rejected as things move. Interview dates and notes live on the card, so the follow-up you promised is attached to the thing it's about rather than sitting in a separate reminder.",
          "Adding a job is a paste. Drop in a posting link or the description text and the fields come back filled: company, role, salary, location, job type, remote or onsite, etc. Typing all of that out by hand is exactly the friction that kills a tracking habit.",
          "The dashboard is the part you open on a bad week. Application volume over time, a status breakdown, and a GitHub-style activity graph that makes a quiet fortnight visible without you having to count anything.",
        ],
      },
      {
        label: "The hard part",
        body: [
          "Turning a job posting into structured fields, when a job posting is whatever a company felt like writing that day.",
          "There's no schema out there to lean on. Salary might be a range, a single number, an hourly rate, or absent. Location might be a city, three cities, or a sentence about hybrid arrangements. So the extraction is a language model call with a strict output shape, and every field is allowed to come back empty.",
          "Empty is the important part. A model asked for a salary will invent one rather than admit it doesn't know, and a plausible wrong number is worse than a blank you'd have filled in yourself.",
        ],
      },
      {
        label: "A decision I'd defend",
        body: [
          "The AI fills the form. It never submits it.",
          "Extraction lands in an editable draft that you look at before anything is written to the database. It costs a click on every single add, which is real friction on the most common action in the app.",
          "The alternative is silent writes, and the failure mode there is a board quietly full of wrong salaries and mislabelled companies — data you now trust less than the spreadsheet you left. A tracker is only worth keeping if you believe what it tells you.",
        ],
      },
    ],
    gallery: [
      {
        image: "/images/trackr/board.png",
        aspect: SCREEN,
        caption:
          "The board mid-drag. Status is a position rather than a dropdown, so moving a job forward is the same gesture as thinking about it.",
      },
      {
        image: "/images/trackr/autofill.png",
        aspect: SCREEN,
        caption:
          "Autofill from a pasted link. Extraction lands in a draft with every field still editable, and nothing reaches the database until you confirm it.",
      },
      {
        image: "/images/trackr/job-details.png",
        aspect: SCREEN,
        caption:
          "A card opened. Salary reads “Not specified” instead of a plausible invented number — every extracted field is allowed to come back empty.",
      },
      {
        image: "/images/trackr/dashboard.png",
        aspect: SCREEN,
        caption:
          "The dashboard. Volume, conversion rates and a status breakdown, with the application-frequency graph below — the screen you open on a bad week.",
      },
    ],
    closingSections: [
      {
        label: "Where it stands",
        body: [
          "Live, with accounts, protected routes and per-user data isolation, so your board is yours.",
          "Board, interview notes, dashboard and AI autofill are all shipped and in use.",
        ],
      },
      {
        label: "What's still missing",
        body: [
          "Draft — confirm before publishing. Nothing reminds you about an interview; the date is stored but no notification is sent, so the calendar in your head is still doing the work.",
          "Résumé versions aren't attached per application, so which CV went where isn't recorded.",
          "And extraction quality tracks the posting. A well-structured listing fills cleanly; a PDF-flavoured wall of text does not.",
        ],
      },
    ],
    draft: true,
  },
  {
    id: 4,
    slug: "gitburn",
    title: "GITBURN",
    category: "Entertainment",
    tagline:
      "Feed it a GitHub username and it reads your commit history back to you, unkindly.",
    image: "/images/gitburn/landing.png",
    hook: "Sixty-five repos, seven stars, and a README that stops mid-sentence. Everyone's GitHub has a version of this.",
    repo: "https://github.com/ugbeadie/GitBurn",
    live: "https://gitburn.ugbeadie.com",
    hero: {
      image: "/images/gitburn/landing.png",
      video: "/videos/gitburn-preview.mp4",
      speed: 2,
      aspect: "2332 / 1080",
      caption: "One username in, one personalised roast out.",
    },
    stack: [
      "React",
      "Tailwind",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "OpenRouter",
    ],
    sections: [
      {
        label: "What it does",
        body: [
          "Give it a GitHub handle. The backend pulls the public footprint — profile, up to a hundred repositories, the language split, the star count — then picks the five most recently pushed repos and reads them properly: the last five commit messages and the opening lines of each README.",
          "All of that gets compiled into one prompt and sent to gpt-4o-mini through OpenRouter, wearing a cynical senior developer persona. What comes back is specific rather than generic, because it's working from your actual 3am “fix” commits.",
          "While it waits, the screen runs a fake terminal printing INIT, FETCH, SCAN, AI against the real stages as they complete. The roast then types itself out line by line, and the whole card exports to a PNG you can post without a screenshot tool.",
        ],
      },
      {
        label: "The hard part",
        body: [
          "A roast is only funny if it's specific, and specificity costs requests.",
          "The profile call is one request. Reading five repositories' commits and READMEs is ten more, and doing them in sequence means the user watches a spinner for the sum of every round trip. So they're fired concurrently with asyncio.gather and the whole detail pass costs about as long as its slowest single call.",
          "The other ceiling is the context window. A README can run for thousands of words and five of them will bury the commit history that actually holds the jokes, so each one is trimmed to 250 characters — enough to catch a project's tone, cheap enough that five of them still fit alongside everything else.",
        ],
      },
      {
        label: "A decision I'd defend",
        body: [
          "Only the five most recently pushed repositories get read in depth.",
          "Everything else contributes as an aggregate: counted, language-tallied, and otherwise unread. It's a deliberate bias toward recency over completeness, and the cost lands on exactly the person you'd least want it to — someone whose best work is three years old gets judged on whatever they touched last week.",
          "The alternative is reading everything, which multiplies the request count by twenty and dilutes the prompt with repositories nobody has opened since. A roast built on a stale but impressive backlog is more accurate and much less funny.",
        ],
      },
    ],
    gallery: [
      {
        image: "/images/gitburn/landing.png",
        aspect: SCREEN,
        caption:
          "The whole input surface: a handle and a button. Everything the roast is built from is public, so nothing else is asked for.",
      },
      {
        image: "/images/gitburn/terminal.png",
        aspect: SCREEN,
        caption:
          "The analysing state. A fake terminal wired to the real stages, so the wait shows progress instead of a spinner.",
      },
      {
        image: "/images/gitburn/roast-card.png",
        aspect: SCREEN,
        caption:
          "The roast card. Repo, follower and star counts on the left — the numbers the model was actually handed — next to what it made of them. It types itself out line by line and exports to a PNG from the DOM.",
      },
    ],
    closingSections: [
      {
        label: "Where it stands",
        body: [
          "Shipped and live. Roast generation, the metrics panel, PNG export and one-tap sharing to X all work.",
          "It runs on free-tier hosting with a lightweight ping endpoint keeping the backend awake, so a cold start after a quiet spell is slower than a warm one.",
        ],
      },
      {
        label: "What's still missing",
        body: [
          "It only sees public activity. Someone who spends their week in private repositories reads as inactive, and gets roasted for it.",
          "The five-repo depth limit means a quiet fortnight skews the whole verdict, since recency is the only thing deciding what gets read closely.",
          "And 250 characters of README is enough to catch a tone but not enough to know what a project does, so the model occasionally roasts a thing for being what it isn't.",
        ],
      },
    ],
    draft: true,
  },
  {
    id: 5,
    slug: "moneytrail",
    title: "MONEYTRAIL",
    category: "Finance",
    tagline:
      "Where the money went, by the day. An expense tracker built around a calendar rather than a list.",
    image: "/images/moneytrail.png",
    hook: "Expense apps are good at telling you what you spent. Fewer are good at telling you when.",
    repo: "https://github.com/ugbeadie/moneytrail-rework",
    live: "https://moneytrail.ugbeadie.com/",
    hero: {
      image: "/images/moneytrail.png",
      caption: "A month at a glance, with the heavy days visible.",
    },
    stack: ["Next.js", "React", "Tailwind", "PostgreSQL", "Drizzle"],
    sections: [
      {
        label: "What it does",
        body: [
          "Log what you spend and read it back as a calendar. Each day carries its own total, so the pattern you're actually looking for — the three-payday-weekends problem, the month that quietly got away from you — shows up as shape rather than as a row you have to find in a list.",
          "Underneath the calendar are the reports: category breakdowns, totals over time, and the running charts that answer whether this month is worse than the last one.",
          "This is the second build of Moneytrail. The rewrite locked down authentication so spending data is private per account, and replaced the interface wholesale for something quicker to enter a transaction into.",
        ],
      },
      {
        label: "The hard part",
        body: [
          "A chart that was correct in development and wrong in production.",
          "The transaction graph rendered perfectly on my machine and then lagged reality on the live site — sitting on May while the calendar said June. Every test on the data was green, because the data was fine.",
          "The fault was in how the date range reached the chart, not in the chart. Reworking that mapping made the deployed graph track the current month instead of whichever one happened to be true when the thing was built.",
        ],
      },
      {
        label: "A decision I'd defend",
        body: [
          "Authentication before features, on the rewrite.",
          "The first version had a nicer surface and a much softer boundary around whose data was whose. For a general-purpose app that's a bug worth scheduling; for a ledger of somebody's spending it's the whole product.",
          "So the rewrite started at the session layer, and every read is scoped to the signed-in user before it touches a query. It pushed the visible improvements back by weeks, which is the cost, and it's the right trade for the category of data involved.",
        ],
      },
    ],
    gallery: [
      {
        image: SHOT,
        caption:
          "Placeholder — the calendar month, with per-day totals doing the summarising.",
      },
      {
        image: SHOT,
        caption: "Placeholder — category breakdown for the selected range.",
      },
      {
        image: SHOT,
        caption:
          "Placeholder — the transaction graph, live and finally on the right month.",
      },
    ],
    closingSections: [
      {
        label: "Where it stands",
        body: [
          "Live, rebuilt, and in daily use. Auth is enforced, the interface overhaul is shipped, and the charts on the deployed site now agree with the calendar.",
        ],
      },
      {
        label: "What's still missing",
        body: [
          "Draft — confirm before publishing. Everything is entered by hand; there's no bank import, so the tracking only holds while the habit does.",
          "Recurring expenses are re-entered every month rather than scheduled.",
          "And it's single-currency, which rules out anyone spending across two.",
        ],
      },
    ],
    draft: true,
  },
  {
    id: 6,
    slug: "snapsack",
    title: "SNAPSACK",
    category: "E-commerce",
    tagline:
      "A storefront that gets out of the way. Built to practise restraint in an interface.",
    image: "/images/snapsack.png",
    hook: "An ecommerce build where the point was the interface, not the checkout.",
    repo: "https://github.com/ugbeadie/Snapsack",
    live: "https://ugbecommercials.vercel.app/",
    hero: {
      image: "/images/snapsack.png",
      caption:
        "Catalogue, cart, and as little chrome as it could get away with.",
    },
    stack: ["React", "React Router", "Animate on Scroll", "CSS"],
    sections: [
      {
        label: "What it does",
        body: [
          "A browsable catalogue with a working cart and a clean, deliberately quiet product page. Routing, state and scroll-triggered motion, with the visual noise kept down on purpose.",
        ],
      },
      {
        label: "The hard part",
        body: ["Placeholder."],
      },
      {
        label: "A decision I'd defend",
        body: ["Placeholder."],
      },
    ],
    gallery: [
      { image: SHOT, caption: "Placeholder — the catalogue grid." },
      { image: SHOT, caption: "Placeholder — the cart." },
    ],
    closingSections: [
      {
        label: "Where it stands",
        body: ["Shipped and live. An earlier build, kept for the record."],
      },
      { label: "What's still missing", body: ["Placeholder."] },
    ],
    draft: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

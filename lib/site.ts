export const site = {
  name: "Akshith Mysa",
  shortName: "AM",
  role: "Co-founder & CTO, Klinn AI",
  location: "Magdeburg",
  timezone: "Europe/Berlin",
  tagline:
    "Systems engineer working two layers at once — production platforms, and the silicon they run on.",
  description:
    "Akshith Mysa is co-founder and CTO of Klinn AI, and a Master's student in Advanced Semiconductor Nanotechnologies at OVGU Magdeburg. Previously AI engineering at OSCOWL and bio-inspired flight research at TiHAN–IIT Hyderabad.",
  url: "https://akshithmysa.com",
  links: {
    linkedin: "https://www.linkedin.com/in/akshithmysa",
    github: "https://github.com/sc0rp10n16",
    klinn: "https://www.klinnai.com",
    oscowl: "https://www.oscowl.in",
    publication: "https://doi.org/10.1002/9781394268795.ch20",
    sriram: "https://github.com/sc0rp10n16/sriram-aero-landing",
    germanquest: "https://github.com/sc0rp10n16/GermanQuest",
    crm: "https://github.com/sc0rp10n16/edmission-world-crm",
    edmissions: "https://github.com/sc0rp10n16/edmissions-world-landing",
  },
} as const;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#path", label: "Path" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
] as const;

export const facts = [
  {
    k: "Building",
    before: "Co-founder & CTO, ",
    linkLabel: "Klinn AI",
    href: site.links.klinn,
    after: " — enterprise platforms in production since 2025",
  },
  {
    k: "Studying",
    before: "MSc Advanced Semiconductor Nanotechnologies, OVGU Magdeburg",
    linkLabel: null,
    href: null,
    after: null,
  },
  {
    k: "Published",
    before: "Wiley, 2025 — autonomous ornithopter navigation (",
    linkLabel: "ch. 20",
    href: site.links.publication,
    after: ")",
  },
] as const;

export const cases = [
  {
    id: "crm",
    index: "01",
    kind: "Enterprise CRM",
    year: "2025",
    name: "Edmissions World CRM",
    href: "/work/edmissions-crm",
    external: false,
    cta: "Read case study",
    role: "Klinn AI's first major product. I owned architecture, data model and delivery.",
    problem:
      "An education consultancy ran its entire admissions pipeline across spreadsheets, WhatsApp and memory. Nobody could answer where a student was in the process.",
    built:
      "A multi-role CRM covering lead intake, document collection, university applications and commission tracking — designed around the workflow the team already had.",
    outcome: "In production. The consultancy now runs its admissions cycle out of the CRM rather than alongside it.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Role-based auth"],
  },
  {
    id: "edmissions",
    index: "02",
    kind: "Platform",
    year: "2025",
    name: "Edmissions World",
    href: site.links.edmissions,
    external: true,
    cta: "View source",
    role: "Public-facing counterpart to the CRM, including MBBS admission pathways.",
    problem:
      "Prospective students had no way to compare pathways or start an application without a phone call, so every enquiry became manual work for the consultancy.",
    built:
      "Programme and pathway surfaces with structured enquiry capture that writes straight into the CRM pipeline the internal team works out of.",
    outcome: "Enquiries arrive as structured records instead of a phone call and a spreadsheet row.",
    stack: ["Next.js", "SSG", "CMS-driven content", "CRM integration"],
  },
  {
    id: "ornithopter",
    index: "03",
    kind: "Research",
    year: "TiHAN",
    name: "Autonomous Ornithopter Navigation",
    href: site.links.publication,
    external: true,
    cta: "Read the paper",
    role: "Research intern at TiHAN — IIT Hyderabad, India's autonomous navigation hub.",
    problem:
      "Flapping-wing UAVs oscillate along every axis by design, so the pose estimation that works on quadrotors degrades badly — and indoors there is no GPS to fall back on.",
    built:
      "A navigation and control stack for indoor and outdoor flight: UWB ranging for absolute position, SLAM for local mapping, ROS for control, tuned against the airframe's own flapping period.",
    outcome:
      "Published as chapter 20 in Artificial Intelligence Applications in Aeronautical and Aerospace Engineering (Wiley, 2025).",
    stack: ["ROS", "SLAM", "UWB", "Python", "Flight testing"],
  },
] as const;

export const alsoShipped = [
  { label: "Sriram Aero", href: site.links.sriram, note: "aerospace presence, 2025" },
  { label: "GermanQuest", href: site.links.germanquest, note: "German trainer, 2026" },
] as const;

export const interests = [
  {
    index: "01",
    title: "Neuromorphic & in-memory compute",
    body: "Devices that do the arithmetic where the data already sits. I have spent two years on the software side of inference cost; this is the other end of the same problem.",
  },
  {
    index: "02",
    title: "Nanoscale device characterisation",
    body: "Fabrication and measurement of advanced semiconductor devices — the core of the OVGU programme, and the part I want to be genuinely good at.",
  },
  {
    index: "03",
    title: "Autonomy under constraint",
    body: "Navigation and control when the sensors are poor and the platform is unhelpful. Where my published work sits, and still the problem I find hardest to put down.",
  },
] as const;

export const path = [
  {
    period: "Current",
    role: "MSc Advanced Semiconductor Nanotechnologies",
    org: "OVGU Magdeburg",
    body: "Device physics, fabrication and characterisation. The layer underneath everything I had built until then.",
  },
  {
    period: "2025 — now",
    role: "Co-founder & CTO",
    org: "Klinn AI",
    body: "Architecture and delivery for production platforms: CRMs, admissions systems, internal tools. Software that has to work on a Tuesday, not just in a deck.",
  },
  {
    period: "2024 — 25",
    role: "Associate AI Engineer",
    org: "OSCOWL ai",
    body: "Applied AI in a deep-tech lab working across speech models, UAVs and custom silicon. Research that had to survive contact with a product.",
  },
  {
    period: "TiHAN",
    role: "Research Intern",
    org: "TiHAN — IIT Hyderabad",
    body: "Bio-inspired flight: autonomous ornithopters, GPS-denied navigation, UWB and SLAM. Led to the Wiley chapter.",
  },
] as const;

export const publication = {
  title: "Navigation of Unconventional Drones — Autonomous Ornithopter",
  book: "Artificial Intelligence Applications in Aeronautical and Aerospace Engineering",
  publisher: "Wiley",
  year: "2025",
  href: site.links.publication,
  authors: [
    "S. Syam Narayanan",
    "P. Rajalakshmi",
    "Y. Gangurde",
    "A. Mysa",
    "S. Movidi",
  ],
  note: "Chapter 20 of Artificial Intelligence Applications in Aeronautical and Aerospace Engineering. Control and navigation for flapping-wing UAVs using UWB, SLAM and ROS, indoors and out.",
} as const;

export const essay =
  "Most of the last two years went into shipping. Klinn AI is the company I co-founded to build production software for operations that cannot afford theatre. Before that I was in Hyderabad's deep-tech pocket: bio-inspired drones at TiHAN, then applied AI at OSCOWL. The master's at OVGU is the layer I kept skipping — models and products are downstream of devices.";

export const notes = [
  { title: "Why the CRM had to look like a spreadsheet", tag: "Platforms", date: "Note" },
  { title: "Tuning SLAM against a flapping period", tag: "Autonomy", date: "Note" },
  { title: "What a software engineer misinterprets about device physics", tag: "Silicon", date: "Note" },
] as const;

export const elsewhere = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Klinn AI", href: site.links.klinn },
] as const;

export const crmStudy = {
  title: "Edmissions World CRM",
  kind: "Enterprise CRM",
  org: "Klinn AI",
  year: "2025",
  lede: "An admissions consultancy was running its whole pipeline on spreadsheets and memory. This is the system that replaced it.",
  source: site.links.crm,
  facts: [
    { k: "Role", v: "Architecture, data model, delivery" },
    { k: "Status", v: "In production" },
  ],
  problem: [
    "Edmissions World places students into medical and undergraduate programmes abroad. Each placement involves a dozen documents, several universities, deadlines that move, and a commission that has to be reconciled months later.",
    "All of it lived in spreadsheets, WhatsApp threads and individual counsellors' heads. The consultancy could not answer the two questions that mattered — where is this student in the process, and which applications are at risk this week — without someone spending an afternoon on it.",
  ],
  approach: [
    "I did not start from a CRM template. I sat with the counsellors' spreadsheets and modelled what was already there: the student as the unit of work, the application as a child record with its own state machine, and the document checklist as the thing that actually blocks progress.",
    "The rule I held to was that nobody should have to change how they work to use the system on day one. Anything that looked like process improvement got postponed until the data was trustworthy.",
  ],
  decisions: [
    {
      title: "Spreadsheet-shaped tables.",
      body: "The main views are dense, sortable and keyboard-navigable, because that is what the team was fast in already.",
    },
    {
      title: "State machine per application.",
      body: "Every stage transition is explicit and logged, so 'where is this student' has one answer rather than three.",
    },
    {
      title: "Roles before features.",
      body: "Counsellor, operations and admin see different surfaces of the same records — built in from the first migration, not bolted on.",
    },
  ],
  modules: [
    {
      title: "Lead intake",
      body: "Enquiries from the public site land as structured records with source attribution, so marketing spend is traceable to placements.",
    },
    {
      title: "Document collection",
      body: "Per-programme checklists with upload, review state and expiry. The blocker list is the same object the counsellor chases.",
    },
    {
      title: "University applications",
      body: "One record per student-programme pair, each with its own deadline, stage and owner. Deadlines roll up into a weekly risk view.",
    },
    {
      title: "Commission tracking",
      body: "Expected against received, reconciled per intake — the part that pays for the rest of the system.",
    },
  ],
  outcome:
    "The consultancy now runs its admissions cycle out of the CRM rather than alongside it. The pipeline view answers the two questions that used to take an afternoon.",
  change:
    "The document checklist should have been a first-class model from the start rather than a field on the application. Retrofitting it cost more than building it would have.",
} as const;

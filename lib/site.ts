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
  email: "akshithmysa.physics@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/akshithmysa",
    github: "https://github.com/sc0rp10n16",
    klinn: "https://www.klinnai.com",
    oscowl: "https://www.oscowl.in",
    publication: "https://doi.org/10.1002/9781394268795.ch20",
    resume: "/resume.pdf",
    sriram: "https://github.com/sc0rp10n16/sriram-aero-landing",
    crm: "https://github.com/sc0rp10n16/edmission-world-crm-v2",
    edmissions: "https://github.com/sc0rp10n16/edmissions-world-landing",
    pdfBuddy: "https://github.com/sc0rp10n16/pdf-buddy",
    metaflow: "https://github.com/sc0rp10n16/metaflow-v2",
    genau: "https://github.com/sc0rp10n16/Genau",
    aitut: "https://github.com/sc0rp10n16/AI_LMS",
    facialRecognition: "https://github.com/sc0rp10n16/FacialRecognitionSiameseNet",
    droNavNet: "https://github.com/sc0rp10n16/DroNavNet",
  },
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/about/writings", label: "Writing" },
  { href: "/contact", label: "Contact" },
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
    year: "2025–26",
    name: "Edmissions World CRM",
    href: "/work/edmissions-crm",
    external: false,
    cta: "Read case study",
    role: "Klinn AI's production staff CRM. I owned architecture, data model and delivery.",
    problem:
      "An education consultancy ran its admissions floor across spreadsheets, WhatsApp and memory. Five jobs — calling, qualification, documents, walk-ins, management — lived in five places.",
    built:
      "A private, role-based CRM: shared lead pipeline, telecaller qualification, counselor documents, reception walk-ins, WhatsApp templates, and an overnight job that reopens no-contact leads.",
    outcome: "In production. Admin, managers, telecallers, counselors and reception work one pipeline instead of three spreadsheets.",
    stack: ["Next.js 15", "TypeScript", "Firebase", "Cloud Functions", "LiveKit"],
  },
  {
    id: "metaflow",
    index: "02",
    kind: "Client · in progress",
    year: "2026",
    name: "Metaflow",
    href: site.links.metaflow,
    external: true,
    cta: "View source",
    role: "A multi-tenant website builder I am building for a client — templates, editor, billing, publish.",
    problem:
      "The client needed non-technical customers to stand up a professional site without a developer on every change, and without one tenant ever seeing another tenant's data.",
    built:
      "A SaaS control centre: pick a template, generate a category-shaped site, edit it on a Craft.js canvas, pay on Stripe, publish to a subdomain or custom domain. Postgres is tenant-scoped; an AI assistant drafts copy server-side.",
    outcome: "Ongoing. The product is the builder, not a one-off brochure — still in delivery.",
    stack: ["Next.js", "Postgres", "Stripe", "Craft.js", "GCP"],
  },
  {
    id: "genau",
    index: "03",
    kind: "Hobby · in progress",
    year: "2026",
    name: "Genau",
    href: site.links.genau,
    external: true,
    cta: "View source",
    role: "A native iOS German trainer I am building to learn the language and to practise speaking it.",
    problem:
      "Streak apps drill words I will never say at the Bürgeramt, and they go quiet the moment I actually need to talk. I wanted something I would open on the tram.",
    built:
      "A SwiftUI app on SwiftData: noun gender drills (der / die / das), verb flashcards, a dictionary I can seed, and spoken feedback so I hear the form. Conversation practice is the part I am adding next — the point of the project, not a badge.",
    outcome: "Ongoing. I use it to study German and to get the sentences into my mouth, not to keep a streak alive.",
    stack: ["SwiftUI", "SwiftData", "Speech", "iOS"],
  },
  {
    id: "pdf-buddy",
    index: "04",
    kind: "Hobby",
    year: "2024",
    name: "PDF Buddy",
    href: site.links.pdfBuddy,
    external: true,
    cta: "View source",
    role: "An earlier RAG experiment — upload a document, ask it questions, keep the thread.",
    problem:
      "Reading a long PDF still meant scrolling, grepping, and losing the thread. Chatbots that 'read' the file once had no memory.",
    built:
      "A Next.js app where you drop a document, LangChain chunks it into Pinecone, and Gemini (or OpenAI) answers with chat memory. Clerk for auth, Firebase for files.",
    outcome: "A working companion from 2024: summaries, multi-turn questions, and the document still on screen. I have since moved on.",
    stack: ["Next.js", "LangChain", "Gemini", "Pinecone", "Clerk"],
  },
  {
    id: "edmissions",
    index: "05",
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
    index: "06",
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
      "A navigation and control stack for indoor and outdoor flight: UWB ranging for absolute position, ORB-SLAM3 with a RealSense D435i, ROS for control, tuned against the airframe's own flapping period.",
    outcome:
      "Published as chapter 20 in Artificial Intelligence Applications in Aeronautical and Aerospace Engineering (Wiley, 2025).",
    stack: ["ROS", "ORB-SLAM3", "UWB", "Python", "Flight testing"],
  },
] as const;

export const alsoShipped = [
  { label: "AI LMS", href: site.links.aitut, note: "adaptive learning platform" },
  { label: "DroNavNet", href: site.links.droNavNet, note: "drone navigation nets" },
  { label: "Siamese face ID", href: site.links.facialRecognition, note: "one-shot embeddings" },
  { label: "Sriram Aero", href: site.links.sriram, note: "aerospace presence, 2025" },
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
  {
    period: "2022",
    role: "Research Intern, Dept. of ECE",
    org: "NIT Raipur",
    body: "Signal processing and deep learning on EEG time-series for brain–computer interfaces — preprocessing and feature extraction in Python.",
  },
  {
    period: "2020 — 24",
    role: "B.Tech. Electronics & Communication Engineering",
    org: "KL University",
    body: "Devices, signals, and the first drones. The undergraduate that got me into the hardware underneath the software.",
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
  year: "2025–26",
  lede: "A private staff CRM for an admissions floor that had no single answer to who owned a lead. This is the system that replaced the spreadsheets.",
  source: site.links.crm,
  facts: [
    { k: "Role", v: "Architecture, data model, delivery" },
    { k: "Type", v: "Private staff CRM — not a student portal" },
    { k: "Roles", v: "Admin, sales manager, telecaller, counselor, receptionist" },
    { k: "Status", v: "In production (v2)" },
  ],
  problem: [
    "Edmissions World places students into medical and undergraduate programmes abroad. The floor is a chain: a sales manager imports and assigns leads, a telecaller works the queue, a counselor takes the qualified student through documents and applications, reception records walk-ins. Overnight, yesterday's no-contact leads have to come back.",
    "None of that lived in one place. Telecallers worked spreadsheets. Counselors worked WhatsApp. Reception kept a notebook. Managers could not answer who owns this lead, or which follow-ups were missed this week, without someone spending an afternoon on it.",
  ],
  approach: [
    "I sat with the floor instead of a CRM template. The unit of work is the lead: assigned to a telecaller, optionally to a team, with an explicit status machine — new, in progress, no-contact, three follow-up stages, qualified, counselor-assigned.",
    "Each staff role gets a different surface of the same records. Managers import and distribute (round-robin, capacity or performance) with daily caps. Telecallers call, note, schedule follow-ups, mark DNP, and qualify to a named counselor. Counselors work documents and application status on that same record. Reception creates walk-ins. A Cloud Function at 00:05 Asia/Kolkata moves yesterday's NoContact leads back into Follow-up 1 so DNP does not silently die.",
  ],
  decisions: [
    {
      title: "Roles before features.",
      body: "Five live roles — admin, sales manager, telemarketer, counselor, receptionist — each with path-level RBAC. A leftover student dashboard exists in code and is not shipped.",
    },
    {
      title: "The lead is the record.",
      body: "Owner, team, source, notes, follow-up date, counselor handoff and application progress live on one object, so 'where is this student' has one answer.",
    },
    {
      title: "Automate the babysitting.",
      body: "No-contact leads reopen overnight. WhatsApp templates cover the messages the floor already sent by hand: documents, fees, visa, confirmation.",
    },
  ],
  modules: [
    {
      title: "Lead pipeline",
      body: "CSV import and assignment with round-robin, capacity or performance distribution, daily caps and team quotas. Statuses run from new through follow-up, qualified and counselor-assigned. Managers get a DNP list they can search, export and delete.",
    },
    {
      title: "Telecaller floor",
      body: "Assigned queues, call notes, follow-up scheduling, missed-follow-up views, daily quota, and a qualify step that writes counselorId onto the lead. Attendance clock-in sits next to the queue.",
    },
    {
      title: "Counselor book",
      body: "Qualified and counselor-assigned leads, document upload to Firebase Storage, application status (draft → documents pending → under review → additional docs → completed), and meeting scheduling.",
    },
    {
      title: "Reception and staff ops",
      body: "Walk-in create and counselor assign on the receptionist dashboard. Leave with a manager → admin hierarchy and SMTP notifications. Admin reports, LiveKit screen share for the calling floor, and in-app help in English, Hindi and Telugu.",
    },
  ],
  outcome:
    "The consultancy now runs its admissions cycle out of the CRM rather than alongside it. Five roles share one pipeline. The two questions that used to take an afternoon — who owns this lead, which follow-ups were missed — have a screen.",
  change:
    "Application progress still mutates the lead rather than sitting in a first-class collection. Leave is still two stacks. I would have split applications earlier and killed the legacy leave API before the second year of production — retrofitting both later costs more than building them would have.",
} as const;

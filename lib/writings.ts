import { site } from "@/lib/site";

export type WritingSection = {
  heading: string;
  paragraphs: string[];
};

export type WritingPost = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  lede: string;
  sections: WritingSection[];
};

export const writings: WritingPost[] = [
  {
    slug: "why-the-crm-had-to-look-like-a-spreadsheet",
    title: "Why the CRM had to look like a spreadsheet",
    description:
      "How Klinn AI's Edmissions World CRM replaced spreadsheets without pretending the admissions floor wanted a kanban. Architecture, roles, and the lead as a row.",
    tag: "Platforms",
    date: "2026-03-18",
    lede:
      "The admissions floor already had a database. It was a spreadsheet. The mistake would have been to replace it with something that looked like a product.",
    sections: [
      {
        heading: "Five jobs, five places",
        paragraphs: [
          "At [Edmissions World](https://edmissionsworld.com), a sales manager imports leads, a telecaller works a queue, a counselor takes the qualified student through documents, reception records walk-ins, and overnight the no-contact names have to come back. None of that is a 'user journey'. It is a floor.",
          "When I sat with them, telecallers were in sheets. Counselors were in WhatsApp. Reception had a notebook. Managers could not answer who owns this lead, or which follow-ups were missed this week, without someone spending an afternoon on it. That is not a feature gap. That is a missing record.",
          "I co-founded [Klinn AI](https://www.klinnai.com) to build software for operations that cannot afford theatre. This was the first production system that had to survive a Tuesday in Hyderabad rather than a demo.",
        ],
      },
      {
        heading: "A row is a better primitive than a card",
        paragraphs: [
          "Most CRMs sell a pipeline as cards on a board. Cards feel like progress. The floor does not think in cards. They think in rows: name, owner, status, next date, notes. Density matters. A telecaller with a daily cap needs forty names on one screen, not eight pretty tiles.",
          "So the unit of work is the lead, and the lead looks like a row. Owner, team, source, follow-up date, counselor handoff, application progress — one object, so 'where is this student' has one answer. Statuses are a machine, not labels: new, in progress, no-contact, three follow-up stages, qualified, counselor-assigned.",
          "That is why the interface had to stay close to a sheet. Not because we failed to design. Because the people who would live in it already knew how to scan a grid, jump a cell, and argue about a column. Changing the data model without changing the posture would have been cruelty.",
        ],
      },
      {
        heading: "Roles before features",
        paragraphs: [
          "Five live roles share that row and see different columns of it. Admin and sales managers import CSV, assign with round-robin, capacity or performance, and hold daily caps. Telecallers call, note, schedule follow-ups, mark DNP, and qualify onto a named counselor. Counselors work documents and application status on the same record. Reception creates walk-ins. Path-level RBAC keeps a leftover student dashboard in the repo and out of production.",
          "The babysitting is automated. A Cloud Function at 00:05 Asia/Kolkata moves yesterday's NoContact leads back into Follow-up 1, so DNP does not silently die. WhatsApp templates cover the messages the floor already sent by hand: documents, fees, visa, confirmation.",
          "I wrote this up as the [Edmissions World CRM case study](/work/edmissions-crm) because the interesting part is not Firebase or Next.js 15. It is that the product had to look like the tool it replaced, or the floor would keep the tool it replaced. The CRM is live at [crm.edmissionsworld.com](https://crm.edmissionsworld.com).",
        ],
      },
      {
        heading: "What a sheet still teaches",
        paragraphs: [
          "Application progress still mutates the lead rather than sitting in a first-class collection. Leave is still two stacks. I would have split applications earlier. Retrofitting both later costs more than building them would have.",
          "The lesson I keep: if the work already lives in a grid, do not invent a metaphor. Give them the grid with an owner, a status machine, and a job that runs at midnight. Software for operations is allowed to be dense. It is not allowed to be cute.",
          "The public site that feeds this pipeline is a different job — [client SEO landings](/work) that turn an enquiry into a row. The CRM is what happens after the row exists.",
        ],
      },
    ],
  },
  {
    slug: "tuning-slam-against-a-flapping-period",
    title: "Tuning SLAM against a flapping period",
    description:
      "Indoor and outdoor navigation for flapping-wing UAVs at TiHAN–IIT Hyderabad: why quadrotor SLAM fails on an ornithopter, and how UWB, ORB-SLAM3 and ROS were tuned to the airframe.",
    tag: "Autonomy",
    date: "2025-06-24",
    lede:
      "A quadrotor is a bad model of a bird. Pose estimation that works on one will lie on the other, and indoors there is no GPS to catch the lie.",
    sections: [
      {
        heading: "The platform is the noise source",
        paragraphs: [
          "At [TiHAN — IIT Hyderabad](/about), India's autonomous navigation hub, I worked on bio-inspired flight: autonomous ornithopters. Flapping-wing UAVs oscillate along every axis by design. The airframe is not a disturbance you filter out. It is the propulsion.",
          "Visual-inertial SLAM on a quadrotor assumes the body is relatively well-behaved between frames. On an ornithopter the camera itself is on a periodic shake. ORB-SLAM3 with a RealSense D435i still sees features. It just sees them moving for a reason the filter did not budget for.",
          "GPS-denied indoor flight removes the usual fallback. If the map drifts, you hit a wall. Outdoor flight is not automatically easier: the same flapping period is still in the IMU.",
        ],
      },
      {
        heading: "Absolute position, then the map",
        paragraphs: [
          "We used UWB ranging for absolute position — a second opinion the vision stack could not talk itself out of. ROS held the control loop. The work was less 'run SLAM' than tune against the airframe's own flapping period: what you can trust in the residual, what you have to treat as the wingbeat, and when to believe the UWB over the map.",
          "That is a systems problem wearing a research badge. Sensors are poor. The platform is unhelpful. The control has to survive both. It is still the problem I find hardest to put down, which is why it sits on the [About](/about) page.",
          "The stack, in the order it actually mattered: the airframe, the period, UWB, ORB-SLAM3, ROS, then Python for the glue and the logs from flight tests. Papers reverse that order. Flight does not.",
        ],
      },
      {
        heading: "What got published",
        paragraphs: [
          "The result is [chapter 20 in Artificial Intelligence Applications in Aeronautical and Aerospace Engineering](https://doi.org/10.1002/9781394268795.ch20) (Wiley, 2025): 'Navigation of Unconventional Drones — Autonomous Ornithopter', with S. Syam Narayanan, P. Rajalakshmi, Y. Gangurde, S. Movidi, and me.",
          "A chapter is a clean story. The weeks were not. Indoor tests fail for reasons that look like software until you watch the wing. Outdoor tests fail for reasons that look like wind until you look at the residual at the flapping frequency. The write-up is the part where we admitted which of those we had actually understood.",
          "If you are coming from product software, the temptation is to treat SLAM as a library. On this vehicle it is a contract with a periodic plant. Break the contract and the map is fiction.",
        ],
      },
      {
        heading: "Why I still care",
        paragraphs: [
          "I later spent a year as an associate AI engineer at OSCOWL, then started shipping production platforms at Klinn AI. The ornithopter is the other end of that line: autonomy under constraint, not a demo in a gym.",
          "The master's at OVGU is me going down a layer on purpose. Navigation software sits on devices. Devices sit on physics. I wrote a companion piece on [what a software engineer misinterprets about device physics](/writings/what-a-software-engineer-misinterprets-about-device-physics) because that gap is the reason I left Hyderabad for Magdeburg.",
          "The paper is the artefact. The lesson is smaller: if the platform oscillates, your estimator has to know the period. Otherwise you are localising a bird as if it were a brick.",
        ],
      },
    ],
  },
  {
    slug: "what-a-software-engineer-misinterprets-about-device-physics",
    title: "What a software engineer misinterprets about device physics",
    description:
      "After shipping production software and publishing on UAV navigation, why a master's in Advanced Semiconductor Nanotechnologies at OVGU Magdeburg is the layer I kept skipping.",
    tag: "Silicon",
    date: "2026-09-08",
    lede:
      "I spent two years treating inference cost as a software problem. It is, until you need the arithmetic to happen where the data already sits.",
    sections: [
      {
        heading: "The layer I kept skipping",
        paragraphs: [
          "Most of the last two years went into shipping. [Klinn AI](https://www.klinnai.com) is production CRMs, a multi-tenant builder, SEO sites that have to rank. Before that: applied AI at OSCOWL in Hyderabad's deep-tech pocket, and bio-inspired drones at TiHAN. The master's at OVGU Magdeburg — Advanced Semiconductor Nanotechnologies — is the layer I kept walking around.",
          "A software engineer can get very good at models and products without ever touching a device. You learn to talk about GPUs as rent, latency as a budget, and 'the hardware' as a constraint handed down from someone else. That is a reasonable way to ship. It is a poor way to understand why the bill looks like that.",
          "Device physics is not a slower version of systems engineering. Fabrication and characterisation have their own failure modes. A process window is not an API. A wafer does not retry.",
        ],
      },
      {
        heading: "Inference cost has two ends",
        paragraphs: [
          "At OSCOWL the work sat across speech models, UAVs and custom silicon — research that had to survive contact with a product. The software instinct is to compress, quantise, batch, and cache. All of that is real. None of it changes the fact that you are still moving data to the arithmetic.",
          "Neuromorphic and in-memory compute are the other end of the same problem: devices that do the arithmetic where the data already sits. I have spent two years on the software side of that cost. I want to be genuinely good at the measurement side — nanoscale device characterisation, not just the slides about it.",
          "That is the doctoral work I am looking for: the boundary between device physics and the systems built on top of it. Not a career change. A missing layer.",
        ],
      },
      {
        heading: "What product work hides",
        paragraphs: [
          "Shipping an [Edmissions World CRM](/writings/why-the-crm-had-to-look-like-a-spreadsheet) teaches you about roles, status machines, and midnight jobs. Publishing on [ornithopter navigation](/writings/tuning-slam-against-a-flapping-period) teaches you about estimators that have to respect a plant. Neither teaches you what a device is doing when a multiply happens.",
          "The misinterpretation is not that software is shallow. It is that we treat the stack as if it ended at CUDA. Below that there is still a transistor, a dielectric, a contact, a measurement that may not agree with the model. OVGU is where I am supposed to stop hand-waving that.",
          "I wrote the [About](/about) page around this on purpose. Path, publication, interests — neuromorphic compute, nanoscale characterisation, autonomy under constraint. The writings exist so those claims have arguments, not just a kicker.",
        ],
      },
      {
        heading: "Magdeburg, on purpose",
        paragraphs: [
          "I am in Magdeburg because the programme is fabrication and characterisation, not another year of shipping. Models and products are downstream of devices. I already know how to ship. I do not yet know this layer well enough to be useful at it.",
          "If you work in software and you feel the bill in your bones, that feeling is pointing at physics. You can ignore it and keep making products. I did, for two years. Then I booked the master's.",
        ],
      },
    ],
  },
];

export function getWriting(slug: string): WritingPost | undefined {
  return writings.find((post) => post.slug === slug);
}

export function writingPath(slug: string): string {
  return `/writings/${slug}`;
}

export function relatedWritings(slug: string): WritingPost[] {
  return writings.filter((post) => post.slug !== slug);
}

export function writingWordCount(post: WritingPost): number {
  const body = [
    post.lede,
    ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
  ].join(" ");
  return body.split(/\s+/).filter((word) => word.length > 0).length;
}

export function readingMinutes(post: WritingPost): number {
  return Math.max(1, Math.round(writingWordCount(post) / 220));
}

export function formatWritingDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00.000Z`));
}

export const writingsIndex = {
  title: "Writings",
  description: `Essays by ${site.name} on production platforms, autonomous flight, and the device physics underneath both.`,
} as const;

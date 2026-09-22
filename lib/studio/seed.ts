import { cases, essay, path, publication, site } from "@/lib/site";
import {
  emptyResumeData,
  newItemId,
  type ResumeData,
  type SkillGroup,
} from "@/lib/studio/resume";

function isEducation(role: string): boolean {
  return role.includes("MSc") || role.includes("B.Tech");
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

export function seedResumeData(): ResumeData {
  const blank = emptyResumeData();
  const experience = path.filter((row) => !isEducation(row.role));
  const education = path.filter((row) => isEducation(row.role));

  const softwareStacks = unique(
    cases
      .filter((item) => item.id !== "ornithopter")
      .flatMap((item) => [...item.stack]),
  );
  const researchStacks = unique(
    cases
      .filter((item) => item.id === "ornithopter")
      .flatMap((item) => [...item.stack]),
  );

  const skills: SkillGroup[] = [
    {
      id: newItemId(),
      group: "Software",
      items: softwareStacks.join(", "),
    },
    {
      id: newItemId(),
      group: "Research",
      items: researchStacks.join(", "),
    },
  ];

  return {
    ...blank,
    name: site.name,
    headline: site.role,
    location: site.location,
    email: site.email,
    phone: "",
    website: site.url.replace(/^https:\/\//, ""),
    linkedin: site.links.linkedin,
    github: site.links.github,
    summary: essay,
    experience: experience.map((row) => ({
      id: newItemId(),
      company: row.org,
      role: row.role,
      location: "",
      start: row.period,
      end: "",
      bullets: [row.body],
    })),
    education: education.map((row) => ({
      id: newItemId(),
      school: row.org,
      degree: row.role,
      location: "",
      start: row.period,
      end: "",
      notes: row.body,
    })),
    projects: cases.map((item) => ({
      id: newItemId(),
      name: item.name,
      href: item.external ? item.href : `${site.url}${item.href}`,
      bullets: [item.role, item.outcome].filter((line) => line.length > 0),
    })),
    skills,
    extras: [
      {
        id: newItemId(),
        title: publication.title,
        body: `${publication.book} — ${publication.publisher}, ${publication.year}. ${publication.note}`,
        href: publication.href,
      },
    ],
  };
}

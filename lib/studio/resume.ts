export const TEMPLATE_IDS = ["ats-classic", "ats-compact"] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  notes: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  href: string;
  bullets: string[];
};

export type SkillGroup = {
  id: string;
  group: string;
  items: string;
};

export type ExtraItem = {
  id: string;
  title: string;
  body: string;
  href: string;
};

export type ResumeData = {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  extras: ExtraItem[];
};

export type ResumeListItem = {
  _id: string;
  title: string;
  templateId: TemplateId;
  updatedAt: number;
};

export type ResumeRecord = ResumeListItem & {
  data: ResumeData;
  createdAt: number;
};

export function newItemId(): string {
  return crypto.randomUUID();
}

export function emptyExperience(): ExperienceItem {
  return {
    id: newItemId(),
    company: "",
    role: "",
    location: "",
    start: "",
    end: "",
    bullets: [""],
  };
}

export function emptyEducation(): EducationItem {
  return {
    id: newItemId(),
    school: "",
    degree: "",
    location: "",
    start: "",
    end: "",
    notes: "",
  };
}

export function emptyProject(): ProjectItem {
  return {
    id: newItemId(),
    name: "",
    href: "",
    bullets: [""],
  };
}

export function emptySkillGroup(): SkillGroup {
  return {
    id: newItemId(),
    group: "",
    items: "",
  };
}

export function emptyExtra(): ExtraItem {
  return {
    id: newItemId(),
    title: "",
    body: "",
    href: "",
  };
}

export function emptyResumeData(): ResumeData {
  return {
    name: "",
    headline: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    experience: [emptyExperience()],
    education: [emptyEducation()],
    projects: [],
    skills: [emptySkillGroup()],
    extras: [],
  };
}

export function isTemplateId(value: string): value is TemplateId {
  return TEMPLATE_IDS.some((id) => id === value);
}

export function templateLabel(id: TemplateId): string {
  return id === "ats-classic" ? "ATS Classic" : "ATS Compact";
}

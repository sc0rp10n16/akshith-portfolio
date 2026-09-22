import type { ResumeData, TemplateId } from "@/lib/studio/resume";

export type TemplateTokens = {
  pagePad: number;
  nameSize: number;
  headlineSize: number;
  bodySize: number;
  sectionSize: number;
  gap: number;
  lineHeight: number;
};

export const templateTokens: Record<TemplateId, TemplateTokens> = {
  "ats-classic": {
    pagePad: 48,
    nameSize: 22,
    headlineSize: 11,
    bodySize: 10,
    sectionSize: 11,
    gap: 10,
    lineHeight: 1.38,
  },
  "ats-compact": {
    pagePad: 32,
    nameSize: 18,
    headlineSize: 10,
    bodySize: 9,
    sectionSize: 10,
    gap: 7,
    lineHeight: 1.32,
  },
};

export function contactLine(data: ResumeData): string {
  return [
    data.location,
    data.email,
    data.phone,
    data.website,
    data.linkedin,
    data.github,
  ]
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
    .join("  ·  ");
}

export function filledLines(values: string[]): string[] {
  return values.map((value) => value.trim()).filter((value) => value.length > 0);
}

export function pdfFilename(title: string): string {
  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "resume";
  return `${slug}.pdf`;
}

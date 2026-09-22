import { v } from "convex/values";

export const templateIdValidator = v.union(
  v.literal("ats-classic"),
  v.literal("ats-compact"),
);

export const resumeDataValidator = v.object({
  name: v.string(),
  headline: v.string(),
  location: v.string(),
  email: v.string(),
  phone: v.string(),
  website: v.string(),
  linkedin: v.string(),
  github: v.string(),
  summary: v.string(),
  experience: v.array(
    v.object({
      id: v.string(),
      company: v.string(),
      role: v.string(),
      location: v.string(),
      start: v.string(),
      end: v.string(),
      bullets: v.array(v.string()),
    }),
  ),
  education: v.array(
    v.object({
      id: v.string(),
      school: v.string(),
      degree: v.string(),
      location: v.string(),
      start: v.string(),
      end: v.string(),
      notes: v.string(),
    }),
  ),
  projects: v.array(
    v.object({
      id: v.string(),
      name: v.string(),
      href: v.string(),
      bullets: v.array(v.string()),
    }),
  ),
  skills: v.array(
    v.object({
      id: v.string(),
      group: v.string(),
      items: v.string(),
    }),
  ),
  extras: v.array(
    v.object({
      id: v.string(),
      title: v.string(),
      body: v.string(),
      href: v.string(),
    }),
  ),
});

export const resumeListItemValidator = v.object({
  _id: v.id("resumes"),
  title: v.string(),
  templateId: templateIdValidator,
  updatedAt: v.number(),
});

export const resumeRecordValidator = v.object({
  _id: v.id("resumes"),
  title: v.string(),
  templateId: templateIdValidator,
  data: resumeDataValidator,
  createdAt: v.number(),
  updatedAt: v.number(),
});

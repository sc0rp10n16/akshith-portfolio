import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { ResumeData, TemplateId } from "@/lib/studio/resume";

function studioSecret(): string {
  const secret = process.env.CONVEX_STUDIO_SECRET;
  if (!secret) {
    throw new Error("CONVEX_STUDIO_SECRET is not set");
  }
  return secret;
}

function convexUrl(): string {
  const url = process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error("CONVEX_URL is not set");
  }
  return url;
}

function client(): ConvexHttpClient {
  return new ConvexHttpClient(convexUrl());
}

export async function listResumes() {
  return await client().query(api.resumes.list, { secret: studioSecret() });
}

export async function getResume(id: string) {
  return await client().query(api.resumes.get, {
    secret: studioSecret(),
    id: id as Id<"resumes">,
  });
}

export async function createResume(input: {
  title: string;
  templateId: TemplateId;
  data: ResumeData;
}) {
  return await client().mutation(api.resumes.create, {
    secret: studioSecret(),
    title: input.title,
    templateId: input.templateId,
    data: input.data,
    now: Date.now(),
  });
}

export async function updateResume(input: {
  id: string;
  title: string;
  templateId: TemplateId;
  data: ResumeData;
}) {
  await client().mutation(api.resumes.update, {
    secret: studioSecret(),
    id: input.id as Id<"resumes">,
    title: input.title,
    templateId: input.templateId,
    data: input.data,
    now: Date.now(),
  });
}

export async function duplicateResume(id: string, title: string) {
  return await client().mutation(api.resumes.duplicate, {
    secret: studioSecret(),
    id: id as Id<"resumes">,
    title,
    now: Date.now(),
  });
}

export async function deleteResume(id: string) {
  await client().mutation(api.resumes.remove, {
    secret: studioSecret(),
    id: id as Id<"resumes">,
  });
}

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireStudioSession } from "@/lib/studio/auth";
import {
  createResume,
  deleteResume,
  duplicateResume,
  updateResume,
} from "@/lib/studio/convex";
import { passwordMatches } from "@/lib/studio/password";
import { emptyResumeData, isTemplateId } from "@/lib/studio/resume";
import { seedResumeData } from "@/lib/studio/seed";
import {
  createSessionToken,
  STUDIO_COOKIE,
  studioCookieOptions,
} from "@/lib/studio/session";

export async function loginStudio(
  _prev: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    return { error: "Wrong password." };
  }

  const token = await createSessionToken();
  (await cookies()).set(STUDIO_COOKIE, token, studioCookieOptions());
  redirect("/studio/resumes");
}

export async function logoutStudio() {
  (await cookies()).set(STUDIO_COOKIE, "", {
    ...studioCookieOptions(),
    maxAge: 0,
  });
  redirect("/studio");
}

export async function createSeededResume() {
  await requireStudioSession();
  const id = await createResume({
    title: "Akshith — base",
    templateId: "ats-classic",
    data: seedResumeData(),
  });
  redirect(`/studio/resumes/${id}`);
}

export async function createBlankResume() {
  await requireStudioSession();
  const id = await createResume({
    title: "Untitled",
    templateId: "ats-classic",
    data: emptyResumeData(),
  });
  redirect(`/studio/resumes/${id}`);
}

export async function saveResume(input: {
  id: string;
  title: string;
  templateId: string;
  data: ReturnType<typeof emptyResumeData>;
}) {
  await requireStudioSession();
  if (!isTemplateId(input.templateId)) {
    throw new Error("Unknown template");
  }

  await updateResume({
    id: input.id,
    title: input.title.trim() || "Untitled",
    templateId: input.templateId,
    data: input.data,
  });
}

export async function duplicateResumeAction(id: string, title: string) {
  await requireStudioSession();
  const nextId = await duplicateResume(id, `${title} copy`);
  redirect(`/studio/resumes/${nextId}`);
}

export async function deleteResumeAction(id: string) {
  await requireStudioSession();
  await deleteResume(id);
  redirect("/studio/resumes");
}

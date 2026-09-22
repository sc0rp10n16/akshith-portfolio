import { ResumeEditor } from "@/components/studio/resume-editor";
import { requireStudioSession } from "@/lib/studio/auth";
import { getResume } from "@/lib/studio/convex";
import { notFound } from "next/navigation";

export default async function ResumeEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireStudioSession();
  const { id } = await params;
  const resume = await getResume(id);

  if (!resume) {
    notFound();
  }

  return <ResumeEditor resume={resume} />;
}

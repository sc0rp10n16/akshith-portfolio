import {
  createBlankResume,
  createSeededResume,
} from "@/app/studio/actions";
import { ResumeList } from "@/components/studio/resume-list";
import { StudioChrome } from "@/components/studio/studio-chrome";
import { requireStudioSession } from "@/lib/studio/auth";
import { listResumes } from "@/lib/studio/convex";

export const dynamic = "force-dynamic";

export default async function ResumeIndexPage() {
  await requireStudioSession();

  let resumes: Awaited<ReturnType<typeof listResumes>> = [];
  let loadError: string | null = null;
  try {
    resumes = await listResumes();
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load resumes";
  }

  return (
    <>
      <StudioChrome title="Versions">
        <form action={createSeededResume}>
          <button className="btn btn-fill" type="submit">
            New from site
          </button>
        </form>
        <form action={createBlankResume}>
          <button className="btn btn-line" type="submit">
            Blank
          </button>
        </form>
      </StudioChrome>
      <main className="mx-auto w-full max-w-4xl px-[clamp(1.25rem,4vw,2rem)] py-10">
        {loadError ? (
          <p className="m-0 max-w-[52ch] text-signal" role="alert">
            {loadError}
          </p>
        ) : (
          <ResumeList resumes={resumes} />
        )}
      </main>
    </>
  );
}

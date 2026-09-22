import { deleteResumeAction, duplicateResumeAction } from "@/app/studio/actions";
import { templateLabel, type ResumeListItem } from "@/lib/studio/resume";
import Link from "next/link";

function formatUpdated(value: number): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export function ResumeList({ resumes }: { resumes: ResumeListItem[] }) {
  if (resumes.length === 0) {
    return (
      <p className="m-0 max-w-[46ch] text-muted">
        No versions yet. Seed one from the site, or start blank.
      </p>
    );
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-px border border-line bg-line p-0">
      {resumes.map((resume) => (
        <li key={resume._id} className="bg-bg px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/studio/resumes/${resume._id}`}
              className="min-w-0 flex-1 text-fg no-underline"
            >
              <p className="m-0 font-bold leading-tight">{resume.title}</p>
              <p className="kicker mt-2 m-0">
                {templateLabel(resume.templateId)} · {formatUpdated(resume.updatedAt)}
              </p>
            </Link>
            <div className="flex flex-wrap gap-2">
              <form action={duplicateResumeAction.bind(null, resume._id, resume.title)}>
                <button className="btn btn-line" type="submit">
                  Duplicate
                </button>
              </form>
              <form action={deleteResumeAction.bind(null, resume._id)}>
                <button className="btn btn-ghost" type="submit">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import {
  deleteResumeAction,
  duplicateResumeAction,
  saveResume,
} from "@/app/studio/actions";
import { ResumePdf } from "@/components/studio/resume-pdf";
import { ResumePreview } from "@/components/studio/resume-preview";
import { StudioChrome } from "@/components/studio/studio-chrome";
import {
  emptyEducation,
  emptyExperience,
  emptyExtra,
  emptyProject,
  emptySkillGroup,
  TEMPLATE_IDS,
  templateLabel,
  type EducationItem,
  type ExperienceItem,
  type ExtraItem,
  type ProjectItem,
  type ResumeData,
  type ResumeRecord,
  type TemplateId,
} from "@/lib/studio/resume";
import { pdfFilename } from "@/lib/studio/templates";

type SaveState = "idle" | "saving" | "saved" | "error";

export function ResumeEditor({ resume }: { resume: ResumeRecord }) {
  const [title, setTitle] = useState(resume.title);
  const [templateId, setTemplateId] = useState<TemplateId>(resume.templateId);
  const [data, setData] = useState<ResumeData>(resume.data);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [exporting, setExporting] = useState(false);
  const snapshot = useRef(
    JSON.stringify({
      title: resume.title,
      templateId: resume.templateId,
      data: resume.data,
    }),
  );
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const next = JSON.stringify({ title, templateId, data });
    if (next === snapshot.current) {
      return;
    }

    setSaveState("saving");
    const timeout = window.setTimeout(() => {
      void saveResume({
        id: resume._id,
        title,
        templateId,
        data,
      })
        .then(() => {
          snapshot.current = next;
          setSaveState("saved");
        })
        .catch(() => setSaveState("error"));
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [data, resume._id, templateId, title]);

  async function exportPdf() {
    setExporting(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(
        <ResumePdf data={data} templateId={templateId} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = pdfFilename(title);
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setSaveState("error");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="min-h-full">
      <StudioChrome title={title || "Untitled"}>
        <p className="kicker m-0">
          {saveState === "saving" ? "Saving" : null}
          {saveState === "saved" ? "Saved" : null}
          {saveState === "error" ? "Save failed" : null}
        </p>
        <div className="flex border border-line">
          {TEMPLATE_IDS.map((id) => (
            <button
              key={id}
              className={`btn ${templateId === id ? "btn-fill" : "btn-ghost"}`}
              type="button"
              onClick={() => setTemplateId(id)}
            >
              {templateLabel(id)}
            </button>
          ))}
        </div>
        <button className="btn btn-signal" type="button" onClick={() => void exportPdf()}>
          {exporting ? "Exporting" : "Export PDF"}
        </button>
        <button
          className="btn btn-line"
          disabled={pending}
          type="button"
          onClick={() =>
            startTransition(() => duplicateResumeAction(resume._id, title))
          }
        >
          Duplicate
        </button>
        <button
          className="btn btn-ghost"
          disabled={pending}
          type="button"
          onClick={() => {
            if (window.confirm("Delete this version?")) {
              startTransition(() => deleteResumeAction(resume._id));
            }
          }}
        >
          Delete
        </button>
      </StudioChrome>

      <div className="grid gap-0 lg:grid-cols-[minmax(22rem,28rem)_1fr]">
        <form
          className="flex flex-col gap-8 overflow-y-auto border-r border-line px-[clamp(1.25rem,3vw,2rem)] py-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field label="Version title">
            <input
              className="studio-input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Field>

          <Section title="Basics">
            <Field label="Name">
              <input
                className="studio-input"
                value={data.name}
                onChange={(event) =>
                  setData({ ...data, name: event.target.value })
                }
              />
            </Field>
            <Field label="Headline">
              <input
                className="studio-input"
                value={data.headline}
                onChange={(event) =>
                  setData({ ...data, headline: event.target.value })
                }
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Location">
                <input
                  className="studio-input"
                  value={data.location}
                  onChange={(event) =>
                    setData({ ...data, location: event.target.value })
                  }
                />
              </Field>
              <Field label="Email">
                <input
                  className="studio-input"
                  value={data.email}
                  onChange={(event) =>
                    setData({ ...data, email: event.target.value })
                  }
                />
              </Field>
              <Field label="Phone">
                <input
                  className="studio-input"
                  value={data.phone}
                  onChange={(event) =>
                    setData({ ...data, phone: event.target.value })
                  }
                />
              </Field>
              <Field label="Website">
                <input
                  className="studio-input"
                  value={data.website}
                  onChange={(event) =>
                    setData({ ...data, website: event.target.value })
                  }
                />
              </Field>
              <Field label="LinkedIn">
                <input
                  className="studio-input"
                  value={data.linkedin}
                  onChange={(event) =>
                    setData({ ...data, linkedin: event.target.value })
                  }
                />
              </Field>
              <Field label="GitHub">
                <input
                  className="studio-input"
                  value={data.github}
                  onChange={(event) =>
                    setData({ ...data, github: event.target.value })
                  }
                />
              </Field>
            </div>
          </Section>

          <Section title="Summary">
            <textarea
              className="studio-input min-h-32"
              value={data.summary}
              onChange={(event) =>
                setData({ ...data, summary: event.target.value })
              }
            />
          </Section>

          <Section
            title="Experience"
            onAdd={() =>
              setData({ ...data, experience: [...data.experience, emptyExperience()] })
            }
          >
            {data.experience.map((row, index) => (
              <ExperienceFields
                key={row.id}
                row={row}
                onChange={(next) =>
                  setData({
                    ...data,
                    experience: data.experience.map((item, itemIndex) =>
                      itemIndex === index ? next : item,
                    ),
                  })
                }
                onRemove={() =>
                  setData({
                    ...data,
                    experience: data.experience.filter((_, itemIndex) => itemIndex !== index),
                  })
                }
              />
            ))}
          </Section>

          <Section
            title="Education"
            onAdd={() =>
              setData({ ...data, education: [...data.education, emptyEducation()] })
            }
          >
            {data.education.map((row, index) => (
              <EducationFields
                key={row.id}
                row={row}
                onChange={(next) =>
                  setData({
                    ...data,
                    education: data.education.map((item, itemIndex) =>
                      itemIndex === index ? next : item,
                    ),
                  })
                }
                onRemove={() =>
                  setData({
                    ...data,
                    education: data.education.filter((_, itemIndex) => itemIndex !== index),
                  })
                }
              />
            ))}
          </Section>

          <Section
            title="Projects"
            onAdd={() =>
              setData({ ...data, projects: [...data.projects, emptyProject()] })
            }
          >
            {data.projects.map((row, index) => (
              <ProjectFields
                key={row.id}
                row={row}
                onChange={(next) =>
                  setData({
                    ...data,
                    projects: data.projects.map((item, itemIndex) =>
                      itemIndex === index ? next : item,
                    ),
                  })
                }
                onRemove={() =>
                  setData({
                    ...data,
                    projects: data.projects.filter((_, itemIndex) => itemIndex !== index),
                  })
                }
              />
            ))}
          </Section>

          <Section
            title="Skills"
            onAdd={() =>
              setData({ ...data, skills: [...data.skills, emptySkillGroup()] })
            }
          >
            {data.skills.map((row, index) => (
              <div key={row.id} className="border border-line p-4">
                <div className="mb-3 flex justify-end">
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        skills: data.skills.filter((_, itemIndex) => itemIndex !== index),
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-3">
                  <Field label="Group">
                    <input
                      className="studio-input"
                      value={row.group}
                      onChange={(event) =>
                        setData({
                          ...data,
                          skills: data.skills.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, group: event.target.value }
                              : item,
                          ),
                        })
                      }
                    />
                  </Field>
                  <Field label="Items">
                    <input
                      className="studio-input"
                      value={row.items}
                      onChange={(event) =>
                        setData({
                          ...data,
                          skills: data.skills.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, items: event.target.value }
                              : item,
                          ),
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
            ))}
          </Section>

          <Section
            title="Additional"
            onAdd={() =>
              setData({ ...data, extras: [...data.extras, emptyExtra()] })
            }
          >
            {data.extras.map((row, index) => (
              <ExtraFields
                key={row.id}
                row={row}
                onChange={(next) =>
                  setData({
                    ...data,
                    extras: data.extras.map((item, itemIndex) =>
                      itemIndex === index ? next : item,
                    ),
                  })
                }
                onRemove={() =>
                  setData({
                    ...data,
                    extras: data.extras.filter((_, itemIndex) => itemIndex !== index),
                  })
                }
              />
            ))}
          </Section>
        </form>

        <div className="studio-preview-pane overflow-auto px-4 py-8 lg:px-8">
          <div className="studio-preview-scale origin-top">
            <ResumePreview data={data} templateId={templateId} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd?: () => void;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="kicker kicker-signal m-0">{title}</h2>
        {onAdd ? (
          <button className="btn btn-line" type="button" onClick={onAdd}>
            Add
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="kicker mb-2 block">{label}</span>
      {children}
    </label>
  );
}

function BulletEditor({
  bullets,
  onChange,
}: {
  bullets: string[];
  onChange: (bullets: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="kicker">Bullets</span>
      {bullets.map((bullet, index) => (
        <div key={index} className="flex gap-2">
          <input
            className="studio-input"
            value={bullet}
            onChange={(event) =>
              onChange(
                bullets.map((item, itemIndex) =>
                  itemIndex === index ? event.target.value : item,
                ),
              )
            }
          />
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() =>
              onChange(bullets.filter((_, itemIndex) => itemIndex !== index))
            }
          >
            ×
          </button>
        </div>
      ))}
      <button
        className="btn btn-line self-start"
        type="button"
        onClick={() => onChange([...bullets, ""])}
      >
        Add bullet
      </button>
    </div>
  );
}

function ExperienceFields({
  row,
  onChange,
  onRemove,
}: {
  row: ExperienceItem;
  onChange: (row: ExperienceItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border border-line p-4">
      <div className="flex justify-end">
        <button className="btn btn-ghost" type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
      <Field label="Role">
        <input
          className="studio-input"
          value={row.role}
          onChange={(event) => onChange({ ...row, role: event.target.value })}
        />
      </Field>
      <Field label="Company">
        <input
          className="studio-input"
          value={row.company}
          onChange={(event) => onChange({ ...row, company: event.target.value })}
        />
      </Field>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Location">
          <input
            className="studio-input"
            value={row.location}
            onChange={(event) => onChange({ ...row, location: event.target.value })}
          />
        </Field>
        <Field label="Start">
          <input
            className="studio-input"
            value={row.start}
            onChange={(event) => onChange({ ...row, start: event.target.value })}
          />
        </Field>
        <Field label="End">
          <input
            className="studio-input"
            value={row.end}
            onChange={(event) => onChange({ ...row, end: event.target.value })}
          />
        </Field>
      </div>
      <BulletEditor
        bullets={row.bullets}
        onChange={(bullets) => onChange({ ...row, bullets })}
      />
    </div>
  );
}

function EducationFields({
  row,
  onChange,
  onRemove,
}: {
  row: EducationItem;
  onChange: (row: EducationItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border border-line p-4">
      <div className="flex justify-end">
        <button className="btn btn-ghost" type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
      <Field label="Degree">
        <input
          className="studio-input"
          value={row.degree}
          onChange={(event) => onChange({ ...row, degree: event.target.value })}
        />
      </Field>
      <Field label="School">
        <input
          className="studio-input"
          value={row.school}
          onChange={(event) => onChange({ ...row, school: event.target.value })}
        />
      </Field>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Location">
          <input
            className="studio-input"
            value={row.location}
            onChange={(event) => onChange({ ...row, location: event.target.value })}
          />
        </Field>
        <Field label="Start">
          <input
            className="studio-input"
            value={row.start}
            onChange={(event) => onChange({ ...row, start: event.target.value })}
          />
        </Field>
        <Field label="End">
          <input
            className="studio-input"
            value={row.end}
            onChange={(event) => onChange({ ...row, end: event.target.value })}
          />
        </Field>
      </div>
      <Field label="Notes">
        <textarea
          className="studio-input min-h-24"
          value={row.notes}
          onChange={(event) => onChange({ ...row, notes: event.target.value })}
        />
      </Field>
    </div>
  );
}

function ProjectFields({
  row,
  onChange,
  onRemove,
}: {
  row: ProjectItem;
  onChange: (row: ProjectItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border border-line p-4">
      <div className="flex justify-end">
        <button className="btn btn-ghost" type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
      <Field label="Name">
        <input
          className="studio-input"
          value={row.name}
          onChange={(event) => onChange({ ...row, name: event.target.value })}
        />
      </Field>
      <Field label="Link">
        <input
          className="studio-input"
          value={row.href}
          onChange={(event) => onChange({ ...row, href: event.target.value })}
        />
      </Field>
      <BulletEditor
        bullets={row.bullets}
        onChange={(bullets) => onChange({ ...row, bullets })}
      />
    </div>
  );
}

function ExtraFields({
  row,
  onChange,
  onRemove,
}: {
  row: ExtraItem;
  onChange: (row: ExtraItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border border-line p-4">
      <div className="flex justify-end">
        <button className="btn btn-ghost" type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
      <Field label="Title">
        <input
          className="studio-input"
          value={row.title}
          onChange={(event) => onChange({ ...row, title: event.target.value })}
        />
      </Field>
      <Field label="Link">
        <input
          className="studio-input"
          value={row.href}
          onChange={(event) => onChange({ ...row, href: event.target.value })}
        />
      </Field>
      <Field label="Body">
        <textarea
          className="studio-input min-h-24"
          value={row.body}
          onChange={(event) => onChange({ ...row, body: event.target.value })}
        />
      </Field>
    </div>
  );
}

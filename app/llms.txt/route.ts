import { absoluteUrl } from "@/lib/seo";
import { cases, clientLandings, publication, site } from "@/lib/site";
import { writingPath, writings, writingsIndex } from "@/lib/writings";

export function GET() {
  const pages = [
    ["/", site.description],
    ["/work", "Selected systems: client platforms, SEO landings, and research."],
    ["/work/edmissions-crm", "Case study of the Edmissions World staff CRM."],
    ["/about", "Path, publication, and research interests."],
    ["/writings", writingsIndex.description],
    ["/contact", `Contact ${site.name} in ${site.location}.`],
    ["/resume.pdf", "CV."],
  ] as const;

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Role: ${site.role}`,
    `- Location: ${site.location}, Germany`,
    `- Email: ${site.email}`,
    `- LinkedIn: ${site.links.linkedin}`,
    `- GitHub: ${site.links.github}`,
    `- Klinn AI: ${site.links.klinn}`,
    `- Publication: ${publication.title} (${publication.publisher}, ${publication.year}) ${publication.href}`,
    "",
    "## Pages",
    ...pages.map(([path, note]) => `- [${path}](${absoluteUrl(path)}): ${note}`),
    "",
    "## Work",
    ...cases.map(
      (item) =>
        `- ${item.name} (${item.year}): ${item.role} ${item.external ? item.href : absoluteUrl(item.href)}`,
    ),
    ...clientLandings.map((item) => `- ${item.name} (${item.host}): ${item.note} ${item.href}`),
    "",
    "## Writings",
    ...writings.map(
      (post) =>
        `- [${post.title}](${absoluteUrl(writingPath(post.slug))}) (${post.date}): ${post.description}`,
    ),
    "",
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

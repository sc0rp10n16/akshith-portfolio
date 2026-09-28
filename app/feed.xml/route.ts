import { writings, writingPath, writingsIndex } from "@/lib/writings";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const latest = writings.reduce((latestDate, post) =>
    post.date > latestDate ? post.date : latestDate,
  writings[0]?.date ?? "2026-01-01");

  const items = writings
    .map((post) => {
      const link = absoluteUrl(writingPath(post.slug));
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
      <category>${escapeXml(post.tag)}</category>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");

  const self = absoluteUrl("/feed.xml");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} — ${writingsIndex.title}`)}</title>
    <link>${escapeXml(absoluteUrl("/writings"))}</link>
    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(writingsIndex.description)}</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date(`${latest}T00:00:00.000Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

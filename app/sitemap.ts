import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { writings, writingPath } from "@/lib/writings";

const base = site.url.replace(/\/$/, "");

function url(path: string): string {
  if (path === "/") {
    return base;
  }
  return `${base}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: new Date("2026-09-22"), changeFrequency: "weekly", priority: 1 },
    { url: url("/work"), lastModified: new Date("2026-09-22"), changeFrequency: "monthly", priority: 0.9 },
    {
      url: url("/work/edmissions-crm"),
      lastModified: new Date("2026-03-18"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    { url: url("/writings"), lastModified: new Date("2026-09-22"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/about"), lastModified: new Date("2026-09-22"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/contact"), lastModified: new Date("2026-09-22"), changeFrequency: "yearly", priority: 0.5 },
  ];

  const posts: MetadataRoute.Sitemap = writings.map((post) => ({
    url: url(writingPath(post.slug)),
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...posts];
}

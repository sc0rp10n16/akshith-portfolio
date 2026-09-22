import type { Metadata } from "next";
import { site } from "@/lib/site";

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (path === "/" || path.length === 0) {
    return base;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultOgImage = {
  url: "/akshith_potrait.png",
  alt: `${site.name}, co-founder and CTO of Klinn AI`,
} as const;

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: readonly string[];
}): Metadata {
  const url = absoluteUrl(path);
  const titleField = path === "/" ? { absolute: title } : title;

  return {
    title: titleField,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type,
      locale: "en_GB",
      siteName: site.name,
      images: [defaultOgImage],
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            authors: [site.name],
            tags: tags ? [...tags] : undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
      addressCountry: "DE",
    },
    sameAs: [site.links.linkedin, site.links.github, site.links.klinn],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "OVGU Magdeburg" },
      { "@type": "CollegeOrUniversity", name: "KL University" },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    author: { "@type": "Person", name: site.name, url: site.url },
  };
}

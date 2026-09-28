import type { Metadata } from "next";
import { cases, clientLandings, crmStudy, publication, site } from "@/lib/site";

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (path === "/" || path.length === 0) {
    return base;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const portraitUrl = absoluteUrl("/akshith_potrait.png");

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
      languages: {
        "en-GB": url,
      },
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      title,
      description,
      url,
      type,
      locale: "en_GB",
      siteName: site.name,
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
    },
    robots: indexableRobots,
  };
}

function personEntity() {
  return {
    "@type": "Person" as const,
    name: site.name,
    url: site.url,
    image: portraitUrl,
    description: site.description,
    jobTitle: site.role,
    email: site.email,
    address: {
      "@type": "PostalAddress" as const,
      addressLocality: site.location,
      addressCountry: "DE",
    },
    worksFor: {
      "@type": "Organization" as const,
      name: "Klinn AI",
      url: site.links.klinn,
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity" as const, name: "OVGU Magdeburg" },
      { "@type": "CollegeOrUniversity" as const, name: "KL University" },
    ],
    knowsAbout: [
      "Semiconductor nanotechnologies",
      "Neuromorphic and in-memory compute",
      "Autonomous navigation",
      "Production software platforms",
    ],
    sameAs: [site.links.linkedin, site.links.github, site.links.klinn],
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    ...personEntity(),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en-GB",
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: site.url,
    name: `${site.name} — ${site.role}`,
    description: site.description,
    inLanguage: "en-GB",
    mainEntity: personEntity(),
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function workListJsonLd() {
  const items = [
    ...cases.map((item) => ({
      name: item.name,
      url: item.external ? item.href : absoluteUrl(item.href),
    })),
    ...clientLandings.map((item) => ({
      name: item.name,
      url: item.href,
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Selected work by ${site.name}`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

const caseStudyPath = "/work/edmissions-crm";
const caseStudyPublished = "2026-03-18";

export function caseStudyJsonLd() {
  const url = absoluteUrl(caseStudyPath);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: crmStudy.title,
    description: crmStudy.lede,
    datePublished: caseStudyPublished,
    dateModified: caseStudyPublished,
    inLanguage: "en-GB",
    url,
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };
}

export function publicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: publication.title,
    url: publication.href,
    datePublished: publication.year,
    description: publication.note,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "Book",
      name: publication.book,
      publisher: {
        "@type": "Organization",
        name: publication.publisher,
      },
    },
    author: publication.authors.map((name) => ({
      "@type": "Person",
      name,
    })),
  };
}

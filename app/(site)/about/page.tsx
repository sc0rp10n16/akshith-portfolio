import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Path } from "@/components/path";
import { Research } from "@/components/research";
import { breadcrumbJsonLd, pageMetadata, publicationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${site.name} is co-founder and CTO of Klinn AI, and a Master's student in Advanced Semiconductor Nanotechnologies at OVGU Magdeburg. Path, publication, and what comes next.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <JsonLd data={publicationJsonLd()} />
      <Path
        titleLevel="h1"
        crumbs={[
          { href: "/", label: "Home" },
          { label: "About" },
        ]}
      />
      <Research />
    </>
  );
}

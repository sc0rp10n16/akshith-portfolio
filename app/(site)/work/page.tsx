import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Work } from "@/components/work";
import { breadcrumbJsonLd, pageMetadata, workListJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected systems by Akshith Mysa: Edmissions World CRM, Metaflow, SEO client landings, Genau, and published ornithopter navigation.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <JsonLd data={workListJsonLd()} />
      <Work
        titleLevel="h1"
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Work" },
        ]}
      />
    </>
  );
}

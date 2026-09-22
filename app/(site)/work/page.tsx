import type { Metadata } from "next";
import { Work } from "@/components/work";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected systems by Akshith Mysa: Edmissions World CRM, Metaflow, SEO client landings, Genau, and published ornithopter navigation.",
  path: "/work",
});

export default function WorkPage() {
  return <Work />;
}

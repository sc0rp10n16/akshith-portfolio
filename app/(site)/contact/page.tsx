import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name} in Magdeburg — doctoral positions, engineering roles in the EU, and conversations about hard systems.`,
  path: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}

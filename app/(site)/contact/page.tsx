import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name} in Magdeburg — doctoral positions, engineering roles in the EU, and conversations about hard systems.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Contact
        titleLevel="h1"
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Contact" },
        ]}
      />
    </>
  );
}

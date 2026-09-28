import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Path } from "@/components/path";
import { Research } from "@/components/research";
import { Work } from "@/components/work";
import { Writing } from "@/components/writing";
import { pageMetadata, profilePageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${site.name} — ${site.role}`,
  description: site.description,
  path: "/",
});

export default function Home() {
  return (
    <div id="top">
      <JsonLd data={profilePageJsonLd()} />
      <Hero />
      <Work />
      <div id="about">
        <Research />
        <Path />
      </div>
      <Writing />
      <Contact />
    </div>
  );
}

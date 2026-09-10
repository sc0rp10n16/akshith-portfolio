import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Path } from "@/components/path";
import { Research } from "@/components/research";
import { SiteHeader } from "@/components/site-header";
import { Work } from "@/components/work";
import { Writing } from "@/components/writing";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-bg focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Work />
        <Research />
        <Path />
        <Writing />
        <Contact />
      </main>
    </>
  );
}

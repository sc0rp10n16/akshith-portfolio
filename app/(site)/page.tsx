import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Path } from "@/components/path";
import { Research } from "@/components/research";
import { Work } from "@/components/work";
import { Writing } from "@/components/writing";

export default function Home() {
  return (
    <div id="top">
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

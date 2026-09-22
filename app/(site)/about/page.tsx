import type { Metadata } from "next";
import { Path } from "@/components/path";
import { Research } from "@/components/research";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <Path />
      <Research />
    </>
  );
}

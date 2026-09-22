import type { Metadata } from "next";
import { Writing } from "@/components/writing";

export const metadata: Metadata = {
  title: "Writing",
};

export default function WritingsPage() {
  return <Writing />;
}

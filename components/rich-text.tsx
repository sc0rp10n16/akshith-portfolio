import type { ReactNode } from "react";
import Link from "next/link";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > last) {
      parts.push(text.slice(last, index));
    }

    const label = match[1] ?? "";
    const href = match[2] ?? "";
    const external = href.startsWith("http://") || href.startsWith("https://");

    if (external) {
      parts.push(
        <a key={key} href={href} target="_blank" rel="noreferrer">
          {label}
        </a>,
      );
    } else {
      parts.push(
        <Link key={key} href={href}>
          {label}
        </Link>,
      );
    }

    last = index + match[0].length;
    key += 1;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return <>{parts}</>;
}

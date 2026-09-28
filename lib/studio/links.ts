import type { ResumeData } from "@/lib/studio/resume";

export type LinkPiece = {
  text: string;
  href: string | null;
};

const BARE_URL =
  /^(?:www\.)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:[/?#][^\s]*)?$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INLINE_LINK =
  /(?:https?:\/\/|mailto:)[^\s<>]+|www\.[^\s<>]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi;
const TRAIL = /[),.;:!?]+$/;

export function linkHref(raw: string): string | null {
  const value = raw.trim();
  if (!value) {
    return null;
  }
  if (/^(?:https?:\/\/|mailto:|tel:)/i.test(value)) {
    return value;
  }
  if (EMAIL.test(value)) {
    return `mailto:${value}`;
  }
  if (BARE_URL.test(value)) {
    return `https://${value}`;
  }
  return null;
}

export function emailHref(raw: string): string | null {
  const value = raw.trim();
  if (!value) {
    return null;
  }
  if (/^mailto:/i.test(value)) {
    return value;
  }
  if (value.includes("@")) {
    return `mailto:${value}`;
  }
  return linkHref(value);
}

export function phoneHref(raw: string): string | null {
  const value = raw.trim();
  if (!value) {
    return null;
  }
  if (/^(?:https?:\/\/|mailto:)/i.test(value)) {
    return linkHref(value);
  }
  if (/^tel:/i.test(value)) {
    return value;
  }
  const digits = value.replace(/[^\d+]/g, "");
  if (/^\+?\d{7,15}$/.test(digits)) {
    return `tel:${digits}`;
  }
  return null;
}

export function contactParts(
  data: Pick<
    ResumeData,
    "location" | "email" | "phone" | "website" | "linkedin" | "github"
  >,
): LinkPiece[] {
  const parts: LinkPiece[] = [];
  const add = (text: string, href: string | null) => {
    const value = text.trim();
    if (!value) {
      return;
    }
    parts.push({ text: value, href });
  };

  add(data.location, null);
  add(data.email, emailHref(data.email));
  add(data.phone, phoneHref(data.phone));
  add(data.website, linkHref(data.website));
  add(data.linkedin, linkHref(data.linkedin));
  add(data.github, linkHref(data.github));
  return parts;
}

export function splitLinkPieces(value: string): LinkPiece[] {
  const pieces: LinkPiece[] = [];
  const pattern = new RegExp(INLINE_LINK.source, "gi");
  let last = 0;

  for (const match of value.matchAll(pattern)) {
    const start = match.index ?? 0;
    const raw = match[0];
    if (start > last) {
      pieces.push({ text: value.slice(last, start), href: null });
    }

    const trail = raw.match(TRAIL);
    const token = trail ? raw.slice(0, -trail[0].length) : raw;
    const href = linkHref(token);
    if (href && token) {
      pieces.push({ text: token, href });
      if (trail) {
        pieces.push({ text: trail[0], href: null });
      }
    } else {
      pieces.push({ text: raw, href: null });
    }
    last = start + raw.length;
  }

  if (last < value.length) {
    pieces.push({ text: value.slice(last), href: null });
  }
  if (pieces.length === 0) {
    pieces.push({ text: value, href: null });
  }
  return pieces;
}
